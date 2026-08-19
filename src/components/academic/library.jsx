import React from "react";
import "./library.css";

function Library() {
    // Digital E-Book references (Arogya AIML specific)
    const digitalBooks = [
        { title: "Reinforcement Learning: An Introduction (2nd Ed)", author: "Richard S. Sutton, Andrew G. Barto", size: "12.4 MB", format: "PDF", link: "Sutton_Barto_RL.pdf" },
        { title: "Deep Learning (Adaptive Computation & ML)", author: "Ian Goodfellow, Yoshua Bengio", size: "18.2 MB", format: "PDF", link: "Goodfellow_DL_Book.pdf" },
        { title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", size: "14.7 MB", format: "PDF", link: "Bishop_PRML.pdf" },
        { title: "Database Management Systems (3rd Edition)", author: "Raghu Ramakrishnan", size: "8.9 MB", format: "PDF", link: "Ramakrishnan_DBMS.pdf" }
    ];

    return (
        <div className="library-container page-fade-in">
            {/* Header */}
            <div className="library-header-meta">
                <h2>Digital Library Hub</h2>
                <p>Access curated digital AIML text materials and course references.</p>
            </div>

            {/* Digital E-Book Subnet — full width */}
            <div className="library-ebooks-full">
                <h3>🌐 Digital E-Book Subnet</h3>
                <div className="library-block-content">
                    <div className="digital-books-list">
                        {digitalBooks.map((ebook, idx) => {
                            // Extract a short abbreviation for the cover
                            const coverText = ebook.title
                                .split(" ")
                                .filter(w => w.length > 2)
                                .map(w => w[0])
                                .join("")
                                .slice(0, 3);
                            return (
                                <div key={idx} className="ebook-row-card">
                                    <div className="ebook-visual-cover" style={{
                                        background: `linear-gradient(135deg, ${
                                            idx % 3 === 0 ? '#1a3a8f, #3b82f6' : idx % 3 === 1 ? '#1e40af, #60a5fa' : '#064e3b, #10b981'
                                        })`
                                    }}>
                                        {coverText}
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
