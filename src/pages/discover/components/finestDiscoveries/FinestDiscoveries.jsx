// components/discover/FinestDiscoveriesCarousel.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import Loader from "../../../../components/loader/Loader";
import ErrorMessage from "../../../../components/errorMessage/ErrorMessage";
import ArticleSM from "../../../../components/articleCards/ArticleSM";
import "../../../../components/articleCarousel/articleCarousel.css";
import LeftInactive from "../../../../assets/carousel_nav-left_inactive.svg?react";
import LeftActive from "../../../../assets/carousel_nav-left_active.svg?react";
import RightInactive from "../../../../assets/carousel_nav-right_inactive.svg?react";
import RightActive from "../../../../assets/carousel_nav-right_active.svg?react";

/**
 * FinestDiscoveries component displays a carousel of the finest articles for the day.
 * It supports smooth scrolling and dynamically updates the UI based on the scroll position.
 * Articles are shuffled and limited to a maximum of 8 for display.
 *
 * @component
 *
 * @returns {JSX.Element} The FinestDiscoveries component.
 *
 * @example
 * <FinestDiscoveries />
 *
 * @description
 * - Uses `useNewsContext` to fetch the finest articles, loading state, and error state.
 * - Shuffles and limits the articles to 8 using `useMemo`.
 * - Tracks the scroll position and whether the carousel is scrolled to the end using `useState` and `useCallback`.
 * - Adds and cleans up scroll event listeners using `useEffect`.
 * - Provides navigation buttons to scroll the carousel left or right.
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
 * - Context: `useNewsContext`
 * - Components: `Loader`, `ErrorMessage`, `ArticleSM`, `LeftActive`, `LeftInactive`, `RightActive`, `RightInactive`
 *
 * @state
 * @property {number} scrollPosition - The current scroll position of the carousel.
 * @property {boolean} isAtEnd - Whether the carousel is scrolled to the end.
 * @property {HTMLElement|null} container - The DOM element of the carousel container.
 *
 * @hooks
 * - `useMemo` to shuffle and limit articles.
 * - `useCallback` to memoize scroll-related functions.
 * - `useEffect` to manage scroll event listeners.
 *
 * @errorHandling
 * - Displays a loader while articles are loading.
 * - Displays an error message if an error occurs.
 * - Displays a fallback message if no articles are available.
 */
const FinestDiscoveries = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [container, setContainer] = useState(null);
  const { todaysFinestArticles, loading, error } = useNewsContext();

  console.log("ArticleCarousel render:", {
    todaysFinestArticles,
    loading,
    error,
  });

  // Memoize shuffled articles to ensure they are only calculated once
  const articles = useMemo(() => {
    if (!todaysFinestArticles || todaysFinestArticles.length === 0) return [];
    const shuffled = [...todaysFinestArticles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8); // Only take first 8 articles
  }, [todaysFinestArticles]);

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
        No discoveries found. Please try again later!
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

export default FinestDiscoveries;
