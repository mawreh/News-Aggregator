import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * Entertainment component renders the Entertainment page of the application.
 * It includes a header with a title, a link to navigate back to the home page,
 * and a divider. The page also displays a TagMenu component and a list of 
 * articles related to the "Entertainment" tag using the TagArticles component.
 *
 * @component
 * @returns {JSX.Element} The rendered Entertainment page.
 */
function Entertainment() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Entertainment</h1>
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

export default Entertainment;
