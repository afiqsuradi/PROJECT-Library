"use strict";
// Library Array And Book Constructor
let myLibrary = [];
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.status = status;
}

// Select Elements
const overlayEl = document.querySelector(".overlay");
const contentEl = document.querySelector(".content-container");
const formEl = document.querySelector(".add-book-form");

// Functions

const toggleOverlay = function (el) {
  if (!el) return;
  el.classList.toggle("inactive");
};

const addBookToLibrary = function () {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = Number(document.getElementById("pages").value);
  const readStatus = document.getElementById("status").value;

  const book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
};

const createBookCard = function (book, id) {
  let article,
    bookInfo,
    titleEl,
    authorEl,
    pagesEl,
    bookBtns,
    readBtn,
    deleteBookBtn;

  // Create Book Card Element
  article = document.createElement("article");
  article.classList.add("book-card", book.status ? "read" : "reading");
  article.dataset.id = id;

  bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  titleEl = document.createElement("h2");
  titleEl.classList.add("book-title");

  authorEl = document.createElement("p");
  authorEl.classList.add("book-author");

  pagesEl = document.createElement("p");
  pagesEl.classList.add("book-pages");

  bookBtns = document.createElement("div");
  bookBtns.classList.add("book-btns");

  readBtn = document.createElement("a");
  readBtn.classList.add("book-read");

  deleteBookBtn = document.createElement("a");
  deleteBookBtn.classList.add("book-delete");

  // Add Book Card Content
  titleEl.textContent = book.title;
  authorEl.textContent = `By ${book.author}`;
  pagesEl.textContent = `${book.pages} Pages`;
  readBtn.textContent = book.status ? "Mark As Unread" : "Mark As Read";
  deleteBookBtn.textContent = "Delete Book";

  //Combine Book Card
  bookBtns.appendChild(readBtn);
  bookBtns.appendChild(deleteBookBtn);
  bookInfo.appendChild(titleEl);
  bookInfo.appendChild(authorEl);
  bookInfo.appendChild(pagesEl);
  article.appendChild(bookInfo);
  article.appendChild(bookBtns);
  return article;
};

const updateUI = function () {
  //Reset Body Content
  contentEl.innerHTML = "";
  myLibrary.forEach((book, index) => {
    // Insert Element Into Body Container
    contentEl.insertAdjacentElement("beforeend", createBookCard(book, index));
  });
};

const deleteBook = function (index) {
  myLibrary.splice(index, 1);
};

// Events

document.querySelector(".add-book-btn").addEventListener("click", (event) => {
  event.preventDefault();
  toggleOverlay(overlayEl);
});

overlayEl.addEventListener("click", function (event) {
  if (event.target == overlayEl) toggleOverlay(overlayEl);
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  toggleOverlay(overlayEl);
  addBookToLibrary();
  updateUI();
  formEl.reset();
});

contentEl.addEventListener("click", function (event) {
  const selectedArticle = event.target.closest(".book-card");
  if (event.target.closest(".book-delete")) {
    deleteBook(selectedArticle.dataset.id);
    updateUI();
  }
  if (event.target.closest(".book-read")) {
    const btnEl = event.target.closest(".book-read");
    myLibrary[selectedArticle.dataset.id].status = myLibrary[
      selectedArticle.dataset.id
    ].status
      ? false
      : true;
    selectedArticle.classList.toggle("read");
    selectedArticle.classList.toggle("reading");
    btnEl.textContent = myLibrary[selectedArticle.dataset.id].status
      ? "Mark As Unread"
      : "Mark As Read";
  }
});

updateUI();
