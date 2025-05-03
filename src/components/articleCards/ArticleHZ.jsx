import React from "react";
import "./ArticleCards.css";
import defaultImage from "../../assets/defaultImage.jpg";
import SaveButton from "../saveButton/SaveButton";

/**
 * A React component that renders a horizontal article card with an image, title, description,
 * source, estimated read time, and a save button. Clicking the card opens the article in a new tab
 * and records the read in localStorage.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.article - The article data to display.
 * @param {string} [props.article.url] - The URL of the article.
 * @param {string} [props.article.urlToImage] - The URL of the article's image.
 * @param {string} [props.article.title] - The title of the article.
 * @param {string} [props.article.description] - A short description of the article.
 * @param {string} [props.article.content] - The full content of the article.
 * @param {Object} [props.article.source] - The source of the article.
 * @param {string} [props.article.source.name] - The name of the article's source.
 *
 * @returns {JSX.Element} A horizontal article card component.
 */
function ArticleHZ({ article }) {
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

  function estimateReadTime(article) {
    const text = [article.title, article.description, article.content]
      .filter(Boolean)
      .join(" ");
    const words = text.trim().split(/\s+/).length;
    const WPM = 100; // average reader speed
    const mins = Math.max(1, Math.ceil(words / WPM));
    return `${mins} min`;
  }

  return (
    <div className="card-HZ">
      {/* HORIZONTAL ARTICLE CARD (E.G. COLLECTIONS OR DISCOVER) */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleArticleClick}
      >
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title || "Article Image"}
          className="img-HZ"
          onError={handleImageError}
        />
      </a>
      <div className="content-HZ">
        <h3 className="title-HZ">{article.title || "Untitled Article"}</h3>
        <p className="description-HZ">
          {article.description || "No description available."}
        </p>
        <div className="actions-container">
          <div className="source-time-container">
            <p className="source-HZ">
              {article.source?.name || "Unknown Source"}
            </p>
            <p className="read-time">{estimateReadTime(article)}</p>
          </div>
          <div className="save-button">
            <SaveButton article={article} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleHZ;
