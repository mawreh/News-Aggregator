import React from "react";
import defaultImage from "../../assets/defaultImage.jpg";
import SaveButton from "../saveButton/SaveButton";
import ArticleButtons from "../articleButtons/articleButtons";
import "./ArticleCards.css";

/**
 * Component for rendering a medium-sized article card.
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
 * @returns {JSX.Element} A medium-sized article card with an image, title, description, and action buttons.
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
 * <ArticleMD article={article} />
 */
function ArticleMD({ article }) {
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const handleArticleClick = () => {
    // Retrieve existing reads from localStorage
    const reads = JSON.parse(localStorage.getItem("articleReads")) || [];
    // Record the current time (or increment a counter)
    reads.push(new Date().toISOString());
    localStorage.setItem("articleReads", JSON.stringify(reads));

    window.open(article.url, "_blank");
  };

  return (
    <div className="card-MD">
      {/* REGULAR ARTICLE CARD */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleArticleClick}
      >
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title || "Article Image"}
          className="img-MD"
          onError={handleImageError}
        />
      </a>
      <div className="content-MD">
        <p className="source-MD">{article.source?.name || "Unknown Source"}</p>
        <h3 className="title-MD">{article.title || "Untitled Article"}</h3>
        <p className="description-MD">
          {article.description || "No description available."}
        </p>
      </div>
      <div className="actions-container">
        <div className="article-buttons">
          <ArticleButtons article={article} />{" "}
          {/* Ensure article is passed here */}
        </div>
        <div className="save-button">
          <SaveButton article={article} />
        </div>
      </div>
    </div>
  );
}

export default ArticleMD;
