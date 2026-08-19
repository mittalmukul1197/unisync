import React, { useState } from "react";
import "./timetable.css";

function Timetable() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [selectedDay, setSelectedDay] = useState("Monday");

    const scheduleData = {
        Monday: [
            { id: 101, period: "Period 1", time: "04:10 PM - 05:00 PM", name: "Statistics and Data Engineering", code: "25CAI0201", room: "LH-501", faculty: "Paras Maurya" },
            { id: 102, period: "Period 2", time: "05:00 PM - 05:50 PM", name: "Statistics and Data Engineering", code: "25CAI0201", room: "LH-501", faculty: "Paras Maurya" },
            { id: 103, period: "Period 3", time: "05:50 PM - 06:40 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" },
            { id: 104, period: "Period 4", time: "06:40 PM - 07:30 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" },
            { id: 105, period: "Period 5", time: "07:50 PM - 08:30 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 106, period: "Period 6", time: "08:30 PM - 09:20 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" }
        ],
        Tuesday: [
            { id: 201, period: "Period 1", time: "04:10 PM - 05:00 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 202, period: "Period 2", time: "05:00 PM - 05:50 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 203, period: "Period 3", time: "05:50 PM - 06:40 PM", name: "Database Management System", code: "24CSE0209", room: "LH-501", faculty: "Harsh Bansal" },
            { id: 204, period: "Period 4", time: "06:40 PM - 07:30 PM", name: "Database Management System", code: "24CSE0209", room: "LH-501", faculty: "Harsh Bansal" },
            { id: 205, period: "Period 5", time: "07:50 PM - 08:30 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" },
            { id: 206, period: "Period 6", time: "08:30 PM - 09:20 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" }
        ],
        Wednesday: [
            { id: 301, period: "Period 3", time: "05:50 PM - 06:40 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 302, period: "Period 4", time: "06:40 PM - 07:30 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" }
        ],
        Thursday: [
            { id: 401, period: "Period 1", time: "04:10 PM - 05:00 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 402, period: "Period 2", time: "05:00 PM - 05:50 PM", name: "Object Oriented Programming", code: "25CSE0204", room: "LH-501", faculty: "Sumit Mohan" },
            { id: 403, period: "Period 3", time: "05:50 PM - 06:40 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" },
            { id: 404, period: "Period 4", time: "06:40 PM - 07:30 PM", name: "Front End Engineering-II", code: "25CSE0203", room: "LH-501", faculty: "Yogendra Sharma" }
        ],
        Friday: [
            { id: 501, period: "Period 1", time: "04:10 PM - 05:00 PM", name: "Database Management System", code: "24CSE0209", room: "LH-501", faculty: "Harsh Bansal" },
            { id: 502, period: "Period 2", time: "05:00 PM - 05:50 PM", name: "Database Management System", code: "24CSE0209", room: "LH-501", faculty: "Harsh Bansal" },
            { id: 503, period: "Period 3", time: "05:50 PM - 06:40 PM", name: "Statistics and Data Engineering", code: "25CAI0201", room: "LH-501", faculty: "Paras Maurya" },
            { id: 504, period: "Period 4", time: "06:40 PM - 07:30 PM", name: "Statistics and Data Engineering", code: "25CAI0201", room: "LH-501", faculty: "Paras Maurya" }
        ]
    };

    return (
        <div className="timetable-container page-fade-in">
            <div className="timetable-header-meta">
                <h2>Arogya Academic Timetable</h2>
                <p>Interactive schedule view for U25AIML-G8 batch. LH-501 Lecture Hall mapping.</p>
            </div>

            {/* Day Selector Tabs */}
            <div className="timetable-day-selector">
                {days.map((day, idx) => (
                    <button
                        key={idx}
                        className={`day-btn ${selectedDay === day ? "active" : ""}`}
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Timetable Slots Cards */}
            <div className="timetable-schedule-list">
                {scheduleData[selectedDay].map((slot, idx) => (
                    <div key={idx} className="timetable-slot-card glass">
                        <div className="slot-time-column">
                            <span className="clock-icon">🕒</span>
                            <div className="slot-meta-cell">
                                <span className="slot-period-num font-mono">{slot.period}</span>
                                <span className="slot-time-text font-mono">{slot.time.split(" - ")[0]}</span>
                            </div>
                        </div>
                        
                        <div className="slot-vertical-divider"></div>

                        <div className="slot-info-column">
                            <div className="slot-title-row">
                                <span className="slot-code font-mono">{slot.code}</span>
                                <span className="slot-room-badge font-mono">Room: {slot.room}</span>
                            </div>
                            <h3 className="slot-name">{slot.name}</h3>
                            <div className="slot-footer-meta">
                                <span>Instructor: <strong>{slot.faculty}</strong></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timetable;
