import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./components/Books/Books";
import BookForm from "./components/BookForm/BookForm";

function App() {
  
  return (
    <main className="flex flex-col items-center">
      <nav className="py-10 flex gap-4">
        <Link to={"/"}>Accueil</Link>
        <Link to={"/add-book"}>Ajouter un livre</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
    </main>
  );
}

export default App;
