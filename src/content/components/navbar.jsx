import "react";
import styles from "../content.module.css";
import default_avatar from "../images/default_avatar.svg";
import { _useContext } from "../contextAPI/ContextProvider.jsx";

const NavBar = () => {
  const { user, _setRoute } = _useContext();
  return (
    <div
      // className={styles.border}
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div
        onClick={() => _setRoute("Home")}
        style={{ border: "1px solid gray" }}
      >
        home
      </div>
      <div
        onClick={() => _setRoute("Notes")}
        style={{ border: "1px solid gray" }}
      >
        notes
      </div>
      <div onClick={() => _setRoute("Profile")} className={styles.border}>
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

export default NavBar;
