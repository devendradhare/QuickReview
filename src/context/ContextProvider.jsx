import React, { createContext, useContext, useState } from "react";

export const Context = createContext();

const ContextProvider = () => {
  const [myValue, setMyValue] = useState(0);
  return <Context.Provider value={{ myValue, setMyValue }}></Context.Provider>;
};

export default ContextProvider;
