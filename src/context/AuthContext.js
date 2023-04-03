import { createContext, useContext, useEffect, useState } from "react";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
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
      });
    }
  }

  const fetchUserRole = async () => {
    const email = user.email;
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    if (querySnapshot.docs.length > 0) {
      // Lấy thông tin role của người dùng từ tài liệu đầu tiên
      const userDoc = querySnapshot.docs[0];
      const userRole = userDoc.data().role;
      setRole(userRole);
    } else {
      console.log("User not found");
    }
  };

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubcribe();
    };
  });

  useEffect(() => {
    fetchUserRole();
  }, [user]);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function UserAuth() {
  return useContext(AuthContext);
}
