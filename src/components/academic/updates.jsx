import React, { useState } from "react";
import "./updates.css";

function Updates() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const updatesData = [
        {
            id: 1,
            title: "Mid-Term Examination Datesheet Released",
            description: "The official datesheet for Mid-Term Examination (Semester III) is now available. Exams will commence from September 15, 2026. Please check the timetable tab for specific exam slots.",
            category: "Exams",
            date: "17 Aug 2026",
            tag: "Urgent",
            tagColor: "var(--accent-red)",
            tagBg: "rgba(239, 68, 68, 0.08)"
        },
        {
            id: 2,
            title: "Guest Lecture: Industry Insights on Generative AI",
            description: "Join us for an exclusive guest lecture by Dr. Arjan Singh, Lead Researcher at OpenAI, on the future of GenAI and Large Language Models. Attendance is compulsory for all AI & ML batch students.",
            category: "Events",
            date: "17 Aug 2026",
            tag: "Compulsory",
            tagColor: "var(--accent-purple)",
            tagBg: "rgba(139, 92, 246, 0.08)"
        },
        {
            id: 3,
            title: "Holiday Declaration: Janmashtami Festival",
            description: "The University will remain closed on August 28, 2026, on account of Janmashtami. Regular classes will resume from August 29, 2026.",
            category: "Holidays",
            date: "15 Aug 2026",
            tag: "Holiday",
            tagColor: "var(--accent-green)",
            tagBg: "rgba(16, 185, 129, 0.08)"
        },
        {
            id: 4,
            title: "Library Book Returning Grace Period Extension",
            description: "The Digital Library Desk has extended the grace period for returning Semester II physical books until August 22, 2026, without any late fees. Please return books before the deadline.",
            category: "Notices",
            date: "12 Aug 2026",
            tag: "Library",
            tagColor: "var(--accent-sky)",
            tagBg: "rgba(14, 165, 233, 0.08)"
        },
        {
            id: 5,
            title: "Fee Payment Deadline Extension (Sem III)",
            description: "The Finance Ledger deadline for the outstanding Semester III tuition fee has been extended to August 20, 2026. Late fees will apply after this date.",
            category: "Notices",
            date: "10 Aug 2026",
            tag: "Finance",
            tagColor: "var(--accent-orange)",
            tagBg: "rgba(245, 158, 11, 0.08)"
        }
    ];

    const categories = ["All", "Exams", "Notices", "Holidays", "Events"];

    const filteredUpdates = updatesData.filter((item) => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="updates-container page-fade-in">
            {/* Header */}
            <div className="updates-header-meta">
                <h2>Academic Updates Hub</h2>
                <p>Stay informed with the latest official circulars, examination schedules, events, and holiday notices.</p>
            </div>

            {/* Toolbar: Search and Filter */}
            <div className="updates-toolbar">
                <div className="updates-search-wrapper">
                    <span className="updates-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search academic updates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="updates-search-bar"
                    />
                </div>

                <div className="updates-filter-container">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`updates-filter-pill ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Updates list */}
            <div className="updates-list">
                {filteredUpdates.length > 0 ? (
                    filteredUpdates.map((item) => (
                        <div key={item.id} className="update-card glass">
                            <div className="update-card-header">
                                <div className="update-title-area">
                                    <div className="update-meta">
                                        <span>📅 {item.date}</span>
                                        <span>•</span>
                                        <span>📂 {item.category}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="update-card-tags">
                                    <span
                                        className="update-badge"
                                        style={{ color: item.tagColor, backgroundColor: item.tagBg }}
                                    >
                                        {item.tag}
                                    </span>
                                </div>
                            </div>
                            <p className="update-desc">{item.description}</p>
                        </div>
                    ))
                ) : (
                    <div className="updates-empty-state">
                        <span className="updates-empty-icon">📭</span>
                        <h3>No updates found</h3>
                        <p>Try refining your search query or choosing another category filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Updates;
