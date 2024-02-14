import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletetask, setBookToEdit, setBooks, setEditMode } from "../../redux/book/book";
const baseImage =
  "https://images.unsplash.com/photo-1502126829571-83575bb53030?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const navigate = useNavigate();

  useEffect(() => {
    const request = indexedDB.open("library-DB", 2);

    request.onsuccess = function (event) {
      let db = event.target.result;

      const transaction = db.transaction(["book"], "readonly");
      const bookStore = transaction.objectStore("book");
      const request2 = bookStore.getAll();

      request2.onsuccess = function () {
        console.log(request2.result);
        dispatch(setBooks(request2.result));
      };
    };
  }, [dispatch]);

  return (
    <section className="px-4 md:px-14 flex flex-col justify-center items-center gap-6 w-full">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex justify-between items-center gap-10 w-full max-w-[800px]"
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
          <div className="flex flex-col gap-4">
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
                navigate("/add-book");
              }}
            >
              Modifier
            </button>
            <button
              onClick={() => {
                dispatch(deletetask(book.id));
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
