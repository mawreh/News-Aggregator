import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * EngagementBarChart component renders a bar chart displaying monthly engagement data.
 *
 * @param {Object} props - The component props.
 * @param {number[]} props.monthlyData - An array of numbers representing engagement counts for each month.
 *                                       The array index corresponds to the month (0 = January, 11 = December).
 *
 * @returns {JSX.Element} A responsive bar chart displaying engagement data by month.
 */
const EngagementBarChart = ({ monthlyData }) => {
  // Define month abbreviations
  const monthAbbr = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Transform the monthlyData array into objects with month abbreviation and count.
  const data = Array.isArray(monthlyData)
    ? monthlyData.map((count, index) => ({
        month: monthAbbr[index] || `M${index + 1}`,
        reads: count,
      }))
    : [];

  return (
    <ResponsiveContainer width="112%" height={200}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          type="category"
          interval={0}
          tick={{ fontSize: "0.67em" }} // Set tick labels to 0.67em
          padding={{ left: 10, right: 10 }}
          tickLine={false}
        />
        <YAxis type="number" domain={[0, 100]} width={60} orientation="right" />
        <Tooltip />
        <Bar dataKey="reads" fill="#008078" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EngagementBarChart;
