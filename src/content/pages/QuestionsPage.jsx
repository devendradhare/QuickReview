import React, { useState, useEffect } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
import styles from "./QuestionsPage.module.css";
import Button00 from "../components/buttons/Button00";
import LoadingButton00 from "../components/buttons/LoadingButton00";
import Empty from "./Empty";
import QuestionSection from "../components/QuestionSection";

const QuestionsPage = () => {
  const {
    _setRoute,
    currentVideo,
    videoId,
    videoQueArray,
    videoQueArrayLoading,
  } = _useContext();
  const [showQuestion, setShowQuestion] = React.useState(null);
  const [showQueIndex, setShowQueIndex] = useState(0);

  useEffect(() => {
    setShowQuestion(videoQueArray[showQueIndex]);
  }, [showQueIndex, videoQueArray]);

  const goToContributePage = () => {
    console.log("Go to Contribute");
    _setRoute("ContributeQue");
  };

  const handleNextQuestion = () => {
    if (showQuestion) {
      console.log(showQuestion);
      setShowQueIndex((prev) => (prev + 1) % videoQueArray.length);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "100%",
        width: "100%",
        // overflowX: "hidden",
        // overflowY: "scroll",
        wordBreak: "break-word",
        display: "flex",
      }}
    >
      {currentVideo ? (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {showQuestion ? (
            <QuestionSection
              que={showQuestion}
              handleNextQuestion={handleNextQuestion}
            />
          ) : videoQueArrayLoading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                gap: "2rem",
              }}
            >
              <LoadingButton00 loading={true}></LoadingButton00>
              <p>featching questions...</p>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              color: "white",
              textAlign: "center",
            }}
          >
            No video is playing...
          </p>
          <Button00 onClick={() => _setRoute("Login")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path
                fill="white"
                d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path
                fill="white"
                d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"
              ></path>
            </svg>
          </Button00>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
