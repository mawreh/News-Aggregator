import React from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import ArticleHZ from "../../../../components/articleCards/ArticleHZ";
import "./MiddleCollections.css";

export default function MiddleCollections() {
  const { middleCollectionsArticles } = useNewsContext();
  return (
    <div className="middle-collections-list">
      {middleCollectionsArticles.map((article, i) => (
        <ArticleHZ key={i} article={article} />
      ))}
    </div>
  );
}