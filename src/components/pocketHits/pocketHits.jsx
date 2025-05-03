import { useNewsContext } from "../../context/NewsContext";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ArticleSM from "../articleCards/ArticleSM";
import "./pocketHits.css";

/**
 * PocketHits Component
 *
 * This component displays a list of recommended articles fetched from the news context.
 * It handles loading, error, and empty states gracefully.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered PocketHits component.
 *
 * @example
 * // Usage in a parent component
 * import PocketHits from './pocketHits';
 *
 * function App() {
 *   return <PocketHits />;
 * }
 *
 * @remarks
 * - Displays a loader while data is being fetched.
 * - Shows an error message if an error occurs during data fetching.
 * - Renders a message if no articles are available.
 * - Maps over the `pocketHits` array to render individual articles using the `ArticleSM` component.
 *
 * @requires useNewsContext - Custom hook to fetch news data.
 * @requires Loader - Component to display a loading spinner.
 * @requires ErrorMessage - Component to display error messages.
 * @requires ArticleSM - Component to render individual articles.
 */
function PocketHits() {
  const { pocketHits, loading, error } = useNewsContext();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="PH-feed">
      {!pocketHits || pocketHits.length === 0 ? (
        <p className="no-news-message">
          No recommended articles found. Please try again later!
        </p>
      ) : (
        <div className="PH-grid">
          {pocketHits.map((article) => (
            <ArticleSM key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PocketHits;
