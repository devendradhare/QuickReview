import React, { useState, useRef } from "react";
import { _useContext } from "../contextAPI/ContextProvider";
import Button00 from "../components/buttons/Button00";
import trash from "../assets/icons/trash.svg";
import arrowLeft from "../assets/icons/arrow-left-short.svg";
import closeSvg from "../assets/icons/close.svg";

const ContributeQue = () => {
  const { contributeQuestion, _setRoute, user } = _useContext();
  const [question, setQuestion] = useState("");
  const [syntax, setSyntax] = useState(null);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const optionRefs = useRef([]);

  const addOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = options.map((opt, idx) =>
      idx === index ? value : opt
    );
    setOptions(updatedOptions);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, idx) => idx !== index);
    setOptions(updatedOptions);
    if (correctAnswer === index) {
      setCorrectAnswer(null); // Reset correct answer if it was the removed option
    } else if (correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1); // Adjust correct answer index if needed
    }
  };

  const goBack = () => {
    _setRoute("QuestionsPage");
  };

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
      type: "multiple-options",
      que: question,
      syntax: syntax,
      options,
      correctOption: correctAnswer,
    };
    await contributeQuestion(newQuestion);

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    setSyntax((prev) => (prev == null ? null : ""));
  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }} onClick={goBack}>
          <img src={arrowLeft} alt="back" />
          <span>back</span>
        </div>
        <div
          style={{
            color: "lightblue",
            cursor: "pointer",
          }}
          onClick={() => {
            _setRoute("PromptPage");
          }}
        >
          Use AI
        </div>
      </div>
      <div
        style={{
          width: "100%",
          // display: syntax == null ? "none" : "block",
          position: "relative",
          display: "none",
        }}
      >
        {/* code textarea */}
        <textarea
          value={syntax}
          onChange={(e) => setSyntax(e.target.value)}
          placeholder="Enter your code here (optional)"
          maxLength={500}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            padding: "0.8rem",
            borderRadius: "12px",
            fontSize: "1.5rem",
            backgroundColor: "rgb(45,45,45)",
            color: "white",
            outline: "none",
            resize: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            fontSize: "0.9rem",
            color: "#aaa",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {500 - (syntax ? syntax.length : 0)} / 500
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ flexGrow: 1, position: "relative" }}>
          {/* qustion textarea */}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here"
            maxLength={400}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              maxHeight: "100%",
              padding: "0.8rem",
              border: "1px solid rgb(100 100 100 / 50%)",
              borderRadius: "12px",
              fontSize: "1.5rem",
              backgroundColor: "rgb(45,45,45)",
              color: "white",
              outline: "none",
              resize: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontSize: "0.9rem",
              color: "#aaa",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {400 - (question ? question.length : 0)} / 400
          </span>
        </div>

        {/* option inputs */}
        <div>
          {options.map((opt, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
                gap: "10px",
                position: "relative",
              }}
            >
              <input
                type="checkbox"
                name="correctOption"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                style={{ cursor: "pointer" }}
              />
              <textarea
                value={opt}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                maxLength={100}
                rows={1}
                ref={(el) => (optionRefs.current[index] = el)}
                style={{
                  flex: "1",
                  padding: "10px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.5rem",
                  backgroundColor: "#202020",
                  color: "white",
                  outline: "none",
                  resize: "none",
                  overflow: "hidden",
                }}
                onInput={(e) => autoResize(e.target)}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  fontSize: "0.9rem",
                  color: "#aaa",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {100 - (opt ? opt.length : 0)} / 100
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={saveQuestion}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              display: "block",
              width: "100%",
            }}
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributeQue;
