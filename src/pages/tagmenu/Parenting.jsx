import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * Parenting component renders a page dedicated to parenting-related content.
 * It includes a header with a title, a link to navigate back to the home page,
 * and a divider. The page also displays a tag menu and a list of articles
 * related to the parenting tag.
 *
 * @component
 * @returns {JSX.Element} The rendered Parenting page component.
 */
function Parenting() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Parenting</h1>
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

export default Parenting;
