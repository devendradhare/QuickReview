import React, { useState, useEffect } from "react";
import loginWithGoogle from "./firebase/loginWithGoogle.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase/firebase.js";

import { useMyContext } from "./contextAPI/ContextProvider";
import styles from "./content.module.css";
import Navbar from "./components/navbar";
import SideBar from "./components/SideBar";

const ContentApp = () => {
  console.log("rerendered 🌻");

  const { position, user, setUser } = useMyContext();
  const [videoId, setVideoId] = useState(printVideoId());
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // _del - delete this useEffect
  useEffect(() => {
    console.log("----", formData);
  }, [formData]);

  function printVideoId() {
    let url = new URL(location.href);
    if (url.hostname !== "www.youtube.com") return "this is not youtube.com";
    let search = Object.fromEntries(url.searchParams);
    if (search.v) {
      return search.v;
    }
    return "no yt video is running";
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleDisplayNameSubmit(e) {
    e.preventDefault();

    try {
      // Update the displayName
      await updateProfile(user, {
        displayName: formData.displayName, // Replace with your desired username field
      });

      // Reload the user profile to fetch the updated data
      await user.reload();

      // Update the user state with the refreshed user object
      setUser(auth.currentUser); // auth.currentUser now contains the updated user
      console.log(
        "Display name updated successfully:",
        auth.currentUser.displayName
      );
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User logged in successfully : ", userCredential.user);
      setUser(userCredential.user);
    } catch (error) {
      // console.error("error: ", error, "code", error.code, "message", error.message );
      if (error.code === "auth/invalid-credential") {
        console.log("🎉");
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          console.log("New user created: ", userCredential.user);
          setUser(userCredential.user);
        } catch (signupError) {
          console.error("Error during signup: ", signupError);
        }
      }
    }
  }

  // Persist user authentication state across refreshes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in: ", currentUser);
        setUser(currentUser); // Restore user in state
      } else {
        console.log("No user is signed in.");
        setUser(null); // Clear user state
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      setVideoId(printVideoId());
    };
    // Create a MutationObserver to watch for changes in the document
    const observer = new MutationObserver(() => {
      handleUrlChange();
    });
    // Watch for changes in the history state, which can reflect a URL change
    observer.observe(document, { childList: true, subtree: true });
    // Run once when component mounts
    handleUrlChange();
    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div
      className={styles.container}
      style={{ right: position.x, bottom: position.y }}
    >
      <Navbar />
      <div
        className={styles.border}
        style={{
          display: "flex",
          height: "400px",
        }}
      >
        <SideBar />
        <div
          style={{
            padding: "10px",
            border: "1px solid rgba(100, 100, 100, 0.3)",
            flexGrow: "1",
          }}
        >
          {!user && (
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <input
                type="email"
                name="email"
                placeholder={"Email"}
                onChange={handleFormChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleFormChange}
                required
              />
              <input type="submit" value="Login" />
            </form>
          )}
          {user && !user.displayName && (
            <form onSubmit={handleDisplayNameSubmit} className={styles.form}>
              <input
                type="text"
                name="displayName"
                placeholder="Enter your name"
                // onChange={displayNameChange}
                onChange={handleFormChange}
                required
                minLength="3"
              />
              <input type="submit" value="submit" />
            </form>
          )}
          {/* <div className={styles.videoInfo}>VideoId: {videoId}</div> */}
        </div>
      </div>
    </div>
  );
};

export default ContentApp;
