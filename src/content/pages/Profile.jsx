import React from "react";
import defaultAvatar from "../assets/default_avatar.svg";
import { _useContext } from "../contextAPI/ContextProvider";
import useLogout from "../hooks/useLogout.jsx";

const Profile = () => {
  const { user, setUser, _setRoute } = _useContext();
  const { logout } = useLogout();

  async function handleLogout() {
    await logout();
  }

  async function goToLogin() {
    _setRoute("Login");
  }

  async function goToSignup() {
    _setRoute("Signup");
  }

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          borderBottom: "1px solid #444",
          paddingBottom: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3a3a60 0%, #23234a 100%)",
            borderRadius: "50%",
            width: "6rem",
            height: "6rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <img
            src={user?.photoURL || defaultAvatar}
            alt="User avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          {user ? (
            <>
              <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>
                {user.displayName}
              </h1>
              <p style={{ color: "#aaa", margin: "0.5rem 0 0 0" }}>
                {user.email || "No email provided"}
              </p>
              <p
                style={{
                  color: "#bbb",
                  margin: "0.5rem 0 0 0",
                  fontSize: "1rem",
                }}
              >
                {user.description || "Welcome to your profile!"}
              </p>
              <button
                onClick={handleLogout}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1.5rem",
                  background:
                    "linear-gradient(90deg, #ff5858 0%, #f09819 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(255,88,88,0.12)",
                  transition: "background 0.2s",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={goToLogin}
                style={{
                  padding: "0.5rem 1.5rem",
                  background:
                    "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(54,209,196,0.12)",
                  transition: "background 0.2s",
                }}
              >
                Login
              </button>
              <button
                onClick={goToSignup}
                style={{
                  padding: "0.5rem 1.5rem",
                  background:
                    "linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)",
                  color: "#23234a",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(255,179,71,0.12)",
                  transition: "background 0.2s",
                }}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 150px",
            background: "rgb(35 35 35)",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <span
            role="img"
            aria-label="notification"
            style={{ fontSize: "2rem" }}
          >
            🔔
          </span>
          <div style={{ marginTop: "0.5rem", color: "#fff" }}>
            Notifications
          </div>
        </div>
        <div
          style={{
            flex: "1 1 150px",
            background: "rgb(35 35 35)",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <span role="img" aria-label="message" style={{ fontSize: "2rem" }}>
            💬
          </span>
          <div style={{ marginTop: "0.5rem", color: "#fff" }}>Messages</div>
        </div>
        <div
          style={{
            flex: "1 1 150px",
            background: "rgb(35 35 35)",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <span role="img" aria-label="questions" style={{ fontSize: "2rem" }}>
            ❓
          </span>
          <div style={{ marginTop: "0.5rem", color: "#fff" }}>
            Your Questions
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
