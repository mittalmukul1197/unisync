import React from "react";
import "./AdminInfo.css";
import dean_image from "../../../assets/dean_image.jpg";

export default function AdminInfo() {
    const admin = {
        name: "Dr. Rahul Verma",
        email: "admin@gmail.com",
        phone: "+91 XXXXX XXXXX",
        employeeId: "ADM001",
        designation: "Dean",
        department: "CSE(AI-ML)",
        joiningDate: "01 January 2025",
        address: "Not Provided",
        role: "Admin",
        status: "Active",
    };

    const attendanceStats = {
        overallPercentage: "96%",
        totalWorkingDays: 180,
        presentDays: 173,
        leavesTaken: 7,
        leaveBalance: 12,
        lateArrivals: 2
    };

    const monthlyAttendanceLog = [
        { month: "October 2026", workingDays: 22, present: 21, leaves: 1, percentage: "95.4%" },
        { month: "September 2026", workingDays: 24, present: 23, leaves: 1, percentage: "95.8%" },
        { month: "August 2026", workingDays: 21, present: 21, leaves: 0, percentage: "100%" },
        { month: "July 2026", workingDays: 23, present: 22, leaves: 1, percentage: "95.6%" },
    ];

    return (
        <div className="admininfo-page">

            <div className="admininfo-header">
                <div>
                    <h1>My Information</h1>
                    <p>
                        View your administrator profile, account details, and attendance history.
                    </p>
                </div>
            </div>

            <div className="admininfo-profile-card">
                <div className="admininfo-avatar">
                    <img src={dean_image} alt="Dean Profile" />
                </div>

                <div className="admininfo-profile-details">
                    <h2>{admin.name}</h2>
                    <p>{admin.designation} — {admin.department}</p>

                    <span className="admininfo-status">
                        <span className="admininfo-status-dot"></span>
                        {admin.status}
                    </span>
                </div>

                <div className="admininfo-profile-id">
                    <span>Employee ID</span>
                    <strong>{admin.employeeId}</strong>
                </div>
            </div>

            <div className="admininfo-card">
                <div className="admininfo-section-header">
                    <div className="admininfo-section-icon">
                        👤
                    </div>

                    <div>
                        <h2>Personal Information</h2>
                        <p>Your basic profile and contact details.</p>
                    </div>
                </div>

                <div className="admininfo-grid">
                    <div className="admininfo-item">
                        <span>Full Name</span>
                        <strong>{admin.name}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Email Address</span>
                        <strong>{admin.email}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Phone Number</span>
                        <strong>{admin.phone}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Employee ID</span>
                        <strong>{admin.employeeId}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Designation</span>
                        <strong>{admin.designation}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Department</span>
                        <strong>{admin.department}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Joining Date</span>
                        <strong>{admin.joiningDate}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Address</span>
                        <strong>{admin.address}</strong>
                    </div>
                </div>
            </div>

            <div className="admininfo-card">
                <div className="admininfo-section-header">
                    <div className="admininfo-section-icon">
                        📅
                    </div>

                    <div>
                        <h2>Attendance & Leave Summary</h2>
                        <p>Track your overall attendance record and available leaves.</p>
                    </div>
                </div>

                <div className="admininfo-grid">
                    <div className="admininfo-item">
                        <span>Overall Attendance</span>
                        <strong >{attendanceStats.overallPercentage}</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Total Present Days</span>
                        <strong>{attendanceStats.presentDays} / {attendanceStats.totalWorkingDays} Days</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Leaves Taken</span>
                        <strong>{attendanceStats.leavesTaken} Days</strong>
                    </div>

                    <div className="admininfo-item">
                        <span>Leave Balance Available</span>
                        <strong>{attendanceStats.leaveBalance} Days</strong>
                    </div>
                </div>

                <div >
                    <h4 >Recent Monthly Attendance Logs</h4>
                    <div className="table-container">
                        <table className="atten-table" >
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Working Days</th>
                                    <th>Present</th>
                                    <th>Leaves</th>
                                    <th>Attendance %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyAttendanceLog.map((log, index) => (
                                    <tr key={index}>
                                        <td><strong>{log.month}</strong></td>
                                        <td>{log.workingDays}</td>
                                        <td>{log.present}</td>
                                        <td>{log.leaves}</td>
                                        <td>
                                            <span className="admininfo-role-badge" >
                                                {log.percentage}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

