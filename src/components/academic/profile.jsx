import React from "react";
import "./profile.css";
import studentAvatar from "../../assets/student_profile.jpg";

const ENROLLED_SUBJECTS = [
    { code: "24CSE0209", name: "Database Management System", faculty: "Harsh Bansal", room: "LH-501", credits: 4 },
    { code: "25CAI0201", name: "Statistics and Data Engineering", faculty: "Paras Maurya", room: "LH-501", credits: 4 },
    { code: "25CSE0203", name: "Front End Engineering-II", faculty: "Yogendra Sharma", room: "LH-501", credits: 4 },
    { code: "25CSE0204", name: "Object Oriented Programming", faculty: "Sumit Mohan", room: "LH-501", credits: 4 }
];

const BIO_FIELDS = [
    { label: "Full Name", value: "Rohit Verma", isMono: false },
    { label: "Personal Email", value: "Rohit.verma99@gmail.com", isMono: true },
    { label: "Roll Number", value: "25109928", isMono: true },
    { label: "Contact Number", value: "+91 9876543210", isMono: true },
    { label: "Date of Birth", value: "15 Oct 2006", isMono: true },
    { label: "Mentor Name", value: "Dr. Lakshita (CET1003313)", isMono: false },
    { label: "Gender", value: "Male", isMono: false },
    { label: "Domicile", value: "Haryana", isMono: false },
    { label: "Blood Group", value: "O+", isMono: true },
    { label: "Academic Status", value: "Regular / Active", isMono: false, isStatus: true }
];

function Profile() {
    return (
        <div className="profile-container page-fade-in">
          
            <div className="profile-top-grid">
                
                <div className="profile-id-card glass">
                    <div className="id-card-header">
                        <span className="id-brand">AROGYA UNIVERSITY</span>
                        <span className="id-status-dot">ACTIVE STUDENT</span>
                    </div>

                    <div className="id-card-body">
                        <div className="id-avatar-wrap">
                            <img
                                src={studentAvatar}
                                alt="Rohit Verma Profile"
                                className="id-avatar"
                            />
                        </div>
                        <div className="id-details">
                            <h2 className="id-name">Rohit Verma</h2>
                            <p className="id-reg">Roll Number: <strong>25109928</strong></p>
                            <p className="id-major font-mono">BE - CSE (AI&ML)</p>
                            <div className="id-email-row font-mono">
                                <span>📧</span>
                                <span>rohit25109928@arogya.edu.in</span>
                            </div>
                            <div className="id-pills-row">
                                <span className="id-pill-light">Sem III</span>
                                <span className="id-pill-light">Sec U25AIML-G8</span>
                                <span className="id-pill-light">LH-501</span>
                            </div>
                        </div>
                    </div>

                    <div className="id-card-footer">
                        <span>Arogya Institute of Engineering & Technology</span>
                        <span>Batch 2025</span>
                    </div>
                </div>

                <div className="profile-bio-card glass">
                    <h3>My Info</h3>
                    <div className="bio-fields-list">
                        {BIO_FIELDS.map((field, idx) => (
                            <div key={idx} className="bio-field">
                                <span className="field-lbl">{field.label}</span>
                                <span className={`field-val ${field.isMono ? "font-mono" : ""} ${field.isStatus ? "text-neon-green" : ""}`}>
                                    {field.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile-details-grid">
           
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
                                {ENROLLED_SUBJECTS.map((sub, idx) => (
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
