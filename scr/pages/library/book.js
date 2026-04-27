
function BookActions(isMarked = false, showViewCourse = false, onToggleMark, book) {
    const buttonBaseClass = "book-action-btn";
    
    const container = createElement('div', {
        className: "book-actions-container",
        'data-name': 'Book Actions'
    },
        // Start Reading Button
        createElement('button', {
            className: `${buttonBaseClass} btn-start-reading`,
            type: 'button',
            onclick: (e) => {
                e.stopPropagation();
                navigateTo('detail', { book: allBooks.find(b => b.title === (typeof book === 'string' ? book : book.title)) || book });
            }
        }, 'Start Reading')
    );

    // View Course Button (Only for Educational)
    if (showViewCourse) {
        container.appendChild(
            createElement('button', {
                className: `${buttonBaseClass} btn-view-course`,
                type: 'button',
                onclick: () => {
                    console.log('View Course clicked');
                }
            }, 
                createElement('div', {
                    className: 'book-action-icon-wrapper',
                    'data-name': 'Course Icon'
                }, createImage(images.course, '', 'book-action-icon')),
                'View Course'
            )
        );
    }

    // Mark Book Button
    container.appendChild(
        createElement('button', {
            className: `${buttonBaseClass} ${isMarked ? 'btn-marked' : 'btn-mark'}`,
            type: 'button',
            onclick: onToggleMark
        }, 
            createElement('div', {
                className: 'book-action-icon-wrapper',
                'data-name': 'Mark Icon'
            }, createImage(isMarked ? images.check : images.bookmark, '', 'book-action-icon')),
            isMarked ? (window.innerWidth < 640 ? 'Marked' : 'Book Marked') : (window.innerWidth < 640 ? 'Mark' : 'Mark Book')
        )
    );

    return container;
}


function BookDisplay(book) {
    const { title, author, description, image, rating, isMarked, category } = book;
    const shortDesc = description.replace('Read more ...', '');
    
    return createElement('div', {
        className: "book-card",
        'data-name': 'Book Card',
        onclick: () => navigateTo('detail', { book })
    },
        // Book Cover Container
        createElement('div', {
            className: 'book-cover-container'
        }, createImage(image, title, 'book-cover-img')),

        // Book Details Container
        createElement('div', {
            className: "book-details-container",
            'data-name': 'Book Details'
        },
            // Header: Title, Author, Rating
            createElement('div', {
                className: "book-header"
            },
                createElement('div', {
                    className: "book-title-group"
                },
                    createElement('h3', {
                        className: "book-title"
                    }, title),
                    createElement('p', {
                        className: "book-author"
                    }, author)
                ),
                createElement('div', {
                    className: "book-rating-group"
                },
                    createStarRating(rating),
                    createElement('span', {
                        className: "book-review-label"
                    }, 'Member Review')
                )
            ),

            // Description
            createElement('div', {
                className: "book-description-container"
            },
                createElement('p', {
                    className: "book-description-text"
                }, shortDesc),
                createElement('button', {
                    className: "book-read-more",
                    type: 'button',
                    onclick: (e) => {
                        e.stopPropagation();
                        navigateTo('detail', { book });
                    }
                }, 'Read more...')
            ),

            // Action Buttons
            createElement('div', {
                onclick: (e) => e.stopPropagation()
            }, 
                BookActions(isMarked, category === 'Educational', () => {
                    toggleMarkBook(title);
                }, book)
            )
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
    showMarkedOnly: false,
    page: 1
};

// Initialize isMarked from localStorage
const markedBooks = JSON.parse(localStorage.getItem('markedBooks') || '[]');
allBooks.forEach(book => {
    if (markedBooks.includes(book.title)) {
        book.isMarked = true;
    }
});

function toggleMarkBook(bookTitle, options = {}) {
    const { refresh = true } = options;

    const book = allBooks.find(b => b.title === bookTitle);
    if (book) {
        book.isMarked = !book.isMarked;

        const currentMarked = JSON.parse(localStorage.getItem('markedBooks') || '[]');

        if (book.isMarked) {
            if (!currentMarked.includes(bookTitle)) {
                currentMarked.push(bookTitle);
            }
        } else {
            const index = currentMarked.indexOf(bookTitle);
            if (index > -1) {
                currentMarked.splice(index, 1);
            }
        }

        localStorage.setItem('markedBooks', JSON.stringify(currentMarked));

        if (refresh) {
            updateLibrary({});
        }

        return book.isMarked;
    }

    return false;
}

function updateLibrary(newState) {
    const oldCategory = libraryState.category;
    libraryState = { ...libraryState, ...newState };
    
    // If search or filter changes, reset to page 1
    if (newState.search !== undefined || newState.category !== undefined || 
        newState.year !== undefined || newState.language !== undefined ||
        newState.education !== undefined || newState.grade !== undefined ||
        newState.showMarkedOnly !== undefined) {
        libraryState.page = 1;
    }
    
    // Update filters if anything OTHER than search changed

    const filtersSection = document.getElementById('search-and-filters');
    const isOnlySearch = newState.search !== undefined && Object.keys(newState).length === 1;
    
    if (filtersSection && !isOnlySearch) {
        const newFiltersSection = SearchAndFilters();
        filtersSection.replaceWith(newFiltersSection);
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


function ListDisplayBook() {
    const filteredBooks = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(libraryState.search.toLowerCase()) || 
                             book.author.toLowerCase().includes(libraryState.search.toLowerCase());
        const matchesCategory = libraryState.category === 'Category' || book.category === libraryState.category;
        
        // Bookmark filter
        const matchesMarked = !libraryState.showMarkedOnly || book.isMarked;
        
        // Conditional filters based on category
        let matchesSecondaryFilters = true;
        if (libraryState.category === 'Educational') {
            const matchesEducation = libraryState.education === 'Education' || 
                                   (book.education && book.education.toLowerCase() === libraryState.education.toLowerCase());
            const matchesGrade = libraryState.grade === 'Grade' || 
                               (book.grade && book.grade.toLowerCase() === libraryState.grade.toLowerCase());
            matchesSecondaryFilters = matchesEducation && matchesGrade;
        } else {
            const matchesYear = libraryState.year === 'Year' || book.year === libraryState.year;
            const matchesLanguage = libraryState.language === 'Language' || book.language === libraryState.language;
            matchesSecondaryFilters = matchesYear && matchesLanguage;
        }
        
        return matchesSearch && matchesCategory && matchesSecondaryFilters && matchesMarked;
    });

    const itemsPerPage = 5;
    const startIndex = (libraryState.page - 1) * itemsPerPage;
    const booksToShow = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    const container = createElement('div', {
        className: "books-list-container",
        'data-name': 'Books List'
    });

    if (booksToShow.length === 0) {
        container.appendChild(createElement('div', {
            className: "books-empty-state"
        }, libraryState.showMarkedOnly ? 'You haven\'t bookmarked any books yet.' : 'No books found matching your criteria.'));
        return container;
    }

    booksToShow.forEach(book => {
        container.appendChild(BookDisplay(book));
    });

    return container;
}


function TrendingBooksSection() {
    // Get total pages for the current filter
    const filteredBooksCount = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(libraryState.search.toLowerCase()) || 
                             book.author.toLowerCase().includes(libraryState.search.toLowerCase());
        const matchesCategory = libraryState.category === 'Category' || book.category === libraryState.category;
        const matchesMarked = !libraryState.showMarkedOnly || book.isMarked;
        
        let matchesSecondaryFilters = true;
        if (libraryState.category === 'Educational') {
            const matchesEducation = libraryState.education === 'Education' || 
                                   (book.education && book.education.toLowerCase() === libraryState.education.toLowerCase());
            const matchesGrade = libraryState.grade === 'Grade' || 
                               (book.grade && book.grade.toLowerCase() === libraryState.grade.toLowerCase());
            matchesSecondaryFilters = matchesEducation && matchesGrade;
        } else {
            const matchesYear = libraryState.year === 'Year' || book.year === libraryState.year;
            const matchesLanguage = libraryState.language === 'Language' || book.language === libraryState.language;
            matchesSecondaryFilters = matchesYear && matchesLanguage;
        }
        
        return matchesSearch && matchesCategory && matchesSecondaryFilters && matchesMarked;
    }).length;
    
    const totalPages = Math.ceil(filteredBooksCount / 5) || 1;

    const section = createElement('section', {
        className: "trending-section",
        'id': 'trending-books'
    },
        // Header Section
        createElement('div', {
            className: "trending-header",
            'data-name': 'Section Header'
        },
            createElement('div', {},
                createElement('h2', {
                    className: "trending-title"
                }, libraryState.showMarkedOnly ? 'My Bookmarks' : (libraryState.search || libraryState.category !== 'Category' || libraryState.year !== 'Year' || libraryState.language !== 'Language' || libraryState.education !== 'Education' || libraryState.grade !== 'Grade' ? 'Search Results' : 'Trending Books')),
                createElement('p', {
                    className: "trending-subtitle"
                }, libraryState.showMarkedOnly ? 'Your saved books for quick access' : 'The most popular titles in our library right now')
            )
        ),

        // List Section
        ListDisplayBook()
    );

    // Add pagination if there are multiple pages or if we want to show it always
    section.appendChild(Pagination(libraryState.page, totalPages));

    return section;
}

