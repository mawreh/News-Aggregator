import React from "react";
import { useUserActions } from "../../context/UserActionsContext";
import ArticleRS from "../articleCards/ArticleRS";
import "./RecentSaves.css";

function RecentSaves() {
  const { savedArticles } = useUserActions();

  // If there are no saved articles, don't render anything.
  if (!savedArticles || savedArticles.length === 0) {
    return null;
  }

  // Get the 3 most recent saved articles.
  // We assume articles are appended so the last items are the newest.
  // Reverse the slice so the most recent appears first.
  const recentSaves = savedArticles.slice(-3).reverse();

  return (
    <div className="recent-saves-container">
      {recentSaves.map((article) => (
        <ArticleRS key={article.id || article.url} article={article} />
      ))}
    </div>
  );
}

export default RecentSaves;
