import React from "react";
import ArticleAC from "../articleCards/ArticleAC";

/**
 * A functional component that renders the `ArticleAC` component with the specified article
 * and a category of "liked".
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.article - The article object to be passed to the `ArticleAC` component.
 * @returns {JSX.Element} The rendered `ArticleAC` component with the "liked" category.
 */
const LikesDetails = ({ article }) => {
  return <ArticleAC article={article} category="liked" />;
};

export default LikesDetails;
