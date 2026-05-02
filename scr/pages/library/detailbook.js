
function FrameButton(book) {
  const container = createElement('div', 'detail-actions-wrapper');
  container.setAttribute('data-name', 'frame button');
  
  const content = createElement('div', 'detail-actions-content');
  
  // Start Reading button
  const readButton = createElement('div', {
    className: 'btn-primary-large',
    onclick: () => {
      const modalContent = createElement('div', { className: "modal-chapter-select-container" },
          createElement('h2', { className: "modal-chapter-select-title" }, "Select a Chapter"),
          createElement('div', { className: "modal-chapter-list" },
              ...createChapters(book)
          )
      );
      showModal(modalContent);
    }
  });
  
  const readText = createElement('p', "btn-primary-large-text", 'Start Reading');
  readButton.appendChild(readText);
  
  // Mark Book button
  const markButton = createElement('button', {
    className: 'btn-secondary-large',
    type: 'button'
  });

  const bookmarkIcon = createElement('div', 'detail-bookmark-icon-wrapper');
  const bookmarkImage = createImage(book.isMarked ? images.check : images.bookmark, '', 'detail-bookmark-icon');
  bookmarkIcon.appendChild(bookmarkImage);

  const markText = createElement('p', "btn-secondary-large-text", book.isMarked ? 'Bookmarked' : 'Bookmark');

  markButton.onclick = (e) => {
    e.stopPropagation();
    const marked = toggleMarkBook(book.title, { refresh: false });
    bookmarkImage.src = marked ? images.check : images.bookmark;
    markText.textContent = marked ? 'Bookmarked' : 'Bookmark';
  };

  markButton.appendChild(bookmarkIcon);
  markButton.appendChild(markText);
  
  content.appendChild(readButton);
  content.appendChild(markButton);

  if (book.category === 'Educational') {
    const coursesButton = createElement('div', {
      className: 'btn-accent-large',
      onclick: () => window.location.href = `../courses/coursedetail.html?course=${encodeURIComponent(book.title)}`
    });
    coursesButton.appendChild(createElement('p', "btn-accent-large-text", 'View Course'));
    content.appendChild(coursesButton);
  }

  container.appendChild(content);
  return container;
}


function bookinfo(book) {
  const container = createElement('div', 'detail-info-container');
  
  const title = createElement('h1', "detail-title", book.title);
  const author = createElement('p', "detail-author", `by ${book.author}`);
  
  const ratingRow = createElement('div', 'detail-rating-row');
  ratingRow.appendChild(createStarRating(book.rating));
  ratingRow.appendChild(createElement('span', 'detail-rating-text', `${book.rating}.0 Rating`));

  // Filters / Metadata Grid
  const metadataGrid = createElement('div', { className: "detail-metadata-grid" },
    createElement('div', { className: "detail-metadata-item" },
        createElement('span', { className: "detail-metadata-label" }, "Language"),
        createElement('span', { className: "detail-metadata-value" }, book.language || 'English')
    ),
    createElement('div', { className: "detail-metadata-item" },
        createElement('span', { className: "detail-metadata-label" }, "Year"),
        createElement('span', { className: "detail-metadata-value" }, book.year || '2024')
    ),
    createElement('div', { className: "detail-metadata-item" },
        createElement('span', { className: "detail-metadata-label" }, "Format"),
        createElement('span', { className: "detail-metadata-value" }, "E-Book")
    ),
    createElement('div', { className: "detail-metadata-item" },
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


function createBookDetails(book) {
  const detailSection = createElement('div', 'detail-hero-section');
  
  const bookCover = createElement('div', 'detail-cover-wrapper');
  bookCover.appendChild(createImage(book.image, book.title, 'detail-cover-image'));
  
  detailSection.appendChild(bookCover);
  detailSection.appendChild(bookinfo(book));
  
  return detailSection;
}


function BookDetailPage(book) {
    if (!book) return LibraryPage1();

    const container = createElement('div', 'library-page-container');
    const mainContent = createElement('main', 'library-main-content trending-section');

    // Back Button
    const backBtn = createElement('button', {
        className: "detail-back-button",
        onclick: () => navigateTo('library')
    }, 
        createElement('span', { className: "detail-back-icon" }, '←'),
        'Back to Library'
    );
    mainContent.appendChild(backBtn);

    //  Hero Section (Title, Author, Rating, Filters, Buttons)
    mainContent.appendChild(createBookDetails(book));

    //  Summary Section
    const summaryFrame = createElement('div', 'detail-summary-section');
    summaryFrame.appendChild(createElement('h2', 'detail-section-title', 'Summary'));
    
    const fullDescription = book.description.replace('Read more ...', '') + " This book covers advanced topics such as functions, trigonometry, and logarithms. It prepares students for higher-level math and critical thinking.";
    summaryFrame.appendChild(createElement('p', 'detail-summary-text', fullDescription));
    
    mainContent.appendChild(summaryFrame);

    // Frame 3: Chapters Section
    const chaptersContainer = createElement('div', 'detail-chapters-section');
    chaptersContainer.appendChild(createElement('h2', 'detail-section-title', 'Chapters'));
    
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
