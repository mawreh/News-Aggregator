import { NavLink } from "react-router-dom";
import "./SideNav.css";
import Dashboard from "../../assets/dashboard.svg?react";
import User from "../../assets/user.svg?react";
import Friends from "../../assets/friends.svg?react";
import Likes from "../../assets/thumbs-up.svg?react";
import Dislikes from "../../assets/thumbs-down.svg?react";
import Saves from "../../assets/pocket-icon_inverted.svg?react";

/**
 * SideNav Component
 *
 * This component renders a vertical side navigation bar with links to various sections of the application.
 * Each link uses the `NavLink` component from `react-router-dom` to enable navigation and apply active styles
 * based on the current route.
 *
 * Links included:
 * - Dashboard
 * - Profile
 * - Friends
 * - Likes
 * - Dislikes
 * - Saves
 *
 * Each link includes an icon and a label. The `isActive` property is used to dynamically apply the "active" class
 * to the currently active link.
 *
 * @component
 * @example
 * return (
 *   <SideNav />
 * )
 */
const SideNav = () => {
  return (
    <>
      <div className="side-nav">
        <ul className="sidenav-links">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `sidenav-link dashboard ${isActive ? "active" : ""}`
              }
              end
            >
              <Dashboard alt="Dashboard" className="icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `sidenav-link ${isActive ? "active" : ""}`
              }
              end
            >
              <User alt="Profile" className="icon" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/friends"
              className={({ isActive }) =>
                `sidenav-link ${isActive ? "active" : ""}`
              }
              end
            >
              <Friends alt="Friends" className="icon" />
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/likes"
              className={({ isActive }) =>
                `sidenav-link ${isActive ? "active" : ""}`
              }
              end
            >
              <Likes alt="Likes" className="icon" />
              Likes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dislikes"
              className={({ isActive }) =>
                `sidenav-link dislikes ${isActive ? "active" : ""}`
              }
              end
            >
              <Dislikes alt="Dislikes" className="icon" />
              Dislikes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saves"
              className={({ isActive }) =>
                `sidenav-link ${isActive ? "active" : ""}`
              }
              end
            >
              <Saves alt="Saves" className="icon" />
              Saves
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
