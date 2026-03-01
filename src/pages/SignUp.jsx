import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/auth/signup",
        { name, email, password }
      );

      console.log("SIGNUP RESPONSE 👉", res.data);

      // save token
      localStorage.setItem("token", res.data.token);

      // go to home
      navigate("/");
    } catch (err) {
      console.log("SIGNUP ERROR 👉", err.response?.data);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;