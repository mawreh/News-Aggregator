import React from "react";
import { useNewsContext } from "../../../../context/NewsContext";
import ArticleLG from "../../../../components/articleCards/ArticleLG";
import ArticleMini from "../../../../components/articleCards/ArticleMini";
import "./BestOfWeb.css";

/**
 * BestOfWeb component displays a grid of articles with one large article
 * and a set of smaller articles.
 *
 * This component retrieves the `discoverBestArticles` array from the
 * `useNewsContext` hook. If the array is not available or contains fewer
 * than 5 articles, the component renders nothing.
 *
 * The first article in the array is displayed using the `ArticleLG` component,
 * while the remaining articles are displayed using the `ArticleMini` component
 * in a mini-grid layout.
 *
 * @component
 * @returns {JSX.Element|null} A JSX element representing the best-of-web grid
 * or null if there are insufficient articles.
 */
export default function BestOfWeb() {
  const { discoverBestArticles } = useNewsContext();
  if (!discoverBestArticles || discoverBestArticles.length < 5) return null;

  const [first, ...rest] = discoverBestArticles;

  return (
    <div className="best-of-web-grid">
      <ArticleLG article={first} />
      <div className="mini-grid">
        {rest.map((a, i) => (
          <ArticleMini key={i} article={a} />
        ))}
      </div>
    </div>
  );
}
