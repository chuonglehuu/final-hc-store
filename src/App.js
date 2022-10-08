// import { ref, child, get } from "firebase/database";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { publicRoutes } from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
import ProtecedRoute from "./routes/ProtecedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              //Check Layout
              let Layout = DefaultLayout;
              let protectedRoute = route.protected;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const ProtecedPage = () => {
                if (protectedRoute) {
                  return (
                    <Layout>
                      <ProtecedRoute>
                        <Page />
                      </ProtecedRoute>
                    </Layout>
                  );
                } else {
                  return (
                    <Layout>
                      <Page />
                    </Layout>
                  );
                }
              };
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<ProtecedPage />}
                />
              );
            })}
          </Routes>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
