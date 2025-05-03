import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import Blockquote from "../../assets/discover-blockquote.svg?react";
import BestOfWeb from "./components/bestOfWeb/BestOfWeb";
import FascinatingStories from "./components/fascinatingStories/FascinatingStories";
import FinestDiscoveries from "./components/finestDiscoveries/FinestDiscoveries";
import "./Discover.css";

/**
 * The Discover component serves as the main page for discovering curated content.
 * It includes sections for showcasing the best of the web, fascinating stories,
 * topic exploration, and daily discoveries.
 *
 * @component
 * @returns {JSX.Element} The rendered Discover page layout.
 *
 * @example
 * <Discover />
 *
 * Sections:
 * - Best of the Web: Highlights top content.
 * - Blockquote: Displays a featured quote or image.
 * - Fascinating Stories: Lists engaging stories.
 * - Discover More Topics: Provides a tag-based menu for topic exploration.
 * - Today's Finest Discoveries: Showcases daily curated content with the current date.
 */
function Discover() {
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="discover-container">
      {/* Discover the Best of the Web */}
      <div className="best-of-web-header">
        <h1>Discover the Best of the Web</h1>
        <hr className="divider" />
        <div className="best-of-the-web-container">
          <BestOfWeb />
        </div>
      </div>
      <hr className="divider" />
      {/* Blockquote Container */}
      <div className="blockquote-container">
        <Blockquote alt="Blockquote" className="blockquote-image" />
      </div>
      <hr className="divider" />
      {/* Fascinating Stories and Discover More Topics */}
      <div className="fascinating-stories-grid">
        {/* Left Column: Fascinating Stories */}
        <div className="fascinating-stories-left">
          <div className="fascinating-stories-header">
            <h1>Fascinating Stories</h1>
          </div>
          <div className="fascinating-stories-container">
            <FascinatingStories />
          </div>
        </div>
        {/* Right Column: Discover More Topics */}
        <div className="fascinating-stories-right">
          <div className="tag-menu-header">
            <h2>Discover More Topics</h2>
          </div>
          <div className="tag-menu-container">
            <TagMenu />
          </div>
        </div>
      </div>
      <hr className="divider" />
      {/* Today's Finest Discoveries */}
      <div className="finest-discoveries-header">
        <h1>Today's Finest Discoveries</h1>
        <p>{todayDate}</p>
      </div>
      <div className="finest-discoveries-container">
        <FinestDiscoveries />
      </div>
    </div>
  );
}

export default Discover;
