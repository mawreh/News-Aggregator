import React from "react";
import Blockquote from "../../assets/collections-blockquote.svg?react";
import TopCollections from "./components/topCollections/TopCollections";
import MiddleCollections from "./components/middleCollections/MiddleCollections";
import BtmCollections from "./components/btmCollections/BtmCollections";
import "./Collections.css";
import Pagination from "../../components/pagination/Pagination";
import { useNewsContext } from "../../context/NewsContext";

/**
 * The `Collections` component renders a paginated view of various collections,
 * including top collections, fascinating stories, and additional topics.
 * It utilizes context to manage the current page and total pages for pagination.
 *
 * @component
 *
 * @returns {JSX.Element} A container with multiple sections displaying collections
 * and pagination controls.
 *
 * @example
 * <Collections />
 *
 * @remarks
 * - The component uses the `useNewsContext` hook to access and manage pagination state.
 * - It includes multiple subsections such as "Collections For Your Pocket",
 *   "Fascinating Stories", and a blockquote container.
 * - Pagination controls are rendered at both the top and bottom of the component.
 */
function Collections() {
  const { collectionsPage, setCollectionsPage, totalCollectionPages } =
    useNewsContext();

  return (
    <div className="collections-container">
      <Pagination
        currentPage={collectionsPage}
        setCurrentPage={setCollectionsPage}
        totalPages={totalCollectionPages}
      />
      {/* Collections For Your Pocket */}
      <div className="for-your-pocket-header">
        <h1>Collections For Your Pocket</h1>
        <hr className="divider" />
        <div className="for-your-pocket-container">
          <TopCollections />
        </div>
      </div>
      <hr className="divider" />
      {/* Fascinating Stories and Discover More Topics */}
      <div className="collections-grid">
        {/* Left Column: Fascinating Stories */}
        <div className="collections-left">
          <div className="horiz-collections-container">
            <MiddleCollections />
          </div>
        </div>
        {/* Right Column: Blockquote Container */}
        <div className="collections-right">
          <div className="blockquote-container">
            <Blockquote alt="Blockquote" className="blockquote-image" />
          </div>
        </div>
      </div>
      {/* Bottom Container */}
      <div className="btm-for-your-pocket-container">
        <BtmCollections />
      </div>
      <Pagination
        currentPage={collectionsPage}
        setCurrentPage={setCollectionsPage}
        totalPages={totalCollectionPages}
      />
    </div>
  );
}

export default Collections;
