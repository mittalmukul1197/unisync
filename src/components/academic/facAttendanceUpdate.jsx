import React, { useState } from "react";
import "./facAttendanceUpdate.css";

const INITIAL_STUDENTS_DATA = {
  "CSE - Sem 6 (Batch A)": [
    { roll: "2110990101", name: "Aarav Sharma", status: "P", remarks: "" },
    { roll: "2110990102", name: "Ananya Verma", status: "P", remarks: "" },
    { roll: "2110990103", name: "Bhavya Gupta", status: "A", remarks: "Medical" },
    { roll: "2110990104", name: "Divyansh Mehra", status: "P", remarks: "" },
    { roll: "2110990105", name: "Ishaan Malhotra", status: "P", remarks: "" },
    { roll: "2110990106", name: "Kritika Saini", status: "P", remarks: "" },
    { roll: "2110990107", name: "Manav Joshi", status: "P", remarks: "" },
    { roll: "2110990108", name: "Navya Kapoor", status: "A", remarks: "" },
    { roll: "2110990109", name: "Pranav Aggarwal", status: "P", remarks: "" },
    { roll: "2110990110", name: "Riya Thakur", status: "P", remarks: "" },
  ],
  "CSE - Sem 6 (Batch B)": [
    { roll: "2110990201", name: "Aditya Nanda", status: "P", remarks: "" },
    { roll: "2110990202", name: "Charu Singla", status: "P", remarks: "" },
    { roll: "2110990203", name: "Gaurav Sen", status: "P", remarks: "" },
    { roll: "2110990204", name: "Harshita Kaur", status: "A", remarks: "Unwell" },
    { roll: "2110990205", name: "Kabir Bedi", status: "P", remarks: "" },
    { roll: "2110990206", name: "Mehak Chawla", status: "P", remarks: "" },
    { roll: "2110990207", name: "Nikhil Dhawan", status: "P", remarks: "" },
    { roll: "2110990208", name: "Pooja Batra", status: "P", remarks: "" },
  ],
  "CSE - Sem 6 (Batch C)": [
    { roll: "2110990301", name: "Aryan Mahajan", status: "P", remarks: "" },
    { roll: "2110990302", name: "Deepak Rawat", status: "P", remarks: "" },
    { roll: "2110990303", name: "Jasleen Grover", status: "P", remarks: "" },
    { roll: "2110990304", name: "Kunal Bansal", status: "A", remarks: "" },
    { roll: "2110990305", name: "Muskan Jain", status: "P", remarks: "" },
    { roll: "2110990306", name: "Raghav Sethi", status: "P", remarks: "" },
    { roll: "2110990307", name: "Simran Gill", status: "P", remarks: "" },
    { roll: "2110990308", name: "Tanishq Goyal", status: "P", remarks: "" },
  ],
};

const INITIAL_LOGS = [
  { id: 1, date: "2026-08-15", batch: "CSE - Sem 6 (Batch A)", session: "Theory Lecture", slot: "09:00 AM - 10:00 AM", present: 9, total: 10, pct: "90%" },
  { id: 2, date: "2026-08-15", batch: "CSE - Sem 6 (Batch B)", session: "Theory Lecture", slot: "11:30 AM - 12:30 PM", present: 7, total: 8, pct: "87.5%" },
  { id: 3, date: "2026-08-14", batch: "CSE - Sem 6 (Batch A)", session: "Practical Lab (Lab 3)", slot: "02:00 PM - 04:00 PM", present: 10, total: 10, pct: "100%" },
  { id: 4, date: "2026-08-14", batch: "CSE - Sem 6 (Batch C)", session: "Theory Lecture", slot: "10:00 AM - 11:00 AM", present: 7, total: 8, pct: "87.5%" },
];

function AttendanceUpdate() {
  const [selectedBatch, setSelectedBatch] = useState("CSE - Sem 6 (Batch A)");
  const [sessionType, setSessionType] = useState("Theory Lecture");
  const [timeSlot, setTimeSlot] = useState("09:00 AM - 10:00 AM");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchText, setSearchText] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [studentsData, setStudentsData] = useState(INITIAL_STUDENTS_DATA);
  const [historyLogs, setHistoryLogs] = useState(INITIAL_LOGS);

  const courseTitle = "Artificial Intelligence & Machine Learning (CS-301)";

  const currentBatchStudents = studentsData[selectedBatch] || [];

  const handleStatus = (rollNumber, newStatus) => {
    const updatedList = currentBatchStudents.map((student) => {
      if (student.roll === rollNumber) {
        return { ...student, status: newStatus };
      }
      return student;
    });

    setStudentsData({
      ...studentsData,
      [selectedBatch]: updatedList,
    });
  };

  const handleRemark = (rollNumber, text) => {
    const updatedList = currentBatchStudents.map((student) => {
      if (student.roll === rollNumber) {
        return { ...student, remarks: text };
      }
      return student;
    });

    setStudentsData({
      ...studentsData,
      [selectedBatch]: updatedList,
    });
  };

  const handleMarkAll = (status) => {
    const updatedList = currentBatchStudents.map((student) => ({
      ...student,
      status: status,
    }));

    setStudentsData({
      ...studentsData,
      [selectedBatch]: updatedList,
    });
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    setIsSaved(true);

    const newEntry = {
      id: Date.now(),
      date: date,
      batch: selectedBatch,
      session: sessionType,
      slot: timeSlot,
      present: presentCount,
      total: totalStudents,
      pct: `${attendancePercentage}%`,
    };

    setHistoryLogs([newEntry, ...historyLogs]);

    setTimeout(() => {
      setIsSaved(false);
    }, 3500);
  };

  const totalStudents = currentBatchStudents.length;
  const presentCount = currentBatchStudents.filter((s) => s.status === "P").length;
  const absentCount = currentBatchStudents.filter((s) => s.status === "A").length;
  const attendancePercentage = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  const displayedStudents = currentBatchStudents.filter((s) => {
    const query = searchText.toLowerCase();
    return s.name.toLowerCase().includes(query) || s.roll.includes(query);
  });

  return (
    <div className="attendance-page">
      <div className="assigned-course-banner">
        <div className="course-badge-icon">🤖</div>
        <div className="course-info-text">
          <div className="course-tag">Single Assigned Course</div>
          <h2>{courseTitle}</h2>
          <p>Department of Computer Science • 4 Credits • Semester 6 (Spring 2026)</p>
        </div>
        <div className="course-rate-stat">
          <span className="rate-num">{attendancePercentage}%</span>
          <span className="rate-lbl">Current Session Attendance</span>
        </div>
      </div>

      <div className="att-card filter-card">
        <div className="filter-header-row">
          <h3>📅 Session Details & Batch Selection</h3>
          <button
            type="button"
            className="history-toggle-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "← Back to Attendance Sheet" : `📋 View Attendance Logs (${historyLogs.length})`}
          </button>
        </div>

        <div className="filter-grid">
          <div className="filter-group">
            <label>Assigned Batch / Section</label>
            <select
              value={selectedBatch}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setSearchText("");
              }}
            >
              <option value="CSE - Sem 6 (Batch A)">CSE - Sem 6 (Batch A)</option>
              <option value="CSE - Sem 6 (Batch B)">CSE - Sem 6 (Batch B)</option>
              <option value="CSE - Sem 6 (Batch C)">CSE - Sem 6 (Batch C)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Session Type</label>
            <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
              <option value="Theory Lecture">Theory Lecture (Room A-201)</option>
              <option value="Practical Lab">Practical Lab (Lab 3)</option>
              <option value="Tutorial / Doubt Session">Tutorial / Doubt Session</option>
              <option value="Remedial Class">Remedial Class</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Time Slot</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
              <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Lab)</option>
              <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Lecture Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div className="summary-counters">
          <div className="count-badge total-badge">
            <span className="count-num">{totalStudents}</span>
            <span className="count-label">Total Enrolled</span>
          </div>
          <div className="count-badge present-badge">
            <span className="count-num">{presentCount}</span>
            <span className="count-label">Present</span>
          </div>
          <div className="count-badge absent-badge">
            <span className="count-num">{absentCount}</span>
            <span className="count-label">Absent</span>
          </div>
          <div className="count-badge pct-badge">
            <span className="count-num">{attendancePercentage}%</span>
            <span className="count-label">Percentage</span>
          </div>
        </div>
      </div>

      {showHistory ? (
        <div className="att-card table-card">
          <div className="table-top-bar">
            <div className="table-title">
              <h3>📋 AI & Machine Learning Attendance Submission History</h3>
              <span>All recorded sessions synced to ERP</span>
            </div>
          </div>
          <div className="att-table-wrapper">
            <table className="att-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Batch / Section</th>
                  <th>Session Type</th>
                  <th>Time Slot</th>
                  <th>Present / Total</th>
                  <th>Turnout %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {historyLogs.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td><strong>{item.date}</strong></td>
                    <td>{item.batch}</td>
                    <td>{item.session}</td>
                    <td>{item.slot}</td>
                    <td>{item.present} / {item.total}</td>
                    <td><span className="badge positive">{item.pct}</span></td>
                    <td><span className="synced-pill">✓ Synced to ERP</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="att-card table-card">
          <div className="table-top-bar">
            <div className="table-title">
              <h3>Student Attendance Sheet</h3>
              <span>{selectedBatch} • {sessionType} • {date}</span>
            </div>

            <div className="table-actions-wrapper">
              <div className="student-search-input">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Search by name or roll no..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="quick-mark-actions">
                <button
                  type="button"
                  className="quick-btn p-btn"
                  onClick={() => handleMarkAll("P")}
                  title="Mark all as Present"
                >
                  ✓ All Present
                </button>
                <button
                  type="button"
                  className="quick-btn a-btn"
                  onClick={() => handleMarkAll("A")}
                  title="Mark all as Absent"
                >
                  ✕ All Absent
                </button>
              </div>
            </div>
          </div>

          {isSaved && (
            <div className="success-banner">
              ✅ Attendance successfully saved and synced to University ERP for {selectedBatch}!
            </div>
          )}

          <div className="att-table-wrapper">
            <table className="att-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th style={{ width: "160px" }}>Roll Number</th>
                  <th>Student Name</th>
                  <th style={{ width: "240px" }}>Attendance Status</th>
                  <th style={{ width: "200px" }}>Notes / Remarks</th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state-row">
                      No students found matching "{searchText}"
                    </td>
                  </tr>
                ) : (
                  displayedStudents.map((student, index) => (
                    <tr key={student.roll} className={student.status === "A" ? "row-absent" : ""}>
                      <td>{index + 1}</td>
                      <td className="roll-col">{student.roll}</td>
                      <td className="name-col">
                        <strong>{student.name}</strong>
                        <span className="stu-batch-tag">{selectedBatch.replace("CSE - Sem 6 ", "")}</span>
                      </td>
                      <td>
                        <div className="toggle-btn-group">
                          <button
                            type="button"
                            className={`status-btn p-status ${student.status === "P" ? "active" : ""}`}
                            onClick={() => handleStatus(student.roll, "P")}
                          >
                            P (Present)
                          </button>
                          <button
                            type="button"
                            className={`status-btn a-status ${student.status === "A" ? "active" : ""}`}
                            onClick={() => handleStatus(student.roll, "A")}
                          >
                            A (Absent)
                          </button>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="remark-input"
                          placeholder="Optional remarks..."
                          value={student.remarks || ""}
                          onChange={(e) => handleRemark(student.roll, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="footer-summary-text">
              Marking attendance for <strong>{totalStudents} students</strong> in <strong>{courseTitle}</strong>.
            </div>
            <button className="submit-attendance-btn" onClick={handleSaveAttendance}>
              💾 Save & Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceUpdate;