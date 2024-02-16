import { initializeApp } from "@firebase/app";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

initializeApp(firebaseConfig);

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

export const GET_OR_POST_BOOKS_URL = `${BASE_URL}/books?key=${firebaseConfig.apiKey}`;

// POST
export const postOneBookToFirebase = (book) => {
  const convertedBook = {
    title: { stringValue: book.title },
    description: { stringValue: book.description },
    category: { stringValue: book.category },
    image: { stringValue: book.image },
  };

  fetch(GET_OR_POST_BOOKS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: convertedBook,
    }),
  })
    .then(() => console.log("Le livre à bien été mis en ligne"))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// UPDATE
export const updateFirebaseBookById = (book) => {
  fetch(`${BASE_URL}/books/${book.id}?key=${firebaseConfig.apiKey}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        title: { stringValue: book.title },
        description: { stringValue: book.description },
        category: { stringValue: book.category },
        image: { stringValue: book.image },
      },
    }),
  })
    .then((res) => console.log(res.json()))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// DELETE
export const deleteFirebaseBookById = (bookId) => {
  fetch(`${BASE_URL}/books/${bookId}?key=${firebaseConfig.apiKey}`, {
    method: "DELETE",
  })
    .then(() => console.log("Le livre à bien été supprimé"))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
