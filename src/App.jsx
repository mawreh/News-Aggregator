import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { TagMenuProvider } from "./context/TagMenuContext";
import { UserActionsProvider } from "./context/UserActionsContext";
import { NewsProvider } from "./context/NewsContext";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/home/Home";
import Saves from "./pages/saves/Saves";
import Discover from "./pages/discover/Discover";
import Collections from "./pages/collections/Collections";
import Friends from "./pages/friends/Friends";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Likes from "./pages/likes/Likes";
import Dislikes from "./pages/dislikes/Dislikes";
import Business from "./pages/tagmenu/Business";
import Career from "./pages/tagmenu/Career";
import Education from "./pages/tagmenu/Education";
import Entertainment from "./pages/tagmenu/Entertainment";
import Finance from "./pages/tagmenu/Finance";
import Food from "./pages/tagmenu/Food";
import Gaming from "./pages/tagmenu/Gaming";
import Health from "./pages/tagmenu/Health";
import Parenting from "./pages/tagmenu/Parenting";
import Politics from "./pages/tagmenu/Politics";
import Science from "./pages/tagmenu/Science";
import SelfImprovement from "./pages/tagmenu/SelfImprovement";
import Sports from "./pages/tagmenu/Sports";
import Technology from "./pages/tagmenu/Technology";
import Travel from "./pages/tagmenu/Travel";
import "./App.css";
import NotificationContainer from "./components/notification/NotificationContainer";

/**
 * The main application component that sets up the overall structure and routing for the news aggregator app.
 * It includes multiple context providers, a router for navigation, and various routes for different pages.
 *
 * @component
 * @returns {JSX.Element} The rendered application component.
 *
 * @description
 * - Wraps the application in multiple context providers:
 *   - `NewsProvider`: Provides news-related data and state.
 *   - `UserActionsProvider`: Manages user actions and interactions.
 *   - `TagMenuProvider`: Handles tag-related functionality.
 *   - `NotificationProvider`: Manages notifications.
 * - Uses `BrowserRouter` for client-side routing.
 * - Includes a `ScrollToTop` component to reset scroll position on route changes.
 * - Defines routes for various pages, including:
 *   - Home, Saves, Discover, Collections, Friends, Dashboard, and Profile pages.
 *   - Dynamic routes for user profiles and specific tags (e.g., business, career, etc.).
 *   - A fallback route for undefined paths.
 * - Renders additional components like `Navigation`, `NotificationContainer`, and `Footer`.
 */
function App() {
  function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  }

  return (
    <div className="app">
      <NewsProvider>
        <UserActionsProvider>
          <TagMenuProvider>
            <NotificationProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Navigation />
                <main className="main-content-container">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/saves" element={<Saves />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Redirect root → first profile */}
                    <Route
                      path="/profile"
                      element={<Navigate to="/profile/0" replace />}
                    />
                    {/* Dynamic route for any of your 4 users */}
                    <Route path="/profile/:userId" element={<Profile />} />

                    <Route path="/likes" element={<Likes />} />
                    <Route path="/dislikes" element={<Dislikes />} />
                    <Route
                      path="/business"
                      element={<Business tag="business" />}
                    />
                    <Route path="/career" element={<Career tag="career" />} />
                    <Route
                      path="/education"
                      element={<Education tag="education" />}
                    />
                    <Route
                      path="/entertainment"
                      element={<Entertainment tag="entertainment" />}
                    />
                    <Route
                      path="/finance"
                      element={<Finance tag="finance" />}
                    />
                    <Route path="/food" element={<Food tag="food" />} />
                    <Route path="/gaming" element={<Gaming tag="gaming" />} />
                    <Route path="/health" element={<Health tag="health" />} />
                    <Route
                      path="/parenting"
                      element={<Parenting tag="parenting" />}
                    />
                    <Route
                      path="/politics"
                      element={<Politics tag="politics" />}
                    />
                    <Route
                      path="/science"
                      element={<Science tag="science" />}
                    />
                    <Route
                      path="/self-improvement"
                      element={<SelfImprovement tag="self-improvement" />}
                    />
                    <Route path="/sports" element={<Sports tag="sports" />} />
                    <Route
                      path="/technology"
                      element={<Technology tag="technology" />}
                    />
                    <Route path="/travel" element={<Travel tag="travel" />} />

                    {/* fallback */}
                    <Route
                      path="*"
                      element={
                        <p
                          style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          🥴 Ouch! You have stumbled on a lost page.
                        </p>
                      }
                    />
                  </Routes>
                </main>
                <NotificationContainer />
                <Footer />
              </BrowserRouter>
            </NotificationProvider>
          </TagMenuProvider>
        </UserActionsProvider>
      </NewsProvider>
    </div>
  );
}

export default App;
