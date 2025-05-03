import React, { useState, useEffect } from "react";
import EngagementBarChart from "./EngagementBarChart";
import UpArrowIcon from "../../../assets/up-arrow.svg?react";
import DownArrowIcon from "../../../assets/down-arrow.svg?react";

/**
 * EngagementCard Component
 *
 * This component displays user engagement statistics for reading articles,
 * including the total number of articles read this year, the number of articles
 * read in the current month, and the average difference in daily reads compared
 * to the previous month. It also includes a bar chart visualization of monthly
 * data.
 *
 * State:
 * - stats: An object containing:
 *   - yearTotal (number): Total articles read in the current year.
 *   - currentMonth (number): Total articles read in the current month.
 *   - avgDiff (number): Difference in average daily reads compared to the previous month.
 *   - monthlyData (Array<number>): Array of 12 numbers representing the count of articles read per month.
 *
 * Effects:
 * - Fetches and processes article read data from localStorage ("articleReads") to calculate
 *   yearly and monthly statistics, as well as the average daily difference.
 *
 * Returns:
 * - A styled card displaying engagement statistics and a bar chart visualization.
 *
 * Dependencies:
 * - UpArrowIcon: A component or icon representing an upward trend.
 * - DownArrowIcon: A component or icon representing a downward trend.
 * - EngagementBarChart: A component for rendering a bar chart of monthly data.
 *
 * Styling:
 * - Dynamically changes the color of the average difference statistic based on whether
 *   the trend is increasing, decreasing, or neutral.
 */
const EngagementCard = () => {
  const [stats, setStats] = useState({
    yearTotal: 0,
    currentMonth: 0,
    avgDiff: 0, // Difference in average per day (as a whole integer)
    monthlyData: Array(12).fill(0),
  });

  useEffect(() => {
    const readsData = JSON.parse(localStorage.getItem("articleReads")) || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth();
    let monthlyCounts = Array(12).fill(0);
    let totalYear = 0;

    readsData.forEach((dateStr) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === currentYear) {
        monthlyCounts[date.getMonth()]++;
        totalYear++;
      }
    });

    // Calculate current month average:
    const currentMonthReads = monthlyCounts[currentMonthIndex];
    const currentMonthDays = new Date(
      currentYear,
      currentMonthIndex + 1,
      0
    ).getDate();
    const currentAvg = currentMonthReads / currentMonthDays;

    // Calculate previous month average (if available)
    let previousAvg = 0;
    if (currentMonthIndex > 0) {
      const prevMonthReads = monthlyCounts[currentMonthIndex - 1];
      const prevMonthDays = new Date(
        currentYear,
        currentMonthIndex,
        0
      ).getDate();
      previousAvg = prevMonthReads / prevMonthDays;
    } else {
      // If no previous month (January), we simply assume no change.
      previousAvg = currentAvg;
    }

    // Calculate difference (how many more per day). Use Math.ceil on the positive difference.
    const diff = currentAvg - previousAvg;
    const avgDiff = Math.ceil(Math.abs(diff));

    setStats({
      yearTotal: totalYear,
      currentMonth: currentMonthReads,
      avgDiff,
      monthlyData: monthlyCounts,
    });
  }, []);

  // Determine if the current month average is higher or lower than previous month
  const isIncrease = stats.avgDiff > 0 && stats.currentMonth > 0;
  const isDecrease = stats.avgDiff > 0 && stats.currentMonth === 0;

  return (
    <div className="card engagement-card">
      <h3 className="engagement-card-title">Article Engagement</h3>
      <p className="engagement-card-subtitle">How often you read Pocket</p>
      <div className="stats-container">
        <div className="engagement-card data-container">
          <div className="engagement-card stat this-year">
            <span className="stat-label"> This Year</span>
            <strong className="stat-number">{stats.yearTotal}</strong>
          </div>
          <div className="engagement-card stat this-month">
            <span className="stat-label"> This Month</span>
            <strong className="stat-number">{stats.currentMonth}</strong>
          </div>
          <div className="engagement-card stat">
            <span className="stat-label">Avg. Per Day</span>
            <strong
              className="stat-number"
              style={{
                color: isIncrease ? "#008078" : isDecrease ? "#EF3E56" : "#666",
              }}
            >
              {/* Conditionally render the arrow icon */}
              {isIncrease && (
                <UpArrowIcon
                  style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
                />
              )}
              {isDecrease && (
                <DownArrowIcon
                  style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
                />
              )}
              {stats.avgDiff}
            </strong>
          </div>
        </div>
        <EngagementBarChart monthlyData={stats.monthlyData} />
      </div>
    </div>
  );
};

export default EngagementCard;
