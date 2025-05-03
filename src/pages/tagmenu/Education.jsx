import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * The Education component represents a page dedicated to the "Education" tag.
 * It displays a header with the tag name, a link to navigate back to the home page,
 * and a divider. The page also includes a tag menu and a container for articles
 * related to the "Education" tag.
 *
 * @component
 * @returns {JSX.Element} The rendered Education page component.
 */
function Education() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Education</h1>
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

export default Education;
