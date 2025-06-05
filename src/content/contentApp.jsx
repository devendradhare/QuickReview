import React, { useState, useEffect } from "react";
import styles from "./content.module.css";
// context
import { _useContext } from "./contextAPI/ContextProvider";
// components
import MenuBar from "./components/MenuBar";
// pages
import PageRouteManager from "./pages/PageRouteManager";

const ContentApp = () => {
  const { position, isMinimize, setIsMinimize, _route, _setRoute } =
    _useContext();
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
    const observer = new MutationObserver(() => {
      handleUrlChange();
    });
    observer.observe(document, { childList: true, subtree: true });
    handleUrlChange();
    return () => {
      observer.disconnect();
    };
  }, []);

  if (isMinimize) {
    return (
      <div
        className={styles.container}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          bottom: "15px",
          right: "15px",
          backgroundColor: "rgba(45, 45, 45, 1)",
          fontSize: "1.5rem",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
        onClick={() => setIsMinimize(false)}
      >
        Quick Review (Beta)
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MenuBar />
      <div
        style={{
          flexGrow: 1,
          overflow: "visible",
        }}
      >
        <PageRouteManager />
      </div>
    </div>
  );
};

export default ContentApp;
