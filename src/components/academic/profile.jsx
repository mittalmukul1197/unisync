import React, { useState } from "react";
import "./profile.css";
import studentAvatar from "../../assets/student_profile.jpg";

const ENROLLED_SUBJECTS = [
    { code: "24CSE0209", name: "Database Management System", faculty: "Harsh Bansal", room: "LH-501", credits: 4 },
    { code: "25CAI0201", name: "Statistics and Data Engineering", faculty: "Paras Maurya", room: "LH-501", credits: 4 },
    { code: "25CSE0203", name: "Front End Engineering-II", faculty: "Yogendra Sharma", room: "LH-501", credits: 4 },
    { code: "25CSE0204", name: "Object Oriented Programming", faculty: "Sumit Mohan", room: "LH-501", credits: 4 }
];

const STORAGE_KEY = "unisync_student_profile";

const DEFAULT_STUDENT_INFO = {
    fullName: "Rohit Verma",
    personalEmail: "Rohit.verma99@gmail.com",
    contactNumber: "+91 9876543210",
 
    rollNumber: "25109928",
    universityEmail: "rohit25109928@arogya.edu.in",
    program: "BE - CSE (AI&ML)",
    semester: "Sem III",
    section: "Sec U25AIML-G8",
    classroom: "LH-501",
    dob: "15 Oct 2006",
    mentorName: "Dr. Lakshita (CET1003313)",
    gender: "Male",
    domicile: "Haryana",
    bloodGroup: "O+",
    academicStatus: "Regular / Active"
};

function Profile() {

    const [studentInfo, setStudentInfo] = useState(() => {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);

                return {
                    ...DEFAULT_STUDENT_INFO,
                    fullName: typeof parsed.fullName === "string" && parsed.fullName.trim() ? parsed.fullName.trim() : DEFAULT_STUDENT_INFO.fullName,
                    personalEmail: typeof parsed.personalEmail === "string" && parsed.personalEmail.trim() ? parsed.personalEmail.trim() : DEFAULT_STUDENT_INFO.personalEmail,
                    contactNumber: typeof parsed.contactNumber === "string" && parsed.contactNumber.trim() ? parsed.contactNumber.trim() : DEFAULT_STUDENT_INFO.contactNumber
                };
            }
        } catch (error) {
            console.error("Failed to parse saved profile data from localStorage:", error);
        }
        return DEFAULT_STUDENT_INFO;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        personalEmail: "",
        contactNumber: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleOpenEdit = () => {
        setFormData({
            fullName: studentInfo.fullName,
            personalEmail: studentInfo.personalEmail,
            contactNumber: studentInfo.contactNumber
        });
        setFormErrors({});
        setSuccessMessage("");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setFormData({
            fullName: studentInfo.fullName,
            personalEmail: studentInfo.personalEmail,
            contactNumber: studentInfo.contactNumber
        });
        setFormErrors({});
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        const trimmedName = formData.fullName.trim();
        const trimmedEmail = formData.personalEmail.trim();
        const trimmedContact = formData.contactNumber.trim();

        if (!trimmedName) {
            errors.fullName = "Full name is required.";
        } else if (trimmedName.length < 2) {
            errors.fullName = "Full name must be at least 2 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            errors.personalEmail = "Personal email is required.";
        } else if (!emailRegex.test(trimmedEmail)) {
            errors.personalEmail = "Please enter a valid email address (e.g. name@example.com).";
        }

        const phoneRegex = /^(\+91[\s-]?)?[6789]\d{9}$/;
        if (!trimmedContact) {
            errors.contactNumber = "Contact number is required.";
        } else if (!phoneRegex.test(trimmedContact)) {
            errors.contactNumber = "Please enter a valid 10-digit mobile number (e.g. +91 9876543210).";
        }

        return errors;
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        let formattedContact = formData.contactNumber.trim();
        if (!formattedContact.startsWith("+91")) {
            formattedContact = `+91 ${formattedContact.replace(/^0+/, "")}`;
        } else {
            formattedContact = formattedContact.replace(/^(\+91)[\s-]*/, "+91 ");
        }

        const updatedEditableFields = {
            fullName: formData.fullName.trim(),
            personalEmail: formData.personalEmail.trim(),
            contactNumber: formattedContact
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEditableFields));
        } catch (error) {
            console.error("Failed to save profile to localStorage:", error);
        }

        setStudentInfo((prev) => ({
            ...prev,
            ...updatedEditableFields
        }));

        setIsEditing(false);
        setFormErrors({});
        setSuccessMessage("Profile updated successfully.");
    };

    const bioFields = [
        { label: "Full Name", value: studentInfo.fullName, isMono: false },
        { label: "Personal Email", value: studentInfo.personalEmail, isMono: true },
        { label: "Roll Number", value: studentInfo.rollNumber, isMono: true },
        { label: "Contact Number", value: studentInfo.contactNumber, isMono: true },
        { label: "Date of Birth", value: studentInfo.dob, isMono: true },
        { label: "Mentor Name", value: studentInfo.mentorName, isMono: false },
        { label: "Gender", value: studentInfo.gender, isMono: false },
        { label: "Domicile", value: studentInfo.domicile, isMono: false },
        { label: "Blood Group", value: studentInfo.bloodGroup, isMono: true },
        { label: "Academic Status", value: studentInfo.academicStatus, isMono: false, isStatus: true }
    ];

    return (
        <div className="profile-container page-fade-in">

            {successMessage && (
                <div className="profile-success-banner" role="status">
                    <div className="profile-success-content">
                        <span className="profile-success-icon">✓</span>
                        <span>{successMessage}</span>
                    </div>
                    <button 
                        type="button" 
                        className="profile-success-close-btn"
                        onClick={() => setSuccessMessage("")}
                        aria-label="Dismiss message"
                    >
                        ×
                    </button>
                </div>
            )}
          
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
                                alt={`${studentInfo.fullName} Profile`}
                                className="id-avatar"
                            />
                        </div>
                        <div className="id-details">
                            <h2 className="id-name">{studentInfo.fullName}</h2>
                            <p className="id-reg">Roll Number: <strong>{studentInfo.rollNumber}</strong></p>
                            <p className="id-major font-mono">{studentInfo.program}</p>
                            <div className="id-email-row font-mono">
                                <span>📧</span>
                                <span>{studentInfo.universityEmail}</span>
                            </div>
                            <div className="id-pills-row">
                                <span className="id-pill-light">{studentInfo.semester}</span>
                                <span className="id-pill-light">{studentInfo.section}</span>
                                <span className="id-pill-light">{studentInfo.classroom}</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card-action-row">
                        <button 
                            type="button" 
                            className="profile-edit-btn"
                            onClick={handleOpenEdit}
                            aria-label="Edit Profile"
                        >
                            <svg 
                                className="profile-edit-icon" 
                                width="13" 
                                height="13" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            Edit Profile
                        </button>
                    </div>

                    <div className="id-card-footer">
                        <span>Arogya Institute of Engineering & Technology</span>
                        <span>Batch 2025</span>
                    </div>
                </div>

                <div className="profile-bio-card glass">
                    <h3>My Info</h3>
                    <div className="bio-fields-list">
                        {bioFields.map((field, idx) => (
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

          
            {isEditing && (
                <div 
                    className="profile-modal-overlay" 
                    onClick={handleCancelEdit}
                >
                    <div 
                        className="profile-modal-container" 
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="profile-edit-modal-title"
                    >
                        <div className="profile-modal-header">
                            <div>
                                <h3 id="profile-edit-modal-title" className="profile-modal-title">Edit Personal Details</h3>
                                <p className="profile-modal-subtitle">Update your personal profile information</p>
                            </div>
                            <button 
                                type="button" 
                                className="profile-modal-close-btn"
                                onClick={handleCancelEdit}
                                aria-label="Close edit profile dialog"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="profile-edit-form" noValidate>
                         
                            <div className="profile-form-fields-grid">
                            
                                <div className="profile-form-group full-width">
                                    <label htmlFor="edit-profile-name" className="profile-form-label">
                                        Full Name <span className="profile-req-star">*</span>
                                    </label>
                                    <input
                                        id="edit-profile-name"
                                        type="text"
                                        name="fullName"
                                        className={`profile-form-input ${formErrors.fullName ? "profile-input-error" : ""}`}
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                    />
                                    {formErrors.fullName && (
                                        <span className="profile-field-error-msg">{formErrors.fullName}</span>
                                    )}
                                </div>

                                <div className="profile-form-group">
                                    <label htmlFor="edit-personal-email" className="profile-form-label">
                                        Personal Email <span className="profile-req-star">*</span>
                                    </label>
                                    <input
                                        id="edit-personal-email"
                                        type="email"
                                        name="personalEmail"
                                        className={`profile-form-input font-mono ${formErrors.personalEmail ? "profile-input-error" : ""}`}
                                        value={formData.personalEmail}
                                        onChange={handleInputChange}
                                        placeholder="e.g. name@example.com"
                                    />
                                    {formErrors.personalEmail && (
                                        <span className="profile-field-error-msg">{formErrors.personalEmail}</span>
                                    )}
                                </div>

                              
                                <div className="profile-form-group">
                                    <label htmlFor="edit-contact-number" className="profile-form-label">
                                        Contact Number <span className="profile-req-star">*</span>
                                    </label>
                                    <input
                                        id="edit-contact-number"
                                        type="text"
                                        name="contactNumber"
                                        className={`profile-form-input font-mono ${formErrors.contactNumber ? "profile-input-error" : ""}`}
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        placeholder="+91 9876543210"
                                    />
                                    {formErrors.contactNumber && (
                                        <span className="profile-field-error-msg">{formErrors.contactNumber}</span>
                                    )}
                                </div>

                             
                                <div className="profile-form-group">
                                    <label htmlFor="readonly-roll-num" className="profile-form-label">
                                        Roll Number
                                    </label>
                                    <input
                                        id="readonly-roll-num"
                                        type="text"
                                        readOnly
                                        disabled
                                        className="profile-form-input font-mono profile-input-disabled"
                                        value={studentInfo.rollNumber}
                                    />
                                </div>

                          
                                <div className="profile-form-group">
                                    <label htmlFor="readonly-univ-email" className="profile-form-label">
                                        University Email 
                                    </label>
                                    <input
                                        id="readonly-univ-email"
                                        type="text"
                                        readOnly
                                        disabled
                                        className="profile-form-input font-mono profile-input-disabled"
                                        value={studentInfo.universityEmail}
                                    />
                                </div>

                               
                                <div className="profile-form-group">
                                    <label htmlFor="readonly-acad-status" className="profile-form-label">
                                        Academic Status
                                    </label>
                                    <input
                                        id="readonly-acad-status"
                                        type="text"
                                        readOnly
                                        disabled
                                        className="profile-form-input profile-input-disabled"
                                        value={studentInfo.academicStatus}
                                    />
                                </div>

                                <div className="profile-form-group">
                                    <label htmlFor="readonly-mentor" className="profile-form-label">
                                        Mentor Name
                                    </label>
                                    <input
                                        id="readonly-mentor"
                                        type="text"
                                        readOnly
                                        disabled
                                        className="profile-form-input profile-input-disabled"
                                        value={studentInfo.mentorName}
                                    />
                                </div>
                            </div>

                            <div className="profile-modal-actions">
                                <button 
                                    type="button" 
                                    className="profile-btn-cancel"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="profile-btn-save"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
