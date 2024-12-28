import React, { useState } from "react";

const ContentDiv = () => {
  const [count, setCount] = useState(99);
  return (
    <div className="fixed bottom-[50px] right-[50px] z-10 p-10 border ">
      <h1 className="bg-green-600" style={{ color: "blue" }}>
        Devendra dhare
      </h1>
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>

      <button
        className="border p-2 m-2"
        onClick={() => {
          chrome.runtime.sendMessage({ action: "reloadExtension" });
        }}
      >
        reload extension
      </button>
    </div>
  );
};

export default ContentDiv;
