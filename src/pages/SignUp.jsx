import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "#f7f7f7",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#ffffff",
          padding: "32px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "20px",
            textAlign: "center",
            color: "#111827",
          }}
        >
          Create Account
        </h2>

        <label style={{ fontSize: "14px", fontWeight: "500" }}>
          Name
        </label>
        <input
          className="input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <label style={{ fontSize: "14px", fontWeight: "500" }}>
          Email
        </label>
        <input
          type="email"
          className="input"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <label style={{ fontSize: "14px", fontWeight: "500" }}>
          Password
        </label>
        <input
          type="password"
          className="input"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <button className="btn-primary" style={{ width: "100%" }}>
          Sign Up
        </button>

        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "16px",
            color: "#4b5563",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#fb7185", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;