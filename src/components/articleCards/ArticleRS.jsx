import React from "react";
import { Link } from "react-router";
import "./ArticleCards.css";
import defaultImage from "../../assets/defaultImage.jpg";

function ArticleRS({ article }) {
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <Link to={article.url} className="card-RS">
      <img
        src={article.urlToImage || defaultImage}
        alt={article.title}
        className="img-RS"
        onError={handleImageError}
      />
      <div className="content-RS">
        <h3 className="title-RS">{article.title}</h3>
        <span className="source-RS">{article.source?.name || "Unknown Source"}</span>
      </div>
    </Link>
  );
}

export default ArticleRS;
