import React from "react";
import SideNav from "../../components/sideNav/SideNav";
import PocketSaves from "../../assets/pocket-saves.svg";
import DislikesDetails from "../../components/articleButtons/DislikesDetails";
import { useUserActions } from "../../context/UserActionsContext";
import "./Dislikes.css";

function Dislikes() {
  const { dislikedArticles } = useUserActions();

  return (
    <div className="dislikes-container">
      <SideNav />
      <div className="dislikes-main">
        <div className="dislikes-header">
          <h2 className="dislikes-title">Dislikes</h2>
          <hr className="divider" />
          {!dislikedArticles.length && (
            <div className="no-dislikes-container">
              <img
                src={PocketSaves}
                alt="Pocket Likes"
                className="no-dislikes-image"
              />
              <p className="no-dislikes">You Have No Disliked Articles</p>
            </div>
          )}
        </div>
        {dislikedArticles.length > 0 && (
          <div className="dislikes-item-container">
            {dislikedArticles.map((article) => (
              <DislikesDetails key={article.id || article.url} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dislikes;