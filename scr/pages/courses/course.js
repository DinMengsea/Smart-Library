const libraryPagePath = '../library/library.html';

const booksData = {
  mathematics: [
    {
      title: 'Math Advance Grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'This book covers advanced mathematical concepts for high school students.',
      image: '../../assets/book/booke1.png',
      rating: 5,
      libraryBookTitle: 'Math Advance Grade 11',
      courseHref: '#'
    },
    {
      title: 'Math grade 9 corrections',
      author: 'Author ministry of education sport and youth',
      description: 'This book provides corrections and additional practice problems for high school mathematics students.',
      image: '../../assets/book/booke3.png',
      rating: 4,
      libraryBookTitle: 'Math grade 9 corrections',
      courseHref: '#'
    },
    {
      title: 'Math grade 6',
      author: 'Author ministry of education sport and youth',
      description: 'This book introduces fundamental mathematical concepts for middle school students.',
      image: '../../assets/book/booke4.png',
      rating: 5,
      libraryBookTitle: 'Math grade 6',
      courseHref: '#'
    }
  ],
  physics: [
    {
      title: 'Physics grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'This book provides a comprehensive introduction to physics for high school students.',
      image: '../../assets/book/booke5.png',
      rating: 4,
      libraryBookTitle: 'physics grade 11',
      courseHref: '#'
    }
  ],
  chemistry: [],
  biology: [],
  history: [
    {
      title: 'History grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'This book provides a comprehensive introduction to history for high school students.',
      image: '../../assets/book/booke9.png',
      rating: 4,
      libraryBookTitle: 'History grade 11',
      courseHref: '#'
    }
  ],
  geography: [
    {
      title: 'Geography grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'This book provides a comprehensive introduction to geography for high school students.',
      image: '../../assets/book/booke8.png',
      rating: 5,
      libraryBookTitle: 'Geography grade 11',
      courseHref: '#'
    }
  ],
  khmer: [
    {
      title: 'Khmer Literature grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'This book explores the rich tradition of Khmer literature for high school students.',
      image: '../../assets/book/booke2.png',
      rating: 5,
      libraryBookTitle: 'khmer literature Grade 11',
      courseHref: '#'
    },
    {
      title: 'Khmer Literature grade 4',
      author: 'Author ministry of education sport and youth',
      description: 'This book introduces students to the rich tradition of Khmer literature.',
      image: '../../assets/book/booke10.png',
      rating: 4,
      libraryBookTitle: 'Khmer Literature grade 4',
      courseHref: '#'
    }
  ],
  economic: [
    {
      title: 'Economics grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'An introduction to economic principles and their applications.',
      image: '../../assets/book/booke7.png',
      rating: 5,
      libraryBookTitle: 'economics grade 11',
      courseHref: '#'
    }
  ],
  social: [
    {
      title: 'Social Studies grade 11',
      author: 'Author ministry of education sport and youth',
      description: 'An exploration of societal structures and historical contexts.',
      image: '../../assets/book/booke6.png',
      rating: 5,
      libraryBookTitle: 'Social Studies grade 11',
      courseHref: '#'
    }
  ]
};

const booksContainer = document.getElementById('books-container');
const sectionTitle = document.getElementById('book-section-title');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getMarkedBooks() {
  return JSON.parse(localStorage.getItem('markedBooks') || '[]');
}

function setMarkedBooks(markedBooks) {
  localStorage.setItem('markedBooks', JSON.stringify(markedBooks));
}

function isBookMarked(bookTitle) {
  return getMarkedBooks().includes(bookTitle);
}

function toggleMarkedBook(bookTitle) {
  const markedBooks = getMarkedBooks();
  const existingIndex = markedBooks.indexOf(bookTitle);

  if (existingIndex >= 0) {
    markedBooks.splice(existingIndex, 1);
  } else {
    markedBooks.push(bookTitle);
  }

  setMarkedBooks(markedBooks);
  return markedBooks.includes(bookTitle);
}

function buildLibraryRoute(page, params = {}) {
  const searchParams = new URLSearchParams({ page, ...params });
  return `${libraryPagePath}?${searchParams.toString()}`;
}

function createStars(rating = 5) {
  return '★'.repeat(Math.max(0, Math.min(5, rating)));
}

function formatSectionTitle(subjectKey) {
  const titles = {
    mathematics: 'Mathematics Books',
    physics: 'Physics Books',
    chemistry: 'Chemistry Books',
    biology: 'Biology Books',
    history: 'History Books',
    geography: 'Geography Books',
    khmer: 'Khmer Literature Books',
    economic: 'Economic Books',
    social: 'Social Studies Books'
  };

  return titles[subjectKey] || 'Books';
}

function createEmptyState(subjectKey) {
  const subjectName = formatSectionTitle(subjectKey).replace(' Books', '');
  return `
    <div class="book-card empty-book-card">
      <div class="book-info">
        <h3>No books yet</h3>
        <p class="book-description">We do not have ${escapeHtml(subjectName)} books on this page yet.</p>
      </div>
    </div>
  `;
}

function createBookCard(book) {
  const marked = isBookMarked(book.libraryBookTitle);
  const safeTitle = escapeHtml(book.title);
  const safeAuthor = escapeHtml(book.author);
  const safeDescription = escapeHtml(book.description);
  const startReadingHref = buildLibraryRoute('detail', { book: book.libraryBookTitle });

  return `
    <article class="book-card">
      <img src="${book.image}" alt="${safeTitle}" class="book-image">

      <div class="book-info">
        <h3>${safeTitle}</h3>
        <p class="book-author">${safeAuthor}</p>
        <p class="book-description">${safeDescription}</p>
        <a href="${startReadingHref}" class="read-more">Read more...</a>

        <div class="book-actions">
          <a href="${startReadingHref}" class="action-btn primary">Start Reading</a>
          <a href="../courses/coursedetail.html?course=${encodeURIComponent(book.title)}" class="action-btn secondary">
          <img src="../../assets/icons/course.png" alt="">
          View Course
          </a>
          <button
            class="action-btn js-mark-book ${marked ? 'btn-marked' : 'btn-mark'}"
            type="button"
            data-book-title="${escapeHtml(book.libraryBookTitle)}"
            aria-pressed="${marked}"
            >
            <img src="../../assets/icons/${marked ? 'check' : 'bookmark'}.png" alt="">
            <span>${marked ? 'Book Marked' : 'Mark Book'}</span>
          </button>
        </div>
      </div>

      <div class="book-rating">
        <div class="stars">${createStars(book.rating)}</div>
        <p>MEMBER REVIEW</p>
      </div>
    </article>
  `;
}

function bindCourseBookActions() {
  booksContainer.querySelectorAll('.js-mark-book').forEach((button) => {
    button.addEventListener('click', () => {
      const bookTitle = button.dataset.bookTitle;
      const marked = toggleMarkedBook(bookTitle);
      const icon = button.querySelector('img');
      const label = button.querySelector('span');

      button.classList.remove('btn-marked', 'btn-mark');
      button.classList.add(marked ? 'btn-marked' : 'btn-mark');
      button.setAttribute('aria-pressed', String(marked));
      icon.src = `../../assets/icons/${marked ? 'check' : 'bookmark'}.png`;
      label.textContent = marked ? 'Book Marked' : 'Mark Book';
      });
  });
}

window.renderBooks = function renderBooks(subjectKey) {
  const books = booksData[subjectKey] || [];

  sectionTitle.textContent = formatSectionTitle(subjectKey);
  booksContainer.innerHTML = books.length
    ? books.map(createBookCard).join('')
    : createEmptyState(subjectKey);

  bindCourseBookActions();
};

window.renderBooks('mathematics');
