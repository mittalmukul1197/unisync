
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { borrowBook, returnBook } from "../../redux/librarySlice";
import "./library.css";

function getCoverInitials(title) {
  return title
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .join("")
    .slice(0, 3);
}

function Library() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.library.books);

  const borrowingLimit = useSelector(
    (state) => state.library.borrowingLimit
  );

  const borrowedCount = books.filter(
    (book) => book.isBorrowed
  ).length;

  return (
    <div className="library-container page-fade-in">
      <div className="library-header-meta">
        <h2>Digital Library Hub</h2>
        <p>
          Access digital AIML text materials and course references.
        </p>
      </div>

      <div className="library-ebooks-full">
        <h3>🌐 Digital E-Books</h3>

        <div className="library-block-content">
          <div className="digital-books-list">
            {books.map((ebook) => (
              <div key={ebook.id} className="ebook-row-card">
                <div className={`ebook-visual-cover ${ebook.coverTheme}`}>
                  {getCoverInitials(ebook.title)}
                </div>

                <div className="ebook-meta-info">
                  <h4>{ebook.title}</h4>
                  <p>
                    by {ebook.author} |{" "}
                    <strong>{ebook.format}</strong> ({ebook.size})
                  </p>
                </div>

                <button
                  className="read-ebook-btn"
                  onClick={() =>
                    alert(
                      `Opening E-Book PDF reader for: ${ebook.title}`
                    )
                  }
                >
                  📖 Read
                </button>

                <button
                  className="read-ebook-btn"
                  disabled={
                    !ebook.isBorrowed &&
                    borrowedCount >= borrowingLimit
                  }
                  onClick={() => {
                    if (ebook.isBorrowed) {
                      dispatch(returnBook(ebook.id));
                    } else {
                      dispatch(borrowBook(ebook.id));
                    }
                  }}
                >
                  {ebook.isBorrowed ? "Return" : "Borrow"}
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
