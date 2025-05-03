import React from "react";
import ArticleAC from "../articleCards/ArticleAC";

/**
 * A React functional component that renders details for disliked articles.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.article - The article object to be displayed.
 * @returns {JSX.Element} A component that renders the disliked article details.
 */
const DislikesDetails = ({ article }) => {
  return <ArticleAC article={article} category="disliked" />;
};

export default DislikesDetails;
