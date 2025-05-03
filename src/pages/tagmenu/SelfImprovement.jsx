import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * The `SelfImprovement` component represents a page dedicated to self-improvement content.
 * It includes a header with a title, a link to navigate back to the home page, and a divider.
 * The component also renders a `TagMenu` for navigation and a `TagArticles` section to display articles.
 *
 * @component
 * @returns {JSX.Element} A React component rendering the self-improvement page layout.
 */
function SelfImprovement() {
  return (
    <div className="home-container">
      <div className="tag-page tag-page-header">
        <h1>Self Improvement</h1>
        <a href="/">Go to Home</a>
        <hr className="divider" />
        <TagMenu />
      </div>
      <div className="tag-page-container">
        <TagArticles />
      </div>
    </div>
  );
}

export default SelfImprovement;
