/**
 * Creates the action buttons for the book detail page.
 */
function FrameButton(book) {
  const container = createElement('div', 'detail-actions-wrapper');
  container.setAttribute('data-name', 'frame button');
  
  const content = createElement('div', 'detail-actions-content');
  
  // Start Reading button
  const readButton = createElement('div', {
    className: 'btn-primary-large',
    onclick: () => {
      const modalContent = createElement('div', { className: "p-8 pt-12 flex flex-col items-center w-full" },
          createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-8" }, "Select a Chapter"),
          createElement('div', { className: "w-full flex flex-col" },
              ...createChapters(book)
          )
      );
      showModal(modalContent);
    }
  });
  
  const readText = createElement('p', "btn-primary-large-text", 'Start Reading');
  readButton.appendChild(readText);
  
  // Mark Book button
  const markButton = createElement('div', {
    className: 'btn-secondary-large',
    onclick: () => toggleMarkBook(book.title)
  });
  
  const bookmarkIcon = createElement('div', 'relative size-5 opacity-60');
  bookmarkIcon.appendChild(createImage(book.isMarked ? images.check : images.bookmark, '', 'absolute inset-0 object-contain size-full'));
  
  const markText = createElement('p', "btn-secondary-large-text", book.isMarked ? 'Bookmarked' : 'Bookmark');
  
  markButton.appendChild(bookmarkIcon);
  markButton.appendChild(markText);
  
  content.appendChild(readButton);
  content.appendChild(markButton);

  if (book.category === 'Educational') {
    const coursesButton = createElement('div', {
      className: 'btn-accent-large',
      onclick: () => console.log('View Course clicked')
    });
    coursesButton.appendChild(createElement('p', "btn-accent-large-text", 'View Course'));
    content.appendChild(coursesButton);
  }

  container.appendChild(content);
  return container;
}

/**
 * Creates the info section (Title, Author, Rating, Filters).
 */
function bookinfo(book) {
  const container = createElement('div', 'detail-info-container');
  
  const title = createElement('h1', "detail-title", book.title);
  const author = createElement('p', "detail-author", `by ${book.author}`);
  
  const ratingRow = createElement('div', 'detail-rating-row');
  ratingRow.appendChild(createStarRating(book.rating));
  ratingRow.appendChild(createElement('span', 'detail-rating-text', `${book.rating}.0 Rating`));

  // Filters / Metadata Grid
  const metadataGrid = createElement('div', { className: "detail-metadata-grid" },
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "detail-metadata-label" }, "Language"),
        createElement('span', { className: "detail-metadata-value" }, book.language || 'English')
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "detail-metadata-label" }, "Year"),
        createElement('span', { className: "detail-metadata-value" }, book.year || '2024')
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "detail-metadata-label" }, "Format"),
        createElement('span', { className: "detail-metadata-value" }, "E-Book")
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "detail-metadata-label" }, "Status"),
        createElement('span', { className: "detail-status-value" }, "Available")
    )
  );

  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(ratingRow);
  container.appendChild(metadataGrid);
  container.appendChild(FrameButton(book));
  
  return container;
}

/**
 * Creates the book details hero section.
 */
function createBookDetails(book) {
  const detailSection = createElement('div', 'detail-hero-section');
  
  const bookCover = createElement('div', 'detail-cover-wrapper');
  bookCover.appendChild(createImage(book.image, book.title, 'object-cover size-full'));
  
  detailSection.appendChild(bookCover);
  detailSection.appendChild(bookinfo(book));
  
  return detailSection;
}

/**
 * Main Page Component.
 */
function BookDetailPage(book) {
    if (!book) return LibraryPage1();

    const container = createElement('div', 'library-page-container');
    const mainContent = createElement('main', 'library-main-content trending-section');

    // Back Button
    const backBtn = createElement('button', {
        className: "flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all font-bold group self-start",
        style: { background: 'none', border: 'none', cursor: 'pointer' },
        onclick: () => navigateTo('library')
    }, 
        createElement('span', { className: "text-xl group-hover:-translate-x-1 transition-transform" }, '←'),
        'Back to Library'
    );
    mainContent.appendChild(backBtn);

    // Frame 1: Hero Section (Title, Author, Rating, Filters, Buttons)
    mainContent.appendChild(createBookDetails(book));

    // Frame 2: Summary Section
    const summaryFrame = createElement('div', 'detail-summary-section');
    summaryFrame.appendChild(createElement('h2', 'detail-section-title', 'Summary'));
    
    const fullDescription = book.description.replace('Read more ...', '') + " This book covers advanced topics such as functions, trigonometry, and logarithms. It prepares students for higher-level math and critical thinking.";
    summaryFrame.appendChild(createElement('p', 'detail-summary-text', fullDescription));
    
    mainContent.appendChild(summaryFrame);

    // Frame 3: Chapters Section
    const chaptersContainer = createElement('div', 'flex flex-col gap-4');
    chaptersContainer.appendChild(createElement('h2', 'text-xl font-bold text-gray-900 px-2', 'Chapters'));
    
    const chaptersList = createElement('div', 'chapters-list-wrapper');
    createChapters(book).forEach(chapter => {
        chaptersList.appendChild(chapter);
    });
    
    chaptersContainer.appendChild(chaptersList);
    mainContent.appendChild(chaptersContainer);

    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}
