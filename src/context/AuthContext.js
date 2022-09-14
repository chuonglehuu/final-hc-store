import { createContext, useContext, useEffect, useState } from "react";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { Timestamp } from "firebase/firestore";

const AuthContext = createContext();
let uid = uuid();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", uid), {
      Email: email,
      Fullname: "",
      Phone: "",
      Dob: "",
      name: "",
      creatAt: Timestamp.fromDate(new Date()),
      UpdateAt: "",
      ListCart_ID: "",
      Receipt_ID: "",
    });
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    // console.log(user);
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      setDoc(doc(db, "users", user.email), {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  }
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubcribe();
    };
  });
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, googleSignIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function UserAuth() {
  return useContext(AuthContext);
}
