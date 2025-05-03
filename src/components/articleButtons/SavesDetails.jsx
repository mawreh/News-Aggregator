import React from "react";
import ArticleAC from "../articleCards/ArticleAC";

/**
 * A React functional component that renders an `ArticleAC` component
 * with the provided article and a category of "saved".
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.article - The article data to be passed to the `ArticleAC` component.
 * @returns {JSX.Element} The rendered `ArticleAC` component with the "saved" category.
 */
const SavesDetails = ({ article }) => {
  return <ArticleAC article={article} category="saved" />;
};

export default SavesDetails;
