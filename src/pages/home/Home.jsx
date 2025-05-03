import React from "react";
import { NewsProvider } from "../../context/NewsContext";
import { useUserActions } from "../../context/UserActionsContext";
import { RecommendedProvider } from "../../context/RecommendedContext";
import TagMenu from "../../components/tagMenu/TagMenu";
import RecommendedReads from "../../components/recommendedReads/RecommendedReads";
import PopularCollections from "../../components/popularCollections/PopularCollections";
import WorthyReads from "../../components/worthyReads/WorthyReads";
import ArticleCarousel from "../../components/articleCarousel/articleCarousel";
import RecentSaves from "../../components/recentSaves/RecentSaves";
import "./Home.css";

/**
 * The Home component serves as the main page for the application, providing
 * various sections such as recent saves, recommended reads, popular tags,
 * today's Pocket hits, popular collections, and pocket-worthy reads.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component.
 *
 * @description
 * - Displays a greeting message to the user.
 * - Shows recent saves if any are available.
 * - Provides a list of recommended reads based on user preferences.
 * - Includes a tag menu for filtering content by popular topics.
 * - Highlights today's Pocket hits with the current date.
 * - Features curated popular collections and pocket-worthy reads.
 *
 * @example
 * <Home />
 */
function Home() {
  const { savedArticles } = useUserActions();
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <RecommendedProvider>
      <NewsProvider>
        <div className="home-container">
          {/* Greeting */}
          <div className="greeting-container">
            <p className="greeting">Hello! Welcome to Pocket</p>
            <hr className="divider" />
          </div>

          {/* Recent Saves */}
          {savedArticles.length > 0 && (
            <>
              <div className="recent-saves-header">
                <h1>Recent Saves</h1>
                <a href="/saves">Go to Saves</a>
              </div>
              <RecentSaves />
              <hr className="divider" />
            </>
          )}

          {/* Recommended Reads */}
          <div className="section-header">
            <h1>Recommended Reads</h1>
            <p>Based on your likes</p>
          </div>
            <RecommendedReads />
          <hr className="divider" />

          {/* Tag Menu */}
          <div className="section-header">
            <h1>Popular Tags</h1>
            <p>Filter by your favorite topic.</p>
          </div>
          <TagMenu />
          <hr className="divider" />

          {/* Today's Pocket Hits */}
          <div className="section-header">
            <h1>Today's Pocket Hits</h1>
            <p>{todayDate}</p>
          </div>
          <div className="pocket-hits-container">
            <ArticleCarousel />
          </div>
          <hr className="divider" />

          {/* Popular Collections */}
          <div className="section-header">
            <h1>Popular Collections</h1>
            <p>Curated guides to the best reads on the web</p>
          </div>
          <div className="popular-collections-container">
            <PopularCollections />
          </div>
          <hr className="divider" />

          {/* Pocket-Worthy Reads */}
          <div className="section-header">
            <h1>Pocket-Worthy Reads</h1>
            <p>Stories to fuel your mind</p>
          </div>
          <div className="worthy-reads-container">
            <WorthyReads />
          </div>
        </div>
      </NewsProvider>
    </RecommendedProvider>
  );
}

export default Home;
