import React from "react";
import LoadingButton00 from "../components/buttons/LoadingButton00";
import { _useContext } from "../contextAPI/ContextProvider";

const Empty = () => {
  const { _setRoute } = _useContext();
  const handleContributeQuestion = () => {
    _setRoute("ContributeQue");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        minHeight: "60vh",
        padding: "2.5rem 1rem",
        color: "#f5f5f5",
        borderRadius: "18px",
        margin: "2rem auto",
        maxWidth: "420px",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.12)",
          borderRadius: "50%",
          width: "5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.5rem",
        }}
      >
        <span role="img" aria-label="empty" style={{ fontSize: "2.5rem" }}>
          📭
        </span>
      </div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          margin: 0,
          letterSpacing: "0.5px",
        }}
      >
        No Questions Available
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          color: "#b0b0b0",
          margin: 0,
        }}
      >
        There are currently no questions for this video.
      </p>
      <div
        style={{
          width: "100%",
          borderTop: "1px solid #39397a",
          margin: "1rem 0",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "1.05rem",
          color: "#b0b0b0",
          margin: 0,
        }}
      >
        Want to help? You can contribute or request AI-generated questions!
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            background: "rgb(35 35 35)",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
          onClick={handleContributeQuestion}
        >
          Contribute Question
        </button>
        <LoadingButton00
          style={{
            background: "rgb(35 35 35)",
            color: "#23234a",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
          onClick={() => _setRoute("PromptPage")}
        >
          Request AI Questions
        </LoadingButton00>
      </div>
    </div>
  );
};

export default Empty;
