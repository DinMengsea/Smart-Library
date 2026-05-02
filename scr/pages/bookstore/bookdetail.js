const params = new URLSearchParams(window.location.search);
const title = params.get("title");

const books = [
  {
    title: "Pride and Prejudice",
    image: "../../assets/book/book1.png",
    author: "Jane Austen",
    rating: "5.0 Rating",
    description:
      "A classic romantic novel about manners, love, family, and social expectations."
  },
  {
    title: "Clarissa",
    image: "../../assets/book/book2.png",
    author: "Samuel Richardson",
    rating: "4.8 Rating",
    description:
      "A classic English novel following Clarissa and her struggles with family, society, and personal choice."
  },
  {
    title: "The Adventures of Augie March",
    image: "../../assets/book/book3.png",
    author: "Saul Bellow",
    rating: "4.7 Rating",
    description:
      "A powerful story about Augie March and his journey through life, identity, and ambition."
  },
  {
    title: "The Murder of Roger Ackroyd",
    image: "../../assets/book/book4.png",
    author: "Agatha Christie",
    rating: "5.0 Rating",
    description:
      "A famous detective mystery full of secrets, clues, and a surprising ending."
  },
  {
    title: "The Adventures of Tom Sawyer",
    image: "../../assets/book/book5.png",
    author: "Mark Twain",
    rating: "4.9 Rating",
    description:
      "A fun adventure story about childhood, friendship, and imagination."
  },
  {
    title: "Clarissa Samuel Richardson",
    image: "../../assets/book/book6.png",
    author: "Samuel Richardson",
    rating: "4.8 Rating",
    description:
      "A literary classic focused on character, emotion, and social conflict."
  },
  {
    title: "This Story Might Save Your Life",
    image: "../../assets/book/book7.png",
    author: "Ben West",
    rating: "5.0 Rating",
    description:
      "A suspenseful podcast mystery that will keep you guessing. Benny Abbott and Joy Moore host one of the most beloved podcasts in the world, but their next survival story may be their own."
  },
  {
    title: "Start With Why",
    image: "../../assets/book/book8.png",
    author: "Simon Sinek",
    rating: "4.9 Rating",
    description:
      "A motivational book about leadership, purpose, and understanding why people take action."
  },
  {
    title: "Project Hail Mary",
    image: "../../assets/book/book9.png",
    author: "Andy Weir",
    rating: "5.0 Rating",
    description:
      "A science-fiction adventure about survival, space, discovery, and saving humanity."
  },
  {
    title: "The Rabbit Hutch",
    image: "../../assets/book/book10.png",
    author: "Tess Gunty",
    rating: "4.6 Rating",
    description:
      "A literary novel about lives connected through one apartment building and the secrets they carry."
  }
];

const book = books.find((item) => item.title === title) || books[6];

document.getElementById("bookTitle").textContent = book.title;
document.getElementById("bookImage").src = book.image;
document.getElementById("bookImage").alt = book.title;
document.getElementById("bookAuthor").textContent = `by ${book.author}`;
document.getElementById("bookRating").textContent = book.rating;
document.getElementById("bookDescription").textContent = book.description;

const buyBtn = document.getElementById("buyBtn");

buyBtn.addEventListener("click", () => {
  window.location.href = `../payment/payment.html?title=${encodeURIComponent(book.title)}`;
});