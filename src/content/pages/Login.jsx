import React, { useState } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
import Button00 from "../components/buttons/Button00";
import LoadingButton00 from "../components/buttons/LoadingButton00";
import Input00 from "../components/inputs/Input00";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { _setRoute } = _useContext();
  const { login, loading } = useLogin();

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
      <h1
        style={{
          marginBottom: "1rem",
        }}
      >
        LOGIN
      </h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
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
        <hr style={{ width: "100%", margin: "0.5rem 0" }} />
        <Button00
          type="submit"
          value="Login"
          style={{ cursor: "pointer", background: "blue" }}
          loading={loading}
        >
          Login
        </Button00>
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
