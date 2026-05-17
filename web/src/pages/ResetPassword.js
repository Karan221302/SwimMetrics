import { useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

export default function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const submit = async () => {

    try {

      await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert("Password reset successful");

    } catch (err) {

      alert(
        err.response?.data ||
        "Invalid token"
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={submit}>
        Reset Password
      </button>

    </div>
  );
}