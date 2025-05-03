import React, { useCallback } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useUserActions } from "../../context/UserActionsContext";
import "./SaveButton.css";
import InvertedPocketIcon from "../../assets/pocket-icon_inverted.svg?react";
import PocketIcon from "../../assets/pocket-icon.svg?react";
import dingSound from "../../assets/ding-101492_freesound.mp3";

/**
 * SaveButton component allows users to save or unsave an article.
 * It provides visual feedback and updates the saved state of the article.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.article - The article object to be saved or unsaved.
 * @param {string} [props.article.id] - The unique identifier of the article.
 * @param {string} [props.article.url] - The URL of the article (used as fallback identifier).
 * @param {string} [props.article.title] - The title of the article (used for notifications and recent actions).
 *
 * @returns {JSX.Element} The rendered SaveButton component.
 *
 * @example
 * <SaveButton article={{ id: "123", title: "Sample Article", url: "https://example.com" }} />
 */
function SaveButton({ article }) {
  // Use article.id if available, otherwise article.url (or fallback string)
  const articleId = article?.id || article?.url || "unknown_article";
  const { addNotification } = useNotification();
  const { savedArticles, toggleSave } = useUserActions();

  const playDing = () => {
    const audio = new Audio(dingSound);
    audio.play();
  };

  // Derive the saved state from the context instead of local state
  const isSaved = savedArticles.some((a) => (a.id || a.url) === articleId);

  const addRecentAction = (action) => {
    let actions = [];
    try {
      actions = JSON.parse(localStorage.getItem("recentActions")) || [];
    } catch (error) {
      console.error("Error parsing recent actions:", error);
    }
    // Add new action and update storage (we’ll trim to last 20 actions if desired)
    actions.push(action);
    localStorage.setItem("recentActions", JSON.stringify(actions));
  };

  const handleSave = useCallback(() => {
    playDing();
    toggleSave(article);
    addNotification(
      isSaved ? "Item deleted from saves" : "Item saved for later",
      isSaved ? "save-reset" : "save-success"
    );

    addRecentAction({
      type: "save",
      articleTitle: article.title,
      timestamp: new Date().toISOString(),
    });
  }, [article, isSaved, toggleSave, addNotification]);

  return (
    <div className="save-button-container">
      <button
        className={`save-button ${isSaved ? "saved" : ""}`}
        onClick={handleSave}
        aria-label="Save"
      >
        {isSaved ? (
          <InvertedPocketIcon className="icon" />
        ) : (
          <PocketIcon className="icon" />
        )}
        <span className="text">{isSaved ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
}

export default SaveButton;
