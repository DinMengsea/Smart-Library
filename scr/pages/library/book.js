/**
 * Creates a star rating component.
 * @param {number} rating - Number of stars to display (default: 5)
 * @returns {HTMLElement} The star rating container
 */
function createStarRating(rating = 5) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const isFilled = i < rating;
        stars.push(
            createElement('div', {
                className: `relative shrink-0 size-5 ${isFilled ? 'opacity-100' : 'opacity-30'}`,
                'data-name': 'Star'
            }, createImage(images.star, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full'))
        );
    }
    return createElement('div', {
        className: "flex gap-1 items-center",
        'data-name': 'Star Rating'
    }, ...stars);
}

/**
 * Creates the action buttons for a book.
 * @returns {HTMLElement} The buttons container
 */
function BookActions() {
    const buttonBaseClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-sm font-medium border border-blue-100";
    
    return createElement('div', {
        className: "flex flex-wrap gap-4 mt-2",
        'data-name': 'Book Actions'
    },
        // Start Reading Button
        createElement('button', {
            className: `${buttonBaseClass} bg-blue-50 text-blue-700 hover:bg-blue-100`,
            type: 'button'
        }, 'Start Reading'),

        // Mark Book Button
        createElement('button', {
            className: `${buttonBaseClass} bg-white text-gray-700 hover:bg-gray-50`,
            type: 'button'
        }, 
            createElement('div', {
                className: 'size-4',
                'data-name': 'Bookmark Icon'
            }, createImage(images.bookmark, '', 'object-contain size-full')),
            'Mark Book'
        )
    );
}

/**
 * Creates a single book card display.
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @param {string} description - Book description
 * @param {string} bookImage - URL of the book cover
 * @param {number} rating - Star rating (1-5)
 * @returns {HTMLElement} The book card element
 */
function BookDisplay(title, author, description, bookImage, rating = 5) {
    // Process description to handle "Read more ..."
    const shortDesc = description.replace('Read more ...', '');
    
    return createElement('div', {
        className: "bg-white flex flex-col sm:flex-row gap-6 p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-4xl",
        'data-name': 'Book Card'
    },
        // Book Cover Container
        createElement('div', {
            className: 'w-full sm:w-36 h-52 shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-md'
        }, createImage(bookImage, title, 'h-full w-full object-cover')),

        // Book Details Container
        createElement('div', {
            className: "flex flex-col flex-grow w-full",
            'data-name': 'Book Details'
        },
            // Header: Title, Author, Rating
            createElement('div', {
                className: "flex flex-col md:flex-row justify-between items-start gap-4 mb-3"
            },
                createElement('div', {
                    className: "flex flex-col gap-1"
                },
                    createElement('h3', {
                        className: "font-bold text-xl text-gray-900 leading-tight"
                    }, title),
                    createElement('p', {
                        className: "font-medium text-sm text-blue-600"
                    }, author)
                ),
                createElement('div', {
                    className: "flex flex-col items-start md:items-end gap-1"
                },
                    createStarRating(rating),
                    createElement('span', {
                        className: "text-[10px] font-bold uppercase tracking-wider text-gray-400"
                    }, 'Member Review')
                )
            ),

            // Description
            createElement('div', {
                className: "mb-4"
            },
                createElement('p', {
                    className: "text-sm text-gray-600 leading-relaxed line-clamp-3"
                }, shortDesc),
                createElement('button', {
                    className: "text-blue-500 hover:text-blue-700 text-xs font-semibold mt-1 transition-colors underline-offset-4 hover:underline",
                    type: 'button'
                }, 'Read more...')
            ),

            // Action Buttons
            BookActions()
        )
    );
}

/**
 * Renders the list of books.
 * @returns {HTMLElement} The books list container
 */
function ListDisplayBook() {
    const books = [
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy. It explores love, class, and marriage in the early 19th century England. Read more ...',
            image: images.book1,
            rating: 5
        },
        {
            title: 'Clarissa, or The History of a Young Lady',
            author: 'Samuel Richardson',
            description: 'A long epistolary novel told through letters. It describes the tragic life of Clarissa Harlowe and her struggle for virtue and independence. Read more ...',
            image: images.book2,
            rating: 4
        },
        {
            title: 'The Adventures of Augie March',
            author: 'Saul Bellow',
            description: 'This novel follows Augie March, a young man growing up during the Great Depression, as he seeks his place in the world. Read more ...',
            image: images.book3,
            rating: 5
        },
        {
            title: 'The Murder of Roger Ackroyd',
            author: 'Agatha Christie',
            description: 'A famous detective novel featuring Hercule Poirot. The story revolves around the mysterious murder of a wealthy industrialist. Read more ...',
            image: images.book4,
            rating: 4
        }
    ];

    return createElement('div', {
        className: "flex flex-col gap-10 items-center w-full py-4",
        'data-name': 'Books List'
    }, ...books.map(book => BookDisplay(book.title, book.author, book.description, book.image, book.rating)));
}

/**
 * Main section for Trending Books.
 * @returns {HTMLElement} The section container
 */
function TrendingBooksSection() {
    return createElement('section', {
        className: "mx-auto w-full max-w-6xl flex flex-col gap-8 items-center px-6 py-12",
        'id': 'trending-books'
    },
        // Header Section
        createElement('div', {
            className: "w-full max-w-4xl flex justify-between items-end border-b border-gray-100 pb-4",
            'data-name': 'Section Header'
        },
            createElement('div', {},
                createElement('h2', {
                    className: "font-extrabold text-3xl text-gray-900 tracking-tight"
                }, 'Trending Books'),
                createElement('p', {
                    className: "text-gray-500 text-sm mt-1"
                }, 'The most popular titles in our library right now')
            ),
            createElement('button', {
                className: "text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors",
                type: 'button'
            }, 'View All →')
        ),

        // List Section
        ListDisplayBook()
    );
}
