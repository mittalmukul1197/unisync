import React, { useState } from "react";
import "./facMyInfo.css";
import fac_img from "../../assets/student_profile.jpg";
import { useFaculty } from "../../context/FacultyContext";

const FACULTY_INFO = {
  name: "Mr. Rakesh Sharma",
  designation: "Associate Professor",
  department: "Department of Computer Science & Engineering",
  empId: "CU-CSE-408",
  email: "rakesh.sharma@chitkara.edu.in",
  phone: "+91 98765 43210",
  cabin: "Block-3, Room 412 (4th Floor)",
  experience: "7+ Years at Chitkara University (12 Years Total)",
  qualification: "Ph.D. in Computer Science (IIT Delhi)",
  officeHours: "Mon - Thu • 03:30 PM - 05:00 PM",
  mentorship: "Group M-14 (28 Assigned 3rd-Year Mentees)",
  specialization: "AI & Neural Systems",
};

function MyInfo() {
  const { fullName, setFullName } = useFaculty();
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("facultyProfile");

      if (saved) {
        const savedProfile = JSON.parse(saved);

        return {
          ...FACULTY_INFO,
          ...savedProfile,
          name: savedProfile.name || FACULTY_INFO.name,
        };
      }

      return FACULTY_INFO;
    } catch {
      return FACULTY_INFO;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(FACULTY_INFO);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleOpenEdit = () => {
    setFormData({
      ...profile,
      name: fullName || profile.name,
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setFormErrors({});
    setIsEditModalOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    const trimmedName = (formData.name || "").trim();

    if (!trimmedName) {
      errors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    if (!(formData.designation || "").trim()) {
      errors.designation = "Designation is required.";
    }

    if (!(formData.department || "").trim()) {
      errors.department = "Department is required.";
    }

    if (!(formData.cabin || "").trim()) {
      errors.cabin = "Cabin location is required.";
    }

    // Email validation
    const trimmedEmail = (formData.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      errors.email = "Official email is required.";
    } else if (!trimmedEmail.includes("@")) {
      errors.email =
        "Email must include '@' and a domain (e.g. name@gmail.com or name@chitkara.edu.in).";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email =
        "Please enter a valid email address (e.g. name@chitkara.edu.in or name@gmail.com).";
    }

    // Phone / Mobile number validation
    const trimmedPhone = (formData.phone || "").trim();

    if (!trimmedPhone) {
      errors.phone = "Mobile number is required.";
    } else if (/[^\d\s\-+()]/.test(trimmedPhone)) {
      errors.phone =
        "Mobile number should only contain numbers and optional +91.";
    } else {
      const digitsOnly = trimmedPhone.replace(/\D/g, "");
      let localDigits = digitsOnly;

      if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
        localDigits = digitsOnly.slice(2);
      } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
        localDigits = digitsOnly.slice(1);
      }

      if (localDigits.length !== 10) {
        errors.phone =
          "Mobile number must be exactly 10 digits (e.g. +91 98765 43210).";
      } else if (!/^[6-9]\d{9}$/.test(localDigits)) {
        errors.phone =
          "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";
      }
    }

    if (!(formData.officeHours || "").trim()) {
      errors.officeHours = "Office hours are required.";
    }

    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Cleanly format phone number
    const trimmedPhone = (formData.phone || "").trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, "");
    let localDigits = digitsOnly;

    if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
      localDigits = digitsOnly.slice(2);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
      localDigits = digitsOnly.slice(1);
    }

    const formattedPhone = `+91 ${localDigits.slice(0, 5)} ${localDigits.slice(5)}`;

    const updatedData = {
      ...formData,
      name: (formData.name || "").trim(),
      email: (formData.email || "").trim(),
      phone: formattedPhone,
      designation: (formData.designation || "").trim(),
      department: (formData.department || "").trim(),
      cabin: (formData.cabin || "").trim(),
      officeHours: (formData.officeHours || "").trim(),
      specialization: (formData.specialization || "").trim(),
      experience: (formData.experience || "").trim(),
      mentorship: (formData.mentorship || "").trim(),
    };

    setProfile(updatedData);

    // Save the updated profile
    localStorage.setItem("facultyProfile", JSON.stringify(updatedData));

    // Update the shared Full Name in Context
    setFullName(updatedData.name);

    setFormErrors({});
    setIsEditModalOpen(false);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  return (
    <div className="myinfo-page">
      {showSuccessToast && (
        <div className="fac-toast-notification">
          <span>✅ Profile updated successfully!</span>
        </div>
      )}

      <div className="profile-compact-card">
        <div className="profile-left-section">
          <div className="avatar-wrapper">
            <img
              src={fac_img}
              alt="Faculty Avatar"
              className="compact-avatar"
            />
            <span
              className="online-indicator"
              title="Active on Campus"
            ></span>
          </div>

          <div className="compact-details">
            <div className="name-status-row">
              <h2>{profile.name}</h2>
              <span className="compact-status">● Active Faculty</span>
            </div>

            <p className="compact-designation">
              {profile.designation} • {profile.department}
            </p>

            <div className="compact-pills">
              <span className="pill id-pill">🆔 #{profile.empId}</span>
              <span className="pill">🏢 {profile.cabin}</span>
              <span className="pill">📅 Joined July 2019</span>
              <span className="pill focus-pill">
                🎯 {profile.specialization || "AI & Neural Systems"}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button
            type="button"
            className="edit-profile-btn"
            onClick={handleOpenEdit}
            title="Edit Faculty Profile"
          >
            <span className="edit-btn-icon">✏️</span>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="myinfo-grid">
        <div className="info-card course-highlight-card">
          <div className="info-card-header">
            <div className="header-icon-box blue-box">🤖</div>
            <div>
              <h3>Single Assigned Teaching Course</h3>
              <span className="sub-title-text">
                Core Academic Subject for Spring 2026
              </span>
            </div>
          </div>

          <div className="course-main-badge-box">
            <div className="course-badge-header">
              <span className="course-code-tag">CS-301</span>
              <span className="credits-tag">4.0 Credits</span>
            </div>

            <h4 className="course-title-text">
              Artificial Intelligence & Machine Learning
            </h4>

            <p className="course-desc-text">
              Comprehensive study of heuristic search, knowledge
              representation, supervised & unsupervised machine learning, deep
              neural networks, and computer vision foundations.
            </p>
          </div>

          <div className="info-details-table">
            <div className="detail-item">
              <span className="label">Assigned Batches</span>
              <strong className="value highlight-val">
                B.Tech CSE - Sem 6 (Batches 6A, 6B)
              </strong>
            </div>

            <div className="detail-item">
              <span className="label">Total Enrolled Students</span>
              <strong className="value">
                120 Students across 2 sections
              </strong>
            </div>

            <div className="detail-item">
              <span className="label">Weekly Teaching Load</span>
              <strong className="value">
                14 Contact Hours / Week (9 Theory + 5 Lab)
              </strong>
            </div>

            <div className="detail-item">
              <span className="label">Laboratory In-Charge</span>
              <strong className="value">
                Computing Lab 3 (AI & Robotics High-Performance Lab)
              </strong>
            </div>

            <div className="detail-item">
              <span className="label">Course Coordinator</span>
              <strong className="value">
                Dr. Rakesh Sharma (Lead Course Architect)
              </strong>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="header-icon-box purple-box">👤</div>
            <div>
              <h3>Contact & Office Logistics</h3>
              <span className="sub-title-text">
                Official Communication & Hours
              </span>
            </div>
          </div>

          <div className="info-details-table">
            <div className="detail-item">
              <span className="label">Official Email</span>
              <strong className="value email-link">{profile.email}</strong>
            </div>

            <div className="detail-item">
              <span className="label">Mobile Number</span>
              <strong className="value">{profile.phone}</strong>
            </div>

            <div className="detail-item">
              <span className="label">Cabin Location</span>
              <strong className="value">{profile.cabin}</strong>
            </div>

            <div className="detail-item">
              <span className="label">Office Hours for Doubts</span>
              <strong className="value highlight-hours">
                {profile.officeHours}
              </strong>
            </div>

            <div className="detail-item">
              <span className="label">Total Academic Experience</span>
              <strong className="value">{profile.experience}</strong>
            </div>

            <div className="detail-item">
              <span className="label">Student Mentorship</span>
              <strong className="value">{profile.mentorship}</strong>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="header-icon-box green-box">🎓</div>
            <div>
              <h3>Qualifications & Education</h3>
              <span className="sub-title-text">Degrees & Certifications</span>
            </div>
          </div>

          <div className="timeline-credentials">
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div className="cred-content">
                <strong>Ph.D. in Computer Science & Engineering</strong>
                <span className="cred-inst">
                  Indian Institute of Technology (IIT) Delhi • 2015 - 2019
                </span>
                <p>
                  Thesis: "Scalable Deep Learning Frameworks for Real-time Edge
                  Vision Analytics"
                </p>
              </div>
            </div>

            <div className="cred-item">
              <div className="cred-dot"></div>
              <div className="cred-content">
                <strong>M.Tech in Software Systems</strong>
                <span className="cred-inst">BITS Pilani • 2012 - 2014</span>
                <p>Distinction with Gold Medal Honors</p>
              </div>
            </div>

            <div className="cred-item">
              <div className="cred-dot"></div>
              <div className="cred-content">
                <strong>B.Tech in Computer Science</strong>
                <span className="cred-inst">
                  Punjab Engineering College (PEC) • 2008 - 2012
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="header-icon-box orange-box">📚</div>
            <div>
              <h3>Research & Publications</h3>
              <span className="sub-title-text">
                Scholarly Impact in AI & Machine Learning
              </span>
            </div>
          </div>

          <div className="research-stats-bar">
            <div className="r-stat">
              <strong>14</strong>
              <span>IEEE / Scopus Papers</span>
            </div>
            <div className="r-stat">
              <strong>420+</strong>
              <span>Citations</span>
            </div>
            <div className="r-stat">
              <strong>9</strong>
              <span>h-index</span>
            </div>
            <div className="r-stat">
              <strong>2</strong>
              <span>Patents Filed</span>
            </div>
          </div>

          <div className="publication-list">
            <div className="pub-item">
              <span className="pub-tag">IEEE Trans. 2025</span>
              <p>
                "Self-Supervised Contrastive Learning in Multi-Modal Medical
                Diagnostics"
              </p>
            </div>

            <div className="pub-item">
              <span className="pub-tag">Springer AI 2024</span>
              <p>
                "Attention-Guided Deep Reinforcement Learning for Autonomous
                Drone Swarms"
              </p>
            </div>

            <div className="pub-item">
              <span className="pub-tag">ACM Computing 2023</span>
              <p>
                "Optimizing Convolutional Backbones on Low-Power Edge Devices"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fac-modal-overlay" onClick={handleCloseEdit}>
          <div
            className="fac-modal-content edit-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fac-modal-header">
              <div className="fac-modal-header-title">
                <h3>Edit Faculty Profile</h3>
                <span>
                  Update your academic, contact, and cabin logistics
                </span>
              </div>

              <button
                type="button"
                className="fac-modal-close"
                onClick={handleCloseEdit}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="fac-profile-form" noValidate>
              <div className="fac-form-grid">
                <div className="fac-input-group">
                  <label>
                    Full Name <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Mr. Yogendra Sharma"
                    className={formErrors.name ? "fac-input-error" : ""}
                  />
                  {formErrors.name && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Designation <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation || ""}
                    onChange={(e) =>
                      handleChange("designation", e.target.value)
                    }
                    placeholder="e.g. Associate Professor"
                    className={formErrors.designation ? "fac-input-error" : ""}
                  />
                  {formErrors.designation && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.designation}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Department <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.department || ""}
                    onChange={(e) =>
                      handleChange("department", e.target.value)
                    }
                    placeholder="e.g. Department of Computer Science & Engineering"
                    className={formErrors.department ? "fac-input-error" : ""}
                  />
                  {formErrors.department && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.department}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Cabin Location <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cabin || ""}
                    onChange={(e) => handleChange("cabin", e.target.value)}
                    placeholder="e.g. Block-3, Room 412"
                    className={formErrors.cabin ? "fac-input-error" : ""}
                  />
                  {formErrors.cabin && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.cabin}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Official Email <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="e.g. name@chitkara.edu.in or name@gmail.com"
                    className={formErrors.email ? "fac-input-error" : ""}
                  />
                  {formErrors.email && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Mobile Number <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className={formErrors.phone ? "fac-input-error" : ""}
                  />
                  {formErrors.phone && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>
                    Office Hours for Doubts{" "}
                    <span className="fac-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.officeHours || ""}
                    onChange={(e) =>
                      handleChange("officeHours", e.target.value)
                    }
                    placeholder="e.g. Mon - Thu • 03:30 PM - 05:00 PM"
                    className={formErrors.officeHours ? "fac-input-error" : ""}
                  />
                  {formErrors.officeHours && (
                    <span className="fac-field-error-msg">
                      ⚠️ {formErrors.officeHours}
                    </span>
                  )}
                </div>

                <div className="fac-input-group">
                  <label>Focus / Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization || ""}
                    onChange={(e) =>
                      handleChange("specialization", e.target.value)
                    }
                    placeholder="e.g. AI & Neural Systems"
                  />
                </div>

                <div className="fac-input-group full-width">
                  <label>Total Experience</label>
                  <input
                    type="text"
                    value={formData.experience || ""}
                    onChange={(e) =>
                      handleChange("experience", e.target.value)
                    }
                    placeholder="e.g. 7+ Years at Chitkara University (12 Years Total)"
                  />
                </div>

                <div className="fac-input-group full-width">
                  <label>Student Mentorship</label>
                  <input
                    type="text"
                    value={formData.mentorship || ""}
                    onChange={(e) =>
                      handleChange("mentorship", e.target.value)
                    }
                    placeholder="e.g. Group M-14 (28 Assigned 3rd-Year Mentees)"
                  />
                </div>
              </div>

              <div className="fac-modal-footer">
                <button type="submit" className="btn-primary">
                  💾 Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyInfo;