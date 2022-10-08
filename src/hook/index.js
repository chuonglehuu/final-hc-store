import { UserAuth } from "../context/AuthContext";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase/config";

const { user } = UserAuth();

export function useQueryUser() {
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("Email", "==", user.email));
  onSnapshot(userQuery, (snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data[0].Email;
  });
}
