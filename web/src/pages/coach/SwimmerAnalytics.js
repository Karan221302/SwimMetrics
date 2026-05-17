import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function SwimmerAnalytics() {
  const { userId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get(`/training/analytics/${userId}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();
  }, [userId]);

  if (!data) return <p>Loading...</p>;

  const strokeData = Object.keys(data.strokeStats).map((key) => ({
    stroke: key,
    distance: data.strokeStats[key]
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>Swimmer Analytics</h2>

      {}
      <div style={styles.grid}>
        <Card title="Total Distance" value={data.totalDistance + " m"} />
        <Card title="Best Time" value={data.bestTime} />
      </div>

      {}
      <div style={styles.chartBox}>
        <h3>Performance Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.logs}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="time" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {}
      <div style={styles.chartBox}>
        <h3>Stroke Analysis</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={strokeData}>
            <XAxis dataKey="stroke" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="distance" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: 20,
    marginBottom: 20
  },
  card: {
    flex: 1,
    background: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  chartBox: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  }
};