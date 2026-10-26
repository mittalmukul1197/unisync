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
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("Unit 1");
  const [type, setType] = useState("Lecture Notes (PDF)");

  // Upload handler
  const handleUpload = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDoc = {
      id: Date.now(),
      title: title.trim(),
      unit,
      type,
      size: "4.5 MB",
      date: new Date().toISOString().split("T")[0],
      downloads: 0,
    };

    setMaterials([newDoc, ...materials]);
    setTitle("");
    setShowModal(false);
  };

  // Delete handler
  const handleDelete = (id) => {
    setMaterials(materials.filter((item) => item.id !== id));
  };

  return (
    <div className="fac-notes-container">
      {/* Header */}
      <div className="fac-notes-header">
        <div>
          <h2>📤 Course Material & Notes Repository</h2>
          <p>
            Study materials, lecture slides, and lab code for {courseName} ({courseCode})
          </p>
        </div>
        <button
          type="button"
          className="fac-upload-btn"
          onClick={() => setShowModal(true)}
        >
          + Upload New Document
        </button>
      </div>

      {/* Materials Cards Grid */}
      <div className="fac-notes-content-box">
        <div className="materials-grid">
          {materials.map((mat) => (
            <div key={mat.id} className="material-card">
              <div className="material-card-top">
                <span className="unit-badge">{mat.unit}</span>
                <button
                  type="button"
                  className="delete-mat-btn"
                  onClick={() => handleDelete(mat.id)}
                  title="Delete Document"
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
                  type="button"
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

      {/* Upload Modal */}
      {showModal && (
        <div className="fac-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="fac-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="fac-modal-header">
              <h3>Upload New Document</h3>
              <button
                type="button"
                className="fac-modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="fac-upload-form">
              <div className="fac-form-group">
                <label>Document Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Unit 3: Neural Networks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="fac-form-row">
                <div className="fac-form-group">
                  <label>Unit</label>
                  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    <option value="Unit 3">Unit 3</option>
                    <option value="Unit 4">Unit 4</option>
                    <option value="Unit 5">Unit 5</option>
                    <option value="Lab Work">Lab Work</option>
                  </select>
                </div>

                <div className="fac-form-group">
                  <label>Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Lecture Notes (PDF)">Lecture Notes (PDF)</option>
                    <option value="Lecture Slides (PDF)">Lecture Slides (PDF)</option>
                    <option value="Lab Manual (PDF)">Lab Manual (PDF)</option>
                    <option value="Reference Book (PDF)">Reference Book (PDF)</option>
                  </select>
                </div>
              </div>

              <div className="fac-modal-footer">
                <button
                  type="button"
                  className="fac-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="fac-btn-submit">
                  Upload Document
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
