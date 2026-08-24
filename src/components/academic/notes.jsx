import React, { useState } from "react";
import "./notes.css";

const INITIAL_NOTES = [
    { id: 1, title: "Backprop_Derivation_Chain_Rule.ipynb", subject: "Deep Learning", size: "15 KB", author: "Prof. Neha Sen", date: "Yesterday" },
    { id: 2, title: "CNN_Architecture_CheatSheet_v2.pdf", subject: "Deep Learning", size: "1.2 MB", author: "Lab Assistant", date: "2 days ago" },
    { id: 3, title: "Markov_Decision_Processes_Notes.pdf", subject: "Reinforcement Learning", size: "450 KB", author: "Prof. Vikram Sen", date: "3 days ago" },
    { id: 4, title: "DBMS_Normal_Forms_Guide.docx", subject: "DBMS", size: "85 KB", author: "Prof. R. Sharma", date: "4 days ago" },
    { id: 5, title: "Probability_Distribution_Formulas.pdf", subject: "Mathematics", size: "320 KB", author: "Student Mukul", date: "5 days ago" }
];

const SUBJECT_FILTERS = ["All", "Deep Learning", "Reinforcement Learning", "DBMS", "Mathematics"];

function getFileTypeInfo(title) {
    const lower = title.toLowerCase();
    if (lower.endsWith(".pdf")) return { className: "pdf", icon: "📕" };
    if (lower.endsWith(".ipynb")) return { className: "ipynb", icon: "📓" };
    if (lower.endsWith(".docx") || lower.endsWith(".doc")) return { className: "doc", icon: "📘" };
    return { className: "doc", icon: "📄" };
}

function Notes() {
    const [notes] = useState(INITIAL_NOTES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");

    const filteredNotes = notes.filter((note) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = note.title.toLowerCase().includes(query) || note.author.toLowerCase().includes(query);
        const matchesSubject = selectedSubjectFilter === "All" || note.subject === selectedSubjectFilter;
        return matchesSearch && matchesSubject;
    });

    return (
        <div className="notes-container page-fade-in">
            <div className="notes-header-meta">
                <h2>Notes &amp; Study Material Hub</h2>
                <p>Consolidated campus shared notes and study guides.</p>
            </div>

            <div className="notes-list-pane">
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
                        {SUBJECT_FILTERS.map((subj) => (
                            <option key={subj} value={subj}>
                                {subj === "All" ? "All Subjects" : subj}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="notes-subject-pills">
                    {SUBJECT_FILTERS.map((subj) => (
                        <button
                            key={subj}
                            className={`notes-pill ${selectedSubjectFilter === subj ? "active" : ""}`}
                            onClick={() => setSelectedSubjectFilter(subj)}
                        >
                            {subj}
                        </button>
                    ))}
                </div>

                <div className="notes-catalog-list">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => {
                            const { className: fileTypeClass, icon: fileTypeIcon } = getFileTypeInfo(note.title);
                            return (
                                <div key={note.id} className="note-resource-card">
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
                                        onClick={() => alert(`Downloaded: ${note.title} successfully!`)}
                                    >
                                        📥 Download
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
