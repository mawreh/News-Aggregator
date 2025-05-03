import React, { useState } from "react";
import SideNav from "../../components/sideNav/SideNav";
import FriendsList from "../../components/friendsList/FriendsList";
import { useNotification } from "../../context/NotificationContext";
import "./Friends.css";

/**
 * The Friends component manages a list of friends and allows users to add or remove friends.
 * It also displays a section for messages.
 *
 * @component
 * @returns {JSX.Element} The rendered Friends component.
 *
 * @example
 * <Friends />
 *
 * @description
 * - Retrieves the initial list of friends from localStorage.
 * - Allows toggling a friend (add/remove) and updates localStorage accordingly.
 * - Displays a list of friends using the `FriendsList` component.
 * - Includes a messages section with a placeholder for no new messages.
 *
 * @function toggleFriend
 * @param {number} id - The ID of the friend to toggle.
 * @description
 * - Adds a friend if they are not already in the list.
 * - Removes a friend if they are already in the list, with a confirmation prompt.
 * - Updates localStorage and triggers a notification for the action.
 */
function Friends() {
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friendsList_0")) || []
  );
  const { addNotification } = useNotification();

  const toggleFriend = (id) => {
    const isFriend = friends.includes(id);
    if (isFriend) {
      if (!window.confirm("Are you sure you want to delete this friend?"))
        return;
      const updated = friends.filter((x) => x !== id);
      localStorage.setItem("friendsList_0", JSON.stringify(updated));
      setFriends(updated);
      const other = JSON.parse(localStorage.getItem(`friendsList_${id}`)) || [];
      localStorage.setItem(
        `friendsList_${id}`,
        JSON.stringify(other.filter((x) => x !== 0))
      );
      addNotification("Your friend has been deleted.", "friend-removed");
    } else {
      const updated = [...friends, id];
      localStorage.setItem("friendsList_0", JSON.stringify(updated));
      setFriends(updated);
      const other = JSON.parse(localStorage.getItem(`friendsList_${id}`)) || [];
      localStorage.setItem(`friendsList_${id}`, JSON.stringify([...other, 0]));
      addNotification("You have added a new friend!", "friend-added");
    }
  };

  return (
    <div className="friends-container">
      <SideNav />

      <div className="friends-main">
        <div className="friends-header">
          <h2 className="friends-title">Friends</h2>
          <hr className="divider" />
        </div>

        {/* 3‑column grid of friend cards */}
        {friends.length > 0 ? (
          <FriendsList ids={friends} onDelete={toggleFriend} />
        ) : (
          <div className="no-friends-message">
            <span>Start adding friends today!</span>
          </div>
        )}

        {/* messages below */}
        <div className="messages-section">
          <div className="messages-header">
            <h2 className="messages-title">Messages</h2>
          </div>
          <hr className="divider" />
          <div className="messages-content">
            <div className="no-messages">
              <span>You have no new messages!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;