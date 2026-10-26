
import React, { useState } from "react";
import "./AdminBatches.css";

export default function DeanBatches() {
  const [batchSearchTerm, setBatchSearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedStudentBatch, setSelectedStudentBatch] = useState("All");

  const batches = [
    {
      id: "G1",
      name: "Group 1 (G1)",
      course: "B.Tech",
      academicYear: "2026–2027",
      coordinator: "Assigned Faculty",
      status: "Active",
    },
    {
      id: "G2",
      name: "Group 2 (G2)",
      course: "B.Tech",
      academicYear: "2026–2027",
      coordinator: "Assigned Faculty",
      status: "Active",
    },
    {
      id: "G3",
      name: "Group 3 (G3)",
      course: "B.Tech",
      academicYear: "2026–2027",
      coordinator: "Assigned Faculty",
      status: "Active",
    },
  ];

  const students = [
    { id: "STU001", name: "Rahul Sharma", email: "rahul@example.com", course: "B.Tech IT", batch: "G1", semester: "1st", status: "Active" },
    { id: "STU002", name: "Priya Verma", email: "priya@example.com", course: "B.Tech IT", batch: "G1", semester: "1st", status: "Active" },
    { id: "STU003", name: "Aman Singh", email: "aman@example.com", course: "B.Tech IT", batch: "G1", semester: "1st", status: "Active" },
    { id: "STU004", name: "Neha Gupta", email: "neha@example.com", course: "B.Tech IT", batch: "G1", semester: "1st", status: "Active" },
    { id: "STU005", name: "Arjun Kumar", email: "arjun@example.com", course: "B.Tech IT", batch: "G2", semester: "1st", status: "Active" },
    { id: "STU006", name: "Simran Kaur", email: "simran@example.com", course: "B.Tech IT", batch: "G2", semester: "1st", status: "Active" },
    { id: "STU007", name: "Karan Malhotra", email: "karan@example.com", course: "B.Tech IT", batch: "G2", semester: "1st", status: "Active" },
    { id: "STU008", name: "Anjali Sharma", email: "anjali@example.com", course: "B.Tech IT", batch: "G2", semester: "1st", status: "Active" },
    { id: "STU009", name: "Vikas Yadav", email: "vikas@example.com", course: "B.Tech IT", batch: "G3", semester: "1st", status: "Active" },
    { id: "STU010", name: "Mehak Jain", email: "mehak@example.com", course: "B.Tech IT", batch: "G3", semester: "1st", status: "Active" },
    { id: "STU011", name: "Rohit Patel", email: "rohit@example.com", course: "B.Tech IT", batch: "G3", semester: "1st", status: "Active" },
    { id: "STU012", name: "Sakshi Mehta", email: "sakshi@example.com", course: "B.Tech IT", batch: "G3", semester: "1st", status: "Active" },
  ];

  const filteredBatches = batches.filter((batch) => {
    const searchLower = batchSearchTerm.toLowerCase();
    const nameMatches = batch.name.toLowerCase().includes(searchLower);
    const idMatches = batch.id.toLowerCase().includes(searchLower);

    const isBatchSelected = selectedBatch === "All" || batch.id === selectedBatch;

    return (nameMatches || idMatches) && isBatchSelected;
  });

  const filteredStudents = students.filter((student) => {
    const searchLower = studentSearchTerm.toLowerCase();
    const nameMatches = student.name.toLowerCase().includes(searchLower);
    const idMatches = student.id.toLowerCase().includes(searchLower);

    const isBatchSelected = selectedStudentBatch === "All" || student.batch === selectedStudentBatch;

    return (nameMatches || idMatches) && isBatchSelected;
  });
  const getStudentCountByBatch = (batchId) => {
    return students.filter((student) => student.batch === batchId).length;
  };
  return (
    <div className="admin-batches-page">
      <div className="admin-batches-header">
        <h1>Dean Batches</h1>
        <p>View Student Groups And Information About Them.</p>
      </div>

      <div className="admin-batches-stats">
        <div className="admin-batches-stat-card">
          <span>Total Batches</span>
          <h2>{batches.length}</h2>
        </div>
        <div className="admin-batches-stat-card">
          <span>Total Students</span>
          <h2>{students.length}</h2>
        </div>
      </div>

      <div className="admin-batches-card">
        <h2>Batches</h2>

        <div className="admin-batches-toolbar">
          <input
            type="text"
            placeholder="Search batch by name or ID..."
            value={batchSearchTerm}
            onChange={(e) => setBatchSearchTerm(e.target.value)}
          />

          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="All">All Batches</option>
            <option value="G1">G1</option>
            <option value="G2">G2</option>
            <option value="G3">G3</option>
          </select>
        </div>

        <table className="admin-batches-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Batch Name</th>
              <th>Course</th>
              <th>Academic Session</th>
              <th>Total Students</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td><strong>{batch.name}</strong></td>
                <td>{batch.course}</td>
                <td>{batch.academicYear}</td>
                <td>{getStudentCountByBatch(batch.id)}</td>
                <td>
                  <span className="admin-batches-table-status">

                    {batch.status}
                  </span></td>
              </tr>
            ))}
            {filteredBatches.length === 0 && (
              <tr>
                <td colSpan="6">No batches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-batches-card">
        <h2>Students</h2>

        <div className="admin-batches-toolbar">
          <input
            type="text"
            placeholder="Search student by name or ID..."
            value={studentSearchTerm}
            onChange={(e) => setStudentSearchTerm(e.target.value)}
          />

          <select
            value={selectedStudentBatch}
            onChange={(e) => setSelectedStudentBatch(e.target.value)}
          >
            <option value="All">All Batches</option>
            <option value="G1">G1</option>
            <option value="G2">G2</option>
            <option value="G3">G3</option>
          </select>
        </div>

        <table className="admin-batches-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Semester</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td >
                  <span className="admin-batches-table-id">

                    {student.id}
                  </span>
                </td>
                <td><strong>{student.name}</strong></td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.batch}</td>
                <td>{student.semester}</td>
                <td>
                  <span className="admin-batches-table-status">{student.status}
                  </span></td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="7">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}