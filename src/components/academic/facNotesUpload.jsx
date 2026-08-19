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
    title: "A* & Minimax Game Search Algorithms Code",
    unit: "Unit 1",
    type: "Jupyter Notebook",
    size: "1.8 MB",
    date: "2026-08-05",
    downloads: 154,
  },
  {
    id: 3,
    title: "Unit 2: First-Order Logic & Knowledge Representation",
    unit: "Unit 2",
    type: "Lecture Notes (PDF)",
    size: "5.6 MB",
    date: "2026-08-09",
    downloads: 142,
  },
  {
    id: 4,
    title: "Unit 3: Supervised Learning & Decision Trees",
    unit: "Unit 3",
    type: "Lecture Slides (PDF)",
    size: "6.1 MB",
    date: "2026-08-14",
    downloads: 175,
  },
  {
    id: 5,
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
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [newMaterialTitle, setNewMaterialTitle] = useState("");
  const [newMaterialUnit, setNewMaterialUnit] = useState("Unit 3");
  const [newMaterialType, setNewMaterialType] = useState("Lecture Slides (PDF)");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadMaterial = (e) => {
    e.preventDefault();
    if (!newMaterialTitle.trim()) return;

    const newDoc = {
      id: Date.now(),
      title: newMaterialTitle,
      unit: newMaterialUnit,
      type: newMaterialType,
      size: "3.5 MB",
      date: new Date().toISOString().split("T")[0],
      downloads: 0,
    };

    setMaterials([newDoc, ...materials]);
    setNewMaterialTitle("");
    setShowUploadModal(false);
  };

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

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
        <button
          className="fac-upload-btn"
          onClick={() => setShowUploadModal(true)}
        >
          + Upload New Document
        </button>
      </div>

      <div className="fac-notes-content-box">
        <div className="materials-grid">
          {materials.map((mat) => (
            <div key={mat.id} className="material-card">
              <div className="material-card-top">
                <span className="unit-badge">{mat.unit}</span>
                <button
                  type="button"
                  className="delete-mat-btn"
                  onClick={(e) => e.preventDefault()}
                  title="Delete material"
                >
                  ✕
                </button>
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

      {showUploadModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowUploadModal(false)}
        >
          <div className="edit-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📤 Upload New Course Material ({courseCode})</h3>
              <button
                className="close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUploadMaterial} className="edit-form-grid">
              <div className="form-field full-width">
                <label>Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Unit 4: Neural Networks Architecture Notes"
                  value={newMaterialTitle}
                  onChange={(e) => setNewMaterialTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Unit / Module</label>
                <select
                  value={newMaterialUnit}
                  onChange={(e) => setNewMaterialUnit(e.target.value)}
                >
                  <option value="Unit 1">Unit 1: Search & Foundations</option>
                  <option value="Unit 2">Unit 2: Logic & Knowledge</option>
                  <option value="Unit 3">Unit 3: Machine Learning</option>
                  <option value="Unit 4">Unit 4: Deep Neural Nets</option>
                  <option value="Unit 5">Unit 5: Vision & NLP</option>
                  <option value="Lab Work">Lab Work / Practical</option>
                </select>
              </div>

              <div className="form-field">
                <label>Document Type</label>
                <select
                  value={newMaterialType}
                  onChange={(e) => setNewMaterialType(e.target.value)}
                >
                  <option value="Lecture Slides (PDF)">Lecture Slides (PDF)</option>
                  <option value="Lecture Notes (PDF)">Lecture Notes (PDF)</option>
                  <option value="Jupyter Notebook">Jupyter Notebook (.ipynb)</option>
                  <option value="Lab Manual (PDF)">Lab Manual (PDF)</option>
                  <option value="Assignment / Problem Sheet">
                    Assignment / Problem Sheet
                  </option>
                </select>
              </div>

              <div className="form-field full-width">
                <label>Upload File</label>
                <input type="file" required />
              </div>

              <div className="modal-actions full-width">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  📤 Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacNotesUpload;
