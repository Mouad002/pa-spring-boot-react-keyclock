import React, { useEffect, useState } from "react";
import keycloak from "./keycloak";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false, pkceMethod: "S256" })
      .then((auth) => {
        setAuthenticated(auth);
        if (auth) {
          console.log("Token:", keycloak.token);
          loadNotes();
        }
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
      });
  }, []);
  const loadNotes = () => {
    fetch
      ("http://localhost:8081/api/notes", {
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
    return

    <div>Connexion en cours...</div>;

  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Espace étudiant</h1>
      <p>Connecté en tant que : {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={logout}>Se déconnecter</button>
      <h2>Mes notes</h2>
      <ul>
        {notes.map((note, idx) => (
          <li key={idx}>
            {note.module} : {note.note} ({note.etudiant})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;