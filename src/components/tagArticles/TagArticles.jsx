import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTagMenuContext } from "../../context/TagMenuContext";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ArticleMD from "../articleCards/ArticleMD";
import "../../pages/home/Home.css";
import "./TagArticles.css";

/**
 * TagArticles Component
 *
 * This component displays a list of articles associated with a specific tag.
 * It dynamically adjusts the number of visible rows and provides a "Read More" button
 * to load additional rows of articles. The component also handles loading and error states.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered TagArticles component.
 *
 * @example
 * <TagArticles />
 *
 * @description
 * - Fetches articles based on the tag from the URL using `useParams`.
 * - Utilizes `useTagMenuContext` to manage state and fetch articles.
 * - Dynamically calculates and sets the maximum height of the grid container
 *   based on the number of visible rows and row metrics (height and gap).
 * - Displays a loader during data fetching and an error message if an error occurs.
 * - Shows a "Read More" button to load additional rows of articles if available.
 *
 * @dependencies
 * - `useParams` from `react-router-dom` for accessing the tag from the URL.
 * - `useTagMenuContext` for managing tag-related articles and state.
 * - `useState` and `useEffect` from React for state management and side effects.
 * - `useRef` for accessing the DOM element of the grid container.
 *
 * @state
 * - `visibleRows` (number): Tracks the number of visible rows in the grid.
 * - `rowMetrics` (object): Stores the measured row height and gap for dynamic height calculation.
 *
 * @hooks
 * - `useEffect`: Used to measure row metrics and fetch articles when the tag changes.
 * - `useRef`: Used to reference the grid container for measuring row metrics.
 *
 * @context
 * - `useTagMenuContext`: Provides `tagArticles`, `fetchTagArticles`, `loading`, and `error`.
 *
 * @errorHandling
 * - Displays a loader (`<Loader />`) while fetching data.
 * - Displays an error message (`<ErrorMessage />`) if an error occurs.
 * - Displays a message if no articles are found for the tag.
 */
function TagArticles() {
  const { tag } = useParams();
  const { tagArticles, fetchTagArticles, loading, error } = useTagMenuContext();
  const [visibleRows, setVisibleRows] = useState(1);

  // store measured rowHeight & gap
  const [rowMetrics, setRowMetrics] = useState({ rowHeight: 0, rowGap: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const gridEl = gridRef.current.querySelector(".TP-grid");
      const firstItem = gridEl?.children[0];
      if (firstItem) {
        const style = getComputedStyle(gridEl);
        setRowMetrics({
          rowHeight: firstItem.getBoundingClientRect().height,
          rowGap: parseFloat(style.rowGap),
        });
      }
    }
  }, [tagArticles]);

  useEffect(() => {
    if (fetchTagArticles && tag) {
      fetchTagArticles(tag);
    }
    setVisibleRows(1);
  }, [fetchTagArticles, tag]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!tagArticles.length)
    return <p className="no-news-message">No tag articles found…</p>;

  const total = tagArticles.length;
  const maxRows = Math.ceil(total / 3);
  const canShowMore = visibleRows < maxRows;

  // compute dynamic maxHeight
  const getMaxHeight = () => {
    const { rowHeight, rowGap } = rowMetrics;
    if (!rowHeight) return "none"; // not measured yet

    const teaser = rowHeight * 0.2;
    if (visibleRows >= maxRows) return "none";

    const fullRows = visibleRows * rowHeight + (visibleRows - 1) * rowGap;
    return `${fullRows + teaser}px`;
  };

  return (
    <div className="TP-feed">
      <div
        className="grid-container"
        style={{ maxHeight: getMaxHeight() }}
        ref={gridRef}
      >
        <div className="TP-grid">
          {tagArticles.map((a, i) => (
            <ArticleMD key={a.id || i} article={{ ...a, tag }} />
          ))}
        </div>
      </div>

      {canShowMore && (
        <div className="read-more-container">
          <button
            className="read-more-button"
            onClick={() => setVisibleRows((v) => v + 1)}
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
}

export default TagArticles;
