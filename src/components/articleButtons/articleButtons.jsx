import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useUserActions } from "../../context/UserActionsContext";
import { useTagMenuContext } from "../../context/TagMenuContext";
import CommentSection from "./CommentSection";
import ThumbsUpIcon from "../../assets/thumbs-up.svg?react";
import ThumbsDownIcon from "../../assets/thumbs-down.svg?react";
import ShareIcon from "../../assets/share.svg?react";
import CommentIcon from "../../assets/comment.svg?react";
import FBShareIcon from "../../assets/facebook-share.svg?react";
import LIShareIcon from "../../assets/linkedin-share.svg?react";
import EmailShareIcon from "../../assets/email-share.svg?react";
import profilePic from "../../assets/team-15.jpg";
import defaultImage from "../../assets/defaultImage.jpg";
import dingSound from "../../assets/ding-101492_freesound.mp3";
import "./articleButtons.css";
import Modal from "./Modal";

// Helper function to get comments from localStorage
const getStoredComments = (articleId) => {
  const stored = localStorage.getItem(`comments_${articleId}`);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse comments from localStorage:", error);
    return [];
  }
};

// Helper function to store comments in localStorage
const storeComments = (articleId, comments) => {
  try {
    localStorage.setItem(`comments_${articleId}`, JSON.stringify(comments));
  } catch (error) {
    console.error("Failed to store comments in localStorage:", error);
  }
};

// Helper to add a new comment to the global "allComments" array in localStorage
const addGlobalComment = (newComment) => {
  let globalComments = [];
  try {
    globalComments = JSON.parse(localStorage.getItem("allComments")) || [];
  } catch (error) {
    console.error("Error parsing global comments:", error);
  }
  globalComments.push(newComment);
  localStorage.setItem("allComments", JSON.stringify(globalComments));
};

// Helper to remove a comment from the global "allComments" array
const removeGlobalComment = (commentId) => {
  let globalComments = [];
  try {
    globalComments = JSON.parse(localStorage.getItem("allComments")) || [];
  } catch (error) {
    console.error("Error parsing global comments:", error);
  }
  globalComments = globalComments.filter((c) => c.id !== commentId);
  localStorage.setItem("allComments", JSON.stringify(globalComments));
};

const addRecentAction = (action) => {
  let actions = [];
  try {
    actions = JSON.parse(localStorage.getItem("recentActions")) || [];
  } catch (error) {
    console.error("Error parsing recent actions:", error);
  }
  // Add new action and update storage (we’ll trim to last 20 actions if desired)
  actions.push(action);
  if (actions.length > 20) {
    actions = actions.slice(-20); // Keep only the last 20 actions
  }
  localStorage.setItem("recentActions", JSON.stringify(actions));
};

const playDing = () => {
  const audio = new Audio(dingSound);
  audio.play();
};

/**
 * ArticleButtons component provides interactive buttons for liking, disliking, sharing,
 * and commenting on an article. It also includes a modal for viewing and posting comments.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.article - The article object containing details such as URL, title, and source.
 * @param {string} [props.article.url] - The URL of the article, used as a unique identifier.
 * @param {string} [props.article.title] - The title of the article, used as a fallback identifier.
 * @param {Object} [props.article.source] - The source of the article.
 * @param {string} [props.article.source.name] - The name of the article's source.
 * @param {string} [props.article.urlToImage] - The URL of the article's image.
 *
 * @returns {JSX.Element} The rendered ArticleButtons component.
 *
 * @example
 * <ArticleButtons article={{ url: "https://example.com", title: "Example Article", source: { name: "Example Source" }, urlToImage: "https://example.com/image.jpg" }} />
 *
 * @description
 * - Allows users to like or dislike an article, with notifications for feedback.
 * - Enables sharing the article by copying its link to the clipboard.
 * - Provides a modal for viewing and posting comments, with support for replying to specific users.
 * - Comments are persisted in localStorage and include validation for length and non-empty input.
 * - Includes accessibility features such as ARIA attributes for better screen reader support.
 */

function ArticleButtons({ article }) {
  // Use article.id if available, otherwise article.url (or fallback string)
  const articleId = article?.id || article?.url || "unknown_article";
  const { addNotification } = useNotification();
  const { likedArticles, dislikedArticles, toggleLike, toggleDislike } =
    useUserActions();
  const { tag } = useTagMenuContext();

  // Determine active state based on global context values
  const isLiked = likedArticles.some((a) => (a.id || a.url) === articleId);
  const isDisliked = dislikedArticles.some(
    (a) => (a.id || a.url) === articleId
  );

  //Local State for the modal and comments
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [comments, setComments] = useState(() => getStoredComments(articleId)); // Load comments from localStorage
  const [commentInput, setCommentInput] = useState(""); // State for comment input
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Which comment's options dropdown is open
  const textareaRef = useRef(null);
  const modalRef = useRef(null);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    storeComments(articleId, comments);
  }, [comments, articleId]);

  // Load comments when modal opens (might be redundant with initial state, but ensures freshness if needed)
  useEffect(() => {
    if (isModalOpen) {
      setComments(getStoredComments(articleId));
    }
  }, [isModalOpen, articleId]);

  const handleLike = useCallback(() => {
    playDing();

    // Attach the tag to the article, defaulting to "unknown" if no tag is provided
    const taggedArticle =
      tag && tag.trim() !== ""
        ? { ...article, tag: tag }
        : { ...article, tag: "unknown" };

    toggleLike(taggedArticle);

    addNotification(
      isLiked
        ? "It's okay to change your mind"
        : "We'll recommend more stories like this",
      isLiked ? "like-reset" : "like-success"
    );

    addRecentAction({
      type: "like",
      articleTitle: article.title,
      timestamp: new Date().toISOString(),
      tag: taggedArticle.tag,
    });
  }, [article, tag, isLiked, toggleLike, addNotification]);

  const handleDislike = useCallback(() => {
    playDing();
    toggleDislike(article);
    addNotification(
      isDisliked
        ? "It's okay to change your mind"
        : "We won't recommend stories like this",
      isDisliked ? "dislike-reset" : "dislike-success"
    );
    addRecentAction({
      type: "dislike",
      articleTitle: article.title,
      timestamp: new Date().toISOString(),
    });
  }, [article, isDisliked, toggleDislike, addNotification]);

  const handleShare = useCallback(() => {
    setIsShareModalOpen(true);

    // Update shares count
    const currentShares =
      parseInt(localStorage.getItem("sharesCount"), 10) || 0;
    localStorage.setItem("sharesCount", currentShares + 1);

    addRecentAction({
      type: "share",
      articleTitle: article.title,
      timestamp: new Date().toISOString(),
    });
  }, [addNotification]);

  // actual share actions inside the modal:
  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        article.url
      )}`,
      "_blank"
    );
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        article.url
      )}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      article.title
    )}&body=${encodeURIComponent(article.url)}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(article.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleComment = useCallback(() => {
    setComments(getStoredComments(articleId)); // Ensure latest comments are loaded when opening
    setIsModalOpen(true);
  }, [articleId]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setDropdownOpenIndex(null);
  }, []);

  const getRelativeTime = useCallback((date) => {
    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime - date) / 1000);
    if (diffInSeconds === 0) return "Just Now";
    if (diffInSeconds < 60)
      return `${diffInSeconds} Second${diffInSeconds !== 1 ? "s" : ""} Ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} Minute${diffInMinutes !== 1 ? "s" : ""} Ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} Hour${diffInHours !== 1 ? "s" : ""} Ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} Day${diffInDays !== 1 ? "s" : ""} Ago`;
  }, []);

  const postComment = useCallback(() => {
    const trimmedInput = commentInput.trim();
    if (!trimmedInput) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }
    if (trimmedInput.length > 250) {
      setErrorMessage("Comment cannot be more than 250 characters.");
      return;
    }
    setErrorMessage("");
    const newComment = {
      id: Date.now(), // Unique ID
      username: "TEAM15", // Replace with the current user if available
      timestamp: new Date().toISOString(),
      text: trimmedInput,
    };
    setComments((prevComments) => [...prevComments, newComment]);

    // Update the global comments array for OverviewCard
    addGlobalComment(newComment);

    setCommentInput("");

    addRecentAction({
      type: "comment",
      articleTitle: article.title,
      timestamp: new Date().toISOString(),
    });
  }, [commentInput, articleId]);

  const handleCommentInputChange = useCallback((e) => {
    const value = e.target.value;
    setCommentInput(value);
    if (value.trim().length >= 250) {
      setErrorMessage("You have reached the maximum of 250 characters.");
    } else {
      setErrorMessage("");
    }
  }, []);

  const focusTextarea = useCallback((usernameToReply) => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      if (usernameToReply) {
        setCommentInput(`@${usernameToReply} `);
      } else {
        // Clear input if not replying, or handle as desired
        // setCommentInput(""); // Optional: clear input when clicking general reply
      }
    }
    setDropdownOpenIndex(null); // Reset the state of the options button
  }, []); // Removed dependencies as setCommentInput handles state updates

  const deleteComment = useCallback(
    (commentId) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      // Also remove from the global "allComments"
      removeGlobalComment(commentId);
      setDropdownOpenIndex(null);
    },
    [articleId]
  );

  const toggleDropdown = useCallback((index) => {
    setDropdownOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    if (textareaRef.current) {
      textareaRef.current.blur(); // Reset the state of the reply button
    }
  }, []);

  // Handle click outside of modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isModalOpen
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="article-buttons">
      {/* Global article buttons */}
      <button
        className={`action-btn ${isLiked ? "active" : ""}`}
        onClick={handleLike}
        aria-pressed={isLiked}
        aria-label="Like"
      >
        <ThumbsUpIcon
          className={`icon ${isLiked ? "active-like" : ""}`}
          alt="Like Button"
          aria-hidden="true"
        />
        <span className="tooltip">I like this</span>
      </button>
      <button
        className={`action-btn ${isDisliked ? "active" : ""}`}
        onClick={handleDislike}
        aria-pressed={isDisliked}
        aria-label="Dislike"
      >
        <ThumbsDownIcon
          className={`icon ${isDisliked ? "active-dislike" : ""}`}
          alt="Dislike Button"
          aria-hidden="true"
        />
        <span className="tooltip">Not for me</span>
      </button>
      <button className="action-btn" onClick={handleShare} aria-label="Share">
        <ShareIcon className="icon" alt="Share Button" aria-hidden="true" />
        <span className="tooltip">Share this</span>
      </button>
      <button
        className="action-btn"
        onClick={handleComment}
        aria-label="Comment"
      >
        <CommentIcon className="icon" alt="Comment Button" aria-hidden="true" />
        <span className="tooltip">Talk about it</span>
      </button>

      {/* Modal for comments */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <img
            src={(article && article.urlToImage) || defaultImage}
            alt={(article && article.title) || "Article Image"}
            className="article-image"
          />
          <p>
            {(article && article.source && article.source.name) ||
              "Unknown Source"}
          </p>
          <h3 id="modal-title">
            {(article && article.title) || "Untitled Article"}
          </h3>
          <div className="divider"></div>
          <p className="comment-count">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </p>
          <CommentSection
            comments={comments}
            focusTextarea={focusTextarea}
            toggleDropdown={toggleDropdown}
            deleteComment={deleteComment}
            dropdownOpenIndex={dropdownOpenIndex}
            getRelativeTime={getRelativeTime}
          />
          <div className="input-section">
            <img src={profilePic} alt="" aria-hidden="true" />
            <textarea
              placeholder="What is on your mind?"
              value={commentInput}
              onChange={handleCommentInputChange}
              maxLength="251"
              ref={textareaRef}
              aria-label="Comment input"
              aria-invalid={!!errorMessage}
              aria-describedby={errorMessage ? "comment-error" : undefined}
            />
            {errorMessage && (
              <span className="warning" id="comment-error">
                {errorMessage}
              </span>
            )}
            <button
              onClick={postComment}
              disabled={
                !commentInput.trim() || commentInput.trim().length > 250
              }
              aria-label="Post comment"
            >
              Post
            </button>
          </div>
        </Modal>
      )}

      {/* SHARE modal */}
      {isShareModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsShareModalOpen(false)}
          className="share-modal"
        >
          <img
            src={article.urlToImage || defaultImage}
            alt={article.title}
            className="article-image"
          />
          <p>{article.source?.name || "Unknown Source"}</p>
          <h3 id="modal-title">{article.title}</h3>
          <div className="divider"></div>

          <button
            className="share-btn facebook-btn"
            onClick={handleShareFacebook}
          >
            <FBShareIcon className="share-icon" aria-hidden="true" />
            Share on Facebook
          </button>
          <button
            className="share-btn linkedin-btn"
            onClick={handleShareLinkedIn}
          >
            <LIShareIcon className="share-icon" aria-hidden="true" />
            Share on LinkedIn
          </button>

          <button className="share-btn email-btn" onClick={handleShareEmail}>
            <EmailShareIcon className="share-icon" aria-hidden="true" />
            Share with a Friend
          </button>

          <p className="share-or">or send the link below:</p>

          <div className="share-link" onClick={handleCopyLink}>
            <span className="share-url">{article.url}</span>
            {copied && <span className="copied-feedback">Copied!</span>}
          </div>

          <button
            className="cancel-btn"
            onClick={() => setIsShareModalOpen(false)}
          >
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
}

export default ArticleButtons;