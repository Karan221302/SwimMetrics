import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "swimmer"
  });

  const submit = async () => {

    if (
      !data.name ||
      !data.email ||
      !data.password
    ) {
      return alert(
        "All fields required"
      );
    }
  
    if (
      data.password.length < 6
    ) {
      return alert(
        "Password must be at least 6 characters"
      );
    }
  
    try {
      await API.post("/users", data);
  
      alert(
        "User created successfully"
      );
  
      navigate("/users");
  
    } catch (err) {
      console.log(err);
  
      alert(
        err.response?.data ||
        "Error creating user"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add User</h2>

      <input
        style={styles.input}
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <select
        style={styles.input}
        onChange={(e) => setData({ ...data, role: e.target.value })}
      >
        <option value="swimmer">Swimmer</option>
        <option value="coach">Coach</option>
      </select>

      <button style={styles.button} onClick={submit}>
        Create User
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  input: {
    display: "block",
    marginTop: 15,
    padding: 12,
    width: 300,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  button: {
    marginTop: 20,
    padding: 12,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};