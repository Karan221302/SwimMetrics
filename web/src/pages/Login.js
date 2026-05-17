import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
  
      console.log("LOGIN RESPONSE:", res.data); 
  
      localStorage.setItem("token", res.data.token);
  
      navigate("/dashboard");
  
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>

      {}
      <div style={styles.left}>
  <img src={Logo} alt="logo" style={styles.logoImg} />
  <p style={styles.tagline}>Track • Train • Improve</p>
</div>

      {}
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          style={styles.forgot}
          onClick={()=>navigate("/forgot-password")}>
            Forget Password?
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) => e.target.style.opacity = 0.9}
          onMouseLeave={(e) => e.target.style.opacity = 1}
          onClick={login}
        >
          Login
        </button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    color: "white"
  },

  left: {
    flex: 1.5, 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40
  },

  logoImg: {
    width: "70%",  
    maxWidth: 500,
    marginBottom: 20
  },

  tagline: {
    fontSize: "20px",
    opacity: 0.85,
    letterSpacing: 1
  },

  card: {
    flex: 1,
    background: "white",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 50px",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    boxShadow: "-5px 0 20px rgba(0,0,0,0.2)"
  },

  input: {
    marginTop: 15,
    padding: 14,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    transition: "0.2s"
  },

  button: {
    marginTop: 25,
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    transition: "0.2s"
  },
  forgot: {
    marginTop: 10,
    color:"#256eb",
    cursor:"pointer",
    fontSize: 14
  }
};