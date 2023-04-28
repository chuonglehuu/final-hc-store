import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { createConversation } from "../firebase/service";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [productsContext, setProductsContext] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [role, setRole] = useState();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000",
    });
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
        email: user.email,
        uid: user.uid,
        authProvider: "google",
        fullname: user.displayName,
        phone: "",
        dob: "",
        createAt: Timestamp.fromDate(new Date()),
        listCart_ID: "",
        receipt_ID: "",
        role: 2,
        address: "",
      });

      await createConversation(
        [user.uid, "DpN1SsnTCXbAacR802db2dDCAv73"],
        user.uid
      );
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
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        googleSignIn,
        forgotPassword,
        user,
        role,
        setRole,
        userDetail,
        setUserDetail,
        productsContext,
        setProductsContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function UserAuth() {
  return useContext(AuthContext);
}
