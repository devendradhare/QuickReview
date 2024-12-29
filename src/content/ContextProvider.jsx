import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const useMyContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("quickReview_Position")) || { x: 15, y: 15 }
  );

  useEffect(() => {
    localStorage.setItem("quickReview_Position", JSON.stringify(position));
  }, [position]);

  function reloadExtension() {
    chrome.runtime.sendMessage({ action: "reloadExtension" });
  }
  return (
    <Context.Provider value={{ position, setPosition, reloadExtension }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
