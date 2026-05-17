import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AssignWorkout() {
  const [swimmers, setSwimmers] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const [data, setData] = useState({
    swimmerId: "",
    workoutId: "",
    date: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [swimmerRes, workoutRes] = await Promise.all([
        API.get("/users/swimmers"),
        API.get("/training-sets")
      ]);

      setSwimmers(swimmerRes.data);
      setWorkouts(workoutRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const assignWorkout = async () => {
    if (!data.swimmerId || !data.workoutId || !data.date) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/assign", data);
      alert("Workout Assigned ");

      setData({
        swimmerId: "",
        workoutId: "",
        date: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error ");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Assign Workout</h2>

      <div style={styles.card}>

        {}
        <div style={styles.field}>
          <label style={styles.label}>Select Swimmer</label>
          <select
            style={styles.input}
            value={data.swimmerId}
            onChange={(e) =>
              setData({ ...data, swimmerId: e.target.value })
            }
          >
            <option value="">Choose swimmer</option>
            {swimmers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {}
        <div style={styles.field}>
          <label style={styles.label}>Select Workout</label>
          <select
            style={styles.input}
            value={data.workoutId}
            onChange={(e) =>
              setData({ ...data, workoutId: e.target.value })
            }
          >
            <option value="">Choose workout</option>
            {workouts.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {}
        <div style={styles.field}>
          <label style={styles.label}>Select Date</label>
          <input
            type="date"
            style={styles.input}
            value={data.date}
            onChange={(e) =>
              setData({ ...data, date: e.target.value })
            }
          />
        </div>

        {}
        <button style={styles.button} onClick={assignWorkout}>
          Assign Workout
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  title: {
    marginBottom: 20
  },

  card: {
    width: 400,
    background: "white",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15
  },

  field: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    color: "#555"
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14
  },

  button: {
    marginTop: 10,
    padding: 12,
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s"
  }
};