import React from "react";
import { auth, firestore } from "../firebase/firebase.js";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { _useContext } from "../contextAPI/ContextProvider";
const ContributeQue = () => {
  const { contributeQuestion, _setRoute, user, currentVideo } = _useContext();
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState(["", ""]); // Start with two empty options
  const [correctAnswer, setCorrectAnswer] = React.useState(null);
  const [questions, setQuestions] = React.useState([
    {
      question:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam doloremque, eaque aut quaerat tempora sed? Dolore totam unde, fugiat odio atque qui facilis nam? Molestiae necessitatibus obcaecati aut possimus labore.",
      options: ["klasdh", "alsdkjf", "alsdkjfa", "aasfldj"],
      correctAnswer: 3,
      addedBy: user.uid,
      // videoId:
    },
  ]); // Stores all created questions

  // Handle adding a new option field
  const addOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  // Handle updating an option's text
  const updateOption = (index, value) => {
    const updatedOptions = options.map((opt, idx) =>
      idx === index ? value : opt
    );
    setOptions(updatedOptions);
  };
  const goBack = () => {
    _setRoute("Home");
  };

  // Handle saving the question
  const saveQuestion = async () => {
    if (
      !question.trim() ||
      options.some((opt) => !opt.trim()) ||
      correctAnswer === null
    ) {
      alert("Please fill in all fields and select a correct answer.");
      return;
    }

    const newQuestion = {
      queText: question,
      options,
      correctOption: correctAnswer,
    };
    await contributeQuestion(newQuestion);

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions(["", ""]);
    setCorrectAnswer(null);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial",
          height: "100%",
          overflowX: "scroll",
        }}
      >
        <button onClick={() => goBack()}>back</button>
        <h2>Create a Multiple Choice Question</h2>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Question:
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here"
              style={{ width: "100%", height: "50px", marginTop: "5px" }}
            />
          </label>
        </div>

        <div>
          <h3>Options:</h3>
          {options.map((opt, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                style={{ width: "70%" }}
              />
              <input
                type="radio"
                name="correctOption"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                style={{ marginLeft: "10px" }}
              />
              Correct
            </div>
          ))}
          <button onClick={addOption} style={{ marginTop: "10px" }}>
            Add Option
          </button>
        </div>

        <button
          onClick={saveQuestion}
          style={{ marginTop: "20px", display: "block" }}
        >
          Save Question
        </button>

        {questions.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3>Saved Questions:</h3>
            {questions.map((q, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div>
                  <img
                    src={user?.photoURL}
                    alt="user avatar"
                    style={{ width: "1rem" }}
                  />
                  <span> {user.displayName} </span>
                </div>
                <p>
                  <strong>Q{index + 1}:</strong> {q.question}
                </p>
                <ul>
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontWeight: q.correctAnswer === idx ? "bold" : "normal",
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ContributeQue;
