function SearchBar() {
    return createElement('div', {
        className: "search-bar-container",
        'data-name': 'search bar'
    },
        createElement('div', {
            className: 'search-bar-content'
        },
            createElement('div', {
                className: 'search-icon-wrapper',
                'data-name': 'SearchIcon'
            }, createImage(images.search, '', 'h-full w-full object-contain')),
            createElement('div', {
                className: 'search-input-wrapper',
                'data-name': 'Search'
            },
                createElement('input', {
                    type: 'text',
                    placeholder: 'Search for books...',
                    className: "search-input",
                    value: libraryState.search,
                    oninput: (e) => {
                        updateLibrary({ search: e.target.value });
                    }
                })
            )
        )
    );
}

function Dropdown(label, options = [], currentStateKey) {
    let isOpen = false;
    const currentVal = libraryState[currentStateKey] !== label ? libraryState[currentStateKey] : label;

    const labelText = createElement('p', {
        className: "flex-grow font-semibold text-xs sm:text-sm text-gray-600 truncate"
    }, currentVal);

    const optionsList = createElement('div', {
        className: "dropdown-options hidden",
        style: "transition: all 0.2s ease-out;"
    });

    const allOptions = [label, ...options];

    allOptions.forEach(opt => {
        const item = createElement('div', {
            className: "dropdown-option",
            onclick: (e) => {
                e.stopPropagation();
                labelText.textContent = opt;
                toggleDropdown();
                const update = {};
                update[currentStateKey] = opt;
                updateLibrary(update);
            }
        }, opt);
        optionsList.appendChild(item);
    });

    const toggleDropdown = () => {
        isOpen = !isOpen;
        if (isOpen) {
            optionsList.classList.remove('hidden', 'hide');
            optionsList.classList.add('show');
            chevron.style.transform = "rotate(180deg)";
        } else {
            optionsList.classList.remove('show');
            optionsList.classList.add('hide');
            chevron.style.transform = "rotate(0deg)";
            setTimeout(() => {
                if (!isOpen) optionsList.classList.add('hidden');
            }, 200);
        }
    };

    const chevron = createElement('div', {
        className: 'dropdown-chevron',
        style: "transition: transform 0.3s ease;"
    }, createImage(images.chevronDown, '', 'h-full w-full object-contain'));

    const dropdownBar = createElement('div', {
        className: "dropdown-bar",
        onclick: toggleDropdown
    },
        labelText,
        chevron,
        optionsList
    );

    document.addEventListener('click', (e) => {
        if (!dropdownBar.contains(e.target) && isOpen) {
            toggleDropdown();
        }
    });

    return createElement('div', {
        className: "dropdown-container"
    }, dropdownBar);
}

function mybook() {
    const isActive = libraryState.showMarkedOnly;
    return createElement('div', {
        className: `filter-btn ${isActive ? 'filter-btn-active' : 'filter-btn-inactive'}`,
        onclick: () => {
            updateLibrary({ showMarkedOnly: !libraryState.showMarkedOnly });
        }
    },
        createElement('p', {
            className: `font-bold text-xs sm:text-sm ${isActive ? 'text-white' : 'text-indigo-600'} whitespace-nowrap`
        }, 'My Bookmarks')
    );
}

function SearchAndFilters() {
    const categories = ['Fiction', 'Science', 'History', 'Biography', 'Technology', 'Art', 'Educational'];
    const years = ['2024', '2023', '2022', '2021', '2020', 'Earlier'];
    const languages = ['English', 'Khmer', 'French', 'Chinese'];
    
    const educations = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Khmer Literature', 'Economics', 'Social Studies'];
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'University'];

    const filterGrid = createElement('div', {
        className: "filter-grid",
        'data-name': 'filter grid'
    });

    // Category
    filterGrid.appendChild(Dropdown('Category', categories, 'category'));

    if (libraryState.category === 'Educational') {
        filterGrid.appendChild(Dropdown('Education', educations, 'education'));
        filterGrid.appendChild(Dropdown('Grade', grades, 'grade'));
    } else {
        filterGrid.appendChild(Dropdown('Year', years, 'year'));
        filterGrid.appendChild(Dropdown('Language', languages, 'language'));
    }

    // My Bookmarks button
    const myBookWrapper = createElement('div', { 
        className: "col-span-2 lg:col-span-1 lg:w-48 xl:w-56" 
    }, mybook());
    filterGrid.appendChild(myBookWrapper);

    return createElement('div', {
        className: "filter-section",
        'id': 'search-and-filters'
    },
        SearchBar(),
        filterGrid
    );
}
