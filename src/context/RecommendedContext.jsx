import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useUserActions } from "../context/UserActionsContext";

// Context for fetching 3 articles based on tags in liked articles, with caching
export const RecommendedContext = createContext();
export const useRecommendedContext = () => useContext(RecommendedContext);

// Cache configuration
const CACHE_CONFIG = {
  EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 50,
};

// Cache utility functions
const cacheUtils = {
  getCacheKey: (params) => `rec_${JSON.stringify(params)}`,

  getCachedData: (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_CONFIG.EXPIRY_TIME) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  setCachedData: (key, data) => {
    const entry = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("rec_"));
    if (keys.length > CACHE_CONFIG.MAX_CACHE_SIZE) {
      let oldestKey = keys[0];
      keys.forEach((k) => {
        const ts = JSON.parse(localStorage.getItem(k)).timestamp;
        const oldestTs = JSON.parse(localStorage.getItem(oldestKey)).timestamp;
        if (ts < oldestTs) oldestKey = k;
      });
      localStorage.removeItem(oldestKey);
    }
  },

  clearCache: () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("rec_"))
      .forEach((k) => localStorage.removeItem(k));
  },
};

/**
 * RecommendedProvider component provides a context for managing and fetching recommended articles
 * based on user-liked articles and predefined tags.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The RecommendedContext.Provider component wrapping its children.
 *
 * @context
 * @property {Array} tagArticles - The list of recommended articles based on tags.
 * @property {number} currentPage - The current page number for paginated API requests.
 * @property {Function} setCurrentPage - Function to update the current page number.
 * @property {number} totalResults - The total number of results available from the API.
 * @property {boolean} loading - Indicates whether the articles are currently being fetched.
 * @property {string|null} error - Error message if the API request fails, otherwise null.
 * @property {Function} clearCache - Function to clear the cached data.
 *
 * @dependencies
 * - `useUserActions` - Custom hook to access user actions, including liked articles.
 * - `useState` - React hook for managing state variables.
 * - `useEffect` - React hook for side effects, such as fetching data.
 * - `useRef` - React hook for persisting mutable values across renders.
 * - `axios` - HTTP client for making API requests.
 * - `cacheUtils` - Utility for caching API responses.
 *
 * @constants
 * - `RATE_LIMIT_DELAY` - Minimum delay (in milliseconds) between API requests to avoid rate limiting.
 * - `API_KEY` - API key for authenticating requests to the News API.
 * - `BASE_URL` - Base URL for the News API.
 * - `fixedTags` - Predefined list of tags used to categorize articles.
 *
 * @functions
 * - `extractTags` - Extracts relevant tags from liked articles based on their URL, title, description, or source name.
 * - `fetchArticles` - Fetches recommended articles from the News API based on extracted tags and current page.
 *
 * @effects
 * - Automatically fetches recommended articles whenever `likedArticles` or `currentPage` changes.
 * - Implements rate limiting to avoid exceeding API request limits.
 * - Caches API responses to improve performance and reduce redundant requests.
 */
export const RecommendedProvider = ({ children }) => {
  const { likedArticles } = useUserActions();
  const [tagArticles, setTagArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastFetchTimeRef = useRef(0);
  const RATE_LIMIT_DELAY = 1000;

  const API_KEY = "ecb0c2f96ff84d2abe4a84d2eb2709f1";
  const BASE_URL = "https://newsapi.org/v2";

  const fixedTags = [
    "business",
    "career",
    "education",
    "entertainment",
    "food",
    "gaming",
    "health",
    "parenting",
    "finance",
    "politics",
    "science",
    "self-improvement",
    "sports",
    "technology",
    "travel",
  ];

    const rawTags = useMemo(() => {
        const found = new Set();
        likedArticles.forEach((article) => {
          let tag = null;
        // 1) try last URL segment
          if (article.url) {
            const lastSeg = article.url.split("/").pop() || "";
            tag = fixedTags.find((t) => lastSeg.includes(t));
          }
          // 2) title/description
          if (!tag && (article.title || article.description)) {
            const text = (article.title + " " + (article.description || "")).toLowerCase();
            tag = fixedTags.find((t) => text.includes(t));
          }
          // 3) source name
          if (!tag && article.source?.name) {
            const src = article.source.name.toLowerCase();
            tag = fixedTags.find((t) => src.includes(t));
          }
          if (tag) found.add(tag);
        });
        return Array.from(found);
      }, [likedArticles]);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        // Rate limiting
        const now = Date.now();
        const since = now - lastFetchTimeRef.current;
        if (since < RATE_LIMIT_DELAY) {
          await new Promise((res) => setTimeout(res, RATE_LIMIT_DELAY - since));
        }
        lastFetchTimeRef.current = Date.now();

        // Extract tags from memoized tag list
        const tags = rawTags;
        // Always include 'news'
        const allTags = Array.from(new Set([...tags, "news"])).sort();

        // Build raw query string
        let rawQ = allTags.join(" OR ");

        // If the encoded query would exceed 500 chars, trim back to top 3 tags + 'news'
        const encodedQ = encodeURIComponent(rawQ);
        if (encodedQ.length > 500) {
          const topTags = tags.slice(0, 3);
          rawQ = Array.from(new Set([...topTags, "news"])).join(" OR ");
        }

        // Build request params
        const params = {
          apiKey: API_KEY,
          pageSize: 3,
          page: currentPage,
          q: rawQ,
          sortBy: "relevancy",
        };

        // Check cache, but only if it already has 3
        const cacheKey = cacheUtils.getCacheKey(params);
        const cached = cacheUtils.getCachedData(cacheKey);
        if (cached && cached.articles.length >= params.pageSize) {
          if (isMounted) {
            setTagArticles(cached.articles);
            setTotalResults(cached.totalResults);
            setLoading(false);
          }
          return;
        }

        // Fetch from API
        const response = await axios.get(`${BASE_URL}/everything`, { params });
        let articles = response.data.articles || [];

        // If we still have fewer than we need, do a fallback fetch for just "news"
        if (articles.length < params.pageSize) {
          const fallbackParams = {
            apiKey: API_KEY,
            pageSize: params.pageSize,
            page: 1,
            q: "news", // pure “news” fallback
            sortBy: "relevancy",
          };
          try {
            const fallback = await axios.get(`${BASE_URL}/everything`, {
              params: fallbackParams,
            });
            articles = articles.concat(fallback.data.articles || []);
          } catch {
            // Swallow—if even "news" fails, we'll just render what we have
          }
        }

        // Now force‐slice to exactly what we need
        articles = articles.slice(0, params.pageSize);

        if (isMounted) {
          setTagArticles(articles);
          setTotalResults(response.data.totalResults);
        }

        cacheUtils.setCachedData(cacheKey, {
          articles,
          totalResults: response.data.totalResults,
        });
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to fetch articles");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, [likedArticles, currentPage]);

  return (
    <RecommendedContext.Provider
      value={{
        tagArticles,
        currentPage,
        setCurrentPage,
        totalResults,
        loading,
        error,
        clearCache: cacheUtils.clearCache,
      }}
    >
      {children}
    </RecommendedContext.Provider>
  );
};

export default RecommendedProvider;
