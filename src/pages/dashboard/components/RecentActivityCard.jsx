import React, { useEffect, useState } from "react";
import ThumbsUpIcon from "../../../assets/thumbs-up.svg?react";
import ThumbsDownIcon from "../../../assets/thumbs-down.svg?react";
import CommentIcon from "../../../assets/comment.svg?react";
import ShareIcon from "../../../assets/share.svg?react";
import PocketIcon from "../../../assets/pocket-icon_inverted.svg?react";

/**
 * RecentActivityCard Component
 *
 * This component displays a card showing the user's recent activities,
 * such as liking, disliking, commenting, saving, or sharing articles.
 * It retrieves the recent actions from localStorage, sorts them by timestamp
 * in descending order, and displays the latest 5 actions.
 *
 * @component
 *
 * @returns {JSX.Element} A card displaying the user's recent activities.
 *
 * @example
 * <RecentActivityCard />
 *
 * @description
 * - Activities are fetched from localStorage under the key "recentActions".
 * - Each activity includes a type (e.g., "like", "dislike") and an article title.
 * - Activities are displayed with corresponding icons and truncated titles.
 * - If no activities are found, a message is displayed indicating no recent activity.
 */
const RecentActivityCard = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let storedActions = [];
    try {
      storedActions = JSON.parse(localStorage.getItem("recentActions")) || [];
    } catch (error) {
      console.error("Error parsing recent actions:", error);
    }
    // Sort by timestamp descending and keep the last 5 actions
    const sorted = storedActions.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setActivities(sorted.slice(0, 5));
  }, []);

  const truncateTitle = (title, maxLength = 20) =>
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  const renderActivityItem = (activity) => {
    let icon;
    let actionText = "";
    switch (activity.type) {
      case "like":
        icon = (
          <ThumbsUpIcon style={{ color: "#008078", marginRight: "8px" }} />
        );
        actionText = (
          <>
            You <span className="liked">Liked</span> an Article "
            <span style={{ fontWeight: 700 }}>
              {truncateTitle(activity.articleTitle || "Untitled")}
            </span>
            "
          </>
        );
        break;
      case "dislike":
        icon = (
          <ThumbsDownIcon style={{ color: "#EF4056", marginRight: "8px" }} />
        );
        actionText = (
          <>
            You <span className="disliked">Disliked</span> an Article "
            <span style={{ fontWeight: 700 }}>
              {truncateTitle(activity.articleTitle)}
            </span>
            "
          </>
        );
        break;
      case "comment":
        icon = <CommentIcon style={{ color: "#008078", marginRight: "8px" }} />;
        actionText = (
          <>
            You <span className="commented">Commented</span> on an Article "
            <span style={{ fontWeight: 700 }}>
              {truncateTitle(activity.articleTitle)}
            </span>
            "
          </>
        );
        break;
      case "save":
        icon = <PocketIcon style={{ color: "#008078", marginRight: "8px" }} />;
        actionText = (
          <>
            You <span className="saved">Saved</span> on an Article "
            <span style={{ fontWeight: 700 }}>
              {truncateTitle(activity.articleTitle)}
            </span>
            "
          </>
        );
        break;
      case "share":
        icon = <ShareIcon style={{ color: "#008078", marginRight: "8px" }} />;
        actionText = (
          <>
            You <span className="shared">Shared</span> an Article "
            <span style={{ fontWeight: 700 }}>
              {truncateTitle(activity.articleTitle)}
            </span>
            "
          </>
        );
        break;
      default:
        actionText = "";
    }
    return (
      <li
        key={activity.timestamp}
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <span>{actionText}</span>
      </li>
    );
  };

  return (
    <div className="card recent-activity-card">
      <h3>Recent Activity</h3>
      <p>View your previous actions</p>
      {activities.length === 0 ? (
        <p style={{ color: "#EF3E56", fontWeight: 500 }}>
          No recent activity to show!
        </p>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {activities.map((act) => renderActivityItem(act))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivityCard;
