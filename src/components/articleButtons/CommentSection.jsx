import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profilePic from "../../assets/team-15.jpg";
import ReplyBtn from "../../assets/reply.svg?react";
import DotsBtn from "../../assets/3-dots.svg?react";
import DeleteIcon from "../../assets/delete.svg?react";

/**
 * CommentSection component renders a list of comments with options to reply, delete, 
 * and interact with individual comments. It also handles dropdown visibility and 
 * outside click detection for dropdown menus.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.comments - An array of comment objects to display. Each comment 
 *   object should have `id`, `username`, `timestamp`, and `text` properties.
 * @param {Function} props.focusTextarea - A function to focus the textarea for replying 
 *   to a specific comment. Receives the username of the comment as an argument.
 * @param {Function} props.toggleDropdown - A function to toggle the visibility of the 
 *   dropdown menu for a specific comment. Receives the index of the comment as an argument.
 * @param {Function} props.deleteComment - A function to delete a specific comment. 
 *   Receives the comment's `id` as an argument.
 * @param {number|null} props.dropdownOpenIndex - The index of the currently open dropdown 
 *   menu, or `null` if no dropdown is open.
 * @param {Function} props.getRelativeTime - A function to calculate and return the 
 *   relative time (e.g., "2 hours ago") for a given timestamp. Receives a `Date` object 
 *   as an argument.
 *
 * @returns {JSX.Element} The rendered CommentSection component.
 */
function CommentSection({
  comments,
  focusTextarea,
  toggleDropdown,
  deleteComment,
  dropdownOpenIndex,
  getRelativeTime,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(null); // Close the dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown]);

  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <p>Start the conversation...</p>
      ) : (
        comments.map((comment, index) => (
          <div
            key={comment.id}
            className="comment"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="comment-header">
              <Link to="/profile" className="profile-pic-container">
                <img
                  src={profilePic}
                  alt=""
                  className="comment-profile-pic"
                  aria-hidden="true"
                />
              </Link>
              <div className="comment-info-container">
                <div className="comment-info">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">
                    {" "}
                    | {getRelativeTime(new Date(comment.timestamp))}
                  </span>
                </div>
                <div className="comment-actions">
                  <button
                    className="action-btn"
                    onClick={() => focusTextarea(comment.username)}
                    aria-label={`Reply to ${comment.username}`}
                  >
                    <ReplyBtn className="reply-btn" aria-hidden="true" />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => toggleDropdown(index)}
                    aria-label="Comment options"
                    aria-expanded={dropdownOpenIndex === index}
                    aria-controls={`dropdown-menu-${index}`}
                  >
                    <DotsBtn className="options-btn" aria-hidden="true" />
                  </button>
                  {dropdownOpenIndex === index && (
                    <div
                      className="dropdown-menu"
                      id={`dropdown-menu-${index}`}
                      role="menu"
                      aria-orientation="vertical"
                      ref={dropdownRef}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => deleteComment(comment.id)}
                        role="menuitem"
                      >
                        <DeleteIcon
                          className="dropdown-icon"
                          aria-hidden="true"
                        />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text">{comment.text}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentSection;
