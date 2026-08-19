import React, { useState } from "react";
import "./notes.css";

function Notes() {
    // Initial notes data list
    const [notes, setNotes] = useState([
        { id: 1, title: "Backprop_Derivation_Chain_Rule.ipynb", subject: "Deep Learning", size: "15 KB", author: "Prof. Neha Sen", date: "Yesterday" },
        { id: 2, title: "CNN_Architecture_CheatSheet_v2.pdf", subject: "Deep Learning", size: "1.2 MB", author: "Lab Assistant", date: "2 days ago" },
        { id: 3, title: "Markov_Decision_Processes_Notes.pdf", subject: "Reinforcement Learning", size: "450 KB", author: "Prof. Vikram Sen", date: "3 days ago" },
        { id: 4, title: "DBMS_Normal_Forms_Guide.docx", subject: "DBMS", size: "85 KB", author: "Prof. R. Sharma", date: "4 days ago" },
        { id: 5, title: "Probability_Distribution_Formulas.pdf", subject: "Mathematics", size: "320 KB", author: "Student Mukul", date: "5 days ago" }
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");
    const [downloadingId, setDownloadingId] = useState(null);
    const [downloadedIds, setDownloadedIds] = useState({});

    // Handle download action with loading simulation
    const handleDownload = (noteId, noteTitle) => {
        setDownloadingId(noteId);
        setTimeout(() => {
            setDownloadingId(null);
            setDownloadedIds(prev => ({ ...prev, [noteId]: true }));
            alert(`Downloaded: ${noteTitle} successfully!`);
        }, 1000);
    };

    // Filter notes based on search & subject dropdown
    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             note.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubjectFilter === "All" || note.subject === selectedSubjectFilter;
        return matchesSearch && matchesSubject;
    });

    return (
        <div className="notes-container page-fade-in">

            {/* Header section */}
            <div className="notes-header-meta">
                <h2>Notes &amp; Study Material Hub</h2>
                <p>Consolidated campus shared notes and study guides.</p>
            </div>

            {/* Notes list and search — full width */}
            <div className="notes-list-pane notes-full-width">

                {/* Search bar */}
                <div className="notes-filters-row">
                    <input
                        type="text"
                        placeholder="🔍 Search notes or contributors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="notes-search-input"
                    />
                    <select
                        value={selectedSubjectFilter}
                        onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                        className="notes-filter-select"
                    >
                        <option value="All">All Subjects</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Reinforcement Learning">Reinforcement Learning</option>
                        <option value="DBMS">DBMS</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>

                {/* Horizontal Subject Pills for Quick Filters */}
                <div className="notes-subject-pills">
                    {["All", "Deep Learning", "Reinforcement Learning", "DBMS", "Mathematics"].map((subj) => (
                        <button
                            key={subj}
                            className={`notes-pill ${selectedSubjectFilter === subj ? "active" : ""}`}
                            onClick={() => setSelectedSubjectFilter(subj)}
                        >
                            {subj}
                        </button>
                    ))}
                </div>

                {/* Notes catalog */}
                <div className="notes-catalog-list">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note, idx) => {
                            const titleLower = note.title.toLowerCase();
                            let fileTypeClass = "doc";
                            let fileTypeIcon = "📄";
                            if (titleLower.endsWith(".pdf")) {
                                fileTypeClass = "pdf";
                                fileTypeIcon = "📕";
                            } else if (titleLower.endsWith(".ipynb")) {
                                fileTypeClass = "ipynb";
                                fileTypeIcon = "📓";
                            } else if (titleLower.endsWith(".docx") || titleLower.endsWith(".doc")) {
                                fileTypeClass = "doc";
                                fileTypeIcon = "📘";
                            }
                            return (
                                <div key={idx} className="note-resource-card">
                                    <div className="note-card-details">
                                        <div className={`note-type-icon ${fileTypeClass}`}>
                                            {fileTypeIcon}
                                        </div>
                                        <div className="note-info-meta">
                                            <div className="note-badge-row">
                                                <span className="note-sub-badge">{note.subject}</span>
                                                <span className="note-size-badge font-mono">{note.size}</span>
                                            </div>
                                            <h4 className="note-title-text">{note.title}</h4>
                                            <p className="note-author-meta">
                                                Shared by <strong>{note.author}</strong> • {note.date}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="note-download-action"
                                        onClick={() => handleDownload(note.id, note.title)}
                                        disabled={downloadingId === note.id}
                                    >
                                        {downloadingId === note.id ? "⏳ Downloading..." : downloadedIds[note.id] ? "✅ Downloaded" : "📥 Download"}
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="notes-empty-state">
                            <span>📂</span>
                            <p>No matching notes found for current filters.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Notes;
