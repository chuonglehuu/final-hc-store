import { getDatabase, ref, child, get } from "firebase/database";
import Login from "./components/Login";

function App() {
  const dbRef = ref(getDatabase());
  const userId = 1;
  get(child(dbRef, `users/${userId}`))
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
