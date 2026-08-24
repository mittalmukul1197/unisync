import React, { useState } from "react";
import "./facTeacherUpdates.css";

const updatesData = [
  {
    id: 1,
    title: "End-Semester Theory & Practical Invigilation Duties",
    sender: "Office of the Controller of Examinations (CoE)",
    senderDept: "Examination Cell",
    icon: "📝",
    iconBg: "#eff6ff",
    category: "Exam Cell",
    priority: "Urgent",
    date: "16 Aug 2026",
    time: "10:30 AM",
    summary:
      "Invigilation duty roster for Semester 6 (Spring 2026) has been allocated. Dr. Yogender Sharma is assigned 4 Theory Sessions in Block 3 and 2 Lab Audits.",
    content:
      "All assigned faculty members are requested to report 30 minutes prior to exam commencement at the Control Room. In case of any official clash, submit swap requisition by 18 Aug.",
    attachment: "Exam_Duties_CSE_Spring2026.pdf",
    read: false,
  },
  {
    id: 2,
    title: "SERB Core Research Grant Approved for Edge AI & Robotics Lab",
    sender: "Dean (Research & Sponsored Projects)",
    senderDept: "Research Cell",
    icon: "🔬",
    iconBg: "#faf5ff",
    category: "Research",
    priority: "Important",
    date: "14 Aug 2026",
    time: "02:15 PM",
    summary:
      "Sanction letter received from Science and Engineering Research Board (SERB) for project 'Real-time Autonomous Edge Vision Systems'. Initial grant release of ₹24.5 Lakhs initiated.",
    content:
      "Principal Investigator Dr. Yogender Sharma and Co-PIs are requested to attend the grant procurement briefing this Thursday at 11:00 AM in the Research Annex.",
    attachment: "SERB_Sanction_Order_2026.pdf",
    read: false,
  },
  {
    id: 3,
    title: "Departmental Meeting: NBA Accreditation Criterion 3 & 5 Review",
    sender: "Head of Department (Computer Science & Engg.)",
    senderDept: "HOD Office",
    icon: "👥",
    iconBg: "#f0fdf4",
    category: "Academic",
    priority: "Important",
    date: "12 Aug 2026",
    time: "04:00 PM",
    summary:
      "Review meeting for Course Outcome (CO) - Program Outcome (PO) mapping matrices for CS-301 and lab assessment rubrics.",
    content:
      "Venue: Department Conference Room (Block 3, 4th Floor). Please bring finalized internal assessment logs and student course feedback folders.",
    attachment: "NBA_Criterion_Checklist.docx",
    read: false,
  },
  {
    id: 4,
    title: "Mandatory ERP Attendance Synchronization Deadline",
    sender: "Academic ERP Cell & Registrar Office",
    senderDept: "University ERP",
    icon: "📊",
    iconBg: "#fff7ed",
    category: "Administrative",
    priority: "Urgent",
    date: "10 Aug 2026",
    time: "11:45 AM",
    summary:
      "All course instructors must sync weekly student attendance sheets to the central server before every Friday 05:00 PM.",
    content:
      "Bi-weekly shortage notices will be generated automatically for students below 75% attendance based on ERP logs.",
    attachment: null,
    read: true,
  },
  {
    id: 5,
    title: "IEEE International Conference on Smart AI Systems (ICSAS 2026)",
    sender: "Conference Organizing Committee",
    senderDept: "Faculty Welfare",
    icon: "🌐",
    iconBg: "#eff6ff",
    category: "Research",
    priority: "Info",
    date: "08 Aug 2026",
    time: "09:15 AM",
    summary:
      "Call for Papers & Technical Committee Session Chair nominations open. University faculty entitled to 100% registration fee reimbursement.",
    content:
      "Accepted papers will be indexed in IEEE Xplore. Faculty members can submit full research drafts via the conference CMT portal.",
    attachment: "ICSAS_CallForPapers_2026.pdf",
    read: true,
  },
];

export default function TeacherUpdates({ onBack }) {
  const [updates, setUpdates] = useState(updatesData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleReadStatus = (id) => {
    setUpdates(
      updates.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  const filteredUpdates = updates.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Urgent" && item.priority === "Urgent") ||
      item.category === activeCategory;

    const q = searchQuery.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.sender.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const unreadCount = updates.filter((item) => !item.read).length;

  return (
    <div className="teacher-updates-container">
      <div className="updates-page-header">
        <div>
          {onBack && (
            <button
              type="button"
              className="cat-filter-btn updates-back-btn"
              onClick={onBack}
            >
              ← Back to Dashboard
            </button>
          )}

          <h2>📢 Teacher Updates & Official Notices</h2>

          <p>
            Official circulars, exam duty allocations, meeting notices, and
            research updates for Mr. Yogendra Sharma
          </p>
        </div>

        <div className="updates-header-stats">
          {unreadCount > 0 && (
            <span className="unread-count-pill">
              🔔 {unreadCount} New Notices
            </span>
          )}

          <span className="pill">
            Total: {updates.length} Notices
          </span>
        </div>
      </div>

      <div className="updates-filter-bar">
        <div className="updates-search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search circulars, duties, notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="updates-category-pills">
          {[
            "All",
            "Urgent",
            "Academic",
            "Research",
            "Exam Cell",
            "Administrative",
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-filter-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "Urgent" ? "🚨 Urgent" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="updates-list-grid">
        {filteredUpdates.map((notice) => (
          <div
            key={notice.id}
            className={`notice-card ${
              !notice.read ? "unread" : ""
            } ${
              notice.priority === "Urgent" ? "urgent-notice" : notice.priority === "Important" ?"import-notice":""
            }`}
          >
            <div className="notice-card-top">
              <div className="notice-sender-group">
                <div
                  className="sender-icon-box"
                  style={{ background: notice.iconBg }}
                >
                  {notice.icon}
                </div>

                <div className="sender-info">
                  <strong>{notice.sender}</strong>
                  <span>{notice.senderDept}</span>
                </div>
              </div>

              <div className="notice-badges-row">
                <span
                  className={`priority-badge ${
                    notice.priority === "Urgent"
                      ? "urgent"
                      : notice.priority === "Important"
                      ? "important"
                      : "info"
                  }`}
                >
                  {notice.priority}
                </span>

                <span className="category-tag">
                  {notice.category}
                </span>

                <span className="notice-date-text">
                  📅 {notice.date} • {notice.time}
                </span>
              </div>
            </div>

            <div className="notice-card-content">
              <h3>{notice.title}</h3>

              <p>{notice.summary}</p>

              
            </div>

            <div className="notice-card-footer">
              {notice.attachment ? (
                <button
                  type="button"
                  className="attachment-pill"
                  onClick={() =>
                    alert(
                      `Downloading attachment: ${notice.attachment}`
                    )
                  }
                >
                  📎 {notice.attachment} (Download)
                </button>
              ) : (
                <span></span>
              )}

              <div className="notice-actions">
                <button
                  type="button"
                  className="mark-read-btn"
                  onClick={() => toggleReadStatus(notice.id)}
                >
                  {notice.read
                    ? "Mark Unread"
                    : "✓ Mark as Read"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeacherUpdatesWidget({ onOpenAll }) {
  const [updates, setUpdates] = useState(
    updatesData.slice(0, 3)
  );

  const unreadCount = updatesData.filter(
    (n) => !n.read
  ).length;

  return (
    <div className="teacher-updates-widget">
      <div className="widget-header">
        <h3>
          <span>🔔</span> Teacher Updates & Notices

          {unreadCount > 0 && (
            <span className="unread-count-pill">
              {unreadCount} New
            </span>
          )}
        </h3>

        <button
          type="button"
          className="view-all-link-btn"
          onClick={onOpenAll}
          title="Open Full Updates View"
        >
          View All →
        </button>
      </div>

      <div className="widget-items-list">
        {updates.map((item) => (
          <div
            key={item.id}
            className={`widget-notice-item ${
              !item.read ? "unread-item" : ""
            }`}
            onClick={onOpenAll}
          >
            <span className="widget-item-icon">
              {item.icon}
            </span>

            <div className="widget-item-content">
              <strong>{item.title}</strong>

              <p>
                {item.senderDept} •{" "}
                {item.summary.slice(0, 75)}...
              </p>

              <div className="widget-item-meta">
                <span
                  className={`widget-priority ${
                    item.priority === "Urgent"
                      ? "urgent"
                      : "normal"
                  }`}
                >
                  {item.priority}
                </span>

                <span>• {item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}