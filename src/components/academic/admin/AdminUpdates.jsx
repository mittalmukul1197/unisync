import React, { useState } from "react";
import "./AdminUpdates.css";

export default function AdminUpdates() {
  const [activeTab, setActiveTab] = useState("updates");
  const [showPostForm, setShowPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [incomingSearchTerm, setIncomingSearchTerm] = useState("");

  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: "Internal Assessment Schedule",
      description:
        "Students are informed that the internal assessment schedule will be shared shortly. Please check the department notice board regularly.",
      category: "Academic",
      audience: "All Batches",
      author: "Dean",
      date: "2026-10-20",
      priority: "Important",
    },
    {
      id: 2,
      title: "Attendance Reminder",
      description:
        "All students are advised to maintain the required attendance percentage in their respective subjects.",
      category: "Attendance",
      audience: "G1",
      author: "Dean",
      date: "2026-10-19",
      priority: "Normal",
    },
    {
      id: 3,
      title: "Technical Event Registration",
      description:
        "Students interested in participating in upcoming technical events should contact their respective faculty coordinators.",
      category: "Events",
      audience: "G2",
      author: "Dean",
      date: "2026-10-18",
      priority: "Normal",
    },
  ]);

  const [incomingUpdates] = useState([
    {
      id: "incoming-1",
      title: "Submit Department Performance Report",
      description:
        "Please compile the department's academic performance, attendance summary, and key activities for the current semester and submit the report to the higher office.",
      category: "Administrative",
      author: "Registrar's Office",
      authorRole: "Higher Authority",
      recipient: "Dean",
      date: "2026-10-24",
      priority: "Urgent",
    },
    {
      id: "incoming-2",
      title: "Faculty Meeting Schedule",
      description:
        "Please ensure that the department representatives attend the upcoming academic coordination meeting. The final agenda will be shared by the central office.",
      category: "Meeting",
      author: "Academic Affairs Office",
      authorRole: "Higher Authority",
      recipient: "Dean",
      date: "2026-10-22",
      priority: "Important",
    },
  ]);

  const [newUpdate, setNewUpdate] = useState({
    title: "",
    description: "",
    category: "General",
    audience: "All Batches",
    priority: "Normal",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostUpdate = (e) => {
    e.preventDefault();

    if (!newUpdate.title.trim() || !newUpdate.description.trim()) {
      alert("Please enter both the title and description.");
      return;
    }

    const createdUpdate = {
      id: Date.now(),
      title: newUpdate.title.trim(),
      description: newUpdate.description.trim(),
      category: newUpdate.category,
      audience: newUpdate.audience,
      priority: newUpdate.priority,
      author: "Dean",
      date: new Date().toISOString().split("T")[0],
    };

    setUpdates((prev) => [createdUpdate, ...prev]);

    setNewUpdate({
      title: "",
      description: "",
      category: "General",
      audience: "All Batches",
      priority: "Normal",
    });

    setShowPostForm(false);
  };

  const filteredUpdates = updates.filter((update) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      update.title.toLowerCase().includes(search) ||
      update.description.toLowerCase().includes(search) ||
      update.category.toLowerCase().includes(search) ||
      update.audience.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || update.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredIncomingUpdates = incomingUpdates.filter((update) => {
    const search = incomingSearchTerm.toLowerCase();
    return (
      update.title.toLowerCase().includes(search) ||
      update.description.toLowerCase().includes(search) ||
      update.author.toLowerCase().includes(search) ||
      update.category.toLowerCase().includes(search)
    );
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-updates-page">
      <div className="admin-updates-header">
        <div>
          <h1>Dean Updates</h1>
          <p>You can see your updates and can also publish the announcement for the students as well as for the faculty.</p>
        </div>

        {activeTab === "publish" && (
          <button
            className="admin-updates-post-button"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            {showPostForm ? "✕ Cancel" : "+ Post Update"}
          </button>
        )}
      </div>

      <div className="admin-updates-tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "updates"}
          className={`admin-updates-tab ${activeTab === "updates" ? "active" : ""}`}
          onClick={() => setActiveTab("updates")}
        >
          Updates
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "publish"}
          className={`admin-updates-tab ${activeTab === "publish" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("publish");
            setShowPostForm(false);
          }}
        >
          Publish
        </button>
      </div>

      {activeTab === "publish" && (
        <>
          <div className="admin-updates-stats">
            <div className="admin-updates-stat-card">
              <span className="admin-updates-stat-icon">📢</span>
              <div>
                <p>Total Updates</p>
                <h2>{updates.length}</h2>
              </div>
            </div>

            <div className="admin-updates-stat-card">
              <span className="admin-updates-stat-icon">🎓</span>
              <div>
                <p>Batch Groups</p>
                <h2>3</h2>
              </div>
            </div>

            <div className="admin-updates-stat-card">
              <span className="admin-updates-stat-icon">⭐</span>
              <div>
                <p>Important Updates</p>
                <h2>
                  {updates.filter((item) => item.priority === "Important").length}
                </h2>
              </div>
            </div>

            <div className="admin-updates-stat-card">
              <span className="admin-updates-stat-icon">📅</span>
              <div>
                <p>Today's Updates</p>
                <h2>
                  {
                    updates.filter(
                      (item) => item.date === new Date().toISOString().split("T")[0]
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          {showPostForm && (
            <div className="admin-updates-form-card">
              <div className="admin-updates-section-header">
                <h2>Create New Update</h2>
                <p>Write an announcement for your selected audience.</p>
              </div>

              <form onSubmit={handlePostUpdate}>
                <div className="admin-updates-form-grid">
                  <div className="admin-updates-form-group full-width">
                    <label htmlFor="update-title">Update Title</label>
                    <input
                      id="update-title"
                      type="text"
                      name="title"
                      placeholder="Enter announcement title"
                      value={newUpdate.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="admin-updates-form-group full-width">
                    <label htmlFor="update-description">Description</label>
                    <textarea
                      id="update-description"
                      name="description"
                      placeholder="Write your announcement here..."
                      value={newUpdate.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="admin-updates-form-group">
                    <label htmlFor="update-category">Category</label>
                    <select
                      id="update-category"
                      name="category"
                      value={newUpdate.category}
                      onChange={handleInputChange}
                    >
                      <option value="General">General</option>
                      <option value="Academic">Academic</option>
                      <option value="Attendance">Attendance</option>
                      <option value="Examination">Examination</option>
                      <option value="Events">Events</option>
                      <option value="Holiday">Holiday</option>
                    </select>
                  </div>

                  <div className="admin-updates-form-group">
                    <label htmlFor="update-audience">Publish To</label>
                    <select
                      id="update-audience"
                      name="audience"
                      value={newUpdate.audience}
                      onChange={handleInputChange}
                    >
                      <option value="All Batches">All Batches</option>
                      <option value="G1">G1</option>
                      <option value="G2">G2</option>
                      <option value="G3">G3</option>
                      <option value="Faculty">Faculty</option>
                    </select>
                  </div>

                  <div className="admin-updates-form-group">
                    <label htmlFor="update-priority">Priority</label>
                    <select
                      id="update-priority"
                      name="priority"
                      value={newUpdate.priority}
                      onChange={handleInputChange}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Important">Important</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="admin-updates-form-actions">
                  <button
                    type="button"
                    className="admin-updates-cancel-button"
                    onClick={() => setShowPostForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-updates-post-button">
                    📢 Publish Update
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="admin-updates-content">
            <div className="admin-updates-section-header">
              <h2>Published Updates</h2>
              <p>View announcements published by the Dean.</p>
            </div>

            <div className="admin-updates-toolbar">
              <div className="admin-updates-search">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search updates"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter updates by category"
              >
                <option value="All">All Categories</option>
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Attendance">Attendance</option>
                <option value="Examination">Examination</option>
                <option value="Events">Events</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>

            <div className="admin-updates-list">
              {filteredUpdates.map((update) => (
                <article className="admin-updates-item" key={update.id}>
                  <div className="admin-updates-item-top">
                    <div className="admin-updates-item-heading">
                      <span className="admin-updates-category">{update.category}</span>
                      <span className={`admin-updates-priority ${update.priority.toLowerCase()}`}>
                        {update.priority}
                      </span>
                    </div>
                    <span className="admin-updates-date">{formatDate(update.date)}</span>
                  </div>

                  <h3>{update.title}</h3>
                  <p className="admin-updates-description">{update.description}</p>

                  <div className="admin-updates-item-footer">
                    <span>Published for: {update.audience}</span>
                  </div>
                </article>
              ))}

              {filteredUpdates.length === 0 && (
                <div className="admin-updates-empty">
                  <span>📭</span>
                  <h3>No Data found</h3>
                  <p>Make sure you search the right name</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === "updates" && (
        <div className="admin-updates-content">
          <div className="admin-updates-section-header">
            <div>
              <h2>Incoming Updates</h2>
              <p>Messages and instructions sent to the Dean by higher authorities.</p>
            </div>
          </div>

          <div className="admin-updates-toolbar">
            <div className="admin-updates-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search incoming updates..."
                value={incomingSearchTerm}
                onChange={(e) => setIncomingSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-updates-list">
            {filteredIncomingUpdates.map((update) => (
              <article
                className="admin-updates-item admin-updates-incoming-item"
                key={update.id}
              >
                <div className="admin-updates-item-top">
                  <div className="admin-updates-item-heading">
                    <span className="admin-updates-category">{update.category}</span>
                    <span className={`admin-updates-priority ${update.priority.toLowerCase()}`}>
                      {update.priority}
                    </span>
                  </div>
                  <span className="admin-updates-date">{formatDate(update.date)}</span>
                </div>

                <h3>{update.title}</h3>
                <p className="admin-updates-description">{update.description}</p>

                <div className="admin-updates-item-footer">
                  <span>From: {update.author}</span>
                </div>
              </article>
            ))}

            {filteredIncomingUpdates.length === 0 && (
              <div className="admin-updates-empty">
                <span>📭</span>
                <h3>No Data found</h3>
                <p>Make sure you search the right name</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}