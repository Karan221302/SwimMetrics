import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>🏊 SwimMetrics</h2>

      <button onClick={logout} style={styles.logout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    height: 65,
    background: "#0f172a",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  logo: {
    fontWeight: "600"
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    color: "white",
    cursor: "pointer"
  }
};