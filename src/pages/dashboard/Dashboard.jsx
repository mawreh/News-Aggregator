import React from "react";
import OverviewCard from "./components/OverviewCard";
import EngagementCard from "./components/EngagementCard";
import TopTopicsCard from "./components/TopTopicsCard";
import RecentActivityCard from "./components/RecentActivityCard";
import FriendsCard from "./components/FriendsCard";
import TopPublicationsCard from "./components/TopPublicationsCard";
import SideNav from "../../components/sideNav/SideNav";
import "./Dashboard.css";

/**
 * Dashboard component renders the main dashboard layout for the application.
 * It includes a side navigation bar, a header, and two rows of cards displaying
 * various statistics and information such as overview, engagement, top topics,
 * recent activity, friends, and top publications.
 *
 * @component
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  return (
    <div className="dashboard-container">
      <SideNav />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Dashboard</h2>
          <hr className="divider" />
        </div>
        {/* Row ONE: Overview, Engagement, and Top Topics */}
        <div className="dashboard-stats-container">
          <div className="dashboard-row row-one ">
            <OverviewCard />
            <EngagementCard />
            <TopTopicsCard />
          </div>
          {/* Row TWO: Recent Activity, Friends, and Top Publications */}
          <div className="dashboard-row row-two">
            <RecentActivityCard />
            <FriendsCard />
            <TopPublicationsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
