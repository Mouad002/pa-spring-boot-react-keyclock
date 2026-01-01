import React, { useState } from "react";
import keycloak from "../keycloak";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    fetch("http://localhost:8081/api/courses", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + keycloak.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, instructor }),
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          setStatus("unauthorized");
          return;
        }
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Status ${res.status}`);
        }
        const saved = await res.json();
        setStatus({ ok: true, saved });
        setTitle("");
        setDescription("");
        setInstructor("");
      })
      .catch((err) => setStatus({ ok: false, error: err.message }));
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form className="course-form" onSubmit={submit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Instructor</label>
        <input value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>

      {status === "submitting" && <div>Submitting...</div>}
      {status === "unauthorized" && <div className="error">Unauthorized: admin role required.</div>}
      {status && status.ok && <div className="success">Course added (id: {status.saved.id})</div>}
      {status && status.ok === false && <div className="error">Error: {status.error}</div>}
    </div>
  );
}
