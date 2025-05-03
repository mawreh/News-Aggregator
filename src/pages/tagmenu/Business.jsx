import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * The Business component represents a page dedicated to displaying business-related articles.
 * It includes a header with a title, a link to navigate back to the home page, and a divider.
 * The page also renders a TagMenu component for navigation and a TagArticles component to display articles.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Business page.
 */
function Business() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Business</h1>
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

export default Business;
