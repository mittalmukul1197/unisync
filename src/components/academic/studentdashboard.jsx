import React, { useState } from "react";
import "./studentdashboard.css";
import studentAvatar from "../../assets/student_profile.jpg";

import StudentSidebar from "../layout/navbar";
import Header from "../layout/header";
import Footer from "../layout/footer";


import Profile from "./profile";
import Attendance from "./attendence";
import Timetable, { SCHEDULE_DATA } from "./timetable";
import Updates from "./updates";
import Notes from "./notes";
import Library from "./library";
import Fee from "./fee";
import Performance from "./performance";
import HostelStudentDashboard from "../hostel/studentdashboard";
import SettingsPlaceholder from "./settings";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getMinutes(timeStr) {
    const [time, period] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
}

function getLiveTimetableStatus() {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[now.getDay()];
    const classes = SCHEDULE_DATA[today] || SCHEDULE_DATA["Monday"];

    for (let i = 0; i < classes.length; i++) {
        const [startStr, endStr] = classes[i].time.split(" - ");
        const start = getMinutes(startStr);
        const end = getMinutes(endStr);

        if (currentMins >= start && currentMins < end) {
            const next = classes[i + 1] || classes[0];
            return {
                first: { status: "IN PROGRESS", name: classes[i].name, code: classes[i].code, timeStr: classes[i].time },
                second: { status: "UPCOMING", name: next.name, code: next.code, timeStr: next.time }
            };
        }
    }

    for (let i = 0; i < classes.length; i++) {
        const start = getMinutes(classes[i].time.split(" - ")[0]);
        if (currentMins < start) {
            const next = classes[i + 1] || classes[0];
            return {
                first: { status: "UPCOMING", name: classes[i].name, code: classes[i].code, timeStr: classes[i].time },
                second: { status: "UPCOMING", name: next.name, code: next.code, timeStr: next.time }
            };
        }
    }


    return {
        first: { status: "UPCOMING", name: classes[0].name, code: classes[0].code, timeStr: classes[0].time },
        second: { status: "UPCOMING", name: classes[1].name, code: classes[1].code, timeStr: classes[1].time }
    };
}

const NOTES_PEEK = [
    { file: "24CSE0209_DBMS_NormalForms.pdf",    by: "Prof. R. Sharma", ago: "2 days ago", size: "1.2 MB" },
    { file: "25CAI0201_Stats_CheatSheet.pdf",     by: "Student Mukul",   ago: "4 days ago", size: "850 KB" },
    { file: "25CSE0203_FrontEnd_CheatSheet.pdf",  by: "Prof. Y. Sharma", ago: "5 days ago", size: "2.1 MB" },
];

function StudentDashboard({ activeTab: propActiveTab, setActiveTab: propSetActiveTab, user, onLogout }) {
    const [internalTab, setInternalTab] = useState("home");
    const activeTab = propActiveTab !== undefined ? propActiveTab : internalTab;
    const setActiveTab = propSetActiveTab || setInternalTab;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const currentSemester = 3;
    const allSessions = [
        { id: "JulDec2025", label: "Jul-Dec 2025 Session" },
        { id: "JanJun2026", label: "Jan-Jun 2026 Session" },
        { id: "JulDec2026", label: "Jul-Dec 2026 Session" },
    ].slice(-currentSemester);

    const activeSessionId = allSessions[allSessions.length - 1].id;
    const [selectedSession, setSelectedSession] = useState(activeSessionId);

    const liveTimetable = getLiveTimetableStatus();


    const renderActiveView = () => {
        switch (activeTab) {
            case "profile":     return <Profile />;
            case "Performance": return <Performance />;
            case "attendance":  return <Attendance />;
            case "timetable":   return <Timetable />;
            case "updates":     return <Updates />;
            case "notes":       return <Notes />;
            case "library":     return <Library />;
            case "fees":        return <Fee />;
            case "hostel":      return <HostelStudentDashboard />;
            case "settings":
            case "Settings":    return <SettingsPlaceholder />;
            case "home":
            default:            return renderHomeBento();
        }
    };

    const renderHomeBento = () => (
        <div className="bento-grid page-fade-in">

            <div className="bento-card profile-card glass">
                <div className="profile-card-content">
                    <div className="welcome-banner-split">
                        <div className="welcome-banner-text-side">
                            <span className="degree-tag font-mono">BE CSE (AI&ML) - Semester III</span>
                            <h1 className="profile-title">Welcome back, Rohit Verma 👋</h1>
                            <p className="student-meta">Roll Number: 25109928 | Mentor: Dr. Lakshita</p>
                            <div className="welcome-academic-alert">
                                <span className="alert-emoji">💡</span>
                                <span className="alert-text">Maintain &gt;75% attendance to avoid detention during Term-End exams.</span>
                            </div>
                        </div>
                        <div className="welcome-banner-avatar-side">
                            <div className="welcome-avatar-container">
                                <div className="welcome-avatar-img-wrap">
                                    <img
                                        src={studentAvatar}
                                        alt="Rohit Verma Avatar"
                                        className="welcome-banner-avatar"
                                    />
                                </div>
                                <span className="welcome-avatar-status-badge"></span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-academic-focus">
                        <span className="focus-title font-mono">Academic Group & Section:</span>
                        <div className="focus-pills">
                            <span className="focus-pill neon-cyan-pill">Section: U25AIML-G8</span>
                            <span className="focus-pill neon-purple-pill">Lab Group: G8-A</span>
                            <span className="focus-pill neon-pink-pill">Room: LH-501</span>
                            <span className="focus-pill neon-green-pill">Advisor: Dr. Lakshita</span>
                        </div>
                    </div>

                    <div className="student-stats-row">
                        <div className="mini-stat">
                            <span className="mini-val font-mono">9.35</span>
                            <span className="mini-lbl">Cumulative CGPA</span>
                        </div>
                        <div className="mini-stat">
                            <span className="mini-val font-mono">3rd</span>
                            <span className="mini-lbl">Semester</span>
                        </div>
                        <button className="view-details-action" onClick={() => setActiveTab("profile")}>
                            View Full Profile ➔
                        </button>
                    </div>
                </div>
            </div>

            <div className="bento-card attendance-card glass" onClick={() => setActiveTab("attendance")}>
                <div className="card-header-simple">
                    <h3>Attendance Compliance</h3>
                    <span className="card-subtitle font-mono">89.8%</span>
                </div>
                <div className="attendance-circle-container">
                    <div
                        className="attendance-ring"
                        style={{
                            background: "conic-gradient(#60a5fa 0%, #06b6d4 89.8%, #e2e8f0 89.8% 100%)"
                        }}
                    >
                        <div className="attendance-ring-inner">
                            <span className="attendance-percentage font-mono">89.8%</span>
                            <span className="attendance-ratio-lbl font-mono">135 / 150</span>
                        </div>
                    </div>
                </div>
                <div className="attendance-details-pills">
                    <span className="compliance-explanation">
                        Academic Status: <strong className="text-neon-green">Good Standing</strong>
                    </span>
                    <span className="forecaster-btn-link font-mono">View Attendance Ledger ➔</span>
                </div>
            </div>

            <div className="bento-card timetable-card-bento glass" onClick={() => setActiveTab("timetable")}>
                <div className="card-header-simple">
                    <h3>Timetable Peek</h3>
                    <span className="live-tag">LH-501</span>
                </div>
                <div className="timetable-peek-details">
                    <div className="peek-section">
                        <span className="peek-label">{liveTimetable.first.status}</span>
                        <h4>{liveTimetable.first.name}</h4>
                        <span className="peek-sub font-mono">{liveTimetable.first.timeStr}</span>
                    </div>
                    <div className="peek-divider"></div>
                    <div className="peek-section">
                        <span className="peek-label">{liveTimetable.second.status}</span>
                        <h4>{liveTimetable.second.name}</h4>
                        <span className="peek-sub font-mono">{liveTimetable.second.timeStr}</span>
                    </div>
                </div>
            </div>

            <div className="bento-card library-card-bento glass" onClick={() => setActiveTab("library")}>
                <div className="card-header-simple">
                    <h3>Library Ledger</h3>
                    <span className="card-subtitle">HOLDINGS</span>
                </div>
                <div className="library-quota-gauge">
                    <div className="quota-label-row">
                        <span className="quota-text">Quota Borrowed</span>
                        <span className="quota-ratio font-mono">2 / 5 Books</span>
                    </div>
                    <div className="quota-bar-track">
                        <div className="quota-bar-fill library-fill-40"></div>
                    </div>
                </div>
                <div className="library-peek-info">
                    <div className="book-alert-box warning-alert">
                        <span className="book-icon">📖</span>
                        <div className="book-txt">
                            <strong>Generative Deep Learning</strong>
                            <span className="warning-text font-mono">Due in 2 days ⚠️</span>
                        </div>
                    </div>
                    <div className="book-alert-box safe-alert">
                        <span className="book-icon">📖</span>
                        <div className="book-txt">
                            <strong>Introduction to Algorithms</strong>
                            <span className="safe-text font-mono">Due in 12 days</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bento-card placement-card-bento glass" onClick={() => setActiveTab("updates")}>
                <div className="card-header-simple">
                    <h3>Academic Updates</h3>
                    <span className="card-subtitle text-neon-green font-mono">NEW</span>
                </div>
                <div className="placement-peek-list">
                    <div className="placement-peek-item">
                        <span className="pl-tag font-mono pl-tag-exams">EXAMS</span>
                        <div className="pl-details">
                            <strong>Mid-Term Datesheet</strong>
                            <span className="pl-status font-mono text-neon-orange">Released Today</span>
                        </div>
                    </div>
                    <div className="placement-peek-item">
                        <span className="pl-tag font-mono pl-tag-events">EVENTS</span>
                        <div className="pl-details">
                            <strong>Guest Lecture: GenAI</strong>
                            <span className="pl-status font-mono">Aug 17, 10:00 AM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bento-card lms-assignments-bento glass" onClick={() => setActiveTab("profile")}>
                <div className="card-header-simple">
                    <h3>LMS Deadlines</h3>
                    <span className="gp-status-label danger">2 PENDING</span>
                </div>
                <div className="lms-peek-list">
                    <div className="lms-item">
                        <span className="bullet-dot red"></span>
                        <div className="lms-item-meta">
                            <strong>Database Management System Assignment 3</strong>
                            <span className="lms-time font-mono">Due in 20 hours ⚠️</span>
                        </div>
                    </div>
                    <div className="lms-item">
                        <span className="bullet-dot orange"></span>
                        <div className="lms-item-meta">
                            <strong>Statistics and Data Engineering Lab Assignment 2</strong>
                            <span className="lms-time font-mono">Due in 3 days</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bento-card notes-card-bento glass" onClick={() => setActiveTab("notes")}>
                <div className="card-header-simple">
                    <h3>Notes Subnet Peek</h3>
                    <div className="notes-filter-pills" onClick={(e) => e.stopPropagation()}>
                        <span className="filter-pill active">All</span>
                        <span className="filter-pill">DBMS</span>
                        <span className="filter-pill">SDE</span>
                        <span className="filter-pill">OOP</span>
                    </div>
                </div>
                <div className="notes-peek-row">
                    {NOTES_PEEK.map((note) => (
                        <div className="notes-peek-item" key={note.file}>
                            <div className="notes-item-left">
                                <span className="notes-icon">📄</span>
                                <div className="notes-txt">
                                    <strong>{note.file}</strong>
                                    <span>{note.by} • {note.ago}</span>
                                </div>
                            </div>
                            <div className="notes-meta-right">
                                <span className="notes-size-tag font-mono">{note.size}</span>
                                <button className="notes-download-btn" title="Download PDF">📥</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

    const pageTitle = activeTab === "home"
        ? "Student Dashboard"
        : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    return (
        <div className="student-dashboard-shell">
            <StudentSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
            <div className="student-dashboard-main">
                <Header
                    role="student"
                    title={pageTitle}
                    user={user}
                    onLogout={onLogout}
                    onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
                />
                <div className="student-dashboard-content">
                    {renderActiveView()}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default StudentDashboard;