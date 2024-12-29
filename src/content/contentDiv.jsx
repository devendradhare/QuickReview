import React, { useState, useEffect } from "react";
import { useMyContext } from "./ContextProvider";
import styles from "./content.module.css";
import Navbar from "./components/navbar";

const ContentDiv = () => {
  console.log("rerendered 🌻");
  const { position } = useMyContext();

  const [count, setCount] = useState(() => {
    return localStorage.getItem("count") || 0;
  });
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
    localStorage.setItem("count", count);
  }, [count]);

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
        style={{
          padding: "10px",
          border: "1px solid rgba(100, 100, 100, 0.3)",
        }}
      >
        {/* <button
          onClick={() => setCount((p) => +p + 1)}
          className={styles.button}
        >{count}</button> */}
        <div className={styles.videoInfo}>VideoId: {videoId}</div>
      </div>
    </div>
  );
};

export default ContentDiv;
