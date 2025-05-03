import React from "react";
import defaultImage from "../../assets/defaultImage.jpg";
import SaveButton from "../saveButton/SaveButton";
import "./ArticleCards.css";

/**
 * A React functional component that renders a small article card.
 * The card displays an image, title, description, source, and a save button.
 * Clicking on the card records the read in localStorage and opens the article in a new tab.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.article - The article object containing details to display.
 * @param {string} [props.article.url] - The URL of the article.
 * @param {string} [props.article.urlToImage] - The URL of the article's image.
 * @param {string} [props.article.title] - The title of the article.
 * @param {string} [props.article.description] - The description of the article.
 * @param {Object} [props.article.source] - The source of the article.
 * @param {string} [props.article.source.name] - The name of the article's source.
 *
 * @example
 * const article = {
 *   url: "https://example.com/article",
 *   urlToImage: "https://example.com/image.jpg",
 *   title: "Example Article",
 *   description: "This is an example description.",
 *   source: { name: "Example Source" }
 * };
 *
 * <ArticleSM article={article} />
 */
function ArticleSM({ article }) {
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
    <div className="card-SM">
      {/* SMALL ARTICLE CARD */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleArticleClick}
      >
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title || "Article Image"}
          className="img-SM"
          onError={handleImageError}
        />
      </a>
      <div className="content-SM">
        <h3 className="title-SM">{article.title || "Untitled Article"}</h3>
        <p className="description-SM">
          {article.description || "No description available."}
        </p>
      </div>
      <div className="actions-container">
        <p className="source-SM">{article.source?.name || "Unknown Source"}</p>
        <div className="save-button">
          <SaveButton article={article} />
        </div>
      </div>
    </div>
  );
}

export default ArticleSM;
