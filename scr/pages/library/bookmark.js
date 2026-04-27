/**
 * Renders the Bookmark page which displays all books marked by the user.
 * @returns {HTMLElement} The bookmark page container
 */
function BookmarkPage() {
    const container = createElement('div', {
        className: "min-h-screen flex flex-col bg-[#f0effb]",
        'data-name': 'Bookmark Page'
    });

    // Main content area
    const mainContent = createElement('div', {
        className: "flex-grow mx-auto w-full max-w-6xl flex flex-col gap-8 items-center px-6 py-12"
    });

    // Header Section
    const headerSection = createElement('div', {
        className: "w-full max-w-4xl flex justify-between items-center border-b border-gray-100 pb-4",
        'data-name': 'Section Header'
    },
        createElement('div', {},
            createElement('h2', {
                className: "font-extrabold text-3xl text-gray-900 tracking-tight"
            }, 'My Bookmarks'),
            createElement('p', {
                className: "text-gray-500 text-sm mt-1"
            }, 'Your saved books for quick access')
        ),
        createElement('button', {
            className: "flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all font-medium text-sm border border-blue-100",
            onclick: () => navigateTo('library')
        }, 'Back to Library')
    );

    mainContent.appendChild(headerSection);

    // List Section
    const markedBooks = allBooks.filter(book => book.isMarked);
    
    const listContainer = createElement('div', {
        className: "flex flex-col gap-10 items-center w-full py-4",
        'data-name': 'Bookmarks List'
    });

    if (markedBooks.length === 0) {
        listContainer.appendChild(createElement('div', {
            className: "flex flex-col items-center justify-center py-20 gap-4"
        }, 
            createElement('div', {
                className: "size-20 opacity-20"
            }, createImage(images.bookmark, '', 'w-full h-full object-contain')),
            createElement('p', {
                className: "text-gray-500 text-xl font-medium"
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
