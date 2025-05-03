import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./articleCarousel.css";
import LeftInactive from "../../assets/carousel_nav-left_inactive.svg?react";
import LeftActive from "../../assets/carousel_nav-left_active.svg?react";
import RightInactive from "../../assets/carousel_nav-right_inactive.svg?react";
import RightActive from "../../assets/carousel_nav-right_active.svg?react";
import { useNewsContext } from "../../context/NewsContext";
import ArticleSM from "../articleCards/ArticleSM";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

/**
 * ArticleCarousel Component
 *
 * This component displays a horizontally scrollable carousel of articles.
 * It fetches articles from the `useNewsContext` hook, shuffles them, and
 * displays a maximum of 8 articles. The carousel includes navigation buttons
 * to scroll left or right.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered ArticleCarousel component.
 *
 * @example
 * <ArticleCarousel />
 *
 * @description
 * - The component uses `useMemo` to shuffle and limit the articles to 8.
 * - It tracks the scroll position and determines if the carousel is at the
 *   beginning or end using `useState` and `useCallback`.
 * - Navigation buttons are conditionally enabled/disabled based on the scroll
 *   position.
 * - The component listens for scroll events on the carousel container and
 *   updates the state accordingly.
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
 * - Context: `useNewsContext` for fetching articles
 * - Components: `Loader`, `ErrorMessage`, `ArticleSM`
 * - Icons: `LeftActive`, `LeftInactive`, `RightActive`, `RightInactive`
 *
 * @states
 * - `scrollPosition` {number} - Tracks the current scroll position of the carousel.
 * - `isAtEnd` {boolean} - Indicates whether the carousel is scrolled to the end.
 * - `container` {HTMLElement | null} - Refers to the carousel container element.
 *
 * @hooks
 * - `useMemo` - Memoizes the shuffled articles to avoid recalculating on every render.
 * - `useCallback` - Memoizes scroll-related functions to prevent unnecessary re-renders.
 * - `useEffect` - Sets up and cleans up the scroll event listener on the container.
 *
 * @errorHandling
 * - Displays a `Loader` component while loading articles.
 * - Displays an `ErrorMessage` component if an error occurs.
 * - Displays a fallback message if no articles are available.
 */
const ArticleCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [container, setContainer] = useState(null);
  const { pocketHits, loading, error } = useNewsContext();

  // Memoize shuffled articles to ensure they are only calculated once
  const articles = useMemo(() => {
    if (!pocketHits || pocketHits.length === 0) return [];
    const shuffled = [...pocketHits];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8); // Only take first 8 articles
  }, [pocketHits]);

  const checkIsAtEnd = useCallback(() => {
    if (!container) return false;
    return (
      Math.ceil(container.scrollLeft) >=
      container.scrollWidth - container.clientWidth
    );
  }, [container]);

  const handleScroll = useCallback(() => {
    if (!container) return;
    setScrollPosition(container.scrollLeft);
    setIsAtEnd(checkIsAtEnd());
  }, [container, checkIsAtEnd]);

  // Set up scroll listener when container changes
  useEffect(() => {
    if (!container) return;

    // Initial check
    handleScroll();

    // Add scroll listener
    container.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [container, handleScroll]);

  const scrollTo = useCallback(
    (direction) => {
      if (!container) return;

      if (direction === "next") {
        container.scrollTo({
          left: container.scrollWidth - container.clientWidth,
          behavior: "smooth",
        });
      } else {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    },
    [container]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!articles || articles.length === 0) {
    return (
      <p className="no-news-message">
        No pocket hits found. Please try again later!
      </p>
    );
  }

  return (
    <div
      className={`article-carousel-container 
        ${scrollPosition > 5 ? "show-before" : ""} 
        ${!isAtEnd ? "show-after" : ""}`}
    >
      <div className="nav-buttons">
        <div className="carousel-header">
          <button
            className="carousel-button"
            onClick={() => scrollTo("prev")}
            disabled={scrollPosition <= 0}
          >
            {scrollPosition <= 0 ? <LeftInactive /> : <LeftActive />}
          </button>
          <button
            className="carousel-button"
            onClick={() => scrollTo("next")}
            disabled={isAtEnd}
          >
            {isAtEnd ? <RightInactive /> : <RightActive />}
          </button>
        </div>
      </div>
      <div className="article-carousel" ref={setContainer}>
        {articles.map((article) => (
          <ArticleSM
            key={`${article.title}-${article.source?.name || "unknown"}`}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleCarousel;
