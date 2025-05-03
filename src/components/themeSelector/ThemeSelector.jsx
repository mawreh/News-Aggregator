import React, { useState } from 'react';
import './ThemeSelector.css'; // Import your CSS file for styling

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    // Here you can add logic to actually change the theme
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="theme-selector">
      <label className={`theme-option ${selectedTheme === 'light' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={selectedTheme === 'light'}
          onChange={() => handleThemeChange('light')}
        />
        Light
      </label>

      <label className={`theme-option ${selectedTheme === 'dark' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={selectedTheme === 'dark'}
          onChange={() => handleThemeChange('dark')}
        />
        Dark
      </label>

      <label className={`theme-option ${selectedTheme === 'sepia' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="theme"
          value="sepia"
          checked={selectedTheme === 'sepia'}
          onChange={() => handleThemeChange('sepia')}
        />
        Sepia
      </label>

      <label className={`theme-option ${selectedTheme === 'system' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="theme"
          value="system"
          checked={selectedTheme === 'system'}
          onChange={() => handleThemeChange('system')}
        />
        System
      </label>
    </div>
  );
};

export default ThemeSelector;