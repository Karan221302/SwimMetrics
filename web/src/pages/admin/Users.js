import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  const updateRole = async (id, role) => {
    try {
      await API.put(`/users/${id}`, { role });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data || "Role update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Users Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((u) => (
          <div key={u._id} style={styles.card}>
            
            {/* LEFT SIDE */}
            <div style={styles.info}>
              <strong style={styles.name}>{u.name}</strong>
              <div style={styles.email}>{u.email}</div>
              <div style={styles.role}>Role: {u.role}</div>
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.actions}>

              <select
                style={styles.dropdown}
                onChange={(e) => updateRole(u._id, e.target.value)}
                value={u.role === "admin" ? "admin" : u.role}                disabled={u.role === "admin"}
              >
                <option value="admin">Admin</option>
                <option value="swimmer">Swimmer</option>
                <option value="coach">Coach</option>
              </select>

              <button
                style={{
                  ...styles.deleteBtn,
                  opacity: u.role === "admin" ? 0.5 : 1,
                  cursor: u.role === "admin" ? "not-allowed" : "pointer"
                }}
                onClick={() => deleteUser(u._id)}
                disabled={u.role === "admin"}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}
    </div>
  );
}



const styles = {
  container: {
    padding: 20
  },

  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 15,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: 5
  },

  name: {
    fontSize: 16
  },

  email: {
    fontSize: 14,
    color: "#555"
  },

  role: {
    fontSize: 13,
    color: "#777"
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 15
  },

  dropdown: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    minWidth: 120
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8
  }
};
