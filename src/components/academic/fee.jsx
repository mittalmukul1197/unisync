import React from "react";
import "./fee.css";

function Fee() {
    const activeDues = [
        { name: "Academic Tuition Fee (Sem IV)", description: "Mandatory Term IV Tuition Ledger", amount: 98000, status: "PAID" },
        { name: "Hostel Mess Dues (Current Month)", description: "Block D Mess Outstanding Balance", amount: 2400, status: "PENDING" },
        { name: "University Exam Charges", description: "Term End Examination Booking Fee", amount: 1500, status: "PAID" },
        { name: "Library Outstanding Overdue Fine", description: "Late return charges for 1 volume", amount: 40, status: "PENDING" }
    ];

    const feeHistory = [
        { semester: "Semester IV", type: "Academic Tuition", refId: "TXN-445566", date: "06 Jan 2026", amount: 98000, mode: "UPI", status: "SUCCESS" },
        { semester: "Semester III", type: "Hostel Room Rent", refId: "TXN-201988", date: "11 Jul 2025", amount: 65000, mode: "Credit Card", status: "SUCCESS" },
        { semester: "Semester III", type: "Academic Tuition", refId: "TXN-998877", date: "10 Jul 2025", amount: 98000, mode: "Net Banking", status: "SUCCESS" },
        { semester: "Semester II", type: "Academic Tuition", refId: "TXN-890123", date: "05 Jan 2025", amount: 95000, mode: "UPI", status: "SUCCESS" },
        { semester: "Semester I", type: "Academic Tuition", refId: "TXN-788910", date: "12 Jul 2024", amount: 95000, mode: "Net Banking", status: "SUCCESS" }
    ];

    const handlePrintReceipt = (record) => {
        alert(`Generating Payment Receipt...\n\nTransaction ID: ${record.refId}\nType: ${record.type}\nSemester: ${record.semester}\nAmount: ₹${record.amount.toLocaleString()}\nDate: ${record.date}\nStatus: ${record.status}`);
    };

    return (
        <div className="fee-container page-fade-in">
            {/* Header */}
            <div className="fee-header-meta">
                <h2>Finance & Fee Console</h2>
                <p>Track current semester academic ledger balances and download historical payment receipts.</p>
            </div>

            {/* Current Dues Ledger Summary Card */}
            <div className="fee-dues-panel glass">
                <h3>Current Term Ledger Summary</h3>
                <div className="dues-ledger-grid">
                    {activeDues.map((due, idx) => (
                        <div key={idx} className="due-item-row">
                            <div className="due-item-meta">
                                <h4>{due.name}</h4>
                                <p>{due.description}</p>
                            </div>
                            <div className="due-item-value-badge">
                                <span className="due-val font-mono">₹{due.amount.toLocaleString()}</span>
                                <span className={`due-badge ${due.status.toLowerCase()}`}>
                                    {due.status === "PAID" ? "Settled ✅" : "Due ⚠️"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Old Fee Records Table Card */}
            <div className="fee-history-panel glass">
                <h3>📜 Historical Payment Records</h3>
                <p className="history-subtitle">Detailed transactional history logs for university audit trail</p>

                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Semester</th>
                                <th>Ledger Type</th>
                                <th>Transaction Ref ID</th>
                                <th>Payment Date</th>
                                <th>Amount Paid</th>
                                <th>Payment Mode</th>
                                <th>Receipt Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeHistory.map((record, idx) => (
                                <tr key={idx}>
                                    <td><strong>{record.semester}</strong></td>
                                    <td>{record.type}</td>
                                    <td className="font-mono">{record.refId}</td>
                                    <td>{record.date}</td>
                                    <td className="font-mono"><strong>₹{record.amount.toLocaleString()}</strong></td>
                                    <td>{record.mode}</td>
                                    <td>
                                        <button 
                                            className="print-receipt-btn"
                                            onClick={() => handlePrintReceipt(record)}
                                        >
                                            📄 Print Receipt
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Fee;
