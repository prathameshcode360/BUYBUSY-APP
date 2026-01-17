import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseInit";

const AuthContext = createContext();

//  Custom Hook
export function useAuthContext() {
  return useContext(AuthContext);
}

//  Provider
function AuthProvider({ children }) {
  //  AUTH STATES
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  MESSAGE STATE
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  //  AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //  MESSAGE AUTO CLEAR
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  //  SIGNUP
  async function signup(name, email, password) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCred.user, {
        displayName: name,
      });
      setMessageType("success");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setMessage("User already registered, please login");
      } else {
        setMessage(err.message);
      }
      setMessageType("error");
      throw err;
    }
  }

  // LOGIN
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessageType("success");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setMessage("Invalid email or password");
      } else {
        setMessage(err.message);
      }
      setMessageType("error");
      throw err;
    }
  }

  //  LOGOUT
  function logout() {
    signOut(auth);
  }

  //  CONTEXT VALUE
  return (
    <AuthContext.Provider
      value={{
        user,
        message,
        messageType,
        signup,
        login,
        logout,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
