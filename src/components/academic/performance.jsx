import React from "react";
import "./performance.css";

const SEMESTERS = [
    {
        id: 1,
        sem: "Semester I",
        sgpa: "9.35",
        courses: [
            { code: "24CSL0101", name: "Introduction to Programming", credits: 4, grade: "O" },
            { code: "24MTL0102", name: "Mathematics for Computing", credits: 4, grade: "O" },
            { code: "24ECL0103", name: "Digital Electronics", credits: 3, grade: "A" },
            { code: "24PHL0104", name: "Applied Physics", credits: 4, grade: "B+" },
            { code: "24HUL0105", name: "Communication Skills", credits: 2, grade: "O" }
        ]
    },
    {
        id: 2,
        sem: "Semester II",
        sgpa: "9.35",
        courses: [
            { code: "24CSL0201", name: "Data Structures & Algorithms", credits: 4, grade: "O" },
            { code: "24MTL0202", name: "Discrete Mathematics", credits: 4, grade: "O" },
            { code: "24CSL0203", name: "Computer Architecture", credits: 4, grade: "A" },
            { code: "24CHL0204", name: "Environmental Sciences", credits: 2, grade: "B+" },
            { code: "24CSL0205", name: "Python Programming Lab", credits: 3, grade: "A" }
        ]
    }
];

function Performance() {
    const overallCGPA = "9.35";
    const totalCredits = 34;
    const cgpaPct = 93.5;

    return (
        <div className="performance-container page-fade-in">
            <div className="performance-header-meta">
                <h2>Academic Performance Ledger</h2>
                <p>Track your semester-wise grades, credit distribution, and overall grade point average.</p>
            </div>

            <div className="cgpa-summary-card glass">
                <div className="cgpa-card-visual">
                    <div
                        className="cgpa-ring"
                        style={{
                            background: `conic-gradient(#1a3a8f 0%, #3b82f6 ${cgpaPct}%, #f1f5f9 ${cgpaPct}% 100%)`
                        }}
                    >
                        <div className="cgpa-ring-inner">
                            <span className="cgpa-number">{overallCGPA}</span>
                            <span className="cgpa-label">CGPA</span>
                        </div>
                    </div>
                </div>
                <div className="cgpa-card-details">
                    <div className="status-badge-row">
                        <span className="standing-badge">Academic Standing: <strong>Outstanding</strong></span>
                        <span className="credits-badge">Total Credits Earned: <strong>{totalCredits}</strong></span>
                    </div>
                    <p className="cgpa-academic-note">
                        💡 GPA is computed based on letter grade points: O (10), A+ (10), A (9), B+ (8), B (7), C (6), P (5), F (0). Results are displayed for completed semesters only.
                    </p>
                </div>
            </div>

            <div className="performance-semesters-grid">
                {SEMESTERS.map((sem) => (
                    <div key={sem.id} className="semester-performance-card glass">
                        <div className="semester-card-header">
                            <span className="semester-title font-mono">{sem.sem}</span>
                            <span className="semester-sgpa-badge font-mono">SGPA: {sem.sgpa}</span>
                        </div>

                        <div className="semester-courses-table-container">
                            <table className="sem-courses-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Course Name</th>
                                        <th>Credits</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem.courses.map((course, index) => (
                                        <tr key={index}>
                                            <td className="font-mono">{course.code}</td>
                                            <td className="course-name-cell"><strong>{course.name}</strong></td>
                                            <td className="font-mono">{course.credits}</td>
                                            <td>
                                                <span className="course-grade-display font-mono">{course.grade}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Performance;
