import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("loginWithGoogle- result: ", result);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
  return null;
};

export default loginWithGoogle;
