import React, { useState } from "react";
import { auth, firestore } from "../firebase/firebase.js";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { _useContext } from "../contextAPI/ContextProvider";

const useSignup = () => {
  const { setUser } = _useContext();
  const [loading, setLoading] = useState(false);

  const signup = async (formData) => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      return { error: "Please fill all the fields" };
    }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return { error: "Password do not match" };
    }
    if (password.length < 6) {
      alert("Password must have at least 6 characters");
      return { error: "Password must have at least 6 characters" };
    }
    setLoading(true);
    try {
      const usersCollection = collection(firestore, "user");
      const userQuery = query(
        usersCollection,
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        alert("Username is already taken");
        setLoading(false);
        return { error: "Username is already taken" };
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("New user created: ", userCredential.user);
      const newUser = userCredential.user;
      let photoURL = `https://avatar.iran.liara.run/username?username=${username}`;
      await updateProfile(newUser, {
        displayName: username,
        photoURL,
      });
      await setDoc(doc(firestore, "user", newUser.uid), {
        uid: newUser.uid,
        username: username,
        photoURL,
      });
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      console.error("Error during signup: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
