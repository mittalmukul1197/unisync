import React from "react";
import "./attendence.css";

const SUBJECTS = [
    { id: 1, code: "24CSE0209", name: "Database Management System", faculty: "Harsh Bansal", range: "30-06-2026 to 11-08-2026", conducted: 24, attended: 22 },
    { id: 2, code: "25CAI0201", name: "Statistics and Data Engineering", faculty: "Paras Maurya", range: "03-07-2026 to 03-08-2026", conducted: 18, attended: 16 },
    { id: 3, code: "25CSE0203", name: "Front End Engineering-II", faculty: "Yogendra Sharma", range: "30-06-2026 to 30-07-2026", conducted: 28, attended: 26 },
    { id: 4, code: "25CSE0204", name: "Object Oriented Programming", faculty: "Sumit Mohan", range: "30-06-2026 to 11-08-2026", conducted: 56, attended: 50 }
];

function Attendance() {
    return (
        <div className="attendance-container page-fade-in">
            <div className="attendance-header-meta">
                <h2>Course Attendance Ledger</h2>
                <p>Consolidated Arogya University session logs. Verify compliance status across all subjects.</p>
            </div>

            <div className="attendance-table-card glass">
                <h3>Subject-wise Attendance Logs</h3>
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Subject Code</th>
                                <th>Subject Title</th>
                                <th>Faculty mentor</th>
                                <th>Session Date Range</th>
                                <th>Conducted</th>
                                <th>Attended</th>
                                <th>Percentage (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SUBJECTS.map((sub) => {
                                const pct = ((sub.attended / sub.conducted) * 100).toFixed(2);
                                return (
                                    <tr key={sub.id} className={pct < 75 ? "danger-row" : ""}>
                                        <td className="font-mono"><strong>{sub.code}</strong></td>
                                        <td><strong>{sub.name}</strong></td>
                                        <td>{sub.faculty}</td>
                                        <td className="font-mono">{sub.range}</td>
                                        <td className="font-mono">{sub.conducted}</td>
                                        <td className="font-mono">{sub.attended}</td>
                                        <td className="font-mono">
                                            <span className={`compliance-pct-lbl ${pct >= 75 ? "safe" : "danger"}`}>
                                                {pct}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="attendance-chart-card glass">
                <h3>Visual Attendance Analytics</h3>
                <p className="chart-lbl-subtitle">Percentage compliance comparison across subject nodes</p>

                <div className="visual-bar-chart-row">
                    {SUBJECTS.map((sub) => {
                        const pct = ((sub.attended / sub.conducted) * 100).toFixed(2);
                        return (
                            <div key={sub.id} className="chart-bar-node">
                                <span className="bar-val-pct font-mono">{pct}%</span>
                                <div className="bar-track-outer">
                                    <div
                                        className={`bar-fill-inner ${pct >= 85 ? "high" : pct >= 75 ? "medium" : "low"}`}
                                        style={{ height: `${pct}%` }}
                                    ></div>
                                </div>
                                <span className="bar-sub-code font-mono">{sub.code}</span>
                                <span className="bar-sub-name-trunc">{sub.name.split(" ")[0]}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="chart-axis-legend">
                    <span className="legend-item"><span className="legend-color high"></span> &gt;= 85% Optimal</span>
                    <span className="legend-item"><span className="legend-color medium"></span> 75% - 85% Warning</span>
                    <span className="legend-item"><span className="legend-color low"></span> &lt; 75% Critical</span>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
