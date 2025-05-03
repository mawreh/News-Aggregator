import React, { useState, useEffect } from "react";
import Users from "../../../data/Users";
import { Link } from "react-router-dom";
import MessageIcon from "../../../assets/email.svg?react";
import AddFriendIcon from "../../../assets/add-friend.svg?react";
import { useNotification } from "../../../context/NotificationContext";

/**
 * SuggestedFriends Component
 * 
 * This component displays a list of suggested friends based on the user's preferences
 * and allows the user to add or remove friends from their list. It uses localStorage
 * to manage the friends list and updates the UI dynamically.
 * 
 * @component
 * 
 * @returns {JSX.Element} A card displaying a list of suggested friends with actions to add or remove them.
 * 
 * @function refresh
 * Updates the list of suggested friends by filtering out users already in the current user's
 * friends list and shuffling the remaining users. It selects up to 5 random users to display.
 * 
 * @function handleToggle
 * Toggles the friendship status of a user. If the user is not a friend, they are added to the
 * friends list; otherwise, they are removed. This also updates the mirrored friends list on
 * the other user's side and displays a notification.
 * 
 * @hook useEffect
 * Calls the `refresh` function once when the component is mounted to initialize the suggestions list.
 * 
 * @state {Array} suggestions
 * An array of suggested friends to display, initialized as an empty array.
 * 
 * @dependencies
 * - `useNotification`: A custom hook to display notifications.
 * - `localStorage`: Used to persist and retrieve the friends list.
 * - `Users`: A global array of user objects, each containing `id`, `img`, and `username`.
 * 
 * @example
 * // Example usage of SuggestedFriends component
 * <SuggestedFriends />
 */
export default function SuggestedFriends() {
  const { addNotification } = useNotification();
  const [suggestions, setSuggestions] = useState([]);

  // only users NOT in TEAM15’s list
  const refresh = () => {
    const teamList = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    const pool = Users.filter(
      (u) => u.id !== 0 && !teamList.includes(u.id) // Users not in TEAM15's list are included
    );
    pool.sort(() => Math.random() - 0.5);
    setSuggestions(pool.slice(0, 5));
  };
  useEffect(refresh, []);

  const handleToggle = (id) => {
    // read & update LS
    const teamList = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    const isFriend = teamList.includes(id);
    const updated = isFriend
      ? teamList.filter((x) => x !== id)
      : [...teamList, id];
    localStorage.setItem("friendsList_0", JSON.stringify(updated));
    // mirror on their side
    const other = JSON.parse(localStorage.getItem(`friendsList_${id}`)) || [];
    const mirrored = isFriend ? other.filter((x) => x !== 0) : [...other, 0];
    localStorage.setItem(`friendsList_${id}`, JSON.stringify(mirrored));
    addNotification(
      isFriend
        ? "Your friend has been deleted."
        : "You have added a new friend!",
      isFriend ? "friend-removed" : "friend-added"
    );
    // Remove card from suggestions
    setSuggestions((s) => s.filter((u) => u.id !== id));
  };

  return (
    <div className="card friends-card">
      <h3>Suggested Friends</h3>
      <p>Based on your favorite topics</p>
      <ul>
        {suggestions.map((friend) => (
          <li key={friend.id} className="friend-item">
            <Link to={`/profile/${friend.id}`}>
              <img
                src={friend.img}
                alt={friend.username}
                className="friend-avatar"
              />
            </Link>
            <span className="friend-name">{friend.username}</span>
            <div className="friend-actions">
              <MessageIcon />
              <AddFriendIcon onClick={() => handleToggle(friend.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
