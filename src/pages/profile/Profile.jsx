import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Users from "../../data/Users";
import SideNav from "../../components/sideNav/SideNav";
import MessageIcon from "../../assets/email.svg?react";
import Facebook from "../../assets/facebook.svg?react";
import Instagram from "../../assets/instagram.svg?react";
import LinkedIn from "../../assets/linkedin.svg?react";
import FriendToggleButton from "../../components/friendActions/FriendButtons";
import "./Profile.css";

/**
 * Profile component displays the user's profile information, including their
 * username, status, avatar, statistics (friends, saves, likes, collections),
 * about section, and social media links. It also handles profile-specific
 * actions and updates based on the user's ID.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Profile component.
 *
 * @description
 * - If the user ID is 0 (current user), it fetches and displays the current
 *   user's statistics (friends, saves, likes) from localStorage.
 * - For other users, it fetches their friends list and displays their
 *   statistics.
 * - Listens for changes in the friends list via a custom event
 *   (`friendsListChanged`) and updates the friends list accordingly.
 * - Increments the profile views count for the current user's profile when
 *   viewed.
 *
 * @dependencies
 * - `useParams` from `react-router-dom` to extract the user ID from the URL.
 * - `useState` and `useEffect` from React for state management and side effects.
 * - `localStorage` for storing and retrieving user-related data.
 * - `SideNav`, `MessageIcon`, `FriendToggleButton`, `Facebook`, `Instagram`,
 *   and `LinkedIn` components for UI rendering.
 *
 * @example
 * // Example usage:
 * import Profile from './Profile';
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <Route path="/profile/:userId" component={Profile} />
 *     </BrowserRouter>
 *   );
 * }
 */
export default function Profile() {
  const { userId } = useParams();
  const id = +userId;
  const user = Users.find((u) => u.id === id);
  const [thisUserFriends, setThisUserFriends] = useState([]);
  const [overview, setOverview] = useState({ friends: 0, saves: 0, likes: 0 });

  useEffect(() => {
    // Increment the profile views count for the profile with id 0
    if (id === 0) {
      const currentProfileViews =
        parseInt(localStorage.getItem("profileViewsCount_0"), 10) || 0; // Profile view will count twice in strict mode or dev mode
      localStorage.setItem("profileViewsCount_0", currentProfileViews + 1);
    }

    const tList = JSON.parse(localStorage.getItem("friendsList_0")) || [];
    if (id !== 0) {
      const uList = JSON.parse(localStorage.getItem(`friendsList_${id}`)) || [];
      setThisUserFriends(uList);
    }

    if (id === 0) {
      const likes = (JSON.parse(localStorage.getItem("likedArticles")) || [])
        .length;
      const saves = (JSON.parse(localStorage.getItem("savedArticles")) || [])
        .length;
      setOverview({ friends: tList.length, saves, likes });
    }
  }, [id]);

  useEffect(() => {
    const handler = (e) => {
      const newTeam = e.detail;
      setTeamFriends(newTeam);
      if (id !== 0) {
        setThisUserFriends(newYou);
      }
    };
    window.addEventListener("friendsListChanged", handler);
    return () => window.removeEventListener("friendsListChanged", handler);
  }, [id]);

  if (!user) return <p>User not found.</p>;

  return (
    <div className="user-profile-container">
      <SideNav />

      <div className="user-profile-main">
        {/* ==== Header ==== */}
        <div className="user-profile-header">
          <div className="profile-username">
            <h2 className="profile-title">{user.username}</h2>
            <span className={`status-dot ${user.status}`}></span>
            <span className={`status-text ${user.status}`}></span>
          </div>

          {/* only profiles that are not id=0 get actions */}
          {id !== 0 && (
            <div className="header-actions">
              <button className="action-btn">
                <MessageIcon alt="Message" />
              </button>
              <FriendToggleButton userId={id} />
            </div>
          )}

          <hr className="divider" />
        </div>

        {/* ==== Stats Card ==== */}
        <div className="profile-stats-card">
          <div className="avatar-container">
            <img
              className="profile-avatar"
              src={user.img}
              alt={user.fullname}
            />
            <div className="user-fullname">{user.fullname}</div>
          </div>

          <div className="stats-container">
            <div className="stat-block">
              <div className="stat-label">Friends</div>
              <div className="stat-number">
                {id === 0 ? overview.friends : thisUserFriends.length}
              </div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Saves</div>
              <div className="stat-number">
                {id === 0 ? overview.saves : user.saves}
              </div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Likes</div>
              <div className="stat-number">
                {id === 0 ? overview.likes : user.likes}
              </div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Collections</div>
              <div className="stat-number">{user.collections}</div>
            </div>
          </div>
        </div>

        {/* ==== About + Socials ==== */}
        <p className="profile-about">{user.about}</p>
        <div className="profile-socials">
          <a href="#">
            <Facebook />
          </a>
          <a href="#">
            <Instagram />
          </a>
          <a href="#">
            <LinkedIn />
          </a>
        </div>

        {/* ==== Collections Section ==== */}
        <div className="collections-section">
          <h2 className="collections-title">Collections</h2>
          <hr className="divider" />
          {user.collections > 0 ? (
            <div className="collections-placeholder" />
          ) : (
            <p className="no-collections">
              This user has no collections to display!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
