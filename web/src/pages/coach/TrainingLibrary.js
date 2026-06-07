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
  const [search, setSearch] = useState("");
const [categoryFilter, setCategoryFilter] =
  useState("All");

const [levelFilter, setLevelFilter] =
  useState("All");

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
  const calculateDistance = (workout) => {
    return [
      ...(workout.warmup || []),
      ...(workout.mainSet || []),
      ...(workout.cooldown || []),
    ].reduce(
      (sum, item) =>
        sum + Number(item.distance || 0),
      0
    );
  };
  
  const deleteWorkout = async (id) => {
    if (!window.confirm("Delete workout?"))
      return;
  
    try {
      await API.delete(
        `/training-sets/${id}`
      );
  
      setWorkouts((prev) =>
        prev.filter(
          (w) => w._id !== id
        )
      );
  
      alert("Workout deleted");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };
  
  const duplicateWorkout = async (
    id
  ) => {
    try {
      await API.post(
        `/training-sets/duplicate/${id}`
      );
  
      fetchData();
  
      alert(
        "Workout duplicated"
      );
    } catch (err) {
      console.log(err);
      alert(
        "Duplicate failed"
      );
    }
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
  const filteredWorkouts =
  workouts.filter((w) => {
    const matchesSearch =
      w.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      categoryFilter === "All" ||
      w.category === categoryFilter;

    const matchesLevel =
      levelFilter === "All" ||
      w.level === levelFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel
    );
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Training Library</h2>
      <div style={styles.toolbar}>
  <input
    placeholder="Search workouts..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={styles.search}
  />

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(
        e.target.value
      )
    }
    style={styles.search}
  >
    <option>All</option>
    <option>Sprint</option>
    <option>Aerobic</option>
    <option>Endurance</option>
    <option>Technique</option>
    <option>Recovery</option>
    <option>Race Pace</option>
  </select>

  <select
    value={levelFilter}
    onChange={(e) =>
      setLevelFilter(
        e.target.value
      )
    }
    style={styles.search}
  >
    <option>All</option>
    <option>Beginner</option>
    <option>Intermediate</option>
    <option>Advanced</option>
  </select>
</div>
<div style={styles.stats}>
  <div style={styles.statCard}>
    <h2>{workouts.length}</h2>
    <p>Total Workouts</p>
  </div>

  <div style={styles.statCard}>
    <h2>
      {
        workouts.filter(
          (w) =>
            w.category ===
            "Sprint"
        ).length
      }
    </h2>
    <p>Sprint</p>
  </div>

  <div style={styles.statCard}>
    <h2>
      {
        workouts.filter(
          (w) =>
            w.level ===
            "Advanced"
        ).length
      }
    </h2>
    <p>Advanced</p>
  </div>
</div>
      {filteredWorkouts.length === 0 ? (
        <p>No workouts available</p>
      ) : (
        <div style={styles.grid}>
          {filteredWorkouts.map((w) => (
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
              <p style={styles.distance}>
  Distance:
  {calculateDistance(w)}m
</p>
              {}
              <div style={styles.actions}>
  <button
    style={styles.btnPrimary}
    onClick={() =>
      toggleExpand(w._id)
    }
  >
    {expanded === w._id
      ? "Hide"
      : "View"}
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

  <button
    style={styles.btnDuplicate}
    onClick={() =>
      duplicateWorkout(
        w._id
      )
    }
  >
    Duplicate
  </button>

  <button
    style={styles.btnDelete}
    onClick={() =>
      deleteWorkout(
        w._id
      )
    }
  >
    Delete
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
  },
  toolbar: {
    display: "flex",
    gap: 15,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  
  search: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  
  stats: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  
  statCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    minWidth: 180,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },
  
  distance: {
    marginTop: 6,
    fontWeight: "600",
    color: "#2563eb",
  },
  
  btnDuplicate: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  
  btnDelete: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};