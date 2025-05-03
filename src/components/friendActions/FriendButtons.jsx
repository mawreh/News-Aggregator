/**
 * FriendToggleButton component allows users to add or remove friends
 * by toggling a button. It manages the friend state and updates the
 * local storage and notifications accordingly.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.userId - The ID of the user to be added or removed as a friend.
 *
 * @returns {JSX.Element} A button that toggles the friend state.
 *
 * @example
 * <FriendToggleButton userId={123} />
 *
 * @dependencies
 * - React: For managing component state and lifecycle.
 * - useNotification: Custom hook for displaying notifications.
 * - AddFriends: SVG icon for adding a friend.
 * - DeleteFriends: SVG icon for removing a friend.
 * - "./FriendButtons.css": CSS file for styling the button.
 *
 * @effects
 * - Reads and writes to localStorage to manage the friends list.
 * - Dispatches a custom event "friendsListChanged" to notify other components of changes.
 * - Displays notifications using the `addNotification` function.
 */
import React, { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import AddFriends from "../../assets/add-friend.svg?react";
import DeleteFriends from "../../assets/delete-friend.svg?react";
import "./FriendButtons.css";

export default function FriendToggleButton({ userId }) {
  const { addNotification } = useNotification();
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    setIsFriend(list.includes(userId));
  }, [userId]);

  const handleClick = () => {
    const list = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    if (isFriend) {
      if (!window.confirm("Are you sure you want to delete this friend?"))
        return;
      const updated = list.filter((id) => id !== userId);
      localStorage.setItem("friendsList_0", JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("friendsListChanged", { detail: updated })
      );
      const other =
        JSON.parse(localStorage.getItem(`friendsList_${userId}`)) || [];
      localStorage.setItem(
        `friendsList_${userId}`,
        JSON.stringify(other.filter((x) => x !== 0))
      );
      setIsFriend(false);
      addNotification("Your friend has been deleted.", "friend-removed");
    } else {
      const updated = [...list, userId];
      localStorage.setItem("friendsList_0", JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("friendsListChanged", { detail: updated })
      );
      const other =
        JSON.parse(localStorage.getItem(`friendsList_${userId}`)) || [];
      localStorage.setItem(
        `friendsList_${userId}`,
        JSON.stringify([...other, 0])
      );
      setIsFriend(true);
      addNotification("You have added a new friend!", "friend-added");
    }
  };

  return (
    <button className="action-btn friend-toggle" onClick={handleClick}>
      {isFriend ? (
        <DeleteFriends className="icon" />
      ) : (
        <AddFriends className="icon" />
      )}
    </button>
  );
}