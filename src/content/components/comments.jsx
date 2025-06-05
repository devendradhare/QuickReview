import React from "react";

const Comments = ({ setToggleComments }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100%",
        background: "rgb(45,45,45)",
        zIndex: 10,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
      }}
    >
      comments section
      <br />
      comming soon
      <button
        style={{
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "4rem",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setToggleComments((prev) => !prev);
        }}
      >
        X
      </button>
    </div>
  );
};

export default Comments;
