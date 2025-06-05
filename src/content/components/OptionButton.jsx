// Reusable OptionButton Component
import React from "react";
import styles from "./OptionButton.module.css";

const OptionButton = ({
  option,
  onClick,
  isActive,
  isAnswerCorrect,
  totalAttempts,
  correctAnswer,
}) => {
  const percentage =
    (((option.clicks + 1 + isActive) / (totalAttempts + 5)) * 100).toFixed(1);

  return (
    <button
      disabled={isAnswerCorrect !== null}
      className={` ${
        styles.button
      }`}
      style={{
        padding: "0.8rem 2rem",
        color: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {(isActive || (isAnswerCorrect !== null && correctAnswer)) && (
        <div
          className={` ${
            isActive || correctAnswer
              ? isAnswerCorrect !== null
                ? isAnswerCorrect || correctAnswer
                  ? styles.greenButton
                  : styles.redButton
                : styles.blueButton
              : styles.button
          }`}
          style={{
            position: "absolute",
            height: "100%",
            width: `3%`,
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            zIndex: "9",
          }}
        ></div>
      )}
      <p style={{ fontSize: "1.5rem" }}>{option.option}</p>
      {isAnswerCorrect !== null && (
        <>
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: `${percentage}%`,
              top: "0",
              left: "0",
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
              zIndex: "99",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: `10%`,
              top: "0",
              right: "0",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row-reverse",
              fontSize: "1rem",
            }}
          >
            {percentage}%
          </div>
        </>
      )}
    </button>
  );
};

export default OptionButton;
