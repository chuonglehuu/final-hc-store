import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
