import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * Career component renders the Career tag page.
 * It includes a header with a title, a link to navigate back to the home page,
 * a divider, and a TagMenu component. Below the header, it displays a list
 * of articles related to the Career tag using the TagArticles component.
 *
 * @component
 * @returns {JSX.Element} The rendered Career tag page.
 */
function Career() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Career</h1>
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

export default Career;