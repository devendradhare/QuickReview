import React, { useState, useEffect } from "react";
import { YoutubeTranscript } from "youtube-transcript";
import { _useContext } from "../contextAPI/ContextProvider";
import Button00 from "../components/buttons/Button00";
import LoadingButton00 from "../components/buttons/LoadingButton00";

const PromptPage = () => {
  const {
    videoId,
    videoTitle,
    fetchQuestions,
    _setRoute,
    handleJsonQuestionsSubmit,
  } = _useContext();
  const [transcript, setTranscript] = useState(``);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aiJsonOutput, setAiJsonOutput] = useState("");

  const handleSubmit = async () => {
    let jsonOutput = aiJsonOutput;
    if (!jsonOutput) {
      alert("Please paste the JSON output from AI.");
      return;
    }
    jsonOutput = jsonOutput.replace(/```json|```/g, "").trim();

    try {
      const parsedJson = JSON.parse(jsonOutput);
      if (!validateMCQFormat(parsedJson)) {
        alert("Invalid JSON format. Please check your input.");
        return;
      }
      const inflatedQuestions = inflateQuestions(parsedJson);
      console.log("Inflated Questions: ", inflatedQuestions);

      const addQuestionPromises = inflatedQuestions.map((que) =>
        handleJsonQuestionsSubmit(que)
      );
      const addedDocs = await Promise.all(addQuestionPromises);
      fetchQuestions(videoId);
      _setRoute("QuestionsPage");
    } catch (error) {
      console.error("Error", error);
      alert(error.message || "Invalid JSON format. Please check your input.");
      return;
    }
  };

  function validateMCQFormat(data) {
    if (!Array.isArray(data)) return false;
    for (const item of data) {
      if (
        typeof item !== "object" ||
        typeof item.correctAnswer !== "number" ||
        typeof item.que !== "string" ||
        !Array.isArray(item.options) ||
        item.options.length !== 4 ||
        !item.options.every((opt) => typeof opt === "string")
      ) {
        return false;
      }
    }
    return true;
  }
  function inflateQuestions(data) {
    return data.map((item) => ({
      addedBy: "AI",
      isAiGenerated: true,
      correctAnswer: item.correctAnswer,
      que: item.que,
      options: item.options.map((option) => ({
        clicks: 0,
        option: option,
      })),
      likedBy: [],
      reports: 0,
      totalAttempts: 0,
      type: "multiple-options",
      addedAt: new Date(),
    }));
  }

  useEffect(() => {
    getTranscript(videoId);
    const p = `Based on the following YouTube video transcript, generate 20 multiple-choice questions (MCQs) that test the viewer's understanding of the video titled: "${videoTitle}"
Requirements:
All questions and options could be written in English, even if the original content is in another language.
Each question must be under 200 characters.
Each option must be under 50 characters.
Ensure all questions are relevant to the Transcript and the topic of the video.
Avoid repeating the same question or options.
Vary the difficulty and concepts as much as possible.
Output the result strictly in the JSON format shown below.

JSON Output Format:
[
  {
    "que": "Your question text here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
      ],
    "correctAnswer": 0, // Index of the correct answer (0-3)
  }
]
Transcript: ${transcript}`;
    setPrompt(p.slice(0, 30000));
  }, [transcript, videoTitle, videoId]);

  async function getTranscript(videoId) {
    if (!videoId) {
      console.error("No video ID provided");
    }
    setTranscriptLoading(true);
    try {
      const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId);
      console.log("Transcript fetched successfully: ", transcriptArr);
      const transcript = transcriptArr.map((line) => line.text).join(" ");
      setTranscript(transcript);
    } catch (error) {
      console.error("Error fetching transcript:", error.message);
      setTranscript(null);
    } finally {
      setTranscriptLoading(false);
    }
  }

  // function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <p style={{ fontSize: "1.5rem" }}>
        copy this prompt and paste it on
        <a
          href="https://gemini.google.com/app"
          style={{
            background: "rgb(45 45 45)",
            padding: "2px 10px",
            borderRadius: "8px",
          }}
        >
          Gemini
        </a>
        as input
      </p>

      <div
        style={{
          flexGrow: 1,
          position: "relative",
          height: "200px",

          display: "flex",
          flexDirection: "column",

          border: "1px solid",
          borderRadius: "6px",
          background: "black",
          padding: "4px",
        }}
      >
        {transcript && (
          <>
            <Button00
              onClick={() => copyToClipboard(prompt)}
              style={{
                position: "absolute",
                right: "-5px",
                top: "-10px",
                background: "rgb(45 45 45)",
                borderRadius: "12px",
                padding: "0.4rem",
                fontSize: "1.3rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Copy
            </Button00>
          </>
        )}
        <textarea
          style={{
            fontSize: "1.5rem",
            flexGrow: 1,
            overflowY: "scroll",
            resize: "none",
            outline: "none",
            background: "black",
            color: "white",
            border: "none",
          }}
          value={transcript ? prompt : "trasncript not found of this video"}
          onChange={(e) => {}}
        ></textarea>
      </div>

      {!transcript && (
        <LoadingButton00
          onClick={() => getTranscript}
          loading={transcriptLoading}
        >
          {transcriptLoading ? "Loading" : "retry"}
        </LoadingButton00>
      )}
      <textarea
        name="jsonOutput"
        id="jsonOutput"
        placeholder="paste your JSON result here"
        style={{
          flexGrow: 1,
          padding: "4px",
          background: "rgb(45 45 45)",
          borderRadius: "12px",
          color: "white",
          outline: "none",
          resize: "none",
        }}
        value={aiJsonOutput}
        onChange={(e) => setAiJsonOutput(e.target.value)}
      ></textarea>
      <Button00 onClick={() => handleSubmit()}>submit</Button00>
    </div>
  );
};

export default PromptPage;
