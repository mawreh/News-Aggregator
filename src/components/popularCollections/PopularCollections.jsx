import { useNewsContext } from "../../context/NewsContext";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ArticleMD from "../articleCards/ArticleMD";
import "./PopularCollections.css";

function PopularCollections() {
  const { popularArticles, loading, error } = useNewsContext();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
<div className="PC-feed">
  {!popularArticles || popularArticles.length === 0 ? (
    <p className="no-news-message">
      No popular articles found. Please try again later!
    </p>
  ) : (
    <div className="PC-grid">
      {popularArticles.map((article, index) => (
        <div className="article-card" key={index}>  {/* Wrap each ArticleMD with a div of class "article-card" */}
          <ArticleMD article={article} />
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default PopularCollections;