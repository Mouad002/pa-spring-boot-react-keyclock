import React, { useEffect, useRef, useState } from "react";
import keycloak from "./keycloak";
function App() {
  const initialized = useRef(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        redirectUri: window.location.origin
      })
      .then((auth) => {
        setAuthenticated(auth);
        console.log("token:", keycloak.token);
        if (auth) {
          loadCourses();
        }
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
      });
  }, []);
  const loadCourses = () => {
    fetch
      ("http://localhost:8081/api/courses", {
        headers: {
          Authorization:
            "Bearer " + keycloak.token
          ,
        },
      })
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console
        .error
        ("Erreur API:", err));

  };
  const logout = () => {
    keycloak.logout({ redirectUri: "http://localhost:3000" });
  };
  if (!authenticated) {
    return <div>Connexion en cours...</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Espace étudiant</h1>
      <p>Connecté en tant que : {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={logout}>Se déconnecter</button>
      <h2>Mes cours</h2>
      <ul>
        {notes.map((course, idx) => (
          <li key={idx}>
            {course.title} : {course.description} - {course.instructor}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;