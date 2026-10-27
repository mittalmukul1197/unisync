import { createSlice } from "@reduxjs/toolkit";
const attendanceRecords = [
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
    { id: "STU017", name: "Harsh Patel", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Absent" },
    { id: "STU017", name: "Harsh Patel", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },
    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 1, status: "Absent" },
    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU018", name: "Mehak Sharma", course: "B.Tech CSE", group: "G3", date: "2026-10-20", lecture: 3, status: "Present" },
    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU019", name: "Nitin Kumar", course: "B.Tech CSE", group: "G1", date: "2026-10-20", lecture: 3, status: "Absent" },
    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 1, status: "Present" },
    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 2, status: "Present" },
    { id: "STU020", name: "Isha Gupta", course: "B.Tech CSE", group: "G2", date: "2026-10-20", lecture: 3, status: "Present" },

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
];;

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: attendanceRecords,
    reducers: {
        updateAttendanceStatus: (state, action) => {
            const { id, date, lecture, status } = action.payload;

            const record = state.find((item) =>
                item.id === id &&
                item.date === date &&
                item.lecture === lecture
            );

            if (record) {
                record.status = status;
            }
        },
        addAttendanceRecord: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { updateAttendanceStatus, addAttendanceRecord } = attendanceSlice.actions;
export default attendanceSlice.reducer;
