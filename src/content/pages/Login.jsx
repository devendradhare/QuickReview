import React, { useState } from "react";
import { _useContext } from "../contextAPI/ContextProvider";

const Login = () => {
  const { _setRoute, login } = _useContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    console.log("Form Data:", formData);
    await login(formData);
  }

  function goToSignup() {
    _setRoute("Signup");
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>LOGIN</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Login" style={{ cursor: "pointer" }} />
      </form>
      <p>
        Don't have any account?
        <span
          style={{
            color: "rgb(86, 86, 219)",
            cursor: "pointer",
            margin: "0 4px",
          }}
          onClick={goToSignup}
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
