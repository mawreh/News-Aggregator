import React from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import ArticleLG from "../../../../components/articleCards/ArticleLG";
import ArticleMini from "../../../../components/articleCards/ArticleMini";
import "./BtmCollections.css";

export default function BtmCollections() {
  const { btmCollectionsArticles } = useNewsContext();
  if (btmCollectionsArticles.length < 5) return null;

  const [first, ...rest] = btmCollectionsArticles;

  return (
    <div className="btm-collections-grid">
      <ArticleLG article={first} />
      <div className="btm-collections-mini-grid">
        {rest.map((a, i) => (
          <ArticleMini key={i} article={a} />
        ))}
      </div>
    </div>
  );
}