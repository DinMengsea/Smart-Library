// for reuse funtion
export function createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);
    if (typeof attributes === 'string') {
        element.className = attributes;
        attributes = {};
    }
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    }
    children.forEach(child => {
        if (child == null || child === false) return;
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    return element;
}

export function createImage(src, alt = '', className = '') {
    return createElement('img', { src, alt, className });
}

export const images = {
    facebook: '/scr/assets/logo/facebook.png',
    x: '/scr/assets/logo/x.png',
    instagram: '/scr/assets/logo/instagram.png',
    copyright: '/scr/assets/icons/copyright.png',
    logo: '/scr/assets/logo/ourlogo.png',
    book1: '/scr/assets/book/book1.png',
    book2: '/scr/assets/book/book2.png',
    book3: '/scr/assets/book/book3.png',
    book4: '/scr/assets/book/book4.png',
    book5: '/scr/assets/book/book5.png',
    book6: '/scr/assets/book/book6.png',
    book7: '/scr/assets/book/book7.png',
    book8: '/scr/assets/book/book8.png',
    book9: '/scr/assets/book/book9.png',
    book10: '/scr/assets/book/book10.png',
    booke1: '/scr/assets/book/booke1.png',
    booke2: '/scr/assets/book/booke2.png',
    booke3: '/scr/assets/book/booke3.png',
    booke4: '/scr/assets/book/booke4.png',
    booke5: '/scr/assets/book/booke5.png',
    booke6: '/scr/assets/book/booke6.png',
    booke7: '/scr/assets/book/booke7.png',
    booke8: '/scr/assets/book/booke8.png',
    booke9: '/scr/assets/book/booke9.png',
    booke10: '/scr/assets/book/booke10.png',
    star: '/scr/assets/icons/star.png',
    bookmark: '/scr/assets/icons/bookmark.png',
    search: '/scr/assets/icons/search.png',
    chevronDown: '/scr/assets/icons/dropdown.png',
    check: '/scr/assets/icons/check.png',
    course: '/scr/assets/icons/course.png',
    back: '/scr/assets/icons/back.png',
    previous: '/scr/assets/icons/previous.png',
    next: '/scr/assets/icons/next.png'
};

// --- DATA ---
export const allBooks = [
    { title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy. Read more ...', image: images.book1, rating: 5, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'Clarissa, or The History of a Young Lady', author: 'Samuel Richardson', description: 'A long epistolary novel told through letters. Read more ...', image: images.book2, rating: 4, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'The Adventures of Augie March', author: 'Saul Bellow', description: 'This novel follows Augie March during the Great Depression. Read more ...', image: images.book3, rating: 5, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie', description: 'A famous detective novel featuring Hercule Poirot. Read more ...', image: images.book4, rating: 4, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', description: 'A classic novel about a mischievous boy named Tom Sawyer. Read more ...', image: images.book5, rating: 5, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'Clarissa, or The History of a Young Lady', author: 'Samuel Richardson', description: 'A long epistolary novel told through letters. Read more ...', image: images.book6, rating: 5, category: 'Fiction', year: 'Earlier', language: 'English', isMarked: false },
    { title: 'This Story Might Save Your Life', author: 'Alexander Cooper', description: 'A personal memoir about overcoming hardship. Read more ...', image: images.book7, rating: 4, category: 'Biography', year: '2022', language: 'English', isMarked: false },
    { title: 'Inspire', author: 'Simon Sinek', description: 'A leadership book explaining how great leaders motivate people. Read more ...', image: images.book8, rating: 5, category: 'Technology', year: '2023', language: 'English', isMarked: false },
    { title: 'Project Hail Mary', author: 'Andy Weir', description: 'A sci-fi adventure about an astronaut who wakes up alone in space. Read more ...', image: images.book9, rating: 5, category: 'Science', year: '2021', language: 'English', isMarked: false },
    { title: 'The Rabbit Hutch', author: 'Tess Gunty', description: 'A literary novel about young people in an apartment complex. Read more ...', image: images.book10, rating: 4, category: 'Fiction', year: '2022', language: 'English', isMarked: false },
    { title: 'Math Advance Grade 11', author: 'MoEYS', description: 'Advanced mathematical concepts for high school students. Read more ...', image: images.booke1, rating: 5, category: 'Educational', education: 'Mathematics', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'khmer literature Grade 11', author: 'MoEYS', description: 'Explores the rich tradition of Khmer literature. Read more ...', image: images.booke2, rating: 5, category: 'Educational', education: 'Khmer Literature', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'Math grade 9 corrections', author: 'MoEYS', description: 'Corrections and practice problems for math. Read more ...', image: images.booke3, rating: 4, category: 'Educational', education: 'Mathematics', language: 'Khmer', grade: 'Grade 9', isMarked: false },
    { title: 'Math grade 6', author: 'MoEYS', description: 'Fundamental mathematical concepts for middle school. Read more ...', image: images.booke4, rating: 5, category: 'Educational', education: 'Mathematics', language: 'Khmer', grade: 'Grade 6', isMarked: false },
    { title: 'physics grade 11', author: 'MoEYS', description: 'Comprehensive introduction to physics. Read more ...', image: images.booke5, rating: 4, category: 'Educational', education: 'Physics', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'Social Studies grade 11', author: 'MoEYS', description: 'Exploration of societal structures. Read more ...', image: images.booke6, rating: 5, category: 'Educational', education: 'Social Studies', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'economics grade 11', author: 'MoEYS', description: 'Introduction to economic principles. Read more ...', image: images.booke7, rating: 5, category: 'Educational', education: 'economics', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'Geography grade 11', author: 'MoEYS', description: 'Comprehensive introduction to geography. Read more ...', image: images.booke8, rating: 5, category: 'Educational', education: 'Geography', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'History grade 11', author: 'MoEYS', description: 'Comprehensive introduction to history. Read more ...', image: images.booke9, rating: 4, category: 'Educational', education: 'History', language: 'Khmer', grade: 'Grade 11', isMarked: false },
    { title: 'Khmer Literature grade 4', author: 'MoEYS', description: 'Introduction to Khmer literature tradition. Read more ...', image: images.booke10, rating: 4, category: 'Educational', education: 'Khmer Literature', language: 'Khmer', grade: 'Grade 4', isMarked: false }
];

// --- STATE ---
let libraryState = {
    search: '',
    category: 'Category',
    year: 'Year',
    language: 'Language',
    education: 'Education',
    grade: 'Grade',
    showMarkedOnly: false,
    page: 1,
    containerId: null
};

// Initialize markers
const markedBooks = JSON.parse(localStorage.getItem('markedBooks') || '[]');
allBooks.forEach(book => {
    if (markedBooks.includes(book.title)) book.isMarked = true;
});

// --- CORE FUNCTIONS ---
export function updateLibrary(newState) {
    libraryState = { ...libraryState, ...newState };
    
    if (newState.search !== undefined || newState.category !== undefined || 
        newState.year !== undefined || newState.language !== undefined ||
        newState.education !== undefined || newState.grade !== undefined ||
        newState.showMarkedOnly !== undefined) {
        libraryState.page = 1;
    }

    const container = document.getElementById(libraryState.containerId);
    if (container) {
        container.innerHTML = '';
        container.appendChild(LibraryPage1());
    }
}

export function toggleMarkBook(bookTitle) {
    const book = allBooks.find(b => b.title === bookTitle);
    if (book) {
        book.isMarked = !book.isMarked;
        const currentMarked = JSON.parse(localStorage.getItem('markedBooks') || '[]');
        if (book.isMarked) {
            if (!currentMarked.includes(bookTitle)) currentMarked.push(bookTitle);
        } else {
            const index = currentMarked.indexOf(bookTitle);
            if (index > -1) currentMarked.splice(index, 1);
        }
        localStorage.setItem('markedBooks', JSON.stringify(currentMarked));
        updateLibrary({});
    }
}

// --- UI COMPONENTS ---
export function createStarRating(rating = 5) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const isFilled = i < rating;
        stars.push(createElement('div', {
            className: `star-icon-wrapper ${isFilled ? 'star-icon-filled' : 'star-icon-empty'}`
        }, createImage(images.star, '', 'star-icon')));
    }
    return createElement('div', { className: "star-rating-container" }, ...stars);
}

export function BookActions(isMarked = false, showViewCourse = false, onToggleMark, book) {
    const container = createElement('div', { className: "book-actions-container" },
        createElement('button', {
            className: "book-action-btn btn-start-reading",
            type: 'button',
            onclick: (e) => {
                e.stopPropagation();
                if (typeof navigateTo === 'function') {
                    navigateTo('detail', { book });
                } else {
                    console.log('Start Reading', book.title);
                }
            }
        }, 'Start Reading')
    );

    if (showViewCourse) {
        container.appendChild(createElement('button', {
            className: "book-action-btn btn-view-course",
            type: 'button'
        }, 
            createElement('div', { className: 'book-action-icon-wrapper' }, 
                createImage(images.course, '', 'book-action-icon')
            ), 
            'View Course'
        ));
    }

    container.appendChild(createElement('button', {
        className: `book-action-btn ${isMarked ? 'btn-marked' : 'btn-mark'}`,
        type: 'button',
        onclick: (e) => {
            e.stopPropagation();
            onToggleMark();
        }
    }, 
        createElement('div', { className: 'book-action-icon-wrapper' }, 
            createImage(isMarked ? images.check : images.bookmark, '', 'book-action-icon')
        ),
        isMarked ? 'Marked' : 'Mark Book'
    ));

    return container;
}

export function BookDisplay(book) {
    const { title, author, description, image, rating, isMarked, category } = book;
    const shortDesc = description.replace('Read more ...', '');
    
    return createElement('div', { 
        className: "book-card",
        onclick: () => {
            if (typeof navigateTo === 'function') {
                navigateTo('detail', { book });
            } else {
                console.log('Navigation to detail:', book.title);
            }
        }
    },
        createElement('div', { className: 'book-cover-container' }, createImage(image, title, 'book-cover-img')),
        createElement('div', { className: "book-details-container" },
            createElement('div', { className: "book-header" },
                createElement('div', { className: "book-title-group" },
                    createElement('h3', { className: "book-title" }, title),
                    createElement('p', { className: "book-author" }, author)
                ),
                createElement('div', { className: "book-rating-group" },
                    createStarRating(rating),
                    createElement('span', { className: "book-review-label" }, 'Member Review')
                )
            ),
            createElement('div', { className: "book-description-container" },
                createElement('p', { className: "book-description-text" }, shortDesc),
                createElement('button', { 
                    className: "book-read-more",
                    onclick: (e) => {
                        e.stopPropagation();
                        if (typeof navigateTo === 'function') {
                            navigateTo('detail', { book });
                        }
                    }
                }, 'Read more...')
            ),
            createElement('div', {
                onclick: (e) => e.stopPropagation()
            }, BookActions(isMarked, category === 'Educational', () => toggleMarkBook(title), book))
        )
    );
}

export function Dropdown(label, options = [], currentStateKey) {
    let isOpen = false;
    const currentVal = libraryState[currentStateKey] !== label ? libraryState[currentStateKey] : label;
    const labelText = createElement('p', { className: "dropdown-label" }, currentVal);
    const optionsList = createElement('div', { className: "dropdown-options hidden" });
    [label, ...options].forEach(opt => {
        optionsList.appendChild(createElement('div', {
            className: "dropdown-option",
            onclick: (e) => {
                e.stopPropagation();
                const update = {}; update[currentStateKey] = opt;
                updateLibrary(update);
            }
        }, opt));
    });

    const toggleDropdown = () => {
        isOpen = !isOpen;
        if (isOpen) { optionsList.classList.remove('hidden'); optionsList.classList.add('show'); }
        else { optionsList.classList.remove('show'); optionsList.classList.add('hidden'); }
    };

    const dropdownBar = createElement('div', { className: "dropdown-bar", onclick: toggleDropdown },
        labelText,
        createElement('div', { className: 'dropdown-chevron' }, createImage(images.chevronDown, '', 'dropdown-chevron-image')),
        optionsList
    );
    return createElement('div', { className: "dropdown-container" }, dropdownBar);
}

export function SearchAndFilters() {
    const categories = ['Fiction', 'Science', 'History', 'Biography', 'Technology', 'Art', 'Educational'];
    const filterGrid = createElement('div', { className: "filter-grid" });
    filterGrid.appendChild(Dropdown('Category', categories, 'category'));

    if (libraryState.category === 'Educational') {
        filterGrid.appendChild(Dropdown('Education', ['Mathematics', 'Physics', 'Khmer Literature'], 'education'));
        filterGrid.appendChild(Dropdown('Grade', ['Grade 11', 'Grade 9', 'Grade 6'], 'grade'));
    } else {
        filterGrid.appendChild(Dropdown('Year', ['2024', '2023', '2022', 'Earlier'], 'year'));
        filterGrid.appendChild(Dropdown('Language', ['English', 'Khmer', 'French'], 'language'));
    }

    const bookmarkBtn = createElement('div', {
        className: `filter-btn ${libraryState.showMarkedOnly ? 'filter-btn-active' : 'filter-btn-inactive'}`,
        onclick: () => updateLibrary({ showMarkedOnly: !libraryState.showMarkedOnly })
    }, createElement('p', { className: "filter-btn-text" }, 'My Bookmarks'));

    filterGrid.appendChild(createElement('div', { className: "bookmark-wrapper" }, bookmarkBtn));

    return createElement('div', { className: "filter-section", id: 'search-and-filters' },
        createElement('div', { className: "search-bar-container" },
            createElement('div', { className: 'search-bar-content' },
                createImage(images.search, '', 'search-icon-image'),
                createElement('input', {
                    type: 'text', placeholder: 'Search for books...', className: "search-input",
                    value: libraryState.search,
                    oninput: (e) => updateLibrary({ search: e.target.value })
                })
            )
        ),
        filterGrid
    );
}

export function Pagination(currentPage = 1, totalPages = 1) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(createElement('div', {
            className: `pagination-item ${currentPage === i ? 'pagination-item-active' : 'pagination-item-inactive'}`,
            onclick: () => updateLibrary({ page: i })
        }, createElement('span', {}, String(i))));
    }
    return createElement('nav', { className: 'pagination-nav' },
        createElement('div', { className: "pagination-container" },
            createElement('div', { className: "pagination-arrow", onclick: () => currentPage > 1 && updateLibrary({ page: currentPage - 1 }) }, '←'),
            createElement('div', { className: "pagination-numbers" }, ...pages),
            createElement('div', { className: "pagination-arrow", onclick: () => currentPage < totalPages && updateLibrary({ page: currentPage + 1 }) }, '→')
        )
    );
}

export function ListDisplayBook() {
    const filteredBooks = allBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(libraryState.search.toLowerCase()) || 
                             book.author.toLowerCase().includes(libraryState.search.toLowerCase());
        const matchesCategory = libraryState.category === 'Category' || book.category === libraryState.category;
        const matchesMarked = !libraryState.showMarkedOnly || book.isMarked;
        return matchesSearch && matchesCategory && matchesMarked;
    });

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
    const booksToShow = filteredBooks.slice((libraryState.page - 1) * itemsPerPage, libraryState.page * itemsPerPage);

    const container = createElement('div', { className: "books-list-container" });
    if (booksToShow.length === 0) {
        container.appendChild(createElement('div', { className: "books-empty-state" }, 'No books found.'));
    } else {
        booksToShow.forEach(book => container.appendChild(BookDisplay(book)));
    }

    const section = createElement('section', { className: "trending-section" },
        createElement('div', { className: "trending-header" },
            createElement('div', {},
                createElement('h2', { className: "trending-title" }, libraryState.showMarkedOnly ? 'My Bookmarks' : 'Library'),
                createElement('p', { className: "trending-subtitle" }, 'Explore our collection')
            )
        ),
        container,
        Pagination(libraryState.page, totalPages)
    );
    return section;
}



