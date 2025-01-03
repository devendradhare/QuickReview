import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const useMyContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("quickReview_Position")) || { x: 15, y: 15 }
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("quickReview_Position", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    // _del => delete this useEffect
    console.log("userContext- user: ", user);
    return () => {};
  }, [user, setUser]);

  function reloadExtension() {
    chrome.runtime.sendMessage({ action: "reloadExtension" });
  }
  function sw_handleLogin() {
    console.log("sw_handleLogin called");
    chrome.runtime.sendMessage({ action: "sw_login" });
  }
  return (
    <Context.Provider
      value={{
        position,
        setPosition,
        reloadExtension,
        user,
        setUser,
        sw_handleLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
