import React, { useState } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
import Button00 from "../components/buttons/Button00";
import Input00 from "../components/inputs/Input00";
import useSignup from "../hooks/useSignup";
const Signup = () => {
  const { _setRoute, signin } = _useContext();
  const { loading, signup } = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSignup(e) {
    e.preventDefault();
    await signup(formData);
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
      <h1 style={{ marginBottom: "2rem" }}>SIGNUP</h1>
      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* <label htmlFor="username" style={{ marginTop: "0.5rem" }}>
          Username
        </label> */}
        <Input00
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="email" style={{ marginTop: "0.5rem" }}>
          Email
        </label> */}
        <Input00
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="password" style={{ marginTop: "0.5rem" }}>
          Password
        </label> */}
        <Input00
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="confirmPassword" style={{ marginTop: "0.5rem" }}>
          Confirm Password
        </label> */}
        <Input00
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <hr style={{ width: "100%", margin: "0.5rem 0" }} />

        <Button00
          type="submit"
          value="Signin"
          style={{ backgroundColor: "blue" }}
        >
          {loading ? "Loading..." : "Signup"}
        </Button00>
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
