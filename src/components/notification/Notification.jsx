import React, { useEffect, useState } from "react";
import GoodIcon from "../../assets/good.svg?react";
import BadIcon from "../../assets/bad.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import "./Notification.css";
import AddFriendIcon from "../../assets/add-friend.svg?react";
import DeleteFriendIcon from "../../assets/delete-friend.svg?react";

// Define components for each notification type
const LikeSuccess = () => (
  <GoodIcon alt="Like Success" className="notification-icon" />
);
const LikeReset = () => (
  <WarningIcon alt="Like Reset" className="notification-icon" />
);
const DislikeSuccess = () => (
  <BadIcon alt="Dislike Success" className="notification-icon" />
);
const DislikeReset = () => (
  <WarningIcon alt="Dislike Reset" className="notification-icon" />
);
const SaveSuccess = () => (
  <GoodIcon alt="Save Success" className="notification-icon" />
);
const SaveReset = () => (
  <BadIcon alt="Save Reset" className="notification-icon" />
);
const FriendAdded = () => <GoodIcon className="notification-icon" />;
const FriendRemoved = () => <BadIcon className="notification-icon" />;

/**
 * Notification component to display various types of notifications with auto-dismiss functionality.
 *
 * @param {Object} props - The props object.
 * @param {string} props.message - The message to display in the notification.
 * @param {string} props.type - The type of notification, used to determine the corresponding component and styling.
 *                              Supported types include:
 *                              - "like-success"
 *                              - "like-reset"
 *                              - "dislike-success"
 *                              - "dislike-reset"
 *                              - "save-success"
 *                              - "save-reset"
 *                              - "friend-added"
 *                              - "friend-removed"
 * @param {Function} props.onClose - Callback function to execute when the notification is dismissed.
 *
 * @returns {JSX.Element|null} The rendered notification component or null if not visible.
 */
const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    // Remove notification
    const removeTimeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  if (!isVisible) return null;

  // Mapping from type to corresponding component:
  const componentMapping = {
    "like-success": LikeSuccess,
    "like-reset": LikeReset,
    "dislike-success": DislikeSuccess,
    "dislike-reset": DislikeReset,
    "save-success": SaveSuccess,
    "save-reset": SaveReset,
    "friend-added": FriendAdded,
    "friend-removed": FriendRemoved,
  };

  const NotificationComponent =
    componentMapping[type] ||
    (() => <WarningIcon alt="Default" className="notification-icon" />);

  return (
    <div className={`notification ${type} ${isFading ? "fade-out" : ""}`}>
      <span className="notification-message">{message}</span>
      <NotificationComponent />
    </div>
  );
};

export default Notification;
