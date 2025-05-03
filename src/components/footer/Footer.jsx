import React from "react";
import "./Footer.css";
import AppleIcon from "../../assets/app_apple.svg?react";
import GooglePlayIcon from "../../assets/app_google-play.png";
import FBIcon from "../../assets/facebook.svg?react";
import TwitterIcon from "../../assets/twitter.svg?react";
import IGIcon from "../../assets/instagram.svg?react";

/**
 * Footer component that renders the footer section of the application.
 * It includes multiple columns with links to products, company information, resources,
 * and app download options. Additionally, it displays social media icons and legal information.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Products</h3>
          <ul>
            <li>
              <a href="#">Must-read articles</a>
            </li>
            <li>
              <a href="#">Daily newsletter</a>
            </li>
            <li>
              <a href="#">Pocket Premium</a>
            </li>
            <li>
              <a href="#">Save to Pocket extensions</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact info</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#">Get help</a>
            </li>
            <li>
              <a href="#">Advertise</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Get the App</h3>
          <div className="footer-buttons">
            <a href="#">
              <AppleIcon className="apple-button" />
            </a>
            <a href="#">
              <img
                src={GooglePlayIcon}
                alt="Google Play"
                className="google-button"
              />
            </a>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <div className="footer-info">
          Pocket is part of the Mozilla family of products.
          <br />© {new Date().getFullYear()} Read It Later, Inc.
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
          <a href="#">Cookie preferences</a>
        </div>
        <div className="footer-social-icons">
          <a href="#" aria-label="Follow on Facebook">
            <FBIcon />
          </a>
          <a href="#" aria-label="Follow on Twitter">
            <TwitterIcon />
          </a>
          <a href="#" aria-label="Follow on Instagram">
            <IGIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
