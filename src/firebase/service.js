import { UserAuth } from "../context/AuthContext";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "./config";

export function addNewGoogleUser(data) {
  const { user } = UserAuth();
  const test = db.collection("users").get();
}
