import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] =
    useState("all");

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
    if (
      !window.confirm(
        "Delete this user?"
      )
    )
      return;

    try {
      await API.delete(`/users/${id}`);

      fetchUsers();
    } catch (err) {
      alert(
        err.response?.data ||
          "Delete failed"
      );
    }
  };

  const updateRole = async (
    id,
    role
  ) => {
    try {
      await API.put(`/users/${id}`, {
        role,
      });

      fetchUsers();
    } catch (err) {
      alert(
        err.response?.data ||
          "Role update failed"
      );
    }
  };

  const filteredUsers =
    users.filter((u) => {
      const matchesSearch =
        u.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        u.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRole =
        roleFilter === "all" ||
        u.role === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );
    });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Users Management
      </h2>

      {/* Statistics */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {
              users.filter(
                (u) =>
                  u.role ===
                  "coach"
              ).length
            }
          </h2>
          <p>Coaches</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {
              users.filter(
                (u) =>
                  u.role ===
                  "swimmer"
              ).length
            }
          </h2>
          <p>Swimmers</p>
        </div>

        <div style={styles.statCard}>
          <h2>
            {
              users.filter(
                (u) =>
                  u.role ===
                  "admin"
              ).length
            }
          </h2>
          <p>Admins</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={styles.toolbar}>
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.input}
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(
              e.target.value
            )
          }
          style={styles.input}
        >
          <option value="all">
            All Roles
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="coach">
            Coach
          </option>

          <option value="swimmer">
            Swimmer
          </option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length ===
        0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map((u) => (
          <div
            key={u._id}
            style={styles.card}
          >
            <div style={styles.info}>
              <strong
                style={styles.name}
              >
                {u.name}
              </strong>

              <div
                style={styles.email}
              >
                {u.email}
              </div>

              <div
                style={styles.role}
              >
                Role: {u.role}
              </div>
            </div>

            <div
              style={styles.actions}
            >
              <select
                style={
                  styles.dropdown
                }
                value={u.role}
                disabled={
                  u.role ===
                  "admin"
                }
                onChange={(e) =>
                  updateRole(
                    u._id,
                    e.target.value
                  )
                }
              >
                <option value="admin">
                  Admin
                </option>

                <option value="coach">
                  Coach
                </option>

                <option value="swimmer">
                  Swimmer
                </option>
              </select>

              <button
                style={{
                  ...styles.deleteBtn,
                  opacity:
                    u.role ===
                    "admin"
                      ? 0.5
                      : 1,
                }}
                disabled={
                  u.role ===
                  "admin"
                }
                onClick={() =>
                  deleteUser(
                    u._id
                  )
                }
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
    padding: 20,
  },

  title: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
  },

  stats: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 20,
  },

  statCard: {
    background: "#fff",
    padding: 20,
    minWidth: 180,
    borderRadius: 12,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  toolbar: {
    display: "flex",
    gap: 15,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    minWidth: 220,
  },

  card: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
    background: "#fff",
    borderRadius: 12,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  name: {
    fontSize: 18,
  },

  email: {
    color: "#555",
  },

  role: {
    color: "#777",
    fontSize: 14,
  },

  actions: {
    display: "flex",
    gap: 15,
    alignItems: "center",
  },

  dropdown: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    minWidth: 130,
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
};