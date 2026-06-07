import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function SwimmerLogs() {
  const { userId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
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

  const totalDistanceKm =
  logs.reduce((sum, log) => {
    const workout = log.assignment?.workoutId;

    if (!workout) return sum;

    const warmup =
      workout.warmup?.reduce(
        (s, x) => s + (x.distance || 0),
        0
      ) || 0;

    const mainSet =
      workout.mainSet?.reduce(
        (s, x) => s + (x.distance || 0),
        0
      ) || 0;

    const cooldown =
      workout.cooldown?.reduce(
        (s, x) => s + (x.distance || 0),
        0
      ) || 0;

    return sum + warmup + mainSet + cooldown;
  }, 0) / 1000;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Swimmer Logs</h2>

      {/* Summary Cards */}
      <div style={styles.summary}>
        <div style={styles.stat}>
          <h2>{logs.length}</h2>
          <p>Total Sessions</p>
        </div>

        <div style={styles.stat}>
  <h3>{totalDistanceKm.toFixed(2)} km</h3>
  <p>Total Distance</p>
</div>
      </div>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} style={styles.card}>
            <div style={styles.header}>
              <h3>
                {log.assignment?.workoutId?.name ||
                  log.assignment?.workoutId?.setName ||
                  "Workout"}
              </h3>

              <span style={styles.date}>
                {new Date(log.createdAt).toLocaleDateString()}
              </span>
            </div>

            <hr />

            <h4>Main Set Timings</h4>

            {log.mainSetLogs?.length > 0 ? (
              log.mainSetLogs.map((set, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <p>
                    <b>Set {i + 1}</b>
                  </p>

                  <div>
                    {set.reps?.map((time, j) => (
                      <span key={j} style={styles.time}>
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No timing data</p>
            )}

            <div style={styles.feedbackBox}>
              <strong>Feedback:</strong>{" "}
              {log.notes || "No feedback provided"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  summary: {
    display: "flex",
    gap: 20,
    marginBottom: 25,
    flexWrap: "wrap",
  },

  stat: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    minWidth: 220,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  date: {
    color: "#64748b",
    fontSize: 14,
  },

  time: {
    display: "inline-block",
    marginRight: 8,
    marginBottom: 8,
    padding: "6px 10px",
    background: "#e0f2fe",
    borderRadius: 6,
    fontWeight: "500",
  },

  feedbackBox: {
    marginTop: 15,
    padding: 12,
    background: "#f8fafc",
    borderRadius: 8,
  },
};