function SearchBar() {
    return createElement('div', {
        className: "bg-white h-12 sm:h-14 relative rounded-xl sm:rounded-2xl w-full max-w-3xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md mx-auto",
        'data-name': 'search bar'
    },
        createElement('div', {
            className: 'flex flex-row items-center size-full px-4 sm:px-6'
        },
            createElement('div', {
                className: 'h-5 w-5 sm:h-6 sm:w-6 opacity-40 shrink-0 mr-3',
                'data-name': 'SearchIcon'
            }, createImage(images.search, '', 'h-full w-full object-contain')),
            createElement('div', {
                className: 'relative flex-grow',
                'data-name': 'Search'
            },
                createElement('input', {
                    type: 'text',
                    placeholder: 'Search for books...',
                    className: "font-medium text-base sm:text-lg text-gray-700 outline-none w-full bg-transparent placeholder-gray-400",
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
        className: "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden hidden z-50 transition-all transform origin-top scale-95 opacity-0",
        style: "transition: all 0.2s ease-out;"
    });

    const allOptions = [label, ...options];

    allOptions.forEach(opt => {
        const item = createElement('div', {
            className: "px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors text-xs sm:text-sm font-medium border-b border-gray-50 last:border-none",
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
            optionsList.classList.remove('hidden', 'scale-95', 'opacity-0');
            optionsList.classList.add('scale-100', 'opacity-100');
            chevron.style.transform = "rotate(180deg)";
        } else {
            optionsList.classList.add('scale-95', 'opacity-0');
            chevron.style.transform = "rotate(0deg)";
            setTimeout(() => {
                if (!isOpen) optionsList.classList.add('hidden');
            }, 200);
        }
    };

    const chevron = createElement('div', {
        className: 'shrink-0 size-3 opacity-40 transition-transform duration-300',
        style: "transition: transform 0.3s ease;"
    }, createImage(images.chevronDown, '', 'h-full w-full object-contain'));

    const dropdownBar = createElement('div', {
        className: "bg-white h-10 sm:h-11 border border-gray-200 rounded-lg px-3 flex items-center justify-between shadow-sm cursor-pointer hover:border-indigo-300 transition-all",
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
        className: "relative w-full lg:w-48 xl:w-56"
    }, dropdownBar);
}

function mybook() {
    const isActive = libraryState.showMarkedOnly;
    return createElement('div', {
        className: `flex items-center justify-center h-10 sm:h-11 px-4 w-full cursor-pointer rounded-lg transition-all shadow-sm ${isActive ? 'bg-indigo-600 border-indigo-600' : 'bg-white border border-gray-200'}`,
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
        className: "grid grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-4 w-full lg:w-auto justify-center",
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
        className: "mx-auto w-full max-w-6xl py-6 sm:py-8 px-4 flex flex-col gap-4 sm:gap-6",
        'id': 'search-and-filters'
    },
        SearchBar(),
        filterGrid
    );
}
