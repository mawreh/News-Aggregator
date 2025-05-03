import React from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import ArticleLG from "../../../../components/articleCards/ArticleLG";
import ArticleMini from "../../../../components/articleCards/ArticleMini";
import "./TopCollections.css";

export default function TopCollections() {
  const { topCollectionsArticles } = useNewsContext();
  if (topCollectionsArticles.length < 5) return null;

  const [first, ...rest] = topCollectionsArticles;

  return (
    <div className="top-collections-grid">
      <ArticleLG article={first} />
      <div className="top-collections-mini-grid">
        {rest.map((a, i) => (
          <ArticleMini key={i} article={a} />
        ))}
      </div>
    </div>
  );
}