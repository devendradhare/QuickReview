import React, { useState } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
import styles from "./Home.module.css";

// addedBy : "SqI17aCW7QTI6kto1McKXMfjvD63"
// correctOption : 1
// id : "9PyJWEOCVCSCQ6bujM6x"
// likes : 0
// options : Array(3)
//          0 : "3"
//          1 : "2"
//          2 : "1"
// length : 3
// queText : "que3"

const Home = () => {
  const { _setRoute, currentVideo, quiz } = _useContext();
  const [showQuestion, setShowQuestion] = React.useState(null);
  const [showQueIndex, setShowQueIndex] = useState(0);

  React.useEffect(() => {
    setShowQuestion(quiz[showQueIndex]);
  }, [quiz, showQueIndex]);

  const goToContributePage = () => {
    console.log("Go to Contribute");
    _setRoute("ContributeQue");
  };

  const handleNextQuestion = () => {
    if (quiz) setShowQueIndex((prev) => (prev + 1) % quiz.length);
  };

  return (
    <div
      style={{
        // padding: "4px",
        height: "100%",
        maxHeight: "100%",
        width: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
        display: "flex",
        alignItems: "center",
        // textAlign: "center",
        wordBreak: "break-word",
      }}
    >
      {currentVideo ? (
        <div style={{ border: "0px solid gray", padding: "12px 0" }}>
          <p>{JSON.stringify(currentVideo)}</p>
          {showQuestion ? (
            <div style={{ border: "1px solid white", width: "100%" }}>
              {/* question */}
              <h3>{showQuestion?.queText}</h3>
              {/* options */}
              <div>
                {showQuestion?.options?.map((opt, i) => {
                  return (
                    <div key={i} className={styles.options}>
                      {opt}
                    </div>
                  );
                })}
              </div>
              {/* actions */}
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
                <div style={{ cursor: "pointer" }}>
                  <div>👍</div>
                  <div>{showQuestion.likes}</div>
                </div>
                <div style={{ cursor: "pointer" }}>
                  <div>🚨</div>
                  <div>0 reports</div>
                </div>
                <div
                  style={{ cursor: "pointer", background: "green" }}
                  onClick={handleNextQuestion}
                >
                  <div>➡️</div>
                  <div>next</div>
                </div>
              </div>
              {/* comment input */}
              <div style={{ width: "100%" }}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="type a comment"
                />
              </div>
              {/* all the comments */}
              <div style={{ fontSize: "1rem", width: "100%" }}>
                <div style={{ border: "1px solid gray", display: "flex" }}>
                  <div
                    style={{
                      border: "1px solid gray",
                      width: "2rem",
                      minWidth: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div style={{ flexGrow: 1 }}>
                    <div>
                      user3245 • <span>2 days ago</span>
                    </div>
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Recusandae vitae eaque in enim soluta ea neque a nisi amet
                      totam!
                    </div>
                    <div style={{ display: "flex", gap: "2rem" }}>
                      <div>
                        <div>👍</div>
                        <div>0 like</div>
                      </div>
                      <div>
                        <div>👎</div>
                        <div>0 dislike</div>
                      </div>
                    </div>
                  </div>
                  <div>⋮</div>
                </div>
                <div style={{ border: "1px solid gray", display: "flex" }}>
                  <div
                    style={{
                      border: "1px solid gray",
                      width: "2rem",
                      minWidth: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div style={{ flexGrow: 1 }}>
                    <div>
                      user3245 • <span>2 days ago</span>
                    </div>
                    <div>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Accusamus, blanditiis!
                    </div>
                  </div>
                  <div>⋮</div>
                </div>
                <div style={{ border: "1px solid gray", display: "flex" }}>
                  <div
                    style={{
                      border: "1px solid gray",
                      width: "2rem",
                      minWidth: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div style={{ flexGrow: 1 }}>
                    <div>
                      user3245 • <span>2 days ago</span>
                    </div>
                    <div>Lorem ipsum dolor sit amet consectetur.</div>
                  </div>
                  <div>⋮</div>
                </div>
              </div>
            </div>
          ) : (
            <h1>no questions found for this video</h1>
          )}
          <p>help us to add questions for this video</p>
          <div
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "4px",
              display: "inline-block",
            }}
            onClick={() => goToContributePage()}
          >
            + contribute question
          </div>
        </div>
      ) : (
        <div style={{}}>No video is playing....</div>
      )}
    </div>
  );
};

export default Home;
