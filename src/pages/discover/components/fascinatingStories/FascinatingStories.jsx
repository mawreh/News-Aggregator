import React from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import ArticleHZ from "../../../../components/articleCards/ArticleHZ";
import "./FascinatingStories.css";

/**
 * FascinatingStories component renders a list of fascinating story articles.
 * It retrieves the articles from the `useNewsContext` hook and maps over them
 * to display each article using the `ArticleHZ` component.
 *
 * @component
 * @returns {JSX.Element} A div containing a list of fascinating story articles.
 */
export default function FascinatingStories() {
  const { fascinatingStoriesArticles } = useNewsContext();
  return (
    <div className="fascinating-list">
      {fascinatingStoriesArticles.map((article, i) => (
        <ArticleHZ key={i} article={article} />
      ))}
    </div>
  );
}
