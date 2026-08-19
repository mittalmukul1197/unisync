import React from "react";
import "./performance.css";

function Performance() {
    // Only completed semesters are shown. Student is currently in Semester III
    // so only Semester I and II have results.
    const semesters = [
        {
            sem: "Semester I",
            courses: [
                { code: "24CSL0101", name: "Introduction to Programming", credits: 4, grade: "O", points: 10 },
                { code: "24MTL0102", name: "Mathematics for Computing", credits: 4, grade: "O", points: 10 },
                { code: "24ECL0103", name: "Digital Electronics", credits: 3, grade: "A", points: 9 },
                { code: "24PHL0104", name: "Applied Physics", credits: 4, grade: "B+", points: 8 },
                { code: "24HUL0105", name: "Communication Skills", credits: 2, grade: "O", points: 10 }
            ]
        },
        {
            sem: "Semester II",
            courses: [
                { code: "24CSL0201", name: "Data Structures & Algorithms", credits: 4, grade: "O", points: 10 },
                { code: "24MTL0202", name: "Discrete Mathematics", credits: 4, grade: "O", points: 10 },
                { code: "24CSL0203", name: "Computer Architecture", credits: 4, grade: "A", points: 9 },
                { code: "24CHL0204", name: "Environmental Sciences", credits: 2, grade: "B+", points: 8 },
                { code: "24CSL0205", name: "Python Programming Lab", credits: 3, grade: "A", points: 9 }
            ]
        }
    ];

    const calculateSGPA = (semester) => {
        const totalCredits = semester.courses.reduce((acc, c) => acc + c.credits, 0);
        if (totalCredits === 0) return 0;
        const totalPoints = semester.courses.reduce((acc, c) => acc + (c.credits * c.points), 0);
        return totalPoints / totalCredits;
    };

    const calculateCumulativeCGPA = (sems) => {
        let accumulatedPoints = 0;
        let accumulatedCredits = 0;
        sems.forEach(sem => {
            const semCredits = sem.courses.reduce((acc, c) => acc + c.credits, 0);
            const semPoints = sem.courses.reduce((acc, c) => acc + (c.credits * c.points), 0);
            accumulatedPoints += semPoints;
            accumulatedCredits += semCredits;
        });
        if (accumulatedCredits === 0) return 0;
        return accumulatedPoints / accumulatedCredits;
    };

    const totalCGPA = calculateCumulativeCGPA(semesters);
    const totalCredits = semesters.reduce(
        (acc, s) => acc + s.courses.reduce((cAcc, c) => cAcc + c.credits, 0),
        0
    );

    return (
        <div className="performance-container page-fade-in">
            <div className="performance-header-meta">
                <h2>Academic Performance Ledger</h2>
                <p>Track your semester-wise grades, credit distribution, and overall grade point average.</p>
            </div>

            {/* Overall CGPA Summary Card */}
            <div className="cgpa-summary-card glass">
                <div className="cgpa-card-visual">
                    <div className="cgpa-radial-progress">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" className="radial-bg" />
                            <circle cx="60" cy="60" r="50" className="radial-fill"
                                style={{
                                    strokeDasharray: 314.16,
                                    strokeDashoffset: 314.16 - (314.16 * totalCGPA) / 10
                                }}
                            />
                        </svg>
                        <div className="radial-center-val">
                            <span className="cgpa-number">{totalCGPA.toFixed(2)}</span>
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

            {/* Semester Accordion/Card list */}
            <div className="performance-semesters-grid">
                {semesters.map((sem, semIdx) => {
                    const sgpa = calculateSGPA(sem);
                    return (
                        <div key={semIdx} className="semester-performance-card glass">
                            <div className="semester-card-header">
                                <span className="semester-title font-mono">{sem.sem}</span>
                                <span className="semester-sgpa-badge font-mono">SGPA: {sgpa.toFixed(2)}</span>
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
                                        {sem.courses.map((course, courseIdx) => (
                                            <tr key={courseIdx}>
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
                    );
                })}
            </div>
        </div>
    );
}

export default Performance;
