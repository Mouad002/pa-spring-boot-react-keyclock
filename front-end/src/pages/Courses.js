import React, { useEffect, useState } from "react";
import keycloak from "../keycloak";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keycloak.token) return;
    setLoading(true);
    fetch("http://localhost:8081/api/courses", {
      headers: { Authorization: "Bearer " + keycloak.token },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [keycloak.token]);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses: {error}</div>;

  return (
    <div>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <div>No courses available.</div>
      ) : (
        <ul className="course-list">
          {courses.map((c) => (
            <li key={c.id} className="course-item">
              <strong>{c.title}</strong>
              <div>{c.description}</div>
              <div className="instructor">{c.instructor}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
