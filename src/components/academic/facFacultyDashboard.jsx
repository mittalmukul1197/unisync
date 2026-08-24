import React, { useState } from "react";
import "./facFacultyDashboard.css";
import { FacultySidebar } from "../layout/navbar";
import Header from "../layout/header";
import Footer from "../layout/footer";
import MyInfo from "./facMyInfo";
import AttendanceUpdate from "./facAttendanceUpdate";
import TeacherUpdates, { TeacherUpdatesWidget} from "./facTeacherUpdates";
import FacStudents from "./facStudents";
import FacNotesUpload from "./facNotesUpload";
import FacPerformance from "./facPerformance";

function FacultyDashboard({ user, onLogout }) {
    // Navigation State
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUpdatesDrawerOpen, setIsUpdatesDrawerOpen] = useState(false);

    // Settings State
    const [autoSync, setAutoSync] = useState(true);
    const [defaulterAlerts, setDefaulterAlerts] = useState(true);

    // Single Course Info
    const courseCode = "CS-301";
    const courseName = "Artificial Intelligence & Machine Learning";
    const facultyName = "Dr. Yogender Sharma";

    

    return (
        <div className="faculty-dashboard">
            {/* 1. SIDEBAR NAVIGATION */}
            <FacultySidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* 2. MAIN CONTENT AREA */}
            <main className="faculty-content">
                {/* Top Header */}
                <Header
                    role="faculty"
                    title={activeTab === "Dashboard" ? "Faculty Portal" : activeTab}
                    user={user || { email: "dr.sharma@chitkara.edu.in" }}
                    onLogout={onLogout}
                    onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />

                {/* Dynamic Body Content according to activeTab */}
                <div className="faculty-body">
                    {activeTab === "Dashboard" && (
                        <>
                            {/* Hero Banner */}
                            <div className="faculty-hero-banner">
                                <div className="hero-content">
                                    <div className="hero-badge-pill">
                                        <span className="live-dot"></span> Single Assigned Course: <strong>{courseCode} • {courseName}</strong>
                                    </div>
                                    <h2>Welcome back, {facultyName} 👋</h2>
                                    <p>Department of Computer Science & Engineering • Semester 6 (Spring 2026)</p>
                                    <div className="hero-stats-strip">
                                        <span>👥 <strong>180 Students</strong> Enrolled</span>
                                        <span>📚 <strong>3 Batches</strong> (6A, 6B, 6C)</span>
                                        <span>📅 <strong>3 Lectures/Labs</strong> Scheduled Today</span>
                                    </div>
                                </div>
                                <div className="hero-actions">
                                    <button className="primary-hero-btn" onClick={() => setActiveTab("Attendance Update")}>
                                        📋 Mark Today's Attendance
                                    </button>
                                    <button className="secondary-hero-btn" onClick={() => setActiveTab("Notes Upload")}>
                                        📤 Upload AI/ML Notes
                                    </button>
                                </div>
                            </div>

                            {/* 4 KPI Cards */}
                            <div className="dashboard-grid">
                                <div className="card stat-card-hover" onClick={() => setActiveTab("Students")}>
                                    <div className="card-top">
                                        <span className="card-label">Enrolled Students</span>
                                        <div className="card-icon blue-icon">👥</div>
                                    </div>
                                    <h1>180</h1>
                                    <span className="badge positive">3 Batches (A, B, C)</span>
                                </div>

                                <div className="card stat-card-hover">
                                    <div className="card-top">
                                        <span className="card-label">Today's Subject Classes</span>
                                        <div className="card-icon purple-icon">📚</div>
                                    </div>
                                    <h1>03</h1>
                                    <span className="badge neutral">2 Lectures + 1 Lab</span>
                                </div>

                                <div className="card stat-card-hover" onClick={() => setActiveTab("Attendance Update")}>
                                    <div className="card-top">
                                        <span className="card-label">Avg. AI/ML Attendance</span>
                                        <div className="card-icon green-icon">📊</div>
                                    </div>
                                    <h1>88.4%</h1>
                                    <span className="badge positive">↑ 3.2% vs last week</span>
                                </div>

                                <div className="card stat-card-hover" onClick={() => setActiveTab("Notes Upload")}>
                                    <div className="card-top">
                                        <span className="card-label">Course Modules</span>
                                        <div className="card-icon orange-icon">📁</div>
                                    </div>
                                    <h1>5</h1>
                                    <span className="badge warning">Unit 3 In Progress</span>
                                </div>
                            </div>

                            <div className="bottom-section">
                                <div className="left-column">
                                    <div className="content-box">
                                        <div className="section-title">
                                            <div>
                                                <h3>Today's AI & ML Teaching Schedule</h3>
                                                <span className="sub-caption">All sessions for {courseCode} across batches</span>
                                            </div>
                                            <span className="count-pill">3 Sessions</span>
                                        </div>

                                        <div className="schedule-list">
                                            <div className="schedule-item completed-item">
                                                <div className="time-badge completed-badge">09:00 AM - 10:00 AM</div>
                                                <div className="schedule-details">
                                                    <div className="schedule-name-row">
                                                        <strong>Theory Lecture: Heuristic Search & A*</strong>
                                                        <span className="status-tag tag-done">✓ Completed</span>
                                                    </div>
                                                    <p>CSE - Sem 6 (Batch A) • Room A-201 • 90% Present</p>
                                                </div>
                                            </div>

                                            <div className="schedule-item active-item">
                                                <div className="time-badge active-badge">11:30 AM - 12:30 PM</div>
                                                <div className="schedule-details">
                                                    <div className="schedule-name-row">
                                                        <strong>Theory Lecture: Decision Trees & Pruning</strong>
                                                        <span className="status-tag tag-live">● Next Lecture</span>
                                                    </div>
                                                    <p>CSE - Sem 6 (Batch B) • Room A-204 • Starts in 30 mins</p>
                                                </div>
                                            </div>

                                            <div className="schedule-item upcoming-item">
                                                <div className="time-badge">02:00 PM - 04:00 PM</div>
                                                <div className="schedule-details">
                                                    <div className="schedule-name-row">
                                                        <strong>Practical Lab: Scikit-Learn Classification</strong>
                                                        <span className="status-tag tag-upcoming">Upcoming</span>
                                                    </div>
                                                    <p>CSE - Sem 6 (Batch A & B Lab) • Computing Lab 3</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content-box">
                                        <div className="section-title">
                                            <div>
                                                <h3>Syllabus Coverage ({courseCode})</h3>
                                                <span className="sub-caption">Semester 6 Course Blueprint</span>
                                            </div>
                                            <span className="percentage-pill">68% Completed</span>
                                        </div>

                                        <div className="syllabus-progress-list">
                                            <div className="syllabus-unit">
                                                <div className="unit-header">
                                                    <span>Unit 1: AI Foundations & Search Algorithms</span>
                                                    <strong className="unit-done">100%</strong>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-bar-fill" style={{ width: "100%", background: "#22c55e" }}></div>
                                                </div>
                                            </div>

                                            <div className="syllabus-unit">
                                                <div className="unit-header">
                                                    <span>Unit 2: Knowledge Representation & Logic</span>
                                                    <strong className="unit-done">100%</strong>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-bar-fill" style={{ width: "100%", background: "#22c55e" }}></div>
                                                </div>
                                            </div>

                                            <div className="syllabus-unit">
                                                <div className="unit-header">
                                                    <span>Unit 3: Machine Learning & Decision Trees</span>
                                                    <strong className="unit-prog">70%</strong>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-bar-fill" style={{ width: "70%", background: "#3b82f6" }}></div>
                                                </div>
                                            </div>

                                            <div className="syllabus-unit">
                                                <div className="unit-header">
                                                    <span>Unit 4: Deep Neural Networks & Backprop</span>
                                                    <strong className="unit-pending">20%</strong>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-bar-fill" style={{ width: "20%", background: "#f59e0b" }}></div>
                                                </div>
                                            </div>

                                            <div className="syllabus-unit">
                                                <div className="unit-header">
                                                    <span>Unit 5: Computer Vision   & NLP Applications</span>
                                                    <strong className="unit-pending">0%</strong>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div className="progress-bar-fill" style={{ width: "0%", background: "#e2e8f0" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content-box">
                                        <div className="section-title">
                                            <h3>Quick Subject Actions</h3>
                                        </div>
                                        <div className="quick-actions-grid">
                                            <button className="action-btn" onClick={() => setActiveTab("Attendance Update")}>
                                                <span className="action-icon">📋</span>
                                                <span>Take Attendance</span>
                                            </button>
                                            <button className="action-btn" onClick={() => setActiveTab("Teacher Updates")}>
                                                <span className="action-icon">🔔</span>
                                                <span>Teacher Updates</span>
                                            </button>
                                            <button className="action-btn" onClick={() => setActiveTab("Notes Upload")}>
                                                <span className="action-icon">📤</span>
                                                <span>Upload Notes</span>
                                            </button>
                                            <button className="action-btn" onClick={() => setActiveTab("Performance")}>
                                                <span className="action-icon">✍️</span>
                                                <span>Enter Marks</span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="right-column">
                                    {/* Teacher Updates & Notices Widget */}
                                    <TeacherUpdatesWidget onOpenAll={() => setActiveTab("Updates")} />

                                    {/* Recent Activity */}
                                    <div className="content-box">
                                        <div className="section-title">
                                            <h3>Recent Subject Activity</h3>
                                        </div>

                                        <ul className="activity-list">
                                            <li>
                                                <span className="dot green-dot"></span>
                                                <div>
                                                    <strong>Attendance Recorded for Batch A</strong>
                                                    <p>90% present • Today, 10:05 AM</p>
                                                </div>
                                            </li>
                                            <li>
                                                <span className="dot blue-dot"></span>
                                                <div>
                                                    <strong>Unit 3 Notes Uploaded</strong>
                                                    <p>Decision Trees & Ensemble Learning • Yesterday</p>
                                                </div>
                                            </li>
                                            <li>
                                                <span className="dot purple-dot"></span>
                                                <div>
                                                    <strong>Lab 2 Assessment Graded</strong>
                                                    <p>180 students evaluated • 2 days ago</p>
                                                </div>
                                            </li>
                                            <li>
                                                <span className="dot orange-dot"></span>
                                                <div>
                                                    <strong>Mid-Term Paper Submitted</strong>
                                                    <p>Reviewed by Examination Cell • 3 days ago</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Course Deadlines */}
                                    <div className="content-box">
                                        <div className="section-title">
                                            <h3>Course Deadlines</h3>
                                        </div>

                                        <div className="deadline-item">
                                            <div>
                                                <strong>Mid-Term Marks Upload (CS-301)</strong>
                                                <p>Due: Friday, 20 Aug • ERP Portal</p>
                                            </div>
                                            <span className="deadline-tag urgent">Urgent</span>
                                        </div>

                                        <div className="deadline-item">
                                            <div>
                                                <strong>Lab 3 Evaluation Submission</strong>
                                                <p>Due: 24 Aug • Batch A & B</p>
                                            </div>
                                            <span className="deadline-tag normal">Upcoming</span>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "My Info" && <MyInfo />}

                    {activeTab === "Updates" && (
                        <TeacherUpdates onBack={() => setActiveTab("Dashboard")} />
                    )}

                    {activeTab === "Attendance Update" && <AttendanceUpdate />}

                    {activeTab === "Students" && (
                        <FacStudents courseCode={courseCode} courseName={courseName} />
                    )}

                    {activeTab === "Notes Upload" && (
                        <FacNotesUpload courseCode={courseCode} courseName={courseName} />
                    )}

                    {activeTab === "Performance" && (
                        <FacPerformance courseCode={courseCode} courseName={courseName} />
                    )}

                    {activeTab === "Settings" && (
                        <div className="dashboard-tab-container">
                            <div className="tab-page-header">
                                <div>
                                    <h2>⚙️ Faculty Settings & Preferences</h2>
                                    <p>Manage course alerts and ERP synchronization</p>
                                </div>
                            </div>

                            <div className="content-box">
                                <div className="settings-section">
                                    <h3>Subject & Academic Preferences</h3>
                                    <div className="settings-item">
                                        <div>
                                            <strong>Auto-Sync Attendance to ERP</strong>
                                            <p>Automatically push saved attendance sheets to the University ERP server</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={autoSync}
                                            onChange={(e) => setAutoSync(e.target.checked)}
                                            className="toggle-switch"
                                        />
                                    </div>

                                    <div className="settings-item">
                                        <div>
                                            <strong>Student Attendance Defaulter Alerts</strong>
                                            <p>Notify faculty when a student drops below 75% attendance in CS-301</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={defaulterAlerts}
                                            onChange={(e) => setDefaulterAlerts(e.target.checked)}
                                            className="toggle-switch"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
                
            </main>

            {/* {showNoticeModal && (
        <div className="modal-backdrop" onClick={() => setShowNoticeModal(false)}>
          <div className="edit-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📢 Post Course Notice ({courseCode})</h3>
              <button className="close-btn" onClick={() => setShowNoticeModal(false)}>✕</button>
            </div>
            {noticeSuccess ? (
              <div className="modal-success-msg">
                ✅ Notice successfully published to Batches 6A, 6B, and 6C!
              </div>
            ) : (
              <form onSubmit={handlePostNotice} className="edit-form-grid">
                <div className="form-field full-width">
                  <label>Announcement Message</label>
                  <textarea
                    rows={4}
                    className="notice-textarea"
                    placeholder="Write an announcement for all students enrolled in AI & ML..."
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="modal-actions full-width">
                  <button type="button" className="cancel-btn" onClick={() => setShowNoticeModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    📢 Post to All Batches
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )} */}
        </div>
    );
}

export default FacultyDashboard;
