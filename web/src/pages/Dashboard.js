import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const coachName = user?.name || "Coach";

  const [stats, setStats] = useState({
    swimmers: 0,
    workouts: 0,
    logs: 0,
    assignments: 0,
    complelted:0,
  });

  const [loading, setLoading] = useState(true);
  

  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const [
        usersRes,
        workoutsRes,
        assignmentsRes,
      ] = await Promise.all([
        API.get("/users/swimmers"),
        API.get("/training-sets"),
        API.get("/assign"),
      ]);
  
      let logsCount = 0;
  
      try {
        const logsRes =
          await API.get("/logs");
  
        logsCount =
          logsRes.data.length;
      } catch (err) {
        console.warn(
          "Training access issue"
        );
      }
  
      const assignments =
        assignmentsRes.data;
  
      const completed =
        assignments.filter(
          (a) =>
            a.status ===
            "completed"
        ).length;
  
      setStats({
        swimmers:
          usersRes.data.length,
        workouts:
          workoutsRes.data.length,
        logs: logsCount,
        assignments:
          assignments.length,
        completed,
      });
    } catch (err) {
      console.log(
        "Dashboard fetch error:",
        err
      );
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
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Welcome, {coachName}
          </h1>

          <p style={styles.subtitle}>
            Monitor swimmers, workouts and training activity.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>
          Loading Dashboard...
        </div>
      ) : (
        <>
          {/* STATS */}

          <div style={styles.grid}>
  <Card
    title="🏊 Swimmers"
    value={stats.swimmers}
  />

  <Card
    title="📋 Workouts"
    value={stats.workouts}
  />

  <Card
    title="📝 Logs"
    value={stats.logs}
  />

  <Card
    title="📌 Assignments"
    value={stats.assignments}
  />

  <Card
    title="✅ Completed"
    value={stats.completed}
  />
</div>

          {/* QUICK ACTIONS */}

          <div style={styles.section}>
            <h2>Quick Actions</h2>

            <div style={styles.actions}>
              <button
                style={styles.actionBtn}
                onClick={() =>
                  navigate("/builder")
                }
              >
                Create Workout
              </button>

              <button
                style={styles.actionBtn}
                onClick={() =>
                  navigate("/assign")
                }
              >
                Assign Workout
              </button>

              <button
                style={styles.actionBtn}
                onClick={() =>
                  navigate("/swimmers")
                }
              >
                View Swimmers
              </button>

              <button
                style={styles.actionBtn}
                onClick={() =>
                  navigate("/library")
                }
              >
                Training Library
              </button>
            </div>
          </div>
          <div style={styles.section}>
  <h2>Management</h2>

  <div style={styles.actions}>
    <button
      style={styles.actionBtn}
      onClick={() =>
        navigate("/reports")
      }
    >
      Reports
    </button>

    <button
      style={styles.actionBtn}
      onClick={() =>
        navigate("/assignments")
      }
    >
      Assignments
    </button>

    <button
      style={styles.actionBtn}
      onClick={() =>
        navigate("/feedback")
      }
    >
      Feedback
    </button>
  </div>
</div>

          {/* OVERVIEW */}

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>
              Coach Overview
            </h2>

            <div style={styles.summaryGrid}>
              <div>
                <p style={styles.label}>
                  Registered Swimmers
                </p>
                <h2>{stats.swimmers}</h2>
              </div>

              <div>
                <p style={styles.label}>
                  Training Sets
                </p>
                <h2>{stats.workouts}</h2>
              </div>

              <div>
                <p style={styles.label}>
                  Training Logs
                </p>
                <h2>{stats.logs}</h2>
              </div>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div style={styles.performance}>
  <h2>
    Coach Performance
  </h2>

  <div
    style={styles.summaryGrid}
  >
    <div>
      <p style={styles.label}>
        Completion Rate
      </p>

      <h2>
        {stats.assignments >
        0
          ? (
              (stats.completed /
                stats.assignments) *
              100
            ).toFixed(1)
          : 0}
        %
      </h2>
    </div>

    <div>
      <p style={styles.label}>
        Active Swimmers
      </p>

      <h2>
        {stats.swimmers}
      </h2>
    </div>

    <div>
      <p style={styles.label}>
        Assigned Workouts
      </p>

      <h2>
        {stats.assignments}
      </h2>
    </div>
  </div>
</div>



          <div style={styles.statusCard}>
            <h2>System Status</h2>

            <div style={styles.statusRow}>
              <span>Backend Server</span>
              <span style={styles.online}>
                ● Online
              </span>
            </div>

            <div style={styles.statusRow}>
              <span>Database</span>
              <span style={styles.online}>
                ● Connected
              </span>
            </div>

            <div style={styles.statusRow}>
              <span>Last Updated</span>
              <span>
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        {title}
      </div>

      <div style={styles.cardValue}>
        {value}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: "8px",
  },

  loading: {
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    color: "#64748B",
    marginBottom: "10px",
    fontWeight: "600",
  },

  cardValue: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#2563EB",
  },

  section: {
    marginTop: "35px",
  },

  actions: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  actionBtn: {
    border: "none",
    background: "#2563EB",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  summary: {
    marginTop: "35px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  summaryTitle: {
    marginTop: 0,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
  },

  label: {
    color: "#64748B",
  },

  statusCard: {
    marginTop: "35px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },

  online: {
    color: "#16A34A",
    fontWeight: "600",
  },
  performance: {
    marginTop: "35px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },
};