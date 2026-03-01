import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/auth/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE 👉", res.data);

      // save token
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR 👉", err.response?.data);
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;