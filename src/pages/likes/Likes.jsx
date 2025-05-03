import React from "react";
import SideNav from "../../components/sideNav/SideNav";
import PocketSaves from "../../assets/pocket-saves.svg";
import LikesDetails from "../../components/articleButtons/LikesDetails";
import { useUserActions } from "../../context/UserActionsContext";
import "./Likes.css";

function Likes() {
  const { likedArticles } = useUserActions();

  return (
    <div className="likes-container">
      <SideNav />
      <div className="likes-main">
        <div className="likes-header">
          <h2 className="likes-title">Likes</h2>
          <hr className="divider" />
          {!likedArticles.length && (
            <div className="no-likes-container">
              <img
                src={PocketSaves}
                alt="Pocket Likes"
                className="no-likes-image"
              />
              <p className="no-likes">You Have No Liked Articles</p>
            </div>
          )}
        </div>
        {likedArticles.length > 0 && (
          <div className="likes-item-container">
            {likedArticles.map((article) => (
              <LikesDetails key={article.id || article.url} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Likes;