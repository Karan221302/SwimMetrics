import { useState } from "react";
import API from "../services/api";

export default function AddTraining() {
  const [data, setData] = useState({
    stroke: "",
    distance: "",
    time: ""
  });

  const submit = async () => {
    try {
      await API.post("/training", data);
      alert("Training Saved");
    } catch {
      alert("Error");
    }
  };

  return (
    <div style={{
      padding: 30,
      maxWidth: 400,
      margin: "auto",
      background: "white",
      borderRadius: 10,
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
    }}>
      <h2>Add Training</h2>

      {}
      <select
        onChange={(e) => setData({ ...data, stroke: e.target.value })}
      >
        <option>Select Stroke</option>
        <option>Freestyle</option>
        <option>Backstroke</option>
        <option>Breaststroke</option>
        <option>Butterfly</option>
      </select>

      <br/><br/>

      {}
      <select
        onChange={(e) => setData({ ...data, distance: e.target.value })}
      >
        <option>Select Distance</option>
        <option>50</option>
        <option>100</option>
        <option>200</option>
        <option>400</option>
        <option>800</option>
        <option>1500</option>
      </select>

      <br/><br/>

      {}
      <input
        placeholder="MM:SS:MS"
        onChange={(e) => setData({ ...data, time: e.target.value })}
      />

      <br/><br/>

      <button onClick={submit}>Save Training</button>
    </div>
  );
}