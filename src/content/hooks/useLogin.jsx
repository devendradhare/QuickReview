import React, { useState } from "react";
import { auth, firestore } from "../firebase/firebase.js";
import { _useContext } from "../contextAPI/ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";

const useLogin = () => {
  const { setUser } = _useContext();
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return { error: "Please fill all the fields" };
    }
    if (password.length < 6) {
      alert("Password must have at least 6 characters");
      return { error: "Password must have at least 6 characters" };
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully : ", userCredential.user);
      setUser(userCredential.user);
    } catch (error) {
      console.error("error: ", error, "message", error.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
