import React, { useState, useEffect } from "react";
// context
import { _useContext } from "./contextAPI/ContextProvider";
// components
import styles from "./content.module.css";
import MenuBar from "./components/MenuBar";
import NavBar from "./components/NavBar";
// pages
import PageRouteManager from "./pages/PageRouteManager";

const ContentApp = () => {
  console.log("rerendered 🌻");

  const { position, isMinimize, setIsMinimize } = _useContext();
  const [videoId, setVideoId] = useState(printVideoId());

  function printVideoId() {
    let url = new URL(location.href);
    if (url.hostname !== "www.youtube.com") return "this is not youtube.com";
    let search = Object.fromEntries(url.searchParams);
    if (search.v) {
      return search.v;
    }
    return "no yt video is running";
  }

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

  if (isMinimize) {
    return (
      <div
        className={styles.container}
        style={{
          // border: "1px solid white",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer"
        }}
        onClick={() => setIsMinimize(false)}
      >
        min window
      </div>
    );
  }
  return (
    <div
      className={styles.container}
      style={{ right: position.x, bottom: position.y }}
    >
      <MenuBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(100, 100, 100, 0.3)",
            flexGrow: "1",
            height: "100px",
          }}
        >
          <PageRouteManager />
          {/* <div className={styles.videoInfo}>VideoId: {videoId}</div> */}
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default ContentApp;
