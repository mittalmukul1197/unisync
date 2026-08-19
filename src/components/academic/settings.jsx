import React from "react";

function SettingsPlaceholder() {
    return (
        <div className="bento-card glass page-fade-in" style={{ padding: "60px 40px", textAlign: "center", maxWidth: "500px", margin: "60px auto", background: "#ffffff" }}>
            <span style={{ fontSize: "56px" }}>⚙️</span>
            <h2 style={{ marginTop: "20px", color: "var(--text-primary)", fontWeight: "800", fontSize: "22px" }}>Settings</h2>
            <div style={{ marginTop: "16px", display: "inline-block", background: "var(--primary-indigo-glow)", border: "1px solid rgba(26, 58, 143, 0.2)", color: "var(--primary-indigo)", fontWeight: "800", fontSize: "13px", textTransform: "uppercase", letterSpacing: "2px", padding: "8px 20px", borderRadius: "6px" }}>
                Coming Soon
            </div>
        </div>
    );
}

export default SettingsPlaceholder;
