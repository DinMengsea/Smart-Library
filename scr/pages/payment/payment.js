const books = [
  {
    title: "Pride and Prejudice",
    image: "../../assets/book/book1.png",
    description: "A classic romantic novel about manners, love, family, and social expectations.",
    price: "$24.99",
  },
  {
    title: "Clarissa",
    image: "../../assets/book/book2.png",
    description: "A classic English novel following Clarissa and her struggles with family and society.",
    price: "$19.99",
  },
  {
    title: "The Adventures of Augie March",
    image: "../../assets/book/book3.png",
    description: "A powerful story about Augie March and his journey through life and ambition.",
    price: "$21.99",
  },
  {
    title: "The Murder of Roger Ackroyd",
    image: "../../assets/book/book4.png",
    description: "A famous detective mystery full of secrets, clues, and a surprising ending.",
    price: "$18.99",
  },
  {
    title: "The Adventures of Tom Sawyer",
    image: "../../assets/book/book5.png",
    description: "A fun adventure story about childhood, friendship, and imagination.",
    price: "$17.99",
  },
  {
    title: "Clarissa Samuel Richardson",
    image: "../../assets/book/book6.png",
    description: "A literary classic focused on character, emotion, and social conflict.",
    price: "$20.99",
  },
  {
    title: "This Story Might Save Your Life",
    image: "../../assets/book/book7.png",
    description: "A suspenseful podcast mystery that will keep you guessing.",
    price: "$24.99",
  },
  {
    title: "Start With Why",
    image: "../../assets/book/book8.png",
    description: "A motivational book about leadership, purpose, and understanding why people take action.",
    price: "$22.99",
  },
  {
    title: "Project Hail Mary",
    image: "../../assets/book/book9.png",
    description: "A science-fiction adventure about survival, space, discovery, and saving humanity.",
    price: "$26.99",
  },
  {
    title: "The Rabbit Hutch",
    image: "../../assets/book/book10.png",
    description: "A literary novel about lives connected through one apartment building.",
    price: "$23.99",
  },
];

const params = new URLSearchParams(window.location.search);
const title = params.get("title");

const book = books.find((item) => item.title === title) || books[6];

document.getElementById("paymentBookImage").src = book.image;
document.getElementById("paymentBookImage").alt = book.title;
document.getElementById("paymentBookTitle").textContent = book.title;
document.getElementById("paymentBookDescription").textContent = book.description;

const priceTexts = document.querySelectorAll(".price-row strong");
priceTexts[0].textContent = book.price;
priceTexts[2].textContent = book.price;