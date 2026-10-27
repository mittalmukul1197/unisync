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

  function toggleReadStatus(id) {
    const updatedNotices = updates.map((notice) => {
      if (notice.id === id) {
        return {
          ...notice,
          read: !notice.read,
        };
      }

      return notice;
    });

    setUpdates(updatedNotices);
  }

  let unreadCount = 0;

  updates.forEach((notice) => {
    if (notice.read === false) {
      unreadCount++;
    }
  });

  const filteredUpdates = updates.filter((notice) => {
    let matchesCategory = false;

    if (activeCategory === "All") {
      matchesCategory = true;
    } else if (
      activeCategory === "Urgent" &&
      notice.priority === "Urgent"
    ) {
      matchesCategory = true;
    } else if (
      activeCategory === "Unread" &&
      notice.read === false
    ) {
      matchesCategory = true;
    } else if (notice.category === activeCategory) {
      matchesCategory = true;
    }

    const searchText = searchQuery.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(searchText) ||
      notice.sender.toLowerCase().includes(searchText) ||
      notice.summary.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    "Urgent",
    "Academic",
    "Research",
    "Exam Cell",
    "Administrative",
    "Unread",
  ];

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

          <h2>📢Teacher Updates & Official Notices</h2>

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
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="updates-category-pills">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`cat-filter-btn ${activeCategory === category ? "active" : ""
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "Urgent" ? "🚨 Urgent" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="updates-list-grid">
        {filteredUpdates.map((notice) => {
          let priorityClass = "info";
          let noticeClass = "";

          if (notice.priority === "Urgent") {
            priorityClass = "urgent";
            noticeClass = "urgent-notice";
          } else if (notice.priority === "Important") {
            priorityClass = "important";
            noticeClass = "import-notice";
          }

          return (
            <div
              key={notice.id}
              className={`notice-card ${notice.read ? "" : "unread"
                } ${noticeClass}`}
            >
              <div className="notice-card-top">

                <div>
                  <span className={`priority-badge ${priorityClass}`}>
                    {notice.priority}
                  </span>

                  <span className="category-tag">
                    {notice.category}
                  </span>


                </div>
                <div className="notice-badges-row">


                  <span className="notice-date-text">
                    {notice.date} - {notice.time}
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
                    onClick={() => {
                      alert(
                        "Downloading attachment: " + notice.attachment
                      );
                    }}
                  >
                    {notice.attachment} (Download)
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
                      : "Mark as Read"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TeacherUpdatesWidget({ onOpenAll }) {
  const widgetUpdates = updatesData.slice(0, 3);

  let unreadCount = 0;

  updatesData.forEach((notice) => {
    if (notice.read === false) {
      unreadCount++;
    }
  });

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
        {widgetUpdates.map((notice) => (
          <div
            key={notice.id}
            className={`widget-notice-item ${notice.read ? "" : "unread-item"
              }`}
            onClick={onOpenAll}
          >
            <span className="widget-item-icon">
              {notice.icon}
            </span>

            <div className="widget-item-content">
              <strong>{notice.title}</strong>

              <p>
                {notice.senderDept} <b>|</b> {notice.summary.slice(0, 75)}...
              </p>

              <div className="widget-item-meta">
                <span
                  className={`widget-priority ${notice.priority === "Urgent"
                    ? "urgent"
                    : "normal"
                    }`}
                >
                  {notice.priority}
                </span>

                <span> {notice.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}