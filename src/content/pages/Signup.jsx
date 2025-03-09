import React, { useState } from "react";
import { _useContext } from "../contextAPI/ContextProvider";

const Signup = () => {
  const { _setRoute, signin } = _useContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSignin(e) {
    e.preventDefault();
    await signin(formData);
  }

  function goToLogin() {
    _setRoute("Login");
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
      <h1>SIGNUP</h1>
      <form
        onSubmit={handleSignin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="profilePic">Profile Picture (optional)</label>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          onChange={handleChange}
          style={{ cursor: "pointer" }}
        />

        <input type="submit" value="Signin" style={{ cursor: "pointer" }} />
      </form>
      <p>
        Already have an account?
        <span
          style={{
            color: "rgb(86, 86, 219)",
            cursor: "pointer",
            margin: "0 4px",
          }}
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
