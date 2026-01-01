import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import keycloak from "./keycloak";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import "./App.css";

function App() {
  const initialized = useRef(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false, redirectUri: window.location.origin })
      .then((auth) => {
        setAuthenticated(auth);
      })
      .catch((err) => console.error("Keycloak init error:", err));
  }, []);

  const logout = () => keycloak.logout({ redirectUri: window.location.origin });

  if (!authenticated) return <div>Connexion en cours...</div>;

  return (
    <BrowserRouter>
      <div className="app-root">
        <Navbar onLogout={logout} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/add" element={<AddCourse />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;