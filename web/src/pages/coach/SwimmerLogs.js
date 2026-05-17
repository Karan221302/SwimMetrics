import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function SwimmerLogs() {
  const { userId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, [userId]);

  const fetchLogs = async () => {
    try {
      const res = await API.get(`/logs?swimmerId=${userId}`);

      console.log("LOGS:", res.data);

      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Swimmer Logs</h2>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} style={styles.card}>
            <h3>
              {log.assignment?.workoutId?.name || "Workout"}
            </h3>

            <p>
              <b>Date:</b>{" "}
              {new Date(log.createdAt).toLocaleDateString()}
            </p>

            <h4>Main Set Timings:</h4>

            {log.mainSetLogs.map((set, i) => (
              <div key={i}>
                <p><b>Set {i + 1}</b></p>

                {set.reps.map((time, j) => (
                  <span key={j} style={styles.time}>
                    {time}
                  </span>
                ))}
              </div>
            ))}

            <p>
              <b>Feedback:</b> {log.notes || "No feedback"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  time: {
    display: "inline-block",
    marginRight: 8,
    padding: "4px 8px",
    background: "#e0f2fe",
    borderRadius: 5
  }
};