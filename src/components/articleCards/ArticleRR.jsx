import React from "react";
import defaultImage from "../../assets/defaultImage.jpg";
import ArticleButtons from "../articleButtons/articleButtons";
import SaveButton from "../saveButton/SaveButton";
import RRBadge from "../../assets/recommended-badge.svg?react";
import "./ArticleCards.css";

/**
 * Component representing a recommended article card with badges, image, and actions.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.article - The article data to display.
 * @param {string} [props.article.url] - The URL of the article.
 * @param {string} [props.article.urlToImage] - The URL of the article's image.
 * @param {string} [props.article.title] - The title of the article.
 * @param {string} [props.article.description] - The description of the article.
 * @param {Object} [props.article.source] - The source of the article.
 * @param {string} [props.article.source.name] - The name of the article's source.
 *
 * @returns {JSX.Element} A card displaying the article's image, title, description, and actions.
 *
 * @example
 * <ArticleRR article={{
 *   url: "https://example.com/article",
 *   urlToImage: "https://example.com/image.jpg",
 *   title: "Example Article",
 *   description: "This is an example description.",
 *   source: { name: "Example Source" }
 * }} />
 */
function ArticleRR({ article }) {
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const handleArticleClick = () => {
    // Retrieve existing reads from localStorage
    const reads = JSON.parse(localStorage.getItem("articleReads")) || [];
    // Record the current time (or increment a counter)
    reads.push(new Date().toISOString());
    localStorage.setItem("articleReads", JSON.stringify(reads));

    // Optionally, navigate to the article URL
    window.open(article.url, "_blank");
  };

  return (
    <div className="card-RR">
      {/* ARTICLE CARD WITH RECOMMENDED BADGES */}
      <RRBadge alt="Recommended Badge" className="badge-RR" />
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleArticleClick}
      >
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title || "Article Image"}
          className="img-RR"
          onError={handleImageError}
        />
      </a>
      <div className="content-RR">
        <p className="source-RR">{article.source?.name || "Unknown Source"}</p>
        <h3 className="title-RR">{article.title || "Untitled Article"}</h3>
        <p className="description-RR">
          {article.description || "No description available."}
        </p>
      </div>
      <div className="actions-container">
        <div className="article-buttons">
          <ArticleButtons article={article} />
        </div>
        <div className="save-button">
          <SaveButton article={article} />
        </div>
      </div>
    </div>
  );
}

export default ArticleRR;
