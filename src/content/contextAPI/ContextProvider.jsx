import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const Context = createContext();

export const _useContext = () => {
  return useContext(Context);
};

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  // position of the floating window on the screen
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("quickReview_Position")) || { x: 15, y: 15 }
  );
  const [user, setUser] = React.useState(null);
  const [_route, _setRoute] = useState("QuestionsPage");
  const [isMinimize, setIsMinimize] = useState(false);
  // info about current playing video
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  // questions array of the current playing video
  const [videoQueArray, setVideoQueArray] = useState([]);
  const [videoQueArrayLoading, setVideoQueArrayLoading] = useState(false);

  function getVideoDetails(prev) {
    const url = new URL(location.href);
    if (url.hostname !== "www.youtube.com") return prev;
    const searchParams = Object.fromEntries(url.searchParams);

    if (searchParams.v) {
      // Get the video title from the <title> tag
      let videoTitle = document.title;
      videoTitle = videoTitle.replace(/^\(\d+\)\s*/, "");
      videoTitle = videoTitle.replace(" - YouTube", "").trim();
      setVideoId(searchParams.v);
      setVideoTitle(videoTitle);
      return { ...searchParams, title: videoTitle, url: url.href };
    }
    return prev;
  }
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentVideo((prev) => getVideoDetails(prev));
    };
    // Create a MutationObserver to watch for changes in the document
    const observer = new MutationObserver(() => {
      handleUrlChange();
    });
    // Watch for changes in the history state, which can reflect a URL change
    observer.observe(document, { childList: true, subtree: true });
    // Run once when component mounts
    handleUrlChange();
    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // Persist user authentication state across refreshes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in: ", currentUser);
        setUser(currentUser); // Restore user in state
        if (_route == "Login" || _route == "Signup") {
          _setRoute("QuestionsPage");
        }
      } else {
        console.log("No user is signed in.");
        setUser(null); // Clear user state
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // setting the window position in localStorage
  useEffect(() => {
    localStorage.setItem("quickReview_Position", JSON.stringify(position));
  }, [position]);

  // _del => delete this useEffect
  // useEffect(() => {
  //   console.log("userContext- user: ", user);
  // }, [user, setUser]);

  // fetch the questions for specific video id
  useEffect(() => {
    console.log("videoQueArray state changed: ", videoQueArray);
  }, [videoQueArray]);

  useEffect(() => {
    const getQuestions = async () => {
      if (videoId) {
        setVideoQueArrayLoading(true);
        const result = await fetchQuestions(videoId);
        setVideoQueArrayLoading(false);
      }
    };
    getQuestions();
  }, [videoId]);

  function isAuthenticated() {
    return user ? true : false;
  }

  function reloadExtension() {
    console.log("Reloading extension...");
    chrome.runtime.sendMessage({ action: "reloadExtension" });
  }

  async function contributeQuestion(que) {
    console.log("contributeQuestion clicked", que);
    try {
      await setDoc(
        doc(firestore, "quizzes", videoId),
        { videoTitle: videoTitle },
        { merge: true }
      );

      const questionsCollectionRef = collection(
        firestore,
        "quizzes",
        videoId,
        "questions"
      );
      const newOptions = que.options.map((option) => {
        return { option: option, clicks: 0 };
      });
      console.log("newOptions: ", newOptions);
      const questionData = {
        type: que.type,
        que: que.que,
        options: newOptions,
        correctAnswer: que.correctOption,
        totalAttempts: 0,
        addedBy: user.uid,
        likes: [],
        reports: 0,
        addedAt: new Date(),
      };
      const newQuestionRef = await addDoc(questionsCollectionRef, questionData);
      console.log("Question added successfully with ID:", newQuestionRef.id);

      // Adding reference to user's "myQuestions" collection
      const userQuestionRef = doc(
        firestore,
        "user",
        user.uid,
        "myQuestions",
        newQuestionRef.id
      );

      await setDoc(userQuestionRef, {
        questionId: newQuestionRef.id,
        videoId: videoId,
        addedAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  async function handleJsonQuestionsSubmit(que) {
    console.log("handleJsonQuestionsSubmit clicked", que);
    try {
      await setDoc(
        doc(firestore, "quizzes", videoId),
        { videoTitle: videoTitle },
        { merge: true }
      );

      const questionsCollectionRef = collection(
        firestore,
        "quizzes",
        videoId,
        "questions"
      );
      const questionData = {
        ...que,
        addedBy: user.uid,
      };
      const newQuestionRef = await addDoc(questionsCollectionRef, questionData);
      console.log("Question added successfully with ID:", newQuestionRef.id);

      // Adding reference to user's "myQuestions" collection
      const userQuestionRef = doc(
        firestore,
        "user",
        user.uid,
        "myQuestions",
        newQuestionRef.id
      );

      await setDoc(userQuestionRef, {
        questionId: newQuestionRef.id,
        videoId: videoId,
        addedAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  async function fetchQuestions(videoId) {
    try {
      console.log("inside fetchQuestions try ------ 1");
      // Reference to the questions subcollection for the given videoId
      const questionsCollectionRef = collection(
        firestore,
        "quizzes",
        videoId,
        "questions"
      );

      // Fetch all documents in the questions subcollection
      const querySnapshot = await getDocs(questionsCollectionRef);
      console.log("querySnapshot: ", querySnapshot);

      // Map the querySnapshot to get an array of questions
      const questions = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Add the document ID for reference
        ...doc.data(), // Spread the document's data
      }));
      setVideoQueArray(questions);
      return questions; // Return the array of questions
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  }

  // Add this function inside your ContextProvider component

  async function incrementOptionClick(questionId, optionIndex) {
    try {
      const questionRef = doc(
        firestore,
        "quizzes",
        videoId,
        "questions",
        questionId
      );
      const questionSnap = await getDoc(questionRef);
      if (!questionSnap.exists()) {
        throw new Error("Question not found");
      }
      const questionData = questionSnap.data();
      const options = questionData.options || [];

      if (optionIndex < 0 || optionIndex >= options.length) {
        throw new Error("Invalid option index");
      }

      // Increment the clicks for the selected option
      options[optionIndex] = {
        ...options[optionIndex],
        clicks: (options[optionIndex].clicks || 0) + 1,
      };
      // also increment the totalAttempts for the question
      await updateDoc(questionRef, {
        options,
        totalAttempts: increment(1), // Increment the total attempts by 1
      });

      await updateDoc(questionRef, { options });
      console.log("Option click incremented successfully");
      return true;
    } catch (error) {
      console.error("Error incrementing option click:", error);
      return false;
    }
  }

  async function likeQuestion(videoId, question) {
    const questionRef = doc(
      firestore,
      "quizzes",
      videoId,
      "questions",
      question.id
    );

    try {
      const snapshot = await getDoc(questionRef);
      const currentLikedBy = snapshot.data().likedBy || [];
      console.log("currentLikedBy: ", currentLikedBy);

      if (currentLikedBy.includes(user.uid)) {
        await updateDoc(questionRef, {
          likedBy: arrayRemove(user.uid),
        });
        console.log("Unliked the question");
        return currentLikedBy.length - 1;
      } else {
        await updateDoc(questionRef, {
          likedBy: arrayUnion(user.uid),
        });
        console.log("Liked the question");
        return currentLikedBy.length + 1;
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  }

  return (
    <Context.Provider
      value={{
        // states
        position,
        setPosition,
        user,
        setUser,
        _route,
        _setRoute,
        isMinimize,
        setIsMinimize,
        currentVideo,
        videoQueArray,
        setVideoQueArray,
        videoQueArrayLoading,
        videoId,
        videoTitle,
        // functions
        contributeQuestion,
        handleJsonQuestionsSubmit,
        reloadExtension,
        isAuthenticated,
        likeQuestion,
        incrementOptionClick,
        fetchQuestions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
