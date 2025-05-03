import React, { createContext, useContext, useState } from "react";

// LocalStorage helper functions for articles
function getStoredArticles(key) {
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(`Failed to parse stored articles for key "${key}":`, error);
    return [];
  }
}

function storeArticles(key, articles) {
  try {
    localStorage.setItem(key, JSON.stringify(articles));
  } catch (error) {
    console.error(`Failed to store articles for key "${key}":`, error);
  }
}

// Create the context
const UserActionsContext = createContext();

// Helper: get a unique identifier – use article.id if available, else article.url
const getArticleId = (article) => article.id || article.url;

// Add a helper function to check if an article is saved
const isArticleSaved = (savedArticles, articleId) =>
  savedArticles.some((a) => getArticleId(a) === articleId);

/**
 * Provides context and state management for user actions on articles, 
 * including liking, disliking, and saving articles. The state is 
 * synchronized with localStorage to persist user preferences.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @context
 * @property {Array<Object>} likedArticles - List of articles liked by the user, each with an action timestamp.
 * @property {Array<Object>} dislikedArticles - List of articles disliked by the user, each with an action timestamp.
 * @property {Array<Object>} savedArticles - List of articles saved by the user, each with an action timestamp.
 * @property {Function} toggleLike - Toggles the like state of an article. Ensures mutual exclusivity with dislikes.
 * @property {Function} toggleDislike - Toggles the dislike state of an article. Ensures mutual exclusivity with likes.
 * @property {Function} toggleSave - Toggles the save state of an article. Independent of likes/dislikes.
 * @property {Function} isArticleSaved - Checks if an article is saved based on its ID.
 */
export const UserActionsProvider = ({ children }) => {
  // Initialize state from localStorage
  const [likedArticles, setLikedArticles] = useState(() =>
    getStoredArticles("likedArticles")
  );
  const [dislikedArticles, setDislikedArticles] = useState(() =>
    getStoredArticles("dislikedArticles")
  );
  const [savedArticles, setSavedArticles] = useState(() =>
    getStoredArticles("savedArticles")
  );

  // Toggle the like state with timestamp
  const toggleLike = (article) => {
    const articleId = getArticleId(article);
    setLikedArticles((prev) => {
      let updated;
      if (prev.some((a) => getArticleId(a) === articleId)) {
        // If already liked, remove it
        updated = prev.filter((a) => getArticleId(a) !== articleId);
      } else {
        // Otherwise, add to liked along with a timestamp of the action.
        updated = [
          ...prev,
          { ...article, actionTimestamp: new Date().toISOString() },
        ];
      }
      storeArticles("likedArticles", updated);
      return updated;
    });

    // Remove article from dislikedArticles to ensure mutual exclusivity
    setDislikedArticles((prev) => {
      const updated = prev.filter((a) => getArticleId(a) !== articleId);
      storeArticles("dislikedArticles", updated);
      return updated;
    });
  };

  // Toggle the dislike state with timestamp
  const toggleDislike = (article) => {
    const articleId = getArticleId(article);
    setDislikedArticles((prev) => {
      let updated;
      if (prev.some((a) => getArticleId(a) === articleId)) {
        // If already disliked, remove it
        updated = prev.filter((a) => getArticleId(a) !== articleId);
      } else {
        // Otherwise, add to liked along with a timestamp of the action.
        updated = [
          ...prev,
          { ...article, actionTimestamp: new Date().toISOString() },
        ];
      }
      storeArticles("dislikedArticles", updated);
      return updated;
    });

    // Remove article from likedArticles to ensure mutual exclusivity
    setLikedArticles((prev) => {
      const updated = prev.filter((a) => getArticleId(a) !== articleId);
      storeArticles("likedArticles", updated);
      return updated;
    });
  };

  // Toggle the save state (independent from likes/dislikes)
  const toggleSave = (article) => {
    const articleId = getArticleId(article);
    setSavedArticles((prev) => {
      let updated;
      if (prev.some((a) => getArticleId(a) === articleId)) {
        // If already saved, remove it
        updated = prev.filter((a) => getArticleId(a) !== articleId);
      } else {
        // Otherwise, add to saved with timestamp
        updated = [
          ...prev,
          { ...article, actionTimestamp: new Date().toISOString() },
        ];
      }
      storeArticles("savedArticles", updated);
      return updated;
    });
  };

  return (
    <UserActionsContext.Provider
      value={{
        likedArticles,
        dislikedArticles,
        savedArticles,
        toggleLike,
        toggleDislike,
        toggleSave,
        isArticleSaved: (articleId) => isArticleSaved(savedArticles, articleId), // Add this
      }}
    >
      {children}
    </UserActionsContext.Provider>
  );
};

export const useUserActions = () => useContext(UserActionsContext);
