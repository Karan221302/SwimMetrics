import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function SwimmerAnalytics() {
  const { userId } = useParams();

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [userId]);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(
        `/performance/analytics/${userId}`
      );

      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "--";

    const mins = Math.floor(totalSeconds / 60);
    const secs = (totalSeconds % 60).toFixed(2);

    return `${mins}:${secs.padStart(5, "0")}`;
  };

  if (!analytics) {
    return <p>Loading...</p>;
  }

  const records = analytics.records || [];

  const chartData = records.map((r, index) => ({
    attempt: index + 1,
    time: r.totalSeconds,
    stroke: r.stroke,
  }));

  const strokeMap = {};

  records.forEach((r) => {
    if (!strokeMap[r.stroke]) {
      strokeMap[r.stroke] = 0;
    }

    strokeMap[r.stroke]++;
  });

  const strokeData = Object.keys(strokeMap).map(
    (stroke) => ({
      stroke,
      count: strokeMap[stroke],
    })
  );

  const favoriteStroke =
    strokeData.length > 0
      ? strokeData.reduce((a, b) =>
          a.count > b.count ? a : b
        ).stroke
      : "N/A";

  return (
    <div style={{ padding: 20 }}>
      <div style={styles.header}>
        <h1>
          {analytics.swimmer?.name ||
            "Swimmer Analytics"}
        </h1>

        <p style={styles.email}>
          {analytics.swimmer?.email}
        </p>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>{analytics.totalDistance}m</h2>
          <p>Total Distance</p>
        </div>

        <div style={styles.card}>
          <h2>
            {formatTime(
              analytics.bestTime
            )}
          </h2>
          <p>Best Time</p>
        </div>

        <div style={styles.card}>
          <h2>{records.length}</h2>
          <p>Performance Records</p>
        </div>

        <div style={styles.card}>
          <h2>{favoriteStroke}</h2>
          <p>Favorite Stroke</p>
        </div>
      </div>

      <div style={styles.chartBox}>
        <h3>Performance Trend</h3>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={chartData}>
            <XAxis dataKey="attempt" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="time"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartBox}>
        <h3>Stroke Distribution</h3>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={strokeData}>
            <XAxis dataKey="stroke" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartBox}>
        <h3>Performance Records</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stroke</th>
              <th>Distance</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>
                  {new Date(
                    record.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>{record.stroke}</td>

                <td>
                  {record.distance}m
                </td>

                <td>
                  {formatTime(
                    record.totalSeconds
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: 20,
  },

  email: {
    color: "#64748b",
  },

  cards: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 20,
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    minWidth: 220,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  chartBox: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};