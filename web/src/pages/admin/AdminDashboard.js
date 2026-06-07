import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaSwimmer,
  FaClipboardList,
  FaDumbbell,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import API from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    coaches: 0,
    swimmers: 0,
    workouts: 0,
    assignments: 0,
    logs: 0,
    completedAssignments: 0,
    completionRate: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topSwimmers, setTopSwimmers] = useState([]);
  const [serverStatus, setServerStatus] = useState("Offline");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        usersRes,
        workoutsRes,
        assignmentsRes,
        logsRes,
      ] = await Promise.all([
        API.get("/users"),
        API.get("/training-sets"),
        API.get("/assign"),
        API.get("/logs"),
      ]);

      console.log("USERS", usersRes.data);
console.log("WORKOUTS", workoutsRes.data);
console.log("ASSIGNMENTS", assignmentsRes.data);
console.log("LOGS", logsRes.data);

      setServerStatus("Online");

      const users = usersRes.data || [];
      const workouts = workoutsRes.data || [];
      const assignments = assignmentsRes.data || [];
      const logs = logsRes.data || [];

      const completedAssignments = assignments.filter(
        (a) => a.status === "completed"
      ).length;

      const completionRate =
        assignments.length > 0
          ? Math.round(
              (completedAssignments /
                assignments.length) *
                100
            )
          : 0;

      setStats({
        users: users.length,
        coaches: users.filter(
          (u) => u.role === "coach"
        ).length,
        swimmers: users.filter(
          (u) => u.role === "swimmer"
        ).length,
        workouts: workouts.length,
        assignments: assignments.length,
        logs: logs.length,
        completedAssignments,
        completionRate,
      });

      setRecentUsers(
        [...users]
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 5)
      );

      const activity = [];

      assignments.forEach((a) => {
        activity.push({
          text: "Workout Assigned",
          date: a.createdAt,
        });
      });

      logs.forEach((l) => {
        activity.push({
          text: "Training Log Submitted",
          date: l.createdAt,
        });
      });

      setRecentActivity(
        activity
          .sort(
            (a, b) =>
              new Date(b.date) -
              new Date(a.date)
          )
          .slice(0, 10)
      );

      const swimmerMap = {};

      logs.forEach((log) => {
        const swimmer =
          log.swimmer?.name || "Unknown";

        swimmerMap[swimmer] =
          (swimmerMap[swimmer] || 0) + 1;
      });

      const sortedSwimmers = Object.entries(
        swimmerMap
      )
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) => b.count - a.count
        )
        .slice(0, 5);

      setTopSwimmers(sortedSwimmers);

    } catch (err) {
      console.log(err);
      setServerStatus("Offline");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Admin Dashboard
      </h1>

      <p style={styles.subtitle}>
        Live System Overview
      </p>

      <div style={styles.grid}>
        <Card
          icon={<FaUsers />}
          title="Users"
          value={stats.users}
        />

        <Card
          icon={<FaUserTie />}
          title="Coaches"
          value={stats.coaches}
        />

        <Card
          icon={<FaSwimmer />}
          title="Swimmers"
          value={stats.swimmers}
        />

        <Card
          icon={<FaDumbbell />}
          title="Workouts"
          value={stats.workouts}
        />

        <Card
          icon={<FaClipboardList />}
          title="Assignments"
          value={stats.assignments}
        />

        <Card
          icon={<FaChartLine />}
          title="Logs"
          value={stats.logs}
        />

        <Card
          icon={<FaCheckCircle />}
          title="Completed"
          value={
            stats.completedAssignments
          }
        />

        <Card
          icon={<FaCheckCircle />}
          title="Completion %"
          value={`${stats.completionRate}%`}
        />
      </div>

      <div style={styles.section}>
  <h2>Recent Users</h2>

  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Name</th>
        <th style={styles.th}>Email</th>
        <th style={styles.th}>Role</th>
      </tr>
    </thead>

    <tbody>
      {recentUsers.map((u) => (
        <tr key={u._id}>
          <td style={styles.td}>{u.name}</td>
          <td style={styles.td}>{u.email}</td>
          <td style={styles.td}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background:
                  u.role === "admin"
                    ? "#fee2e2"
                    : u.role === "coach"
                    ? "#dbeafe"
                    : "#dcfce7",
              }}
            >
              {u.role}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      <div style={styles.section}>
        <h2>Recent Activity</h2>

        {recentActivity.length === 0 ? (
          <p>No activity found</p>
        ) : (
          recentActivity.map(
            (item, index) => (
              <p key={index}>
                • {item.text}
              </p>
            )
          )
        )}
      </div>

      <div style={styles.section}>
        <h2>Top Active Swimmers</h2>

        {topSwimmers.length === 0 ? (
          <p>No swimmer logs yet</p>
        ) : (
          topSwimmers.map(
            (s, index) => (
              <p key={index}>
                {index + 1}. {s.name} -{" "}
                {s.count} logs
              </p>
            )
          )
        )}
      </div>

      <div style={styles.section}>
        <h2>System Status</h2>

        <div style={styles.status}>
          <p>
            {serverStatus ===
            "Online"
              ? "🟢"
              : "🔴"}{" "}
            Backend Server
          </p>

          <p>
            {serverStatus ===
            "Online"
              ? "🟢"
              : "🔴"}{" "}
            Database
          </p>

          <p>
            🟢 Authentication
          </p>

          <p>
            🟢 Role Management
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
  },

  heading: {
    fontSize: 40,
    marginBottom: 10,
  },

  subtitle: {
    color: "#64748b",
    marginBottom: 25,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 15,
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    gap: 20,
    alignItems: "center",
  },

  icon: {
    fontSize: 35,
    color: "#2563eb",
  },

  section: {
    marginTop: 30,
    background: "#fff",
    padding: 25,
    borderRadius: 15,
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
  },

  



  status: {
    display: "grid",
    gap: 10,
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e5e7eb",
  },
  
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
};