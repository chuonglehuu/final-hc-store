import Login from "./components/Login";
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from "./firebase/config";

function App() {
  const dbRef = ref(database);
  get(child(dbRef, `users/${1}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
