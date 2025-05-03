import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const TagMenuContext = createContext();
export const useTagMenuContext = () => useContext(TagMenuContext);

// Cache configuration
const CACHE_CONFIG = {
  EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes in milliseconds
  MAX_CACHE_SIZE: 50, // Maximum number of cached responses
};

// Cache utility functions
const cacheUtils = {
  getCacheKey: (params) => {
    return `tag_${JSON.stringify(params)}`;
  },

  getCachedData: (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_CONFIG.EXPIRY_TIME) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  },

  setCachedData: (key, data) => {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));

    // Clean up old cache entries if we exceed the size limit
    const cacheKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("tag_")
    );
    if (cacheKeys.length > CACHE_CONFIG.MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.reduce((oldest, current) => {
        const oldestEntry = JSON.parse(localStorage.getItem(oldest));
        const currentEntry = JSON.parse(localStorage.getItem(current));
        return oldestEntry.timestamp < currentEntry.timestamp
          ? oldest
          : current;
      });
      localStorage.removeItem(oldestKey);
    }
  },

  clearCache: () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("tag_"))
      .forEach((key) => localStorage.removeItem(key));
  },
};

/**
 * Provides context and functionality for managing and fetching articles based on tags.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @context
 * @property {Array} tagArticles - The list of articles fetched based on the current tag.
 * @property {Function} fetchTagArticles - Function to fetch articles based on a given tag.
 * @property {Function} setCurrentPage - Function to update the current page for pagination.
 * @property {number} totalResults - The total number of articles available for the current tag.
 * @property {Function} setTag - Function to update the current tag for fetching articles.
 * @property {string} tag - The current tag used for fetching articles.
 * @property {boolean} loading - Indicates whether articles are currently being fetched.
 * @property {string|null} error - Error message if an error occurs during fetching, otherwise null.
 * @property {Function} clearCache - Function to clear the cached data.
 *
 * @example
 * <TagMenuProvider>
 *   <YourComponent />
 * </TagMenuProvider>
 */
export const TagMenuProvider = ({ children }) => {
  const API_KEY = "ecb0c2f96ff84d2abe4a84d2eb2709f1";
  const BASE_URL = "https://newsapi.org/v2";

  const [tagArticles, setTagArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [tag, setTag] = useState("");
  const RATE_LIMIT_DELAY = 1000; // 1 second between requests

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchTagArticles = useCallback(async (tag) => {
    console.log("Fetching articles with q param:", tag); // Log the q parameter
    setLoading(true);
    setError(null);

    try {
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTime;
      if (timeSinceLastFetch < RATE_LIMIT_DELAY) {
        await wait(RATE_LIMIT_DELAY - timeSinceLastFetch);
      }

      // Create cache key from request parameters
      const params = {
        apiKey: API_KEY,
        page: currentPage,
        pageSize: 9,
        q: tag,
      };
      const cacheKey = cacheUtils.getCacheKey(params);

      // Check cache first
      const cachedData = cacheUtils.getCachedData(cacheKey);
      if (cachedData) {
        setTagArticles(cachedData.articles.slice(0, 9));
        setTotalResults(cachedData.totalResults);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          ...params,
        },
      });

      setLastFetchTime(Date.now());

      const tagArticles = response.data.articles || [];

      if (tagArticles.length === 0) {
        setError("No articles found.");
        return;
      }

      // Cache the successful response
      cacheUtils.setCachedData(cacheKey, {
        articles: tagArticles,
        totalResults: response.data.totalResults,
      });

      setTagArticles(tagArticles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      let errorMessage = "Could not fetch articles, please try again later.";

      if (error.response) {
        switch (error.response.status) {
          case 429:
            errorMessage =
              "You've reached the rate limit. Please wait a moment before trying again.";
            await wait(RATE_LIMIT_DELAY * 2);
            break;
          case 401:
            errorMessage = "API key is invalid or expired.";
            break;
          case 404:
            errorMessage = "No articles found for your search criteria.";
            break;
          default:
            errorMessage = `Error: ${error.response.status} - ${error.message}`;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    let isSubscribed = true;

    const delayedFetch = async () => {
      await wait(300);
      if (isSubscribed && tag) {
        // Only fetch if tag is not empty
        fetchTagArticles(tag);
      }
    };

    delayedFetch();

    return () => {
      isSubscribed = false;
    };
  }, [currentPage, tag]);

  return (
    <TagMenuContext.Provider
      value={{
        tagArticles,
        fetchTagArticles,
        setCurrentPage,
        totalResults,
        setTag,
        tag,
        loading,
        error,
        clearCache: cacheUtils.clearCache,
      }}
    >
      {children}
    </TagMenuContext.Provider>
  );
};
