import { useState } from "react";
import API from "../services/api";

export default function AddMeets() {
  const [data, setData] = useState({
    meetName: "",
    event: "",
    time: "",
    rank: ""
  });

  const submit = async () => {
    await API.post("/meet", data);
    alert("Meet Added");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Meet Result</h2>

      <input placeholder="Meet Name"
        onChange={e => setData({ ...data, meetName: e.target.value })} />
      <br/><br/>

      <input placeholder="Event (100m Freestyle)"
        onChange={e => setData({ ...data, event: e.target.value })} />
      <br/><br/>

      <input placeholder="Time"
        onChange={e => setData({ ...data, time: e.target.value })} />
      <br/><br/>

      <input placeholder="Rank"
        onChange={e => setData({ ...data, rank: e.target.value })} />

      <br/><br/>
      <button onClick={submit}>Save</button>
    </div>
  );
}