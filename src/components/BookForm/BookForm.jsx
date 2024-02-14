/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook } from "../../redux/book/book";
import { updateBookIDB } from "../../utils/BookService";
import { useNavigate } from "react-router-dom";

export default function BookForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EditMode = useSelector((state) => state.book.editMode);
  const bookToEdit = useSelector((state) => state.book.bookToEdit);
  console.log(EditMode);
  const [title, setTitle] = useState(
    EditMode && bookToEdit !== null ? bookToEdit.title : ""
  );
  const [description, setDescription] = useState(
    EditMode && bookToEdit !== null ? bookToEdit.description : ""
  );
  const [image, setImage] = useState(
    EditMode && bookToEdit !== null ? bookToEdit.image : ""
  );
  const [category, setCategory] = useState(
    EditMode && bookToEdit !== null ? bookToEdit.category : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (EditMode) {
      dispatch(
        updateBook({ book_id: bookToEdit.id, title: title, description, image, category })
      );
      updateBookIDB({
        id: bookToEdit.id,
        title: title,
        description,
        category,
        image,
      });
    } else {
      dispatch(addBook({ title, description, image, category }));
    }

    setTitle("");
    setDescription("");
    setImage("");
    setCategory("");
    navigate("/");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
        placeholder="Titre"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2"
        placeholder="Description"
        cols="30"
        rows="10"
      ></textarea>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="URL de l'image"
        className="p-2 border"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="p-2 border"
      />
      <button type="submit" className="border p-2 bg-gray-800 text-white">
        Envoyer
      </button>
    </form>
  );
}
