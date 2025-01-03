import React, { useEffect, useRef } from "react";
import { useMyContext } from "../contextAPI/ContextProvider";
// svgs
import closeIcon from "../images/close.svg";
import minIcon from "../images/minimize.svg";
import reloadIcon from "../images/reload.svg";

const Navbar = () => {
  const { position, setPosition, reloadExtension } = useMyContext();
  // References to handlers for removal
  const mouseMoveHandler = React.useRef(null);
  const mouseUpHandler = React.useRef(null);

  function handleMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    // Define handlers here to bind them to the `ref`
    mouseMoveHandler.current = (e) => {
      const prevX = position.x;
      const prevY = position.y;
      setPosition((prev) => ({
        x: prevX + mouseDownEvent.clientX - e.clientX,
        y: prevY + mouseDownEvent.clientY - e.clientY,
      }));
    };

    mouseUpHandler.current = () => {
      document.removeEventListener("mousemove", mouseMoveHandler.current);
      document.removeEventListener("mouseup", mouseUpHandler.current);
    };

    // Add event listeners
    document.addEventListener("mousemove", mouseMoveHandler.current);
    document.addEventListener("mouseup", mouseUpHandler.current);
  }

  useEffect(() => {
    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler.current);
      document.removeEventListener("mouseup", mouseUpHandler.current);
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ color: "white", fontSize: "12px", padding: "0 12px" }}>
        QuikReview
      </h1>
      <div style={{ cursor: "move" }} onMouseDown={handleMouseDown}>
        ...
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          padding: "0 4px",
        }}
      >
        <div>
          <img
            style={{ width: "16px", cursor: "pointer" }}
            src={reloadIcon}
            alt="reload icon"
            onClick={reloadExtension}
          />
        </div>
        <div>
          <img
            style={{ width: "16px", cursor: "pointer" }}
            src={minIcon}
            alt="minimize icon"
          />
        </div>
        {/* <div style={{ width: "16px" }}>
          <img src={closeIcon} alt="close icon" />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
