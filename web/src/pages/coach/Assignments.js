import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function Assignments() {
  const { userId } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
    //eslint-disable-next-line
  }, [userId]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const url = userId
        ? `/assign/swimmer/${userId}`
        : "/assign";

        console.log("userId:", userId);
    console.log("url:", url);

      const res = await API.get(url);

      setAssignments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this assignment?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/assign/${id}`);

      setAssignments((prev) =>
        prev.filter((a) => a._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete assignment");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>
          {userId
            ? "Swimmer Assignments"
            : "All Assignments"}
        </h1>

        <div style={styles.statCard}>
          Total Assignments: {assignments.length}
        </div>
      </div>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <div style={styles.emptyCard}>
          <h3>No Assignments Found</h3>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Swimmer</th>
              <th style={styles.th}>Workout</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td style={styles.td}>
                  {a.swimmerId?.name || "Unknown"}
                </td>

                <td style={styles.td}>
                  {a.workoutId?.name ||
                    a.workoutId?.setName ||
                    "Workout"}
                </td>

                <td style={styles.td}>
                  {new Date(
                    a.date
                  ).toLocaleDateString()}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        a.status === "completed"
                          ? "#dcfce7"
                          : "#fef3c7",
                      color:
                        a.status === "completed"
                          ? "#166534"
                          : "#92400e",
                    }}
                  >
                    {a.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      deleteAssignment(a._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  statCard: {
    background: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
    fontWeight: "600",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  th: {
    background: "#1e293b",
    color: "#fff",
    padding: 14,
    textAlign: "left",
  },

  td: {
    padding: 14,
    borderBottom: "1px solid #e5e7eb",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  emptyCard: {
    background: "#fff",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },
};