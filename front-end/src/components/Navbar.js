import React from "react";
import { Link } from "react-router-dom";
import keycloak from "../keycloak";
import "../App.css";

export default function Navbar({ onLogout }) {
  const username = keycloak.tokenParsed?.preferred_username;
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  return (
    <nav className="app-navbar">
      <div className="brand">E-Learning</div>
      <div className="links">
        <Link to="/" className="nav-link">Courses</Link>
        <Link to="/add" className="nav-link">Add Course</Link>
      </div>
      <div className="user">
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="roles">{roles.join(", ")}</span>
        </div>
        <button className="logout" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
