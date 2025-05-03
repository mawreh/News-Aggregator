import React from "react";
import SideNav from "../../components/sideNav/SideNav";
import PocketSaves from "../../assets/pocket-saves.svg";
import SavesDetails from "../../components/articleButtons/SavesDetails";
import { useUserActions } from "../../context/UserActionsContext";
import "./Saves.css";

function Saves() {
  const { savedArticles } = useUserActions();

  return (
    <div className="saves-container">
      <SideNav />
      <div className="saves-main">
        <div className="saves-header">
          <h2 className="saves-title">Saves</h2>
          <hr className="divider" />
          {!savedArticles.length && (
            <div className="no-saves-container">
              <img
                src={PocketSaves}
                alt="Pocket Saves"
                className="no-saves-image"
              />
              <p className="no-saves">Start Saving to Your Pocket</p>
            </div>
          )}
        </div>
        {savedArticles.length > 0 && (
          <div className="saves-item-container">
            {savedArticles.map((article) => (
              <SavesDetails key={article.id || article.url} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Saves;
