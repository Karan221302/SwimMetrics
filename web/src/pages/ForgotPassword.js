import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submit = async () => {

    try {

      await API.post(
        "/auth/forgot-password",
        { email }
      );

      alert("Reset email sent");

    } catch (err) {

      alert(
        err.response?.data || "Error"
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Forgot Password</h2>

      <input
        placeholder="Enter Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={submit}>
        Send Reset Link
      </button>

    </div>
  );
}