import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBook, setBookToEdit, setBooks, setEditMode } from "../../redux/book/book";
import {
  GET_OR_POST_BOOKS_URL,
  deleteFirebaseBookById,
} from "../../utils/FirebaseService";
const baseImage =
  "https://images.unsplash.com/photo-1502126829571-83575bb53030?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setEditMode(false));

    // fetch all books
    fetch(GET_OR_POST_BOOKS_URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const booksResult = data.documents.map((doc) => {
          const currentBookId = doc.name.split("/books/")[1];
          const book = {
            id: currentBookId,
            title: doc.fields.title.stringValue,
            description: doc.fields.description.stringValue,
            category: doc.fields.category.stringValue,
            image: doc.fields.image.stringValue,
          };
          return book;
        });
        dispatch(setBooks(booksResult));
        console.log("Livres chargés");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  return (
    <section className="px-4 md:px-14 flex flex-col justify-center items-center w-full gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className="flex justify-between items-center gap-10 w-full max-w-[800px] border-b hover:bg-gray-100 transition-colors duration-300"
          >
            <div className="flex items-center gap-6">
              {" "}
              <img
                src={book.image || baseImage}
                alt="book cover img"
                className="max-w-[100px] aspect-square object-cover"
                width={100}
              />
              <div className="flex flex-col">
                <h2 className="text-2xl">{book.title}</h2>
                <p>{book.description}</p>
                <p>Catégorie: {book.category}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pr-4">
              <button
                onClick={() => {
                  dispatch(setEditMode(true));
                  dispatch(
                    setBookToEdit({
                      id: book.id,
                      title: book.title,
                      description: book.description,
                      category: book.category,
                      image: book.image,
                    })
                  );
                  navigate("/edit-book");
                }}
              >
                Modifier
              </button>
              <button
                onClick={() => {
                  deleteFirebaseBookById(book.id);
                  dispatch(deleteBook(book.id));
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-2xl">Il n&apos;y a pas de livres pour le moment...</p>
      )}
    </section>
  );
}
