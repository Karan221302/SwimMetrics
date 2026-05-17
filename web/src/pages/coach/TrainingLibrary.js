import { useEffect, useState } from "react";
import API from "../../services/api";

export default function TrainingLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [swimmers, setSwimmers] = useState([]);

  const [assignData, setAssignData] = useState({
    swimmerId: "",
    date: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

      const id = setInterval(fetchData, 15000);
      return () => clearInterval(id);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [workoutsRes, swimmersRes] = await Promise.all([
        API.get("/training-sets"),
        API.get("/users/swimmers")
      ]);

      setWorkouts(workoutsRes.data);
      setSwimmers(swimmersRes.data);

    } catch (err) {
      console.log(err);
      alert("Error loading data ");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const assignWorkout = async () => {
    if (!assignData.swimmerId || !assignData.date) {
      return alert("Select swimmer and date");
    }

    try {
      await API.post("/assign", {
        swimmerId: assignData.swimmerId,
        workoutId: selectedWorkout._id,
        date: assignData.date
      });

      alert("Workout Assigned ");

      setShowModal(false);
      setAssignData({ swimmerId: "", date: "" });

    } catch (err) {
      console.log(err);
      alert("Error assigning workout ");
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading workouts...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Training Library</h2>

      {workouts.length === 0 ? (
        <p>No workouts available</p>
      ) : (
        <div style={styles.grid}>
          {workouts.map((w) => (
            <div
              key={w._id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {}
              <div style={styles.header}>
                <h3>{w.name}</h3>
                <span style={styles.badge}>{w.category}</span>
              </div>

              <p style={styles.level}>Level: {w.level}</p>

              {}
              <div style={styles.actions}>
                <button
                  style={styles.btnPrimary}
                  onClick={() => toggleExpand(w._id)}
                >
                  {expanded === w._id ? "Hide" : "View"}
                </button>

                <button
                  style={styles.btnSecondary}
                  onClick={() => {
                    setSelectedWorkout(w);
                    setShowModal(true);
                  }}
                >
                  Assign
                </button>
              </div>

              {}
              {expanded === w._id && (
                <div style={styles.details}>
                  <Section title="Warmup" data={w.warmup} />
                  <Section title="Main Set" data={w.mainSet} />
                  <Section title="Cooldown" data={w.cooldown} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Assign Workout</h3>

            <p style={{ fontWeight: "bold" }}>
              {selectedWorkout?.name}
            </p>

            <select
              style={styles.input}
              value={assignData.swimmerId}
              onChange={(e) =>
                setAssignData({ ...assignData, swimmerId: e.target.value })
              }
            >
              <option value="">Select Swimmer</option>
              {swimmers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              style={styles.input}
              value={assignData.date}
              onChange={(e) =>
                setAssignData({ ...assignData, date: e.target.value })
              }
            />

            <div style={styles.modalActions}>
              <button style={styles.btnPrimary} onClick={assignWorkout}>
                Assign
              </button>

              <button
                style={styles.btnCancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={styles.section}>
      <h4>{title}</h4>
      {data.map((item, i) => (
        <p key={i} style={styles.item}>
          • {item.description} ({item.distance}m)
        </p>
      ))}
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
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 20
  },
  card: {
    background: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.2s"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    background: "#3b82f6",
    color: "white",
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 12
  },
  level: {
    marginTop: 8,
    color: "#555"
  },
  actions: {
    marginTop: 15,
    display: "flex",
    gap: 10
  },
  btnPrimary: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
  },
  btnSecondary: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
  },
  btnCancel: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
  },
  details: {
    marginTop: 15,
    borderTop: "1px solid #eee",
    paddingTop: 10
  },
  section: {
    marginBottom: 10
  },
  item: {
    fontSize: 14,
    color: "#444"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    width: 320
  },
  input: {
    width: "100%",
    padding: 8,
    marginTop: 10,
    marginBottom: 10
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between"
  }
};