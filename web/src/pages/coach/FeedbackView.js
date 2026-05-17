import { useEffect, useState } from "react";
import API from "../../services/api";

export default function FeedbackView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/assign");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workout Feedback</h2>

      <div style={styles.grid}>
        {data.map((d) => (
          <div
          key={d._id}
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            
            <div style={styles.header}>
              <h3>{d.swimmerId?.name}</h3>
              <span style={{
                ...styles.status,
                background:
                  d.status === "completed" ? "#22c55e" : "#f59e0b"
              }}>
                {d.status}
              </span>
            </div>

            <p style={styles.workout}>
               {d.workoutId?.setName}
            </p>

            <p style={styles.date}>
               {d.date}
            </p>

            <div style={styles.feedbackBox}>
              {d.feedback
                ? d.feedback
                : "No feedback provided"}
            </div>

          </div>
        ))}
      </div>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  status: {
    padding: "4px 10px",
    borderRadius: 20,
    color: "white",
    fontSize: 12,
    textTransform: "capitalize"
  },
  workout: {
    marginTop: 10,
    fontWeight: "500"
  },
  date: {
    fontSize: 14,
    color: "#64748b"
  },
  feedbackBox: {
    marginTop: 12,
    padding: 10,
    background: "#f1f5f9",
    borderRadius: 8,
    fontSize: 14
  }
};
