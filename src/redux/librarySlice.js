import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: "rl-book",
      title: "Reinforcement Learning: An Introduction (2nd Ed)",
      author: "Richard S. Sutton, Andrew G. Barto",
      size: "12.4 MB",
      format: "PDF",
      link: "Sutton_Barto_RL.pdf",
      coverTheme: "theme-indigo",
      isBorrowed: false
    },
    {
      id: "deep-learning",
      title: "Deep Learning (Adaptive Computation & ML)",
      author: "Ian Goodfellow, Yoshua Bengio",
      size: "18.2 MB",
      format: "PDF",
      link: "Goodfellow_DL_Book.pdf",
      coverTheme: "theme-blue",
      isBorrowed: false
    },
    {
      id: "pattern-recognition",
      title: "Pattern Recognition and Machine Learning",
      author: "Christopher Bishop",
      size: "14.7 MB",
      format: "PDF",
      link: "Bishop_PRML.pdf",
      coverTheme: "theme-emerald",
      isBorrowed: false
    },
    {
      id: "dbms-book",
      title: "Database Management Systems (3rd Edition)",
      author: "Raghu Ramakrishnan",
      size: "8.9 MB",
      format: "PDF",
      link: "Ramakrishnan_DBMS.pdf",
      coverTheme: "theme-indigo",
      isBorrowed: false
    }
  ],
  borrowingLimit: 4
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    borrowBook: (state, action) => {
      const book = state.books.find(
        (book) => book.id === action.payload
      );

      const borrowedCount = state.books.filter(
        (book) => book.isBorrowed
      ).length;

      if (
        book &&
        !book.isBorrowed &&
        borrowedCount < state.borrowingLimit
      ) {
        book.isBorrowed = true;
      }
    },

    returnBook: (state, action) => {
      const book = state.books.find(
        (book) => book.id === action.payload
      );

      if (book) {
        book.isBorrowed = false;
      }
    }
  }
});

export const { borrowBook, returnBook } = librarySlice.actions;

export default librarySlice.reducer;
