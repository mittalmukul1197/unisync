import React, { useState } from "react";
import "./facMyInfo.css";
import fac_img from "../../assets/facimage.jpeg";

const FACULTY_INFO = {
  name: "Mr. Yogendra Sharma",
  designation: "Associate Professor",
  department: "Department of Computer Science & Engineering",
  empId: "CU-CSE-408",
  email: "yogender.sharma@chitkara.edu.in",
  phone: "+91 98765 43210",
  cabin: "Block-3, Room 412 (4th Floor)",
  experience: "7+ Years at Chitkara University (12 Years Total)",
  qualification: "Ph.D. in Computer Science (IIT Delhi)",
  officeHours: "Mon - Thu • 03:30 PM - 05:00 PM",
  mentorship: "Group M-14 (28 Assigned 3rd-Year Mentees)",
  specialization: "AI & Neural Systems",
};
function MyInfo() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("facultyProfile");
    return saved ? JSON.parse(saved) : FACULTY_INFO;
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(FACULTY_INFO);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleOpenEdit = () => {
    setFormData(profile);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem("facultyProfile", JSON.stringify(formData));
    setIsEditModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  return (
    <div className="myinfo-page">
      {/* Toast Notification */}
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
            <span className="online-indicator" title="Active on Campus"></span>
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
              <span className="pill focus-pill">🎯 {profile.specialization || "AI & Neural Systems"}</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Action Button */}
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
              <span className="sub-title-text">Core Academic Subject for Spring 2026</span>
            </div>
          </div>

          <div className="course-main-badge-box">
            <div className="course-badge-header">
              <span className="course-code-tag">CS-301</span>
              <span className="credits-tag">4.0 Credits</span>
            </div>
            <h4 className="course-title-text">Artificial Intelligence & Machine Learning</h4>
            <p className="course-desc-text">
              Comprehensive study of heuristic search, knowledge representation, supervised & unsupervised machine learning, deep neural networks, and computer vision foundations.
            </p>
          </div>

          <div className="info-details-table">
            <div className="detail-item">
              <span className="label">Assigned Batches</span>
              <strong className="value highlight-val">B.Tech CSE - Sem 6 (Batches 6A, 6B)</strong>
            </div>

            <div className="detail-item">
              <span className="label">Total Enrolled Students</span>
              <strong className="value">120 Students across 2 sections</strong>
            </div>

            <div className="detail-item">
              <span className="label">Weekly Teaching Load</span>
              <strong className="value">14 Contact Hours / Week (9 Theory + 5 Lab)</strong>
            </div>

            <div className="detail-item">
              <span className="label">Laboratory In-Charge</span>
              <strong className="value">Computing Lab 3 (AI & Robotics High-Performance Lab)</strong>
            </div>

            <div className="detail-item">
              <span className="label">Course Coordinator</span>
              <strong className="value">Dr. Yogender Sharma (Lead Course Architect)</strong>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="header-icon-box purple-box">👤</div>
            <div>
              <h3>Contact & Office Logistics</h3>
              <span className="sub-title-text">Official Communication & Hours</span>
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
              <strong className="value highlight-hours">{profile.officeHours}</strong>
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
                <span className="cred-inst">Indian Institute of Technology (IIT) Delhi • 2015 - 2019</span>
                <p>Thesis: "Scalable Deep Learning Frameworks for Real-time Edge Vision Analytics"</p>
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
                <span className="cred-inst">Punjab Engineering College (PEC) • 2008 - 2012</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-header">
            <div className="header-icon-box orange-box">📚</div>
            <div>
              <h3>Research & Publications</h3>
              <span className="sub-title-text">Scholarly Impact in AI & Machine Learning</span>
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
              <p>"Self-Supervised Contrastive Learning in Multi-Modal Medical Diagnostics"</p>
            </div>
            <div className="pub-item">
              <span className="pub-tag">Springer AI 2024</span>
              <p>"Attention-Guided Deep Reinforcement Learning for Autonomous Drone Swarms"</p>
            </div>
            <div className="pub-item">
              <span className="pub-tag">ACM Computing 2023</span>
              <p>"Optimizing Convolutional Backbones on Low-Power Edge Devices"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fac-modal-overlay" onClick={handleCloseEdit}>
          <div className="fac-modal-content edit-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="fac-modal-header">
              <div className="fac-modal-header-title">
                <h3>Edit Faculty Profile</h3>
                <span>Update your academic, contact, and cabin logistics</span>
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

            <form onSubmit={handleSave} className="fac-profile-form">
              <div className="fac-form-grid">
                <div className="fac-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Mr. Yogendra Sharma"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={formData.designation || ""}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    placeholder="e.g. Associate Professor"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={formData.department || ""}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="e.g. Department of Computer Science & Engineering"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Cabin Location</label>
                  <input
                    type="text"
                    value={formData.cabin || ""}
                    onChange={(e) => handleChange("cabin", e.target.value)}
                    placeholder="e.g. Block-3, Room 412"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Official Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="e.g. name@chitkara.edu.in"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Office Hours for Doubts</label>
                  <input
                    type="text"
                    value={formData.officeHours || ""}
                    onChange={(e) => handleChange("officeHours", e.target.value)}
                    placeholder="e.g. Mon - Thu • 03:30 PM - 05:00 PM"
                    required
                  />
                </div>

                <div className="fac-input-group">
                  <label>Focus / Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization || ""}
                    onChange={(e) => handleChange("specialization", e.target.value)}
                    placeholder="e.g. AI & Neural Systems"
                  />
                </div>

                <div className="fac-input-group full-width">
                  <label>Total Experience</label>
                  <input
                    type="text"
                    value={formData.experience || ""}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    placeholder="e.g. 7+ Years at Chitkara University (12 Years Total)"
                  />
                </div>

                <div className="fac-input-group full-width">
                  <label>Student Mentorship</label>
                  <input
                    type="text"
                    value={formData.mentorship || ""}
                    onChange={(e) => handleChange("mentorship", e.target.value)}
                    placeholder="e.g. Group M-14 (28 Assigned 3rd-Year Mentees)"
                  />
                </div>
              </div>

              <div className="fac-modal-footer">
                <button
                  type="submit"
                  className="btn-primary"
                >
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