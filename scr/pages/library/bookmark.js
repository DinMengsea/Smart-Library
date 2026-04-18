
// =========================bookmark page========================

function BookmarkPage() {
    const container = createElement('div', {
        className: "library-page-container",
        'data-name': 'Bookmark Page'
    });

    // Main content area
    const mainContent = createElement('div', {
        className: "library-main-content trending-section"
    });

    // Header Section
    const headerSection = createElement('div', {
        className: "trending-header",
        'data-name': 'Section Header'
    },
        createElement('div', {},
            createElement('h2', {
                className: "trending-title"
            }, 'My Bookmarks'),
            createElement('p', {
                className: "trending-subtitle"
            }, 'Your saved books for quick access')
        ),
        createElement('button', {
            className: "btn-back-library",
            onclick: () => navigateTo('library')
        }, 'Back to Library')
    );

    mainContent.appendChild(headerSection);

    // List Section
    const markedBooks = allBooks.filter(book => book.isMarked);
    
    const listContainer = createElement('div', {
        className: "books-list-container",
        'data-name': 'Bookmarks List'
    });

    if (markedBooks.length === 0) {
        listContainer.appendChild(createElement('div', {
            className: "empty-state-container"
        }, 
            createElement('div', {
                className: "empty-state-icon"
            }, createImage(images.bookmark, '', 'w-full h-full object-contain')),
            createElement('p', {
                className: "empty-state-text"
            }, 'No bookmarked books yet.')
        ));
    } else {
        markedBooks.forEach(book => {
            // We can reuse BookDisplay
            // But we might want a slightly different toggle behavior for the bookmark page
            // to refresh this page when unmarking
            const bookCard = BookDisplay(book);
            
            // Override the toggle click to refresh this page specifically if we're on it
            const markButton = bookCard.querySelector('button:last-child');
            if (markButton) {
                markButton.onclick = (e) => {
                    e.stopPropagation();
                    toggleMarkBook(book.title);
                    // Refresh bookmark page if we are still on it
                    navigateTo('bookmark');
                };
            }
            
            listContainer.appendChild(bookCard);
        });
    }

    mainContent.appendChild(listContainer);
    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}
