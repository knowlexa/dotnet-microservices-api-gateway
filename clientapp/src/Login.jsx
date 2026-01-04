import React, { useState } from "react";
import { login, setToken } from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const token = await login(username, password);
      setToken(token);
      onLogin?.();
    } catch (ex) {
      setErr(ex.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Username</label><br />
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </div>
      {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
    </form>
  );
}
