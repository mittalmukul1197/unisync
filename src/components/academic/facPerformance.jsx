import React, { useState } from "react";
import "./facPerformance.css";

const MOCK_STUDENT_MARKS = [
  { roll: "2110990101", name: "Aarav Sharma", batch: "Batch A", midTerm: 28, lab: 19, assignment: 19 },
  { roll: "2110990102", name: "Ananya Verma", batch: "Batch A", midTerm: 26, lab: 18, assignment: 18 },
  { roll: "2110990103", name: "Bhavya Gupta", batch: "Batch A", midTerm: 18, lab: 14, assignment: 15 },
  { roll: "2110990104", name: "Divyansh Mehra", batch: "Batch A", midTerm: 29, lab: 20, assignment: 20 },
  { roll: "2110990105", name: "Ishaan Malhotra", batch: "Batch A", midTerm: 22, lab: 16, assignment: 17 },
  { roll: "2110990201", name: "Aditya Nanda", batch: "Batch B", midTerm: 24, lab: 17, assignment: 18 },
  { roll: "2110990202", name: "Charu Singla", batch: "Batch B", midTerm: 27, lab: 19, assignment: 19 },
  { roll: "2110990204", name: "Harshita Kaur", batch: "Batch B", midTerm: 16, lab: 12, assignment: 14 },
  { roll: "2110990205", name: "Kabir Bedi", batch: "Batch B", midTerm: 30, lab: 20, assignment: 20 },
  { roll: "2110990301", name: "Aryan Mahajan", batch: "Batch C", midTerm: 23, lab: 18, assignment: 17 },
  { roll: "2110990304", name: "Kunal Bansal", batch: "Batch C", midTerm: 19, lab: 15, assignment: 16 },
  { roll: "2110990307", name: "Simran Gill", batch: "Batch C", attendance: 91, midTerm: 27, lab: 19, assignment: 19 },
];

function FacPerformance({
  courseCode = "CS-301",
  courseName = "Artificial Intelligence & Machine Learning",
}) {
  const [marksList] = useState(MOCK_STUDENT_MARKS);

  return (
    <div className="fac-perf-container">
      <div className="fac-perf-header">
        <div>
          <h2>📈 Subject Performance & Gradebook</h2>
          <p>
            Internal assessment breakdown and analytics for {courseName} (
            {courseCode})
          </p>
        </div>
        <div className="fac-perf-header-stats">
          <span className="pill id-pill">Class Avg: 78.4%</span>
          <span className="pill focus-pill">Highest: 98/100</span>
        </div>
      </div>

      <div className="fac-perf-grid">
        <div className="fac-stat-card">
          <div className="fac-card-top">
            <span className="fac-card-label">Mid-Term Avg</span>
            <div className="fac-card-icon blue-icon">📝</div>
          </div>
          <h1>
            24.2 <span className="sub-denom">/ 30</span>
          </h1>
          <span className="badge positive">80.6% Mean</span>
        </div>

        <div className="fac-stat-card">
          <div className="fac-card-top">
            <span className="fac-card-label">Lab Assessment</span>
            <div className="fac-card-icon green-icon">💻</div>
          </div>
          <h1>
            17.8 <span className="sub-denom">/ 20</span>
          </h1>
          <span className="badge positive">89.0% Mean</span>
        </div>

        <div className="fac-stat-card">
          <div className="fac-card-top">
            <span className="fac-card-label">Assignment 1 & 2</span>
            <div className="fac-card-icon purple-icon">📑</div>
          </div>
          <h1>
            18.5 <span className="sub-denom">/ 20</span>
          </h1>
          <span className="badge positive">92.5% Mean</span>
        </div>

        <div className="fac-stat-card">
          <div className="fac-card-top">
            <span className="fac-card-label">Pass Prediction</span>
            <div className="fac-card-icon orange-icon">🎯</div>
          </div>
          <h1>96.2%</h1>
          <span className="badge positive">High Retention</span>
        </div>
      </div>

      <div className="fac-perf-content-box">
        <div className="fac-perf-section-title">
          <h3>Assessment Records by Student</h3>
        </div>

        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Batch</th>
                <th>Mid-Term (30)</th>
                <th>Lab Work (20)</th>
                <th>Assignments (20)</th>
                <th>Total Internal (70)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksList.map((stu, i) => {
                const total =
                  stu.midTerm + stu.lab + (stu.assignment || 18);
                const grade =
                  total >= 60
                    ? "A+"
                    : total >= 52
                    ? "A"
                    : total >= 42
                    ? "B"
                    : "C";
                return (
                  <tr key={stu.roll}>
                    <td>{i + 1}</td>
                    <td className="mono-text">{stu.roll}</td>
                    <td>
                      <strong>{stu.name}</strong>
                    </td>
                    <td>{stu.batch}</td>
                    <td>{stu.midTerm}</td>
                    <td>{stu.lab}</td>
                    <td>{stu.assignment || 18}</td>
                    <td>
                      <strong>{total}</strong> / 70
                    </td>
                    <td>
                      <span
                        className={`grade-pill ${
                          grade.startsWith("A") ? "grade-a" : "grade-b"
                        }`}
                      >
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FacPerformance;
