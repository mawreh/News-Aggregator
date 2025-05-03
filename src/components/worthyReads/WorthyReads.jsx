import { useNewsContext } from "../../context/NewsContext";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ArticleMD from "../articleCards/ArticleMD";
import "./WorthyReads.css";

function WorthyReads() {
  const { worthyArticles, loading, error } = useNewsContext();

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="WR-feed">
  {!worthyArticles || worthyArticles.length === 0 ? (
    <p className="no-news-message">
      No recommended articles found. Please try again later!
    </p>
  ) : (
    <div className="WR-grid">
      {worthyArticles.map((article, index) => (
        <div className="article-card" key={index}>  {/* Wrap each ArticleMD with a div of class "article-card" */}
          <ArticleMD article={article} />
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default WorthyReads;