import React from "react";
import { useNotification } from "../../context/NotificationContext";
import Notification from "./Notification";
import "./Notification.css";

/**
 * NotificationsContainer component renders a list of notifications.
 * It uses the `useNotification` hook to manage the notifications state.
 * Each notification is displayed using the `Notification` component.
 * Notifications can be removed by calling the `onClose` handler, which
 * triggers the `removeNotification` function to update the state.
 *
 * @component
 *
 * @returns {JSX.Element} A container displaying a list of notifications.
 */
const NotificationsContainer = () => {
  const { notifications, setNotifications } = useNotification();

  // Handler to remove a notification once it finishes its timeout.
  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="notifications-container">
      {notifications.map((n, index) => (
        <Notification
          key={index}
          message={n.message}
          type={n.type}
          onClose={() => removeNotification(index)}
        />
      ))}
    </div>
  );
};

export default NotificationsContainer;
