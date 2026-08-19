import React, { useState } from "react";
import "./facStudents.css";

const MOCK_COURSE_STUDENTS = [
  { roll: "2110990101", name: "Aarav Sharma", batch: "Batch A", attendance: 92, status: "Good" },
  { roll: "2110990102", name: "Ananya Verma", batch: "Batch A", attendance: 88, status: "Good" },
  { roll: "2110990103", name: "Bhavya Gupta", batch: "Batch A", attendance: 68, status: "At Risk (<75%)" },
  { roll: "2110990104", name: "Divyansh Mehra", batch: "Batch A", attendance: 94, status: "Good" },
  { roll: "2110990105", name: "Ishaan Malhotra", batch: "Batch A", attendance: 78, status: "Good" },
  { roll: "2110990201", name: "Aditya Nanda", batch: "Batch B", attendance: 85, status: "Good" },
  { roll: "2110990202", name: "Charu Singla", batch: "Batch B", attendance: 90, status: "Good" },
  { roll: "2110990204", name: "Harshita Kaur", batch: "Batch B", attendance: 62, status: "At Risk (<75%)" },
  { roll: "2110990205", name: "Kabir Bedi", batch: "Batch B", attendance: 96, status: "Good" },
  { roll: "2110990301", name: "Aryan Mahajan", batch: "Batch C", attendance: 84, status: "Good" },
  { roll: "2110990304", name: "Kunal Bansal", batch: "Batch C", attendance: 71, status: "At Risk (<75%)" },
  { roll: "2110990307", name: "Simran Gill", batch: "Batch C", attendance: 91, status: "Good" },
];

function FacStudents({ courseCode = "CS-301", courseName = "Artificial Intelligence & Machine Learning" }) {
  const [studentBatchFilter, setStudentBatchFilter] = useState("All");
  const [studentSearch, setStudentSearch] = useState("");
  const [studentsList] = useState(MOCK_COURSE_STUDENTS);

  const filteredStudents = studentsList.filter((student) => {
    const matchesBatch =
      studentBatchFilter === "All" || student.batch === studentBatchFilter;
    const query = studentSearch.toLowerCase();
    const matchesQuery =
      student.name.toLowerCase().includes(query) || student.roll.includes(query);
    return matchesBatch && matchesQuery;
  });

  return (
    <div className="fac-students-container">
      <div className="fac-students-header">
        <div>
          <h2>🎓 Students Directory ({courseCode})</h2>
          <p>Enrolled students in {courseName} across Sem 6 Batches</p>
        </div>
        <div className="fac-students-header-stats">
          <span className="pill">Total: {filteredStudents.length} shown</span>
          <span className="pill id-pill">Batches: 6A, 6B, 6C</span>
        </div>
      </div>

      <div className="fac-students-content-box">
        <div className="fac-students-filter-bar">
          <div className="fac-students-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search student by name or roll..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>

          <div className="fac-students-batches">
            {["All", "Batch A", "Batch B", "Batch C"].map((batchName) => (
              <button
                key={batchName}
                type="button"
                className={`fac-batch-btn ${
                  studentBatchFilter === batchName ? "active" : ""
                }`}
                onClick={() => setStudentBatchFilter(batchName)}
              >
                {batchName}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Assigned Batch</th>
                <th>AI/ML Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <tr key={student.roll}>
                  <td>{i + 1}</td>
                  <td className="mono-text">{student.roll}</td>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>
                    <span className="batch-badge">{student.batch}</span>
                  </td>
                  <td>
                    <span
                      className={`att-rate ${
                        student.attendance < 75 ? "low" : "high"
                      }`}
                    >
                      {student.attendance}%
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        student.attendance >= 75 ? "positive" : "warning"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FacStudents;
