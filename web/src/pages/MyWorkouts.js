import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/assign/my");
      setWorkouts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const completeWorkout = async (id) => {
    const feedback = prompt("Enter your feedback");
  
    if (!feedback) return;
  
    try {
      await API.put(`/assign/${id}/complete`, { feedback });
  
      alert("Workout completed ");
  
      fetchWorkouts(); 
    } catch (err) {
      console.log(err);
      alert("Error completing workout ");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Workouts</h2>

      {workouts.length === 0 ? (
        <p>No workouts assigned</p>
      ) : (
        <div style={styles.grid}>
          {workouts.map((w) => (
            <div key={w._id} style={styles.card}>
              <div key={w._id} style={styles.card}>
  <h3>{w.workoutId?.setName}</h3>

  <p>{w.workoutId?.description}</p>

  <p><b>Date:</b> {w.date}</p>

  <p><b>Status:</b> {w.status}</p>

  {w.status !== "completed" && (
    <button
      style={styles.btn}
      onClick={() => completeWorkout(w._id)}
    >
      Mark Complete
    </button>
  )}

  {w.status === "completed" && (
    <p style={{ color: "green" }}>✔ Completed</p>
  )}
</div>
              <p>{w.workoutId?.description}</p>
              <p><b>Date:</b> {w.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap"
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: 250
  },
  btn: {
    marginTop: 10,
    padding: "8px 12px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};