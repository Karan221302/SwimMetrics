import { useEffect, useRef, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    swimmers: 0,
    workouts: 0,
    logs: 0
  });
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const usersRes = await API.get("/users/swimmers");
  
      let logsCount = 0;
      let workoutsCount = 0;
  
      try {
        const logsRes = await API.get("/training");
        logsCount = logsRes.data.length;
      } catch (err) {
        console.warn("Training access issue");
      }
  
      try {
        const workoutsRes = await API.get("/training-sets");
        workoutsCount = workoutsRes.data.length;
      } catch (err) {
        console.warn("Workout fetch failed");
      }
  
      setStats({
        swimmers: usersRes.data.length,
        workouts: workoutsCount, 
        logs: logsCount
      });
  
    } catch (err) {
      console.log("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.grid}>
          <Card title="Swimmers" value={stats.swimmers} />
          <Card title="Workouts" value={stats.workouts} />
          <Card title="Logs" value={stats.logs} />
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  title: { marginBottom: 20 },
  grid: { display: "flex", gap: 20 },
  card: {
    flex: 1,
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  }
};