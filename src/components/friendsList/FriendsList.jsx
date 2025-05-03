import React from "react";
import Users from "../../data/Users";
import FriendsCard from "../friendCard/FriendCard";

/**
 * FriendsList component renders a list of friends based on the provided user IDs.
 *
 * @param {Object} props - The props object.
 * @param {Array<number>} props.ids - An array of user IDs to filter and display.
 * @param {Function} props.onDelete - A callback function to handle the deletion of a friend.
 *
 * @returns {JSX.Element} A container with a list of FriendsCard components for each user.
 */
export default function FriendsList({ ids, onDelete }) {
  const list = Users.filter((u) => ids.includes(u.id));
  return (
    <div className="friends-content-container">
      {list.map((u) => (
        <FriendsCard key={u.id} user={u} onDelete={onDelete} />
      ))}
    </div>
  );
}
