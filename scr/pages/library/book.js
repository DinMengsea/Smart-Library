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
 * @param {boolean} isMarked - Whether the book is marked
 * @param {boolean} showViewCourse - Whether to show the 'View Course' button
 * @param {Function} onToggleMark - Callback when toggle is clicked
 * @returns {HTMLElement} The buttons container
 */
function BookActions(isMarked = false, showViewCourse = false, onToggleMark) {
    const buttonBaseClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-sm font-medium border border-blue-100";
    
    const container = createElement('div', {
        className: "flex flex-wrap gap-4 mt-2",
        'data-name': 'Book Actions'
    },
        // Start Reading Button
        createElement('button', {
            className: `${buttonBaseClass} bg-blue-50 text-blue-700 hover:bg-blue-100`,
            type: 'button'
        }, 'Start Reading')
    );

    // View Course Button (Only for Educational)
    if (showViewCourse) {
        container.appendChild(
            createElement('button', {
                className: `${buttonBaseClass} bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100`,
                type: 'button',
                onclick: () => {
                    // Navigate to course page or show course info
                    console.log('View Course clicked');
                }
            }, 
                createElement('div', {
                    className: 'size-4',
                    'data-name': 'Course Icon'
                }, createImage(images.course, '', 'object-contain size-full')),
                'View Course'
            )
        );
    }

    // Mark Book Button
    container.appendChild(
        createElement('button', {
            className: `${buttonBaseClass} ${isMarked ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-700 hover:bg-gray-50'}`,
            type: 'button',
            onclick: onToggleMark
        }, 
            createElement('div', {
                className: 'size-4',
                'data-name': 'Mark Icon'
            }, createImage(isMarked ? images.check : images.bookmark, '', 'object-contain size-full')),
            isMarked ? 'Book Marked' : 'Mark Book'
        )
    );

    return container;
}

/**
 * Creates a single book card display.
 * @param {object} book - The book object
 * @returns {HTMLElement} The book card element
 */
function BookDisplay(book) {
    const { title, author, description, image, rating, isMarked, category } = book;
    // Process description to handle "Read more ..."
    const shortDesc = description.replace('Read more ...', '');
    
    return createElement('div', {
        className: "bg-white flex flex-col sm:flex-row gap-6 p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-4xl",
        'data-name': 'Book Card'
    },
        // Book Cover Container
        createElement('div', {
            className: 'w-full sm:w-36 h-52 shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-md'
        }, createImage(image, title, 'h-full w-full object-cover')),

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
            BookActions(isMarked, category === 'Educational', () => {
                toggleMarkBook(title);
            })
        )
    );
}

const allBooks = [
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy. It explores love, class, and marriage in the early 19th century England. Read more ...',
        image: images.book1,
        rating: 5,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'Clarissa, or The History of a Young Lady',
        author: 'Samuel Richardson',
        description: 'A long epistolary novel told through letters. It describes the tragic life of Clarissa Harlowe and her struggle for virtue and independence. Read more ...',
        image: images.book2,
        rating: 4,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'The Adventures of Augie March',
        author: 'Saul Bellow',
        description: 'This novel follows Augie March, a young man growing up during the Great Depression, as he seeks his place in the world. Read more ...',
        image: images.book3,
        rating: 5,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'The Murder of Roger Ackroyd',
        author: 'Agatha Christie',
        description: 'A famous detective novel featuring Hercule Poirot. The story revolves around the mysterious murder of a wealthy industrialist. Read more ...',
        image: images.book4,
        rating: 4,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain',
        description: 'A classic novel about a mischievous boy named Tom Sawyer growing up along the Mississippi River.  The story follows his adventures with friends, including treasure hunts, Read more ... ',
        image: images.book5,
        rating: 5,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'Clarissa, or The History of a Young Lady',
        author: 'Samuel Richardson',
        description: 'A long epistolary novel told through letters. It describes the tragic life of Clarissa Harlowe.Read more ...',
        image: images.book6,
        rating: 5,
        category: 'Fiction',
        year: 'Earlier',
        language: 'English',
        isMarked: false
    },
    {
        title: 'This Story Might Save Your Life',
        author: 'Alexander Cooper',
        description: 'A personal memoir about overcoming hardship, mental health struggles, and finding purpose.Read more ...',
        image: images.book7,
        rating: 4,
        category: 'Biography',
        year: '2022',
        language: 'English',
        isMarked: false
    },
    {
        title: 'Inspire',
        author: 'Simon Sinek',
        description: 'A leadership book explaining how great leaders motivate people and create strong,. Read more ...',
        image: images.book8,
        rating: 5,
        category: 'Technology',
        year: '2023',
        language: 'English',
        isMarked: false
    },
    {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        description: 'A sci-fi adventure about an astronaut who wakes up alone in space and must save Earth. Read more ...',
        image: images.book9,
        rating: 5,
        category: 'Science',
        year: '2021',
        language: 'English',
        isMarked: false
    },
    {
        title: 'The Rabbit Hutch',
        author: 'Tess Gunty',
        description: 'A literary novel about young people living in a struggling apartment complex. Read more ...',
        image: images.book10,
        rating: 4,
        category: 'Fiction',
        year: '2022',
        language: 'English',
        isMarked: false
    },
    // Educational Books
    {
        title: 'Math Advance Grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'This book covers advanced mathematical concepts for high school students. Read more ...',
        image: images.booke1,
        rating: 5,
        category: 'Educational',
        education: 'Mathematics',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'khmer literature Grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'This book explores the rich tradition of Khmer literature for high school students. Read more ...',
        image: images.booke2,
        rating: 5,
        category: 'Educational',
        education: 'Khmer Literature',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'Math grade 9 corrections',
        author: 'Author ministry of education sport and youth',
        description: 'This book provides corrections and additional practice problems for high school mathematics students. Read more ...',
        image: images.booke3,
        rating: 4,
        category: 'Educational',
        education: 'Mathematics',
        language: 'Khmer',
        grade: 'Grade 9',
        isMarked: false
    },
    {
        title: 'Math grade 6',
        author: 'Author ministry of education sport and youth',
        description: 'This book introduces fundamental mathematical concepts for middle school students. Read more ...',
        image: images.booke4,
        rating: 5,
        category: 'Educational',
        education: 'Mathematics',
        language: 'Khmer',
        grade: 'Grade 6',
        isMarked: false
    },
    {
        title: 'physics grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'This book provides a comprehensive introduction to physics for high school students. Read more ...',
        image: images.booke5,
        rating: 4,
        category: 'Educational',
        education: 'Physics',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'Social Studies grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'An exploration of societal structures and historical contexts. Read more ...',
        image: images.booke6,
        rating: 5,
        category: 'Educational',
        education: 'Social Studies',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'economics grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'An introduction to economic principles and their applications. Read more ...',
        image: images.booke7,
        rating: 5,
        category: 'Educational',
        education: 'economics',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'Geography grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'This book provides a comprehensive introduction to geography for high school students. Read more ...',
        image: images.booke8,
        rating: 5,
        category: 'Educational',
        education: 'Geography',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'History grade 11',
        author: 'Author ministry of education sport and youth',
        description: 'This book provides a comprehensive introduction to history for high school students. Read more ...',
        image: images.booke9,
        rating: 4,
        category: 'Educational',
        education: 'History',
        language: 'Khmer',
        grade: 'Grade 11',
        isMarked: false
    },
    {
        title: 'Khmer Literature grade 4',
        author: 'Author ministry of education sport and youth',
        description: 'This book introduces students to the rich tradition of Khmer literature. Read more ...',
        image: images.booke10,
        rating: 4,
        category: 'Educational',
        education: 'Khmer Literature',
        language: 'Khmer',
        grade: 'Grade 4',
        isMarked: false
    }
];

let libraryState = {
    search: '',
    category: 'Category',
    year: 'Year',
    language: 'Language',
    education: 'Education',
    grade: 'Grade',
    page: 1
};

function toggleMarkBook(bookTitle) {
    const book = allBooks.find(b => b.title === bookTitle);
    if (book) {
        book.isMarked = !book.isMarked;
        // Re-render trending section to show changes
        updateLibrary({});
    }
}

function updateLibrary(newState) {
    const oldCategory = libraryState.category;
    libraryState = { ...libraryState, ...newState };
    
    // If search or filter changes, reset to page 1
    if (newState.search !== undefined || newState.category !== undefined || 
        newState.year !== undefined || newState.language !== undefined ||
        newState.education !== undefined || newState.grade !== undefined) {
        libraryState.page = 1;
    }
    
    // Update filters if category changed
    if (newState.category !== undefined && newState.category !== oldCategory) {
        const filtersSection = document.getElementById('search-and-filters');
        if (filtersSection) {
            const newFiltersSection = SearchAndFilters();
            filtersSection.replaceWith(newFiltersSection);
        }
    }

    const trendingSection = document.getElementById('trending-books');
    if (trendingSection) {
        // Surgically replace only the trending section to keep the search bar focused
        const newTrendingSection = TrendingBooksSection();
        trendingSection.replaceWith(newTrendingSection);
    } else {
        const root = document.getElementById('root');
        if (root) {
            root.innerHTML = '';
            root.appendChild(LibraryPage1());
        }
    }
}

/**
 * Renders the list of books.
 * @returns {HTMLElement} The books list container
 */
function ListDisplayBook() {
    const filteredBooks = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(libraryState.search.toLowerCase()) || 
                             book.author.toLowerCase().includes(libraryState.search.toLowerCase());
        const matchesCategory = libraryState.category === 'Category' || book.category === libraryState.category;
        
        // Conditional filters based on category
        let matchesSecondaryFilters = true;
        if (libraryState.category === 'Educational') {
            const matchesEducation = libraryState.education === 'Education' || book.education === libraryState.education;
            const matchesGrade = libraryState.grade === 'Grade' || book.grade === libraryState.grade;
            matchesSecondaryFilters = matchesEducation && matchesGrade;
        } else {
            const matchesYear = libraryState.year === 'Year' || book.year === libraryState.year;
            const matchesLanguage = libraryState.language === 'Language' || book.language === libraryState.language;
            matchesSecondaryFilters = matchesYear && matchesLanguage;
        }
        
        return matchesSearch && matchesCategory && matchesSecondaryFilters;
    });

    const itemsPerPage = 5;
    const startIndex = (libraryState.page - 1) * itemsPerPage;
    const booksToShow = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    const container = createElement('div', {
        className: "flex flex-col gap-10 items-center w-full py-4",
        'data-name': 'Books List'
    });

    if (booksToShow.length === 0) {
        container.appendChild(createElement('div', {
            className: "text-gray-500 py-20 text-xl font-medium"
        }, 'No books found matching your criteria.'));
        return container;
    }

    booksToShow.forEach(book => {
        container.appendChild(BookDisplay(book));
    });

    return container;
}

/**
 * Main section for Trending Books.
 */
function TrendingBooksSection() {
    // Get total pages for the current filter
    const filteredBooksCount = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(libraryState.search.toLowerCase()) || 
                             book.author.toLowerCase().includes(libraryState.search.toLowerCase());
        const matchesCategory = libraryState.category === 'Category' || book.category === libraryState.category;
        
        let matchesSecondaryFilters = true;
        if (libraryState.category === 'Educational') {
            const matchesEducation = libraryState.education === 'Education' || book.education === libraryState.education;
            const matchesGrade = libraryState.grade === 'Grade' || book.grade === libraryState.grade;
            matchesSecondaryFilters = matchesEducation && matchesGrade;
        } else {
            const matchesYear = libraryState.year === 'Year' || book.year === libraryState.year;
            const matchesLanguage = libraryState.language === 'Language' || book.language === libraryState.language;
            matchesSecondaryFilters = matchesYear && matchesLanguage;
        }
        
        return matchesSearch && matchesCategory && matchesSecondaryFilters;
    }).length;
    
    const totalPages = Math.ceil(filteredBooksCount / 5) || 1;

    const section = createElement('section', {
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
                }, (libraryState.search || libraryState.category !== 'Category' || libraryState.year !== 'Year' || libraryState.language !== 'Language' || libraryState.education !== 'Education' || libraryState.grade !== 'Grade') ? 'Search Results' : 'Trending Books'),
                createElement('p', {
                    className: "text-gray-500 text-sm mt-1"
                }, 'The most popular titles in our library right now')
            )
        ),

        // List Section
        ListDisplayBook()
    );

    // Add pagination if there are multiple pages or if we want to show it always
    section.appendChild(Pagination(libraryState.page, totalPages));

    return section;
}
