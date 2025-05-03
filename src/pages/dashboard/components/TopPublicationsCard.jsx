import React, { useEffect, useState } from "react";
import { useUserActions } from "../../../context/UserActionsContext";

/**
 * TopPublicationsCard Component
 *
 * This component displays the top three publications based on the user's liked and saved articles.
 * It combines the articles from `likedArticles` and `savedArticles`, counts the occurrences of each
 * publication source, and sorts them to determine the top publications.
 *
 * @component
 *
 * @returns {JSX.Element} A card displaying the top three publication sources or a message prompting
 * the user to like or save articles if no data is available.
 *
 * @example
 * <TopPublicationsCard />
 *
 * @dependencies
 * - useUserActions: Custom hook to retrieve `likedArticles` and `savedArticles`.
 * - useState: React hook for managing the `topPubs` state.
 * - useEffect: React hook for side effects to calculate top publications.
 */
const TopPublicationsCard = () => {
  const { likedArticles, savedArticles } = useUserActions();
  const [topPubs, setTopPubs] = useState([]);

  useEffect(() => {
    let sourceCounts = {};
    const articles = [...likedArticles, ...savedArticles];
    articles.forEach((article) => {
      if (article.source && article.source.name) {
        const name = article.source.name;
        sourceCounts[name] = (sourceCounts[name] || 0) + 1;
      }
    });
    const sortedSources = Object.entries(sourceCounts).sort(
      (a, b) => b[1] - a[1]
    );
    setTopPubs(sortedSources.slice(0, 3));
  }, [likedArticles, savedArticles]);

  return (
    <div className="card top-publications-card">
      <h3>Top Publications</h3>
      <p>Your go-to sources</p>
      {topPubs.length === 0 ? (
        <p style={{ color: "#EF3E56", fontWeight: 500, textWrap: "wrap" }}>
          Like or save articles to see your top publications.
        </p>
      ) : (
        <ol>
          {topPubs.map(([source]) => (
            <li key={source}>
              <span>{source}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default TopPublicationsCard;