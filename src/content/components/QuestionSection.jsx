// QuestionSection Component
import React, { useState, useEffect } from "react";
import abbreviate from "number-abbreviate";
import OptionButton from "./OptionButton";
import styles from "../content.module.css";
import Button00 from "./buttons/Button00";
import Comments from "./Comments";
// svg's
import likeSvg from "../assets/icons/like.svg";
import dislikeSvg from "../assets/icons/dislike.svg";
import flagSvg from "../assets/icons/flag.svg";
import commentSvg from "../assets/icons/comment.svg";
import createSvg from "../assets/icons/create.svg";

import likeFilledSvg from "../assets/icons/likeFilled.svg";
import likeOutlineSvg from "../assets/icons/likeOutline.svg";

import { _useContext } from "../contextAPI/ContextProvider";

const QuestionSection = ({ que, handleNextQuestion }) => {
  // console.log("que: ", que);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [likeCount, setLikeCount] = useState(99);
  const { _setRoute, likeQuestion, currentVideo, user, incrementOptionClick } =
    _useContext();
  const [isLiked, setIsLiked] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);

  useEffect(() => {
    console.log("que: ", que);

    setLikeCount(que.likedBy?.length || 0);
    setIsLiked(que.likedBy?.includes(user.uid) || false);
  }, [que]);

  const handleLikeButtonClick = async () => {
    try {
      const updatedLikeCount = await likeQuestion(currentVideo.v, que);
      console.log("updatedLikeCount: ", updatedLikeCount);
      if (updatedLikeCount == 1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      setLikeCount(updatedLikeCount);
    } catch (error) {
      console.error("Error liking question:", error);
    }
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
        gap: "1rem",
        position: "relative",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          width: "35rem",
          // overflowY: "scroll",
          gap: "1rem",
        }}
      >
        {/* comment section div 👇 */}
        {toggleComments && <Comments setToggleComments={setToggleComments} />}
        <h1
          style={{
            color: "rgba(255,255,255,0.8)",
            height: "10rem",
            borderRadius: "12px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {que.que}
        </h1>
        {/* Options Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {/* question options */}
          {que.options.map((option, i) => (
            <OptionButton
              key={i}
              option={option}
              totalAttempts={que.totalAttempts}
              onClick={() => {
                console.log(option);
                setSelectedOption(i);
              }}
              isActive={selectedOption === i}
              isAnswerCorrect={isAnswerCorrect}
              correctAnswer={que.correctAnswer == i}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          {/* buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Like Button */}
            <button
              className={styles.likeButtons}
              onClick={() => {
                console.log("Liked!");
                handleLikeButtonClick();
                // likeQuestion(currentVideo.v, que);
              }}
            >
              {isLiked ? (
                <img src={likeFilledSvg} alt="like" />
              ) : (
                <img src={likeOutlineSvg} alt="like" />
              )}
              <div>{abbreviate(likeCount, 1)}</div>
            </button>

            {/* comment Button */}
            <button
              className={styles.likeButtons}
              onClick={() => setToggleComments((prev) => !prev)}
            >
              <img src={commentSvg} alt="report" />
              <div>{abbreviate(999999, 1)}</div>
            </button>
            {/* Report Button */}
            <button
              className={styles.likeButtons}
              onClick={() => console.log("Reported!")}
            >
              <img src={flagSvg} alt="report" />
            </button>
            {/* Contribute question button */}
            <button
              className={styles.likeButtons}
              onClick={() => {
                console.log("Contribute question!");
                _setRoute("ContributeQue");
              }}
            >
              <img src={createSvg} alt="Contribute question icon" />
            </button>
          </div>

          {/* Submit Button */}
          {isAnswerCorrect == null ? (
            <Button00
              disabled={selectedOption == null}
              className={styles.likeButtons}
              style={{
                background: "rgba(0, 0, 255, 0.8)",
                cursor: selectedOption == null && "not-allowed",
              }}
              onClick={() => {
                console.log(
                  "correctAnswer: ",
                  que.correctAnswer,
                  "activeOption: ",
                  selectedOption + 1
                );
                setIsAnswerCorrect(que.correctAnswer == selectedOption);
                incrementOptionClick(que.id, selectedOption);
              }}
            >
              Submit
            </Button00>
          ) : (
            <Button00
              onClick={() => {
                console.log("next button clicked");
                setIsAnswerCorrect(null);
                setSelectedOption(null);
                handleNextQuestion();
              }}
              style={{ background: "green" }}
            >
              next
            </Button00>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
