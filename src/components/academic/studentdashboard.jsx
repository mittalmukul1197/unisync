import React, { useState } from "react";
import "./studentdashboard.css";
import StudentSidebar from "../layout/navbar";
import Header from "../layout/header";
import Footer from "../layout/footer";

import Profile from "./profile";
import Attendance from "./attendence";
import Timetable from "./timetable";
import Updates from "./updates";
import Notes from "./notes";
import Library from "./library";
import Fee from "./fee";
import Performance from "./performance";
import HostelStudentDashboard from "../hostel/studentdashboard";

import SettingsPlaceholder from "./settings";

function StudentDashboard({ activeTab: propActiveTab, setActiveTab: propSetActiveTab, user, onLogout }) {
    // Use props if provided (from DashboardLayout), otherwise fallback to internal state
    const [internalTab, setInternalTab] = useState("home");
    const activeTab = propActiveTab !== undefined ? propActiveTab : internalTab;
    const setActiveTab = propSetActiveTab || setInternalTab;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [sessionDropdownOpen, setSessionDropdownOpen] = useState(false);

    const currentSemester = 3;

    const allSessions = [
        { id: "JulDec2025", label: "Jul-Dec 2025 Session" },
        { id: "JanJun2026", label: "Jan-Jun 2026 Session" },
        { id: "JulDec2026", label: "Jul-Dec 2026 Session" },
    ].slice(-currentSemester);

    const activeSessionId = allSessions[allSessions.length - 1].id;
    const [selectedSession, setSelectedSession] = useState(activeSessionId);

    const getLiveTimetableStatus = () => {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentMins = hours * 60 + minutes;

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDayName = daysOfWeek[day];

        const schedules = {
            Monday: [
                { start: 540, end: 630, timeStr: "09:00 AM - 10:30 AM", name: "Database Management System", code: "24CSE0209" },
                { start: 640, end: 730, timeStr: "10:40 AM - 12:10 PM", name: "Statistics and Data Engineering", code: "25CAI0201" },
                { start: 780, end: 870, timeStr: "01:00 PM - 02:30 PM", name: "Object Oriented Programming", code: "25CSE0204" }
            ],
            Tuesday: [
                { start: 540, end: 630, timeStr: "09:00 AM - 10:30 AM", name: "Front End Engineering-II", code: "25CSE0203" },
                { start: 640, end: 730, timeStr: "10:40 AM - 12:10 PM", name: "Database Management System", code: "24CSE0209" },
                { start: 780, end: 870, timeStr: "01:00 PM - 02:30 PM", name: "Statistics and Data Engineering", code: "25CAI0201" }
            ],
            Wednesday: [
                { start: 540, end: 630, timeStr: "09:00 AM - 10:30 AM", name: "Object Oriented Programming", code: "25CSE0204" },
                { start: 640, end: 730, timeStr: "10:40 AM - 12:10 PM", name: "Front End Engineering-II", code: "25CSE0203" }
            ],
            Thursday: [
                { start: 540, end: 630, timeStr: "09:00 AM - 10:30 AM", name: "Database Management System", code: "24CSE0209" },
                { start: 640, end: 730, timeStr: "10:40 AM - 12:10 PM", name: "Front End Engineering-II", code: "25CSE0203" },
                { start: 780, end: 870, timeStr: "01:00 PM - 02:30 PM", name: "Object Oriented Programming", code: "25CSE0204" }
            ],
            Friday: [
                { start: 540, end: 630, timeStr: "09:00 AM - 10:30 AM", name: "Statistics and Data Engineering", code: "25CAI0201" },
                { start: 640, end: 730, timeStr: "10:40 AM - 12:10 PM", name: "Object Oriented Programming", code: "25CSE0204" },
                { start: 780, end: 870, timeStr: "01:00 PM - 02:30 PM", name: "Front End Engineering-II", code: "25CSE0203" }
            ]
        };

        const getTomorrowFirstClass = (dayIndex) => {
            const nextDayIndex = (dayIndex + 1) % 7;
            const nextDayName = daysOfWeek[nextDayIndex];
            const nextDayClasses = schedules[nextDayName];
            if (nextDayClasses && nextDayClasses.length > 0) {
                return { name: nextDayClasses[0].name, code: nextDayClasses[0].code, time: nextDayClasses[0].timeStr, day: nextDayName };
            }
            return { name: "Database Management System", code: "24CSE0209", time: "09:00 AM - 10:30 AM", day: "Monday" };
        };

        const todayClasses = schedules[currentDayName] || [];

        if (todayClasses.length === 0) {
            const next = getTomorrowFirstClass(day);
            return {
                status: "WEEKEND - NO CLASSES",
                current: { name: "Relax & Recharge Node", code: "FREE", timeStr: "Off-Hours" },
                upcoming: { name: next.name, code: next.code, info: `Next: ${next.day} at ${next.time.split(" - ")[0]}` }
            };
        }

        const firstClass = todayClasses[0];
        if (currentMins < firstClass.start) {
            return {
                status: "CLASSES NOT STARTED YET",
                current: { name: "Commences at 09:00 AM", code: "OFFLINE", timeStr: "Waiting" },
                upcoming: { name: firstClass.name, code: firstClass.code, info: `First: ${firstClass.name}` }
            };
        }

        const lastClass = todayClasses[todayClasses.length - 1];
        if (currentMins >= lastClass.end) {
            const next = getTomorrowFirstClass(day);
            return {
                status: "ALL CLASSES COMPLETED",
                current: { name: "Arogya Batch Closed for Today", code: "FINISHED", timeStr: "Off-Hours" },
                upcoming: { name: next.name, code: next.code, info: `Next: ${next.day} at ${next.time.split(" - ")[0]}` }
            };
        }

        for (let i = 0; i < todayClasses.length; i++) {
            const cls = todayClasses[i];
            if (currentMins >= cls.start && currentMins < cls.end) {
                const nextCls = todayClasses[i + 1];
                return {
                    status: "IN PROGRESS",
                    current: { name: cls.name, code: cls.code, timeStr: cls.timeStr },
                    upcoming: nextCls 
                        ? { name: nextCls.name, code: nextCls.code, info: `Next: ${nextCls.name} (${nextCls.timeStr.split(" - ")[0]})` }
                        : { name: "All sessions done", code: "END", info: "Last class of today" }
                };
            }
        }

        for (let i = 0; i < todayClasses.length - 1; i++) {
            const cls = todayClasses[i];
            const nextCls = todayClasses[i + 1];
            if (currentMins >= cls.end && currentMins < nextCls.start) {
                return {
                    status: "RECESS / BREAK",
                    current: { name: "Recess Period", code: "BREAK", timeStr: `${cls.timeStr.split(" - ")[1]} - ${nextCls.timeStr.split(" - ")[0]}` },
                    upcoming: { name: nextCls.name, code: nextCls.code, info: `Next starts: ${nextCls.timeStr.split(" - ")[0]}` }
                };
            }
        }

        return {
            status: "CLASSES NOT STARTED YET",
            current: { name: "Awaiting Session Commencement", code: "OFFLINE", timeStr: "N/A" },
            upcoming: { name: firstClass.name, code: firstClass.code, info: "N/A" }
        };
    };

    const liveTimetable = getLiveTimetableStatus();



    const renderActiveView = () => {
        switch (activeTab) {
            case "profile":
                return <Profile />;
            case "Performance":
                return <Performance />;
            case "attendance":
                return <Attendance />;
            case "timetable":
                return <Timetable />;
            case "updates":
                return <Updates />;
            case "notes":
                return <Notes />;
            case "library":
                return <Library />;
            case "fees":
                return <Fee />;
            case "hostel":
                return <HostelStudentDashboard />;
            case "settings":
            case "Settings":
                return <SettingsPlaceholder />;
            case "home":
            default:
                return renderHomeBento();
        }
    };

    const renderHomeBento = () => {
        return (
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
                                    <img 
                                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150" 
                                        alt="Rohit Verma Avatar" 
                                        className="welcome-banner-avatar"
                                    />
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
                                <span className="mini-val font-mono">9.29</span>
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

                <div className="bento-card attendance-card glass" onClick={() => setActiveTab("attendance")} style={{ cursor: "pointer" }}>
                    <div className="card-header-simple">
                        <h3>Attendance Compliance</h3>
                        <span className="card-subtitle font-mono">89.8%</span>
                    </div>

                    <div className="attendance-circle-container">
                        <div className="attendance-circle-wrap">
                            <svg width="100" height="100" viewBox="0 0 100 100" className="progress-ring-svg">
                                <circle className="ring-bg" cx="50" cy="50" r="42" stroke="rgba(0,0,0,0.03)" strokeWidth="8" fill="transparent" />
                                <circle 
                                    className="ring-fill" 
                                    cx="50" 
                                    cy="50" 
                                    r="42" 
                                    stroke="url(#attendanceCardGradient)" 
                                    strokeWidth="8" 
                                    fill="transparent" 
                                    strokeDasharray="263.89"
                                    strokeDashoffset={263.89 - (263.89 * 89.8) / 100}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="attendanceCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#60a5fa" />
                                        <stop offset="50%" stopColor="#1a3a8f" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="ring-center-text">
                                <span className="attendance-percentage font-mono">89.8%</span>
                                <span className="attendance-ratio-lbl font-mono">135 / 150</span>
                            </div>
                        </div>
                    </div>

                    <div className="attendance-details-pills" style={{ marginTop: "12px" }}>
                        <span className="compliance-explanation">Academic Status: <strong className="text-neon-green">Good Standing</strong></span>
                        <span className="forecaster-btn-link font-mono">View Attendance Ledger ➔</span>
                    </div>
                </div>

                <div className="bento-card timetable-card-bento glass" onClick={() => setActiveTab("timetable")} style={{ cursor: "pointer" }}>
                    <div className="card-header-simple">
                        <h3>Timetable Peek</h3>
                        <span className="live-tag">LH-501</span>
                    </div>

                    <div className="timetable-peek-details">
                        <div className="peek-section current">
                            <span className="peek-label">{liveTimetable.status}</span>
                            <h4>{liveTimetable.current.name}</h4>
                            <span className="peek-sub font-mono">{liveTimetable.current.timeStr}</span>
                        </div>
                        <div className="peek-divider"></div>
                        <div className="peek-section next">
                            <span className="peek-label">UPCOMING</span>
                            <h4>{liveTimetable.upcoming.name}</h4>
                            <span className="peek-sub font-mono">{liveTimetable.upcoming.info}</span>
                        </div>
                    </div>
                </div>

                <div className="bento-card library-card-bento glass" onClick={() => setActiveTab("library")} style={{ cursor: "pointer" }}>
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
                            <div className="quota-bar-fill" style={{ width: "40%" }}></div>
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

                <div className="bento-card placement-card-bento glass" onClick={() => setActiveTab("updates")} style={{ cursor: "pointer" }}>
                    <div className="card-header-simple">
                        <h3>Academic Updates</h3>
                        <span className="card-subtitle text-neon-green font-mono">NEW</span>
                    </div>

                    <div className="placement-peek-list">
                        <div className="placement-peek-item">
                            <span className="pl-tag font-mono" style={{ color: "var(--accent-red)", background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.15)" }}>EXAMS</span>
                            <div className="pl-details">
                                <strong>Mid-Term Datesheet</strong>
                                <span className="pl-status font-mono text-neon-orange">Released Today</span>
                            </div>
                        </div>
                        <div className="placement-peek-item">
                            <span className="pl-tag font-mono" style={{ color: "var(--accent-purple)", background: "rgba(139, 92, 246, 0.08)", borderColor: "rgba(139, 92, 246, 0.15)" }}>EVENTS</span>
                            <div className="pl-details">
                                <strong>Guest Lecture: GenAI</strong>
                                <span className="pl-status font-mono">Aug 17, 10:00 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bento-card lms-assignments-bento glass" onClick={() => setActiveTab("profile")} style={{ cursor: "pointer" }}>
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

                <div className="bento-card notes-card-bento glass" onClick={() => setActiveTab("notes")} style={{ cursor: "pointer" }}>
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
                        <div className="notes-peek-item">
                            <div className="notes-item-left">
                                <span className="notes-icon">📄</span>
                                <div className="notes-txt">
                                    <strong>24CSE0209_DBMS_NormalForms.pdf</strong>
                                    <span>Prof. R. Sharma • 2 days ago</span>
                                </div>
                            </div>
                            <div className="notes-meta-right">
                                <span className="notes-size-tag font-mono">1.2 MB</span>
                                <button className="notes-download-btn" title="Download PDF">📥</button>
                            </div>
                        </div>
                        <div className="notes-peek-item">
                            <div className="notes-item-left">
                                <span className="notes-icon">📄</span>
                                <div className="notes-txt">
                                    <strong>25CAI0201_Stats_CheatSheet.pdf</strong>
                                    <span>Student Mukul • 4 days ago</span>
                                </div>
                            </div>
                            <div className="notes-meta-right">
                                <span className="notes-size-tag font-mono">850 KB</span>
                                <button className="notes-download-btn" title="Download PDF">📥</button>
                            </div>
                        </div>
                        <div className="notes-peek-item">
                            <div className="notes-item-left">
                                <span className="notes-icon">📄</span>
                                <div className="notes-txt">
                                    <strong>25CSE0203_FrontEnd_CheatSheet.pdf</strong>
                                    <span>Prof. Y. Sharma • 5 days ago</span>
                                </div>
                            </div>
                            <div className="notes-meta-right">
                                <span className="notes-size-tag font-mono">2.1 MB</span>
                                <button className="notes-download-btn" title="Download PDF">📥</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }}>
            {/* Sidebar (Navbar) */}
            <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            {/* Right container */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", overflow: "hidden" }}>
                {/* Header */}
                <Header role="student" title={activeTab === 'home' ? 'Student Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} user={user} onLogout={onLogout} onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />
                
                {/* Scrollable Content Area */}
                <div className="student-dashboard-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
                    {renderActiveView()}
                </div>
                
                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default StudentDashboard;