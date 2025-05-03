import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSelector from '../themeSelector/ThemeSelector';
import './ProfileDropdown.css';

const ProfileDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="dropdown-section">
        <NavLink to="/profile" className="dropdown-item" onClick={onClose}>
          Profile
        </NavLink>
        <NavLink to="/dashboard" className="dropdown-item" onClick={onClose}>
          Dashboard
        </NavLink>
      </div>
      
      <div className="dropdown-section">
        <div className="dropdown-label">Theme</div>
        <ThemeSelector />
      </div>
      
      <div className="dropdown-section">
        <button className="dropdown-item logout-button" onClick={onClose}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;