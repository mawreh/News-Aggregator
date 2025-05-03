import React, { useEffect, useState } from "react";

/**
 * OverviewCard Component
 *
 * This component displays an overview of user activity metrics based on data
 * retrieved from localStorage. The metrics include profile views, likes, dislikes,
 * saves, comments, shares, and collections. The data is updated on component mount
 * using the `useEffect` hook.
 *
 * @component
 * @returns {JSX.Element} A card displaying the overview metrics.
 *
 * @example
 * // Usage in a parent component
 * import OverviewCard from './OverviewCard';
 *
 * function Dashboard() {
 *   return (
 *     <div>
 *       <OverviewCard />
 *     </div>
 *   );
 * }
 */
const OverviewCard = () => {
  const [overviewData, setOverviewData] = useState({
    profileViews: 0,
    likes: 0,
    dislikes: 0,
    saves: 0,
    comments: 0,
    shares: 0,
    collections: 0,
  });

  useEffect(() => {
    let likedArticles = [];
    let dislikedArticles = [];
    let savedArticles = [];
    let globalComments = [];
    try {
      likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || [];
      dislikedArticles =
        JSON.parse(localStorage.getItem("dislikedArticles")) || [];
      savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
      globalComments = JSON.parse(localStorage.getItem("allComments")) || [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
    const shares = parseInt(localStorage.getItem("sharesCount"), 10) || 0;
    const collections =
      parseInt(localStorage.getItem("collectionsCount"), 10) || 0;

    // Ensure profileViews count for profile id 0
    const profileViews =
      parseInt(localStorage.getItem("profileViewsCount_0"), 10) || 0;

    setOverviewData({
      profileViews,
      likes: likedArticles.length,
      dislikes: dislikedArticles.length,
      saves: savedArticles.length,
      comments: globalComments.length,
      shares,
      collections,
    });
  }, []);

  return (
    <div className="card overview-card">
      <h3>Overview</h3>
      <p>Based on the last 30 days</p>
      <ul>
        <li>
          <span>Profile Views</span>
          <span className="value">{overviewData.profileViews}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Likes</span>
          <span className="value">{overviewData.likes}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Dislikes</span>
          <span className="value">{overviewData.dislikes}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Saves</span>
          <span className="value">{overviewData.saves}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Comments</span>
          <span className="value">{overviewData.comments}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Shares</span>
          <span className="value">{overviewData.shares}</span>
        </li>
        <hr className="divider" />
        <li>
          <span>Collections</span>
          <span className="value">{overviewData.collections}</span>
        </li>
      </ul>
    </div>
  );
};

export default OverviewCard;
