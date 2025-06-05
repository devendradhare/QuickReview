import React, { useEffect, useRef } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
// svgs
import closeIcon from "../assets/icons/close.svg";
import minIcon from "../assets/icons/minimize.svg";
import reloadIcon from "../assets/icons/reload.svg";
import homeIcon from "../assets/icons/home.svg";
import avatarIcon from "../assets/default_avatar.svg";

const MenuBar = () => {
  const { position, setPosition, reloadExtension, setIsMinimize, _setRoute } =
    _useContext();
  // References to handlers for removal
  const mouseMoveHandler = React.useRef(null);
  const mouseUpHandler = React.useRef(null);

  const handleMinimize = () => {
    console.log("Minimize clicked");
    setIsMinimize(true);
  };

  const handleHomeClick = () => {
    console.log("home button clicked");
    _setRoute("QuestionsPage");
  };

  function handleMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    // Define handlers here to bind them to the `ref`
    mouseMoveHandler.current = (e) => {
      const prevX = position.x;
      const prevY = position.y;
      setPosition((prev) => ({
        x: prevX + mouseDownEvent.clientX - e.clientX,
        // y: prevY + mouseDownEvent.clientY - e.clientY,
        y: prevY,
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
        paddingTop: "0.5rem",
      }}
    >
      <h1 style={{ fontSize: "12px", padding: "0 5px" }}>
        QuickReview (Beta)
      </h1>
      <div style={{ cursor: "move" }} onMouseDown={handleMouseDown}>
        
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
        {/* profile button */}
        <div>
          <img
            style={{ width: "16px", cursor: "pointer", strockColor: "white" }}
            src={avatarIcon}
            alt="reload icon"
            onClick={() => _setRoute("Profile")}
          />
        </div>
        {/* home button */}
        <div>
          <img
            style={{ width: "16px", cursor: "pointer", strockColor: "white" }}
            src={homeIcon}
            alt="reload icon"
            onClick={handleHomeClick}
          />
        </div>
        {/* reload button */}
        {/* <div>
          <img
            style={{ width: "16px", cursor: "pointer" }}
            src={reloadIcon}
            alt="reload icon"
            onClick={reloadExtension}
          />
        </div> */}
        {/* minimize button */}
        <div>
          <img
            style={{ width: "16px", cursor: "pointer" }}
            src={minIcon}
            alt="minimize icon"
            onClick={() => handleMinimize()}
          />
        </div>
        {/* <div style={{ width: "16px" }}>
          <img src={closeIcon} alt="close icon" />
        </div> */}
      </div>
    </div>
  );
};

export default MenuBar;
