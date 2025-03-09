import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  addDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Context = createContext();

export const _useContext = () => {
  return useContext(Context);
};

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [position, setPosition] = useState(
    JSON.parse(localStorage.getItem("quickReview_Position")) || { x: 15, y: 15 }
  );
  const [user, setUser] = React.useState(null);
  const [_route, _setRoute] = useState("Home");
  const [isMinimize, setIsMinimize] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [quiz, setQuiz] = useState([]);

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
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Persist user authentication state across refreshes
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log("User is signed in: ", currentUser);
  //       setUser(currentUser); // Restore user in state
  //       if (_route == "Login" || _route == "Signup") {
  //         _setRoute("Home");
  //       }
  //     } else {
  //       console.log("No user is signed in.");
  //       setUser(null); // Clear user state
  //     }
  //   });
  //
  //   // Cleanup the listener on unmount
  //   return () => unsubscribe();
  // }, []);

  // setting the window position in localStorage
  useEffect(() => {
    localStorage.setItem("quickReview_Position", JSON.stringify(position));
  }, [position]);

  // _del => delete this useEffect
  useEffect(() => {
    console.log("userContext- user: ", user);
  }, [user, setUser]);

  // fetch the questions for specific video id
  useEffect(() => {
    const getQuestions = async () => {
      if (videoId) {
        const result = await fetchQuestions(videoId);
        console.log("result: 🥲", result);
        setQuiz(result);
      }
    };
    getQuestions();
  }, [videoId]);

  async function isUsernameUnique(username) {
    try {
      const usersCollection = collection(firestore, "user"); // Replace "user" with your collection name
      const userQuery = query(
        usersCollection,
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(userQuery);
      // Check if the querySnapshot is empty
      if (!querySnapshot.empty) {
        // Username exists in the collection, so it's not unique
        return false;
      }
      // Username is unique
      return true;
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      throw error;
    }
    // const usernameDocRef = doc(firestore, "user", username);
    // const usernameDoc = await getDoc(usernameDocRef);
    // console.log("usernameDoc: ", usernameDoc);
    // return !usernameDoc.exists(); // Returns true if username is unique
  }

  async function login(formData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User logged in successfully : ", userCredential.user);
      setUser(userCredential.user);
    } catch (error) {
      console.error("error: ", error, "message", error.message);
    }
  }

  async function signin(formData) {
    try {
      const isUnique = await isUsernameUnique(formData.username);
      if (!isUnique) {
        console.error("Username is already taken.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("New user created: ", userCredential.user);
      const newUser = userCredential.user;

      let photoURL = `https://avatar.iran.liara.run/username?username=${formData.username}`;
      // Update user profile with displayName and photoURL
      await updateProfile(newUser, {
        displayName: formData.username,
        photoURL,
      });

      // Save the username to Firestore
      await setDoc(doc(firestore, "user", newUser.uid), {
        uid: newUser.uid,
        username: formData.username,
        photoURL,
      });
      setUser(userCredential.user);
    } catch (signupError) {
      console.error("Error during signup: ", signupError);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  function isAuthenticated() {
    return user ? true : false;
  }

  function reloadExtension() {
    chrome.runtime.sendMessage({ action: "reloadExtension" });
  }

  async function contributeQuestion(que) {
    console.log("contributeQuestion clicked", que);
    try {
      await setDoc(
        doc(firestore, "quizzes", currentVideo.v),
        { videoTitle: currentVideo.title },
        { merge: true }
      );

      const questionsCollectionRef = collection(
        firestore,
        "quizzes",
        currentVideo.v,
        "questions"
      );
      const questionData = {
        queText: que.queText,
        options: [...que.options], // this is an array of 4 strings
        correctOption: que.correctOption,
        addedBy: user.uid,
        likes: 0, // initial like count
      };
      const newQuestionRef = await addDoc(questionsCollectionRef, questionData);
      console.log("Question added successfully with ID:", newQuestionRef.id);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  async function fetchQuestions(videoId) {
    try {
      console.log("inside fetchQuestions try ------ 1");
      console.log("inside fetchQuestions try ------ 2");

      // Reference to the questions subcollection for the given videoId
      const questionsCollectionRef = collection(
        firestore,
        "quizzes",
        videoId,
        "questions"
      );

      // Fetch all documents in the questions subcollection
      const querySnapshot = await getDocs(questionsCollectionRef);
      console.log("inside fetchQuestions try ------ 3", querySnapshot);

      // Map the querySnapshot to get an array of questions
      const questions = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Add the document ID for reference
        ...doc.data(), // Spread the document's data
      }));
      console.log("inside fetchQuestions try ------ 4");
      console.log("Fetched questions:", questions);
      return questions; // Return the array of questions
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
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
        quiz,
        // functions
        contributeQuestion,
        reloadExtension,
        isAuthenticated,
        login,
        signin,
        logout,
        fetchQuestions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
