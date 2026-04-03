/**
 * Creates the action buttons for the book detail page.
 */
function FrameButton(book) {
  const container = createElement('div', 'relative shrink-0 w-full mt-2');
  container.setAttribute('data-name', 'frame button');
  
  const content = createElement('div', 'flex flex-wrap gap-4 items-center py-2 relative w-full');
  
  // Start Reading button
  const readButton = createElement('div', {
    className: 'group flex flex-col h-[54px] items-center justify-center px-10 py-3 relative bg-blue-600 rounded-xl cursor-pointer hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200',
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
  
  const readText = createElement('p', "font-bold relative text-[15px] text-white whitespace-nowrap", 'Start Reading');
  readButton.appendChild(readText);
  
  // Mark Book button
  const markButton = createElement('div', {
    className: 'group flex gap-2.5 h-[54px] items-center justify-center px-10 py-3 relative rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-all active:scale-95',
    onclick: () => toggleMarkBook(book.title)
  });
  
  const bookmarkIcon = createElement('div', 'relative size-5 opacity-60');
  bookmarkIcon.appendChild(createImage(book.isMarked ? images.check : images.bookmark, '', 'absolute inset-0 object-contain size-full'));
  
  const markText = createElement('p', "font-semibold text-[15px] text-gray-700 whitespace-nowrap", book.isMarked ? 'Bookmarked' : 'Bookmark');
  
  markButton.appendChild(bookmarkIcon);
  markButton.appendChild(markText);
  
  content.appendChild(readButton);
  content.appendChild(markButton);

  if (book.category === 'Educational') {
    const coursesButton = createElement('div', {
      className: 'flex gap-2.5 h-[54px] items-center justify-center px-8 py-3 relative rounded-xl bg-indigo-50 border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-all active:scale-95',
      onclick: () => console.log('View Course clicked')
    });
    coursesButton.appendChild(createElement('p', "font-bold text-[15px] text-indigo-700 whitespace-nowrap", 'View Course'));
    content.appendChild(coursesButton);
  }

  container.appendChild(content);
  return container;
}

/**
 * Creates the info section (Title, Author, Rating, Filters).
 */
function bookinfo(book) {
  const container = createElement('div', 'flex flex-col gap-4 items-start justify-center py-2 relative w-full lg:w-[700px]');
  
  const title = createElement('h1', "font-black leading-tight text-[40px] text-gray-900 w-full", book.title);
  const author = createElement('p', "font-semibold text-[22px] text-blue-600", `by ${book.author}`);
  
  const ratingRow = createElement('div', 'flex items-center gap-3 mb-2');
  ratingRow.appendChild(createStarRating(book.rating));
  ratingRow.appendChild(createElement('span', 'text-sm font-bold text-gray-400', `${book.rating}.0 Rating`));

  // Filters / Metadata Grid
  const metadataGrid = createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-gray-100 my-4 w-full" },
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1" }, "Language"),
        createElement('span', { className: "text-gray-900 font-bold" }, book.language || 'English')
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1" }, "Year"),
        createElement('span', { className: "text-gray-900 font-bold" }, book.year || '2024')
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1" }, "Format"),
        createElement('span', { className: "text-gray-900 font-bold" }, "E-Book")
    ),
    createElement('div', { className: "flex flex-col" },
        createElement('span', { className: "text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1" }, "Status"),
        createElement('span', { className: "text-green-600 font-black" }, "Available")
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
  const detailSection = createElement('div', 'flex flex-col md:flex-row gap-12 items-start bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100');
  
  const bookCover = createElement('div', 'w-full md:w-[260px] aspect-[3/4.2] shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-100');
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

    const container = createElement('div', 'min-h-screen flex flex-col bg-[#f0effb]');
    const mainContent = createElement('main', 'max-w-6xl mx-auto w-full flex flex-col gap-8 p-6 sm:p-12');

    // Back Button
    const backBtn = createElement('button', {
        className: "flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all font-bold group self-start",
        onclick: () => navigateTo('library')
    }, 
        createElement('span', { className: "text-xl group-hover:-translate-x-1 transition-transform" }, '←'),
        'Back to Library'
    );
    mainContent.appendChild(backBtn);

    // Frame 1: Hero Section (Title, Author, Rating, Filters, Buttons)
    mainContent.appendChild(createBookDetails(book));

    // Frame 2: Summary Section
    const summaryFrame = createElement('div', 'bg-white rounded-[32px] p-10 shadow-sm border border-gray-100');
    summaryFrame.appendChild(createElement('h2', 'text-2xl font-black text-gray-900 mb-6', 'Summary'));
    
    const fullDescription = book.description.replace('Read more ...', '') + " This book covers advanced topics such as functions, trigonometry, and logarithms. It prepares students for higher-level math and critical thinking.";
    summaryFrame.appendChild(createElement('p', 'text-gray-600 text-lg leading-relaxed', fullDescription));
    
    mainContent.appendChild(summaryFrame);

    // Frame 3: Chapters Section
    const chaptersContainer = createElement('div', 'flex flex-col gap-4');
    chaptersContainer.appendChild(createElement('h2', 'text-xl font-bold text-gray-900 px-2', 'Chapters'));
    
    const chaptersList = createElement('div', 'bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm');
    createChapters(book).forEach(chapter => {
        chaptersList.appendChild(chapter);
    });
    
    chaptersContainer.appendChild(chaptersList);
    mainContent.appendChild(chaptersContainer);

    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}
