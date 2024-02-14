export const updateBookIDB = (newBook) => {
  let request = indexedDB.open("library-DB", 2);

  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction(["book"], "readwrite");

    const bookStore = transaction.objectStore("book");

    const request = bookStore.put(newBook);

    request.onsuccess = function () {
      console.log("Livre ajouté avec succès");
    };

    request.onerror = function () {
      console.error("une erreur est survenue lors de l'ajout du livre");
    };
  };
};

export const deleteBookIDB = (bookId) => {
  let request = indexedDB.open("library-DB", 2);

  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction(["book"], "readwrite");

    const bookStore = transaction.objectStore("book");

    const request = bookStore.delete(bookId);

    request.onsuccess = function () {
      console.log("Livre supprimé avec succès");
    };

    request.onerror = function () {
      console.error("une erreur est survenue lors de la suppression du livre");
    };
  };
};
