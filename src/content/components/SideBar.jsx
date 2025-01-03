import React from "react";
import styles from "../content.module.css";
import default_avatar from "../images/default_avatar.svg";
import { useMyContext } from "../contextAPI/ContextProvider.jsx";

const SideBar = () => {
  const { user } = useMyContext();
  return (
    <div
      className={styles.border}
      style={{ display: "flex", flexDirection: "column-reverse" }}
    >
      <div className={styles.border}>
        <img
          src={user?.photoURL || default_avatar}
          alt="user profile"
          style={{
            width: "32px",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
