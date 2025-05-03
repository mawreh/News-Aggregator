import { useNewsContext } from "../../context/NewsContext";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ArticleRR from "../articleCards/ArticleRR";
import "./RecommendedReads.css";

function RecommendedReads() {
  const { recommendedArticles, loading, error } = useNewsContext();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="RR-feed">
      {!recommendedArticles || recommendedArticles.length === 0 ? (
        <p className="no-news-message">
          No recommended articles found. Please try again later!
        </p>
      ) : (
        <div className="RR-grid">
          {recommendedArticles.map((article) => (
            <ArticleRR 
              key={`${article.title}-${article.source?.name || 'unknown'}`} 
              article={article} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedReads;