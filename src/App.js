import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <Router />
          <ToastContainer />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
