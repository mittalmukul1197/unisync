import React, { useState } from "react";
import "./AdminAttendence.css";

const getLocalDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const today = getLocalDate();

const attendanceRecords = [
    // October 20, 
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Absent" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Absent" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Absent" },

    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Absent" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Absent" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Not Marked" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Absent" },

    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU011", name: "Vikas Yadav", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU011", name: "Vikas Yadav", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU011", name: "Vikas Yadav", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Absent" },

    { id: "STU012", name: "Pooja Arora", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Absent" },
    { id: "STU012", name: "Pooja Arora", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU012", name: "Pooja Arora", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU013", name: "Mohit Bansal", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU013", name: "Mohit Bansal", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU013", name: "Mohit Bansal", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU014", name: "Kavya Jain", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU014", name: "Kavya Jain", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Absent" },
    { id: "STU014", name: "Kavya Jain", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU015", name: "Deepak Verma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Not Marked" },
    { id: "STU015", name: "Deepak Verma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU015", name: "Deepak Verma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU016", name: "Riya Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU016", name: "Riya Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU016", name: "Riya Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU017", name: "Harsh Patel", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU017", name: "Harsh Patel", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },
    { id: "STU017", name: "Harsh Patel", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Absent" },

    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Absent" },
    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },

    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Absent" },

    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

    // October 19, 2026
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 1, status: "Absent" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 2, status: "Absent" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 3, status: "Absent" },

    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 1, status: "Absent" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 3, status: "Not Marked" },

    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 2, status: "Absent" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-19", lecture: 3, status: "Present" },

    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 1, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 2, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-19", lecture: 3, status: "Present" },

    // October 18, 2026
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU001", name: "Rahul Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 3, status: "Absent" },

    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU002", name: "Priya Verma", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 1, status: "Absent" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU003", name: "Aman Gupta", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU004", name: "Sneha Singh", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU005", name: "Arjun Mehta", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU006", name: "Neha Kapoor", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 3, status: "Absent" },

    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 1, status: "Not Marked" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU007", name: "Karan Malhotra", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 1, status: "Absent" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU008", name: "Simran Kaur", course: "B.Tech CSE", group: "G2", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 2, status: "Absent" },
    { id: "STU009", name: "Rohit Kumar", course: "B.Tech CSE", group: "G3", date: "2026-10-18", lecture: 3, status: "Present" },

    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 1, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 2, status: "Present" },
    { id: "STU010", name: "Anjali Sharma", course: "B.Tech CSE", group: "G1", date: "2026-10-18", lecture: 3, status: "Present" }
];

export default function AdminAttendance() {
    const [selectedDate, setSelectedDate] = useState("2026-10-20");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const selectedDateRecords = attendanceRecords.filter(
        (record) => record.date === selectedDate
    );

    const students = [];
    attendanceRecords.forEach((record) => {
        const exists = students.some((s) => s.id === record.id);
        if (!exists) {
            students.push({
                id: record.id,
                name: record.name,
                course: record.course,
                group: record.group,
            });
        }
    });

    const totalStudents = students.length;

    const studentsByDate = [];
    selectedDateRecords.forEach((record) => {
        let student = studentsByDate.find((s) => s.id === record.id);

        if (!student) {
            student = {
                id: record.id,
                name: record.name,
                course: record.course,
                group: record.group,
                date: record.date,
                lectures: {
                    1: "Not Marked",
                    2: "Not Marked",
                    3: "Not Marked",
                },
            };
            studentsByDate.push(student);
        }

        student.lectures[record.lecture] = record.status;
    });

    const totalLectureSlots = totalStudents * 3;
    let uploaded = 0;
    let present = 0;
    let absent = 0;
    let notMarked = 0;

    selectedDateRecords.forEach((record) => {
        if (record.status === "Not Marked") {
            notMarked++;
        } else {
            uploaded++;
        }

        if (record.status === "Present") {
            present++;
        } else if (record.status === "Absent") {
            absent++;
        }
    });

    const attendanceRate = totalLectureSlots > 0
        ? Math.round((present / totalLectureSlots) * 100)
        : 0;

    const stats = [
        {
            title: "Total Students",
            value: totalStudents,
            icon: "🎓",
            color: "blue",
            description: "Unique students",
        },
        {
            title: "Attendance Uploaded",
            value: `${uploaded} / ${totalLectureSlots}`,
            icon: "↑",
            color: "green",
            description: `${notMarked} lecture records pending`,
        },
        {
            title: "Present Today",
            value: present,
            icon: "✓",
            color: "green",
            description: `${present} present`,
        },
        {
            title: "Absent Today",
            value: absent,
            icon: "✕",
            color: "red",
            description: "Absent lecture records",
        },
        {
            title: "Attendance Rate",
            value: `${attendanceRate}%`,
            icon: "%",
            color: "purple",
            description: "Present lecture records",
        },
    ];

    const filteredRecords = studentsByDate.filter((student) => {
        const search = searchTerm.trim().toLowerCase();

        const matchesSearch =
            student.name.toLowerCase().includes(search) ||
            student.id.toLowerCase().includes(search) ||
            student.course.toLowerCase().includes(search);

        let matchesGroup = true;
        if (selectedGroup !== "All" && student.group !== selectedGroup) {
            matchesGroup = false;
        }

        let matchesStatus = true;
        if (selectedStatus !== "All") {
            matchesStatus =
                student.lectures[1] === selectedStatus ||
                student.lectures[2] === selectedStatus ||
                student.lectures[3] === selectedStatus;
        }

        return matchesSearch && matchesGroup && matchesStatus;
    });

    const formatDate = (date) => {
        return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusClass = (status) => {
        if (status === "Present") return "present";
        if (status === "Absent") return "absent";
        return "not-marked";
    };

    return (
        <div className="admin-attendance-page">
            <div className="admin-attendance-header">
                <div>
                    <h1>Attendance Overview</h1>
                    <p>Monitor student attendance across the department.</p>
                </div>

                <div className="admin-attendance-date">
                    <span className="admin-attendance-calendar-icon">📅</span>
                    <div>
                        <small>Selected Date</small>
                        <strong>{formatDate(selectedDate)}</strong>
                    </div>
                </div>
            </div>

            <div className="admin-attendance-stats">
                {stats.map((item) => (
                    <div className="admin-attendance-stat-card" key={item.title}>
                        <div className="admin-attendance-stat-top">
                            <span>{item.title}</span>
                            <div className={`admin-attendance-stat-icon ${item.color}`}>
                                {item.icon}
                            </div>
                        </div>
                        <h2>{item.value}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="admin-attendance-card">
                <div className="admin-attendance-section-header">
                    <div>
                        <h2>Student Attendance Records</h2>
                        <p> View attendance of all students.</p>
                    </div>

                    <div className="admin-attendance-date-filter">
                        <label htmlFor="attendance-date">Attendance Date</label>
                        <input
                            id="attendance-date"
                            type="date"
                            value={selectedDate}
                            max={today}
                            onChange={(event) => setSelectedDate(event.target.value)}
                        />
                    </div>
                </div>

                <div className="admin-attendance-toolbar">
                    <div className="admin-attendance-filters">
                        <input
                            type="search"
                            placeholder="Search student name or ID..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />

                        <select
                            value={selectedGroup}
                            onChange={(event) => setSelectedGroup(event.target.value)}
                            className="admin-attendance-filter-select"
                        >
                            <option value="All">All Groups</option>
                            <option value="G1">Group G1</option>
                            <option value="G2">Group G2</option>
                            <option value="G3">Group G3</option>
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(event) => setSelectedStatus(event.target.value)}
                            className="admin-attendance-filter-select"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Not Marked">Not Marked</option>
                        </select>
                    </div>


                </div>

                <div className="admin-attendance-table-wrapper">
                    <table className="admin-attendance-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Group</th>
                                <th>Attendance Date</th>
                                <th>Lecture 1</th>
                                <th>Lecture 2</th>
                                <th>Lecture 3</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((student) => (
                                    <tr key={`${student.id}-${student.date}`}>
                                        <td className="admin-attendance-student-id">
                                            {student.id}
                                        </td>
                                        <td>
                                            <div className="admin-attendance-student">
                                                <span>{student.name}</span>
                                            </div>
                                        </td>
                                        <td>{student.group}</td>
                                        <td>{formatDate(student.date)}</td>
                                        <td>
                                            <span
                                                className={`admin-attendance-status ${getStatusClass(
                                                    student.lectures[1]
                                                )}`}
                                            >
                                                
                                                {student.lectures[1]}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`admin-attendance-status ${getStatusClass(
                                                    student.lectures[2]
                                                )}`}
                                            >
                                                {student.lectures[2]}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`admin-attendance-status ${getStatusClass(
                                                    student.lectures[3]
                                                )}`}
                                            >
                                                {student.lectures[3]}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="admin-attendance-empty">
                                        No attendance records found for the selected date and filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
}