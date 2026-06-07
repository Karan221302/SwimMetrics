import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Swimmers() {
  const [swimmers, setSwimmers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSwimmers();
  }, []);

  const fetchSwimmers = async () => {
    try {
      const res = await API.get("/users/swimmers");
      setSwimmers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Swimmers</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {swimmers.map((s) => (
            <tr key={s._id} style={styles.row}>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>{s.email}</td>

              <td style={styles.td}>
                <div style={styles.actions}>
                  <button
                    style={styles.btn}
                    onClick={() => navigate(`/logs/${s._id}`)}
                  >
                    View Logs
                  </button>

                  <button
                    style={styles.btnSecondary}
                    onClick={() => navigate(`/analytics/${s._id}`)}
                  >
                    View Analytics
                  </button>
                  <button
  style={styles.btnWarning}
  onClick={() =>
    navigate(`/assignments/${s._id}`)
  }
>
  Assignments
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: 20
  },

  title: {
    marginBottom: 20
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  th: {
    background: "#1e293b",
    color: "white",
    padding: 12,
    textAlign: "left"
  },

  td: {
    padding: 12,
    borderBottom: "1px solid #eee"
  },

  row: {
    transition: "0.2s"
  },

  actions: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },

  btn: {
    padding: "6px 12px",
    minWidth: 110,
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  btnSecondary: {
    padding: "6px 12px",
    minWidth: 130,
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  btnWarning: {
    padding: "6px 12px",
    minWidth: 120,
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
  
};