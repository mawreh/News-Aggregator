import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Cache configuration
const CACHE_CONFIG = {
  EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes in milliseconds
  MAX_CACHE_SIZE: 50, // Maximum number of cached responses
};

// Cache utility functions
const cacheUtils = {
  getCacheKey: (params) => {
    return `news_${JSON.stringify(params)}`;
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
      key.startsWith("news_")
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
      .filter((key) => key.startsWith("news_"))
      .forEach((key) => localStorage.removeItem(key));
  },
};

// Create the context
const NewsContext = createContext(null);


/**
 * NewsProvider component that provides news-related state and functionality
 * to its children via React Context.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 *
 * @context
 * @property {Array} articles - List of all fetched articles.
 * @property {Array} popularArticles - Top 3 popular articles for the home page.
 * @property {Array} worthyArticles - Top 6 worthy articles for the home page.
 * @property {Array} pocketHits - Top 12 pocket hits articles for the home page.
 * @property {Array} discoverBestArticles - Top 5 articles for the Discover page.
 * @property {Array} fascinatingStoriesArticles - Top 4 fascinating stories for the Discover page.
 * @property {Array} todaysFinestArticles - Top 12 articles for "Today's Finest" section.
 * @property {boolean} loading - Indicates whether articles are being fetched.
 * @property {string|null} error - Error message if fetching fails, otherwise null.
 * @property {Function} fetchNews - Function to fetch news articles from the API.
 * @property {number} currentPage - Current page number for pagination.
 * @property {Function} setCurrentPage - Function to update the current page number.
 * @property {number} totalResults - Total number of articles available from the API.
 * @property {Function} setQuery - Function to update the search query.
 * @property {number} collectionsPage - Current page number for collections pagination.
 * @property {Function} setCollectionsPage - Function to update the collections page number.
 * @property {number} totalCollectionPages - Total number of collection pages available.
 * @property {Array} topCollectionsArticles - Top 5 articles for the collections page.
 * @property {Array} middleCollectionsArticles - Middle 4 articles for the collections page.
 * @property {Array} btmCollectionsArticles - Bottom 5 articles for the collections page.
 * @property {Function} clearCache - Function to clear the cached data.
 *
 * @returns {JSX.Element} The NewsContext.Provider component wrapping its children.
 */
const NewsProvider = ({ children }) => {
  const API_KEY = "ecb0c2f96ff84d2abe4a84d2eb2709f1";
  const BASE_URL = "https://newsapi.org/v2";

  const [articles, setArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [worthyArticles, setWorthyArticles] = useState([]);
  const [pocketHits, setPocketHits] = useState([]);
  const [discoverBestArticles, setDiscoverBestArticles] = useState([]);
  const [fascinatingStoriesArticles, setFascinatingStoriesArticles] = useState(
    []
  );
  const [todaysFinestArticles, setTodaysFinestArticles] = useState([]);
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const RATE_LIMIT_DELAY = 1000; // 1 second between requests

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchNews = async () => {
    console.log("Starting fetchNews...");
    setLoading(true);
    setError(null);

    try {
      // Check if we need to wait due to rate limiting
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTime;
      if (timeSinceLastFetch < RATE_LIMIT_DELAY) {
        await wait(RATE_LIMIT_DELAY - timeSinceLastFetch);
      }

      // Create cache key from request parameters
      const params = {
        apiKey: API_KEY,
        page: currentPage,
        pageSize: 45,
        q: query.trim() !== "" ? query.trim() : "news",
        sortBy: "relevancy",
      };
      const cacheKey = cacheUtils.getCacheKey(params);

      // Check cache first
      const cachedData = cacheUtils.getCachedData(cacheKey);
      if (cachedData) {
        setArticles(cachedData.articles);

        // Set Cached Home Page Articles
        setRecommendedArticles(cachedData.articles.slice(0, 3));

        setPopularArticles(cachedData.articles.slice(0, 3)); // 4 total articles
        setWorthyArticles(cachedData.articles.slice(4, 10)); // 6 total articles
        setPocketHits(cachedData.articles.slice(11, 23));

        // Set Cached Discover Articles
        setDiscoverBestArticles(cachedData.articles.slice(0, 5)); // 5 total articles
        setFascinatingStoriesArticles(cachedData.articles.slice(6, 10)); // 4 total articles
        setTodaysFinestArticles(cachedData.articles.slice(11, 23));

        setTotalResults(cachedData.totalResults);
        setLoading(false);
        return;
      }
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          ...params,
          id: `${Date.now()}-${Math.random()}`,
        },
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      if (!response.data || !response.data.articles) {
        throw new Error("Invalid API response format");
      }

      setLastFetchTime(Date.now());

      const allArticles = response.data.articles || [];

      if (allArticles.length === 0) {
        setError("No articles found.");
        return;
      }

      // Cache the successful response
      cacheUtils.setCachedData(cacheKey, {
        articles: allArticles,
        totalResults: response.data.totalResults,
      });

      setArticles(allArticles);
      setTotalResults(response.data.totalResults);

      // Home Page Articles
      setRecommendedArticles(allArticles.slice(0, 3));

      setPopularArticles(allArticles.slice(0, 3)); // 3 total articles
      setWorthyArticles(allArticles.slice(4, 10)); // 6 total articles
      setPocketHits(allArticles.slice(11, 23)); // 12 total articles

      // Discover Page Articles
      setDiscoverBestArticles(allArticles.slice(0, 5)); // 5 total articles
      setFascinatingStoriesArticles(allArticles.slice(6, 10)); // 4 total articles
      setTodaysFinestArticles(allArticles.slice(10, 22)); // 12 total articles
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
            errorMessage = "No articles found.";
            break;
          default:
            errorMessage = `Error: ${error.response.status} - ${error.message}`;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  // ─── COLLECTIONS LOGIC ───────────────────────────────────────────────────────

  // Build a shuffled pool out of whatever ‘articles’ ended up in cache/API:
  const collectionsPool = useMemo(() => {
    const pool = [...articles];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, [articles]);

  // We want exactly 3 pages of 14 items each
  const perPage = 14;
  const totalCollectionPages = 3;

  // Slice out the 14 items for the current page
  const pageStart = (collectionsPage - 1) * perPage;
  const currentCollections = collectionsPool.slice(
    pageStart,
    pageStart + perPage
  );

  // Distribute into Top (5), Middle (4), Bottom (5)
  const topCollectionsArticles = currentCollections.slice(0, 5);
  const middleCollectionsArticles = currentCollections.slice(5, 9);
  const btmCollectionsArticles = currentCollections.slice(9, 14);

  const value = {
    articles,
    recommendedArticles,

    popularArticles,
    worthyArticles,
    pocketHits,
    discoverBestArticles,
    fascinatingStoriesArticles,
    todaysFinestArticles,
    loading,
    error,
    fetchNews,
    currentPage,
    setCurrentPage,
    totalResults,
    setQuery,
    collectionsPage,
    setCollectionsPage,
    totalCollectionPages,
    topCollectionsArticles,
    middleCollectionsArticles,
    btmCollectionsArticles,
    clearCache: cacheUtils.clearCache,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

// Create the hook
function useNewsContext() {
  const context = useContext(NewsContext);
  if (context === null) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
}

export { NewsProvider, useNewsContext };
