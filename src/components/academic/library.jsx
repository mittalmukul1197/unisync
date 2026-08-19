import React from "react";
import "./library.css";

const DIGITAL_BOOKS = [
    { title: "Reinforcement Learning: An Introduction (2nd Ed)", author: "Richard S. Sutton, Andrew G. Barto", size: "12.4 MB", format: "PDF", link: "Sutton_Barto_RL.pdf", coverTheme: "theme-indigo" },
    { title: "Deep Learning (Adaptive Computation & ML)", author: "Ian Goodfellow, Yoshua Bengio", size: "18.2 MB", format: "PDF", link: "Goodfellow_DL_Book.pdf", coverTheme: "theme-blue" },
    { title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", size: "14.7 MB", format: "PDF", link: "Bishop_PRML.pdf", coverTheme: "theme-emerald" },
    { title: "Database Management Systems (3rd Edition)", author: "Raghu Ramakrishnan", size: "8.9 MB", format: "PDF", link: "Ramakrishnan_DBMS.pdf", coverTheme: "theme-indigo" }
];

function getCoverInitials(title) {
    return title
        .split(" ")
        .filter((w) => w.length > 2)
        .map((w) => w[0])
        .join("")
        .slice(0, 3);
}

function Library() {
    return (
        <div className="library-container page-fade-in">
            <div className="library-header-meta">
                <h2>Digital Library Hub</h2>
                <p>Access curated digital AIML text materials and course references.</p>
            </div>

            <div className="library-ebooks-full">
                <h3>🌐 Digital E-Book Subnet</h3>
                <div className="library-block-content">
                    <div className="digital-books-list">
                        {DIGITAL_BOOKS.map((ebook, idx) => (
                            <div key={idx} className="ebook-row-card">
                                <div className={`ebook-visual-cover ${ebook.coverTheme}`}>
                                    {getCoverInitials(ebook.title)}
                                </div>
                                <div className="ebook-meta-info">
                                    <h4>{ebook.title}</h4>
                                    <p>by {ebook.author} | <strong>{ebook.format}</strong> ({ebook.size})</p>
                                </div>
                                <button
                                    className="read-ebook-btn"
                                    onClick={() => alert(`Opening E-Book PDF reader for: ${ebook.title}`)}
                                >
                                    📖 Read
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
