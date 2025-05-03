import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LargeLogo from "../../assets/pocket-logo_text.svg?react";
import SmallLogo from "../../assets/pocket-logo.svg?react";
import Diamond from "../../assets/diamond.svg?react";
import UserPic from "../../assets/team-15.jpg";
import Search from "../../assets/search.svg?react";
import ProfileDropdown from "./ProfileDropdown";
import HomeIcon from "../../assets/home.svg?react";
import SavesIcon from "../../assets/pocket-icon.svg?react";
import DiscoverIcon from "../../assets/discover.svg?react";
import CollectionsIcon from "../../assets/collections.svg?react";
import FriendsIcon from "../../assets/friends.svg?react";
import ArchiveIcon from "../../assets/archive.svg?react";
import FavoritesIcon from "../../assets/favorites.svg?react";
import HighlightsIcon from "../../assets/highlights.svg?react";
import ArticlesIcon from "../../assets/articles.svg?react";
import VideoIcon from "../../assets/video.svg?react";
import AllListIcon from "../../assets/AllList.svg?react";
import AllTagIcon from "../../assets/AllTag.svg?react";
import BackArrow from "../../assets/back-button.svg?react";
import "./Navigation.css";

/**
 * Navigation component renders the main navigation bar of the application.
 * It includes sections for the logo, navigation links, and user actions such as search, upgrade, and profile.
 */
function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1025);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (menuRef.current && !menuRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navigation">
      {/* Left: Hamburger + Logo */}
      <div className="nav-section nav-section-left">
        <div className="hamburger-menu" ref={menuRef}>
          <button
            className="hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger-icon">☰</span>
          </button>
        </div>
        <NavLink to="/" className="nav-logo-wrapper">
          <LargeLogo
            className={`nav-logo-image ${isMobile ? "hide" : "show"}`}
          />
          <SmallLogo
            className={`nav-logo-image ${isMobile ? "show" : "hide"}`}
          />
        </NavLink>
      </div>

      {/* Middle: Desktop Nav Links (Without Icons) */}
      {!isMobile && (
        <div className="nav-section nav-section-middle">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/saves" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Saves
              </NavLink>
            </li>
            <li>
              <NavLink to="/discover" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to="/collections" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Collections
              </NavLink>
            </li>
            <li>
              <NavLink to="/friends" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Friends
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Right: Always visible */}
      <div className="nav-section nav-section-right">
        <button className="search-button">
          <Search alt="Search Icon" className="search-icon" />
        </button>
        <span className="vertical-separator"> | </span>
        <button className="upgrade-button">
          <Diamond alt="Upgrade Icon" className="upgrade-icon" />
          <span>Upgrade</span>
        </button>
        <div className="profile-container" ref={dropdownRef}>
          <NavLink to="/dashboard" end>
            <button
              className="profile-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={UserPic} alt="Profile" className="profile-img" />
            </button>
          </NavLink>
          <ProfileDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
      </div>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="side-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Side Menu (With Icons) */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <button className="back-arrow" onClick={() => setIsMenuOpen(false)}>
            <BackArrow alt="Back" className="back-arrow-icon" />
          </button>
        </div>
        <ul className="side-menu-links">
          <li>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <HomeIcon alt="Home Icon" className="side-menu-icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/saves" onClick={() => setIsMenuOpen(false)}>
              <SavesIcon alt="Saves Icon" className="side-menu-icon" />
              Saves
            </NavLink>
          </li>
          <li>
            <NavLink to="/discover" onClick={() => setIsMenuOpen(false)}>
              <DiscoverIcon alt="Discover Icon" className="side-menu-icon" />
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink to="/collections" onClick={() => setIsMenuOpen(false)}>
              <CollectionsIcon alt="Collections Icon" className="side-menu-icon" />
              Collections
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends" onClick={() => setIsMenuOpen(false)}>
              <FriendsIcon alt="Friends Icon" className="side-menu-icon" />
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-list" onClick={() => setIsMenuOpen(false)}>
              <AllListIcon alt="All List Icon" className="side-menu-icon" />
              All List
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" onClick={() => setIsMenuOpen(false)}>
              <ArchiveIcon alt="Archive Icon" className="side-menu-icon" />
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
              <FavoritesIcon alt="Favorites Icon" className="side-menu-icon" />
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/highlights" onClick={() => setIsMenuOpen(false)}>
              <HighlightsIcon alt="Highlights Icon" className="side-menu-icon" />
              Highlights
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles" onClick={() => setIsMenuOpen(false)}>
              <ArticlesIcon alt="Articles Icon" className="side-menu-icon" />
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/video" onClick={() => setIsMenuOpen(false)}>
              <VideoIcon alt="Video Icon" className="side-menu-icon" />
              Video
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-tags" onClick={() => setIsMenuOpen(false)}>
              <AllTagIcon alt="All Tags Icon" className="side-menu-icon" />
              All Tags
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
