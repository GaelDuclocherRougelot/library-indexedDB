import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { deleteBookIDB, updateBookIDB } from "../../utils/BookService";

const initialState = {
  books: [],
  editMode: false,
  bookToEdit: null,
};

export const BookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    setBooks: (state, actions) => {
      state.books = actions.payload;
    },
    setEditMode: (state, actions) => {
      state.editMode = actions.payload;
    },
    setBookToEdit: (state, actions) => {
      state.bookToEdit = actions.payload;
    },
    addBook: (state, actions) => {
      const newBook = {
        id: uuidv4(),
        title: actions.payload.title,
        description: actions.payload.description,
        image: actions.payload.image,
        category: actions.payload.category,
      };
      state.books = [...state.books, newBook];
      updateBookIDB(newBook);
    },
    updateBook: (state, action) => {
      let book_id = action.payload.book_id;

      let newBooks = [...state.books];
      let index = newBooks.findIndex((t) => t.id === book_id);
      newBooks[index].title = action.payload.title;
      newBooks[index].description = action.payload.description;
      newBooks[index].image = action.payload.image;
      newBooks[index].category = action.payload.category;

      state.books = newBooks;
      state.editMode = false;
    },
    deletetask: (state, action) => {
      let book_id = action.payload
      let index = state.books.findIndex(t => t.id.toString() === book_id.toString())
      state.books.splice(index, 1)
      deleteBookIDB(book_id);
  },
  },
});

export const { setBooks, setEditMode, addBook, updateBook, setBookToEdit, deletetask } =
  BookSlice.actions;

export default BookSlice.reducer;
