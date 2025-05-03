import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTagMenuContext } from "../../context/TagMenuContext"; // Adjust the path if necessary
import "./TagMenu.css";

/**
 * TagMenu Component
 * 
 * This component renders a menu of tags as buttons. Each button navigates to a specific route
 * and updates the selected tag in the context when clicked. The active button is highlighted
 * based on the current route.
 * 
 * @component
 * 
 * @returns {JSX.Element} A container with a list of tag buttons.
 * 
 * @example
 * <TagMenu />
 * 
 * @dependencies
 * - `useNavigate` from `react-router-dom`: For navigation to different routes.
 * - `useLocation` from `react-router-dom`: To get the current route for highlighting the active tag.
 * - `useTagMenuContext`: Custom context hook to set the selected tag.
 * 
 * @function handleTagClick
 * @param {string} tag - The tag associated with the clicked button.
 * @description Updates the selected tag in the context and navigates to the corresponding route.
 * 
 * @styles
 * - `.tag-menu-container`: The container for the tag buttons.
 * - `.tag-button`: The individual tag button.
 * - `.active`: Applied to the button corresponding to the current route.
 */
function TagMenu() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const { setTag } = useTagMenuContext();

  const handleTagClick = (tag) => {
    console.log("Tag clicked:", tag); // Log the tag parameter
    setTag(tag);
    navigate(`/${tag}`);
  };

  return (
    <div className="tag-menu-container">
      {[
        { path: "/business", label: "Business", tag: "business" },
        { path: "/career", label: "Career", tag: "career" },
        { path: "/education", label: "Education", tag: "education" },
        {
          path: "/entertainment",
          label: "Entertainment",
          tag: "entertainment",
        },
        { path: "/food", label: "Food", tag: "food" },
        { path: "/gaming", label: "Gaming", tag: "gaming" },
        { path: "/health", label: "Health & Fitness", tag: "health" },
        { path: "/parenting", label: "Parenting", tag: "parenting" },
        { path: "/finance", label: "Personal Finance", tag: "finance" },
        { path: "/politics", label: "Politics", tag: "politics" },
        { path: "/science", label: "Science", tag: "science" },
        {
          path: "/self-improvement",
          label: "Self-Improvement",
          tag: "self-improvement",
        },
        { path: "/sports", label: "Sports", tag: "sports" },
        { path: "/technology", label: "Technology", tag: "technology" },
        { path: "/travel", label: "Travel", tag: "travel" },
      ].map((tag) => (
        <button
          key={tag.path}
          className={`tag-button ${
            location.pathname === tag.path ? "active" : ""
          }`} // Adds "active" class if the current route matches
          onClick={() => handleTagClick(tag.tag)}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}

export default TagMenu;
