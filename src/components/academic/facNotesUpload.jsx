import React, { useState } from "react";
import "./facNotesUpload.css";

const INITIAL_MATERIALS = [
  {
    id: 1,
    title: "Unit 1: Introduction to AI & Heuristic Search",
    unit: "Unit 1",
    type: "Lecture Slides (PDF)",
    size: "4.2 MB",
    date: "2026-08-02",
    downloads: 168,
  },
  {
    id: 2,
    title: "Unit 2: First-Order Logic & Knowledge Representation",
    unit: "Unit 2",
    type: "Lecture Notes (PDF)",
    size: "5.6 MB",
    date: "2026-08-09",
    downloads: 142,
  },
  {
    id: 3,
    title: "AI & ML Lab Manual - Practical Experiments 1 to 8",
    unit: "Lab Work",
    type: "Lab Manual (PDF)",
    size: "8.4 MB",
    date: "2026-08-01",
    downloads: 180,
  },
];

function FacNotesUpload({
  courseCode = "CS-301",
  courseName = "Artificial Intelligence & Machine Learning",
}) {
  const [materials] = useState(INITIAL_MATERIALS);

  return (
    <div className="fac-notes-container">
      <div className="fac-notes-header">
        <div>
          <h2>📤 Course Material & Notes Repository</h2>
          <p>
            Study materials, lecture slides, and lab code for {courseName} (
            {courseCode})
          </p>
        </div>
        <button type="button" className="fac-upload-btn">
          + Upload New Document
        </button>
      </div>

      <div className="fac-notes-content-box">
        <div className="materials-grid">
          {materials.map((mat) => (
            <div key={mat.id} className="material-card">
              <div className="material-card-top">
                <span className="unit-badge">{mat.unit}</span>
                <span className="delete-mat-btn" title="Options">✕</span>
              </div>
              <h4>{mat.title}</h4>
              <div className="material-meta">
                <span>📄 {mat.type}</span>
                <span>💾 {mat.size}</span>
                <span>📅 {mat.date}</span>
                <span>⬇️ {mat.downloads} downloads</span>
              </div>
              <div className="material-card-footer">
                <button
                  className="download-btn"
                  onClick={() => alert(`Downloading: ${mat.title}`)}
                >
                  📥 Download Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacNotesUpload;
