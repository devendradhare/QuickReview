import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  async function logout() {
    try {
      setLoading(true);
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return { logout, loading };
};

export default useLogout;
