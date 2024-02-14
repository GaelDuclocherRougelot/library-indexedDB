import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import fetchedBooks from "../data.js";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";

const request = indexedDB.open("library-DB", 1);

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  let bookStore = db.createObjectStore("book", { keyPath: "id" });

  for (let book of fetchedBooks) {
    bookStore.put({
      id: book.id,
      title: book.title,
      category: book.category,
      description: book.description,
    });
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
