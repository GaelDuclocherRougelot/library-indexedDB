import { useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BookForm from "./components/BookForm/BookForm";
import Books from "./components/Books/Books";
import { setBookToEdit, setEditMode } from "./redux/book/book";

function App() {
  const dispatch = useDispatch();
  return (
    <main className="flex flex-col items-center">
      <nav className="py-10 flex gap-4">
        <Link to={"/"}>Accueil</Link>
        <Link
          to={"/add-book"}
          onClick={() => {
            dispatch(setBookToEdit(null));
            dispatch(setEditMode(false));
          }}
        >
          Ajouter un livre
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/edit-book" element={<BookForm />} />
      </Routes>
    </main>
  );
}

export default App;
