import React, { useEffect, useState } from "react";
import { useUserActions } from "../../../context/UserActionsContext";

const TopTopicsCard = () => {
  const { likedArticles } = useUserActions();
  const [topTopics, setTopTopics] = useState([]);

  // Define the fixed list of tags
  // Define the fixed list of tags that match our tag menu
  const fixedTags = [
    "business",
    "career",
    "education",
    "entertainment",
    "food",
    "gaming",
    "health",
    "parenting",
    "finance",
    "politics",
    "science",
    "self-improvement",
    "sports",
    "technology",
    "travel",
  ];

  useEffect(() => {
    // Initialize tagLikes object to count likes per tag
    const tagLikes = {};
    fixedTags.forEach((tag) => {
      tagLikes[tag] = 0;
    });

    // Count likes for each tag
    likedArticles.forEach((article) => {
      let tag = null;

      // Method 1: Try to get tag from URL path
      if (article.url) {
        const urlPath = article.url.split("/").pop() || "";
        tag = fixedTags.find((t) => urlPath.includes(t));
      }

      // Method 2: Try to get tag from article title or description
      if (!tag && (article.title || article.description)) {
        const content = (
          article.title +
          " " +
          (article.description || "")
        ).toLowerCase();
        tag = fixedTags.find((t) => content.includes(t));
      }

      // Method 3: Try to get tag from source name
      if (!tag && article.source && article.source.name) {
        const sourceName = article.source.name.toLowerCase();
        tag = fixedTags.find((t) => sourceName.includes(t));
      }

      // If a tag was found, increment its count
      if (tag) {
        tagLikes[tag]++;
      }
    });

    // Calculate total likes for all tags
    const totalTagLikes = Object.values(tagLikes).reduce(
      (sum, count) => sum + count,
      0
    );

    // Convert tagLikes to array of objects with tag, count, and percentage
    const topics = Object.entries(tagLikes)
      .map(([tag, count]) => ({
        tag,
        count,
        percentage:
          totalTagLikes > 0 ? Math.round((count / totalTagLikes) * 100) : 0,
      }))
      .filter((topic) => topic.count > 0) // Only include tags with likes
      .sort((a, b) => b.count - a.count) // Sort by count descending
      .slice(0, 5); // Take top 5

    setTopTopics(topics);
  }, [likedArticles]);

  // Format tag name for display
  const formatTagName = (tag) => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="card top-topics-card">
      <h3>Top 5 Topics</h3>
      <p>Ranked by the tags you "like" most</p>
      {topTopics.length > 0 ? (
        <ol>
          {topTopics.map(({ tag, percentage }, index) => (
            <li
              key={tag}
              className={index === 0 ? "top-topic" : "non-top-topic"}
            >
              <div className="topic-item-container">
                <span className="order">{index + 1}.</span>
                {index === 0 ? (
                  <span className="top-button">{formatTagName(tag)}</span>
                ) : (
                  <span className="tag-name">{formatTagName(tag)}</span>
                )}
                <span className="percentage">{percentage}%</span>
              </div>
              {index === 0 && <hr className="top-topic-divider" />}
            </li>
          ))}
        </ol>
      ) : (
        <p style={{ color: "#EF3E56", fontWeight: 500, textWrap: "wrap" }}>
          Like or save articles to see your top 5 tags.
        </p>
      )}
    </div>
  );
};

export default TopTopicsCard;
