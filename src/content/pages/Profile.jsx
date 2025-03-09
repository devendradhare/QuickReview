import React from "react";
import defaultAvatar from "../images/default_avatar.svg";
import { _useContext } from "../contextAPI/ContextProvider";

const Profile = () => {
  const { user, setUser, _setRoute, logout } = _useContext();

  async function handleLogout() {
    await logout();
  }

  async function goToLogin() {
    console.log("goToLogin called");
    _setRoute("Login");
  }

  async function goToSignup() {
    console.log("goToSignup called");
    _setRoute("Signup");
  }

  return (
    <section>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            padding: "0 0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={user?.photoURL}
            alt="default avatar"
            style={{ width: "4rem" }}
          />
        </div>
        <div
          style={{
            border: "1px solid gray",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user ? (
            <>
              <h1>{user.displayName}</h1>
              <p>user discription</p>
            </>
          ) : (
            <>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={goToLogin}
              >
                Login
              </div>
              <div style={{ border: "1px solid gray", margin: "0 4px" }}></div>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={goToSignup}
              >
                Signup
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div>notification</div>
        <div>message</div>
        <div>your questions</div>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    </section>
  );
};

export default Profile;
