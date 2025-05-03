import React from "react";
import TagMenu from "../../components/tagMenu/TagMenu";
import TagArticles from "../../components/tagArticles/TagArticles";
import "../../pages/home/Home.css";

/**
 * Travel component renders the Travel tag page.
 * It includes a header with a title, a link to navigate back to the home page,
 * a divider, and a TagMenu component. Below the header, it displays a list of
 * articles related to the Travel tag using the TagArticles component.
 *
 * @component
 * @returns {JSX.Element} The rendered Travel tag page.
 */
function Travel() {
  return (
    <div className="tag-page home-container">
      <div className="tag-page-header">
        <h1>Travel</h1>
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

export default Travel;