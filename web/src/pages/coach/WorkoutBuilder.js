import { useState } from "react";
import API from "../../services/api";

export default function WorkoutBuilder() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Sprint");
  const [level, setLevel] = useState("Beginner");

  const [warmup, setWarmup] = useState([]);
  const [mainSet, setMainSet] = useState([]);
  const [cooldown, setCooldown] = useState([]);

  const addSet = (setter) => {
    setter((prev) => [
      ...prev,
      {
        description: "",
        distance: "",
      },
    ]);
  };

  const updateSet = (
    setter,
    index,
    field,
    value
  ) => {
    setter((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const removeSet = (setter, index) => {
    setter((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const calculateDistance = (sets) =>
    sets.reduce(
      (sum, item) =>
        sum + Number(item.distance || 0),
      0
    );

  const warmupDistance =
    calculateDistance(warmup);

  const mainDistance =
    calculateDistance(mainSet);

  const cooldownDistance =
    calculateDistance(cooldown);

  const totalDistance =
    warmupDistance +
    mainDistance +
    cooldownDistance;

  const saveWorkout = async () => {
    try {
      if (!name.trim()) {
        return alert(
          "Please enter workout name"
        );
      }

      const payload = {
        name,
        category,
        level,

        warmup: warmup.map((s) => ({
          description: s.description,
          distance: Number(s.distance),
        })),

        mainSet: mainSet.map((s) => ({
          description: s.description,
          distance: Number(s.distance),
        })),

        cooldown: cooldown.map((s) => ({
          description: s.description,
          distance: Number(s.distance),
        })),
      };

      await API.post(
        "/training-sets",
        payload
      );

      alert(
        "Workout created successfully"
      );

      setName("");
      setCategory("Sprint");
      setLevel("Beginner");

      setWarmup([]);
      setMainSet([]);
      setCooldown([]);

    } catch (err) {
      console.log(err);
      alert("Error saving workout");
    }
  };

  const renderSection = (
    title,
    data,
    setter
  ) => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h3>{title}</h3>

        <button
          style={styles.addBtn}
          onClick={() =>
            addSet(setter)
          }
        >
          + Add Set
        </button>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          style={styles.setRow}
        >
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              updateSet(
                setter,
                index,
                "description",
                e.target.value
              )
            }
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Distance"
            value={item.distance}
            onChange={(e) =>
              updateSet(
                setter,
                index,
                "distance",
                e.target.value
              )
            }
            style={styles.distanceInput}
          />

          <button
            style={styles.deleteBtn}
            onClick={() =>
              removeSet(
                setter,
                index
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <h1>Workout Builder</h1>

      <div style={styles.card}>
        <input
          placeholder="Workout Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={styles.nameInput}
        />

        <div style={styles.row}>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            style={styles.select}
          >
            <option>Sprint</option>
            <option>Aerobic</option>
            <option>Endurance</option>
            <option>Technique</option>
            <option>Recovery</option>
            <option>Race Pace</option>
          </select>

          <select
            value={level}
            onChange={(e) =>
              setLevel(
                e.target.value
              )
            }
            style={styles.select}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {renderSection(
        "Warmup",
        warmup,
        setWarmup
      )}

      {renderSection(
        "Main Set",
        mainSet,
        setMainSet
      )}

      {renderSection(
        "Cooldown",
        cooldown,
        setCooldown
      )}

      <div style={styles.summary}>
        <h2>Workout Summary</h2>

        <p>
          Warmup Distance:
          <strong>
            {" "}
            {warmupDistance}m
          </strong>
        </p>

        <p>
          Main Set Distance:
          <strong>
            {" "}
            {mainDistance}m
          </strong>
        </p>

        <p>
          Cooldown Distance:
          <strong>
            {" "}
            {cooldownDistance}m
          </strong>
        </p>

        <hr />

        <h2>
          Total Distance:
          {totalDistance}m
        </h2>
      </div>

      <button
        style={styles.saveBtn}
        onClick={saveWorkout}
      >
        Save Workout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  nameInput: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  row: {
    display: "flex",
    gap: 15,
  },

  select: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  setRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  distanceInput: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  addBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },

  summary: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
  },

  saveBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: 10,
    fontSize: 16,
    cursor: "pointer",
  },
};