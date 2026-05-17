import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUser,
  FaClipboardList,
  FaChartBar,
  FaTools
} from "react-icons/fa";
import { getRole } from "../utils/auth";

export default function Sidebar() {
  const role = getRole();

  console.log("ROLE FROM JWT:", role); 

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Menu</h2>

      {}
      {role === "admin" && (
        <>
          <MenuItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
          <MenuItem to="/users" icon={<FaUsers />} label="Users" />
          <MenuItem to="/add-user" icon={<FaUser />} label="Add User" />

        </>
      )}

      {}
      {role === "coach" && (
        <>
          <MenuItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
          <MenuItem to="/swimmers" icon={<FaUser />} label="Swimmers" />
          <MenuItem to="/library" icon={<FaClipboardList />} label="Library" />
          <MenuItem to="/builder" icon={<FaTools/>} label="Workout Builder"/>
          <MenuItem to="/assign" icon={<FaClipboardList />} label="Assign" />
          <MenuItem to="/feedback" icon={<FaChartBar />} label="Feedback" />
        </>
      )}

      {}
      {role === "swimmer" && (
        <>
          <MenuItem to="/my-workouts" icon={<FaClipboardList />} label="My Workouts" />
        </>
      )}

      {!role && <p style={{ opacity: 0.6 }}>No role</p>}
    </div>
  );
}

function MenuItem({ to, icon, label }) {
  return (
    <Link to={to} style={styles.link}>
      <div style={styles.item}>
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
const styles = {
  sidebar: {
    width: 230,
    minHeight: "100vh",
    height: "100%",
    position: "sticky",
    top: 0,
    background: "#1e293b",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 15
  },
  title: {
    marginBottom: 10,
    fontSize: 18
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "0.2s",
  }
};