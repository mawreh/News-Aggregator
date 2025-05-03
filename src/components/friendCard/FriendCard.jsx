import React, { useState, useEffect } from "react";
import "./FriendCard.css";
import MessageIcon from "../../assets/email.svg?react";
import AddFriendIcon from "../../assets/add-friend.svg?react";
import DeleteIcon from "../../assets/delete-friend.svg?react";

/**
 * FriendCard component displays a user's profile information and allows toggling
 * between adding or removing the user as a friend.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.user - The user object containing user details.
 * @param {string} props.user.id - The unique identifier for the user.
 * @param {string} props.user.img - The URL of the user's profile image.
 * @param {string} props.user.username - The username of the user.
 * @param {string} props.user.status - The online status of the user (e.g., "online", "offline").
 * @param {Function} props.onDelete - Callback function to handle the removal of a friend.
 *
 * @returns {JSX.Element} The rendered FriendCard component.
 */
export default function FriendCard({ user, onDelete }) {
  const [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    setIsFriend(list.includes(user.id));
  }, [user.id]);

  const handleToggle = () => {
    onDelete(user.id);
    setIsFriend((f) => !f);
  };

  return (
    <div className="friend-card">
      <a href={`/profile/${user.id}`}>
        <img src={user.img} alt={user.username} className="friend-img" />
      </a>
      <div className="friend-card-footer">
        <div className="friend-info">
          <span className="friend-username">{user.username}</span>
          <span className="online-status-container">
            <span className={`status-dot ${user.status}`}></span>
            <span className={`status-text ${user.status}`}></span>
          </span>
        </div>
        <div className="friend-actions">
          <MessageIcon alt="Message" />
          {isFriend ? (
            <DeleteIcon
              alt="Remove friend"
              onClick={handleToggle}
              className="friend-icon"
            />
          ) : (
            <AddFriendIcon
              alt="Add friend"
              onClick={handleToggle}
              className="friend-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
}
