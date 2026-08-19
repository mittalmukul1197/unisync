import React from "react";
import "./profile.css";

function Profile() {

    // Current semester subjects (enrollment info only — grades are in Performance)
    const subjects = [
        { code: "24CSE0209", name: "Database Management System", faculty: "Harsh Bansal", room: "LH-501", credits: 4 },
        { code: "25CAI0201", name: "Statistics and Data Engineering", faculty: "Paras Maurya", room: "LH-501", credits: 4 },
        { code: "25CSE0203", name: "Front End Engineering-II", faculty: "Yogendra Sharma", room: "LH-501", credits: 4 },
        { code: "25CSE0204", name: "Object Oriented Programming", faculty: "Sumit Mohan", room: "LH-501", credits: 4 }
    ];

    return (
        <div className="profile-container page-fade-in">

            {/* ── Top Row: ID Card + Personal Info ── */}
            <div className="profile-top-grid">

                {/* Student ID Card */}
                <div className="profile-id-card glass">
                    <div className="id-card-header">
                        <span className="id-brand">AROGYA UNIVERSITY</span>
                        <span className="id-status-dot">ACTIVE STUDENT</span>
                    </div>

                    <div className="id-card-body">
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150"
                            alt="Rohit Verma Profile"
                            className="id-avatar"
                        />
                        <div className="id-details">
                            <h2 className="id-name" style={{ margin: "0 0 2px 0", lineHeight: "1.2" }}>Rohit Verma</h2>
                            <p className="id-reg" style={{ margin: "0 0 4px 0", fontSize: "11px" }}>Roll Number: <strong>25109928</strong></p>
                            <p className="id-major font-mono" style={{ margin: "0 0 4px 0", fontSize: "10px" }}>BE - CSE (AI&ML)</p>
                            <div className="id-email-row font-mono" style={{ margin: "0 0 6px 0", fontSize: "10.5px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                                <span>📧</span>
                                <span>rohit25109928@arogya.edu.in</span>
                            </div>
                            <div className="id-pills-row" style={{ marginTop: "2px", gap: "4px" }}>
                                <span className="id-pill-light" style={{ padding: "1.5px 5px", fontSize: "8px" }}>Sem III</span>
                                <span className="id-pill-light" style={{ padding: "1.5px 5px", fontSize: "8px" }}>Sec U25AIML-G8</span>
                                <span className="id-pill-light" style={{ padding: "1.5px 5px", fontSize: "8px" }}>LH-501</span>
                            </div>
                        </div>
                    </div>

                    <div className="id-card-footer">
                        <span>Arogya Institute of Engineering & Technology</span>
                        <span>Batch 2025</span>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="profile-bio-card glass">
                    <h3 style={{ marginBottom: "14px" }}>My Info</h3>
                    <div className="bio-fields-list">
                        <div className="bio-field">
                            <span className="field-lbl">Full Name</span>
                            <span className="field-val">Rohit Verma</span>
                        </div>
                        <div className="bio-field">
                            <span className="field-lbl">Personal Email</span>
                            <span className="field-val font-mono">Rohit.verma99@gmail.com</span>
                        </div>

                        <div className="bio-field">
                            <span className="field-lbl">Roll Number</span>
                            <span className="field-val font-mono">25109928</span>
                        </div>
                        <div className="bio-field">
                            <span className="field-lbl">Contact Number</span>
                            <span className="field-val font-mono">+91 9876543210</span>
                        </div>

                        <div className="bio-field">
                            <span className="field-lbl">Date of Birth</span>
                            <span className="field-val font-mono">15 Oct 2006</span>
                        </div>
                        <div className="bio-field">
                            <span className="field-lbl">Mentor Name</span>
                            <span className="field-val">Dr. Lakshita (CET1003313)</span>
                        </div>

                        <div className="bio-field">
                            <span className="field-lbl">Gender</span>
                            <span className="field-val">Male</span>
                        </div>
                        <div className="bio-field">
                            <span className="field-lbl">Domicile</span>
                            <span className="field-val">Haryana</span>
                        </div>

                        <div className="bio-field">
                            <span className="field-lbl">Blood Group</span>
                            <span className="field-val font-mono">O+</span>
                        </div>
                        <div className="bio-field">
                            <span className="field-lbl">Academic Status</span>
                            <span className="field-val text-neon-green">Regular / Active</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Bottom Row: Guardian Details + Enrolled Subjects ── */}
            <div className="profile-details-grid">

                {/* Guardian & Address */}
                <div className="guardian-address-card glass">
                    <div className="card-header-inner">
                        <h3>Guardian & Address Details</h3>
                        <span className="info-verified-tag font-mono">VERIFIED</span>
                    </div>

                    <div className="guardian-address-grid">
                        <div className="info-sec">
                            <span className="info-sec-title">Parent/Guardian Information</span>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Father's Name & Contact</span>
                                <span className="info-val-sub">Sh. Rajesh Verma (+91 98765 43210)</span>
                            </div>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Mother's Name & Contact</span>
                                <span className="info-val-sub">Smt. Sunita Verma (+91 98765 12345)</span>
                            </div>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Parents' Email</span>
                                <span className="info-val-sub font-mono">rajesh.verma@gmail.com</span>
                            </div>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Emergency Number</span>
                                <span className="info-val-sub font-mono">+91 98765 43210 (Father)</span>
                            </div>
                        </div>

                        <div className="info-sec">
                            <span className="info-sec-title">Address & Residence</span>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Permanent Address</span>
                                <span className="info-val-sub">House No. 142, Sector 15, Panchkula, Haryana</span>
                            </div>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">City</span>
                                <span className="info-val-sub">Panchkula</span>
                            </div>
                            <div className="info-row-sub">
                                <span className="info-lbl-sub">Pin Code</span>
                                <span className="info-val-sub font-mono">134113</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="courses-list-card glass">
                    <h3>Subjects - Semester III</h3>
                    <div className="courses-table-container">
                        <table className="courses-table">
                            <thead>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Title</th>
                                    <th>Faculty Mentor</th>
                                    <th>Credits</th>
                                    <th>Classroom</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((sub, idx) => (
                                    <tr key={idx}>
                                        <td className="font-mono">{sub.code}</td>
                                        <td><strong>{sub.name}</strong></td>
                                        <td>{sub.faculty}</td>
                                        <td className="font-mono">{sub.credits}</td>
                                        <td className="font-mono">{sub.room}</td>
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

export default Profile;
