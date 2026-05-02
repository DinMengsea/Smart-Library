const books = [
  {
    title: "Pride and Prejudice",
    image: "../../assets/book/book1.png",
    category: "fiction",
    date: "old",
    price: "$24.99",
  },
  {
    title: "Clarissa",
    image: "../../assets/book/book2.png",
    category: "fiction",
    date: "old",
    price: "$19.99",
  },
  {
    title: "The Adventures of Augie March",
    image: "../../assets/book/book3.png",
    category: "fiction",
    date: "old",
    price: "$21.99",
  },
  {
    title: "The Murder of Roger Ackroyd",
    image: "../../assets/book/book4.png",
    category: "fiction",
    date: "old",
    price: "$18.99",
  },
  {
    title: "The Adventures of Tom Sawyer",
    image: "../../assets/book/book5.png",
    category: "fiction",
    date: "old",
    price: "$17.99",
  },
  {
    title: "Clarissa Samuel Richardson",
    image: "../../assets/book/book6.png",
    category: "fiction",
    date: "old",
    price: "$20.99",
  },
  {
    title: "This Story Might Save Your Life",
    image: "../../assets/book/book7.png",
    category: "fiction",
    date: "new",
    price: "$24.99",
  },
  {
    title: "Start With Why",
    image: "../../assets/book/book8.png",
    category: "self-help",
    date: "new",
    price: "$22.99",
  },
  {
    title: "Project Hail Mary",
    image: "../../assets/book/book9.png",
    category: "science",
    date: "new",
    price: "$26.99",
  },
  {
    title: "The Rabbit Hutch",
    image: "../../assets/book/book10.png",
    category: "fiction",
    date: "new",
    price: "$23.99",
  },
];

const sectionTitle = document.getElementById("sectionTitle");
const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

function renderBooks() {
    
  const searchText = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value.toLowerCase();
  const date = dateFilter.value.toLowerCase();

    if (date === "new") {
    sectionTitle.textContent = "New Books";
    } else if (date === "old") {
    sectionTitle.textContent = "Old Books";
    } else {
    sectionTitle.textContent = "All Books";
    }

  const filteredBooks = books.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(searchText);
    const matchCategory = category === "all" || book.category.toLowerCase() === category;
    const matchDate = date === "all" || book.date.toLowerCase() === date;

    return matchSearch && matchCategory && matchDate;
  });

  if (filteredBooks.length === 0) {
    bookGrid.innerHTML = `<div class="no-result">No books found.</div>`;
    return;
  }

  bookGrid.innerHTML = filteredBooks
    .map(
      (book) => `
        <a class="book-card" href="bookdetail.html?title=${encodeURIComponent(book.title)}">
          <img src="${book.image}" alt="${book.title}">
          <div class="book-title">${book.title}</div>
          <div class="book-price">${book.price}</div>
        </a>
      `
    )
    .join("");
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);
dateFilter.addEventListener("change", renderBooks);

renderBooks();