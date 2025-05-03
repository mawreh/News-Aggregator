import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

/**
 * Provides a context for managing notifications within the application.
 *
 * @component
 * @param {Object} props - The properties passed to the provider.
 * @param {React.ReactNode} props.children - The child components that will have access to the notification context.
 *
 * @returns {JSX.Element} The NotificationContext provider component.
 *
 * @context
 * @property {Array} notifications - The list of current notifications.
 * @property {Function} setNotifications - Function to update the notifications state.
 * @property {Function} addNotification - Function to add a new notification.
 * @property {string} addNotification.message - The message of the notification.
 * @property {string} addNotification.type - The type of the notification (e.g., "info", "error").
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (message, type) => {
    setNotifications((prev) => [...prev, { message, type }]);
    console.log(`${type.toUpperCase()}: ${message}`);
  };
  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
