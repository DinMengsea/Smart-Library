function SearchBar() {
    return createElement('div', {
        className: "bg-white h-14 relative rounded-2xl w-full max-w-3xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md",
        'data-name': 'search bar'
    },
        createElement('div', {
            className: 'flex flex-row items-center size-full px-6'
        },
            createElement('div', {
                className: 'relative flex-grow',
                'data-name': 'Search'
            },
                createElement('input', {
                    type: 'text',
                    placeholder: 'Search for books...',
                    className: "font-medium text-lg text-gray-700 outline-none w-full bg-transparent placeholder-gray-400",
                    value: libraryState.search,
                    oninput: (e) => {
                        updateLibrary({ search: e.target.value });
                    }
                })
            ),
            createElement('div', {
                className: 'h-6 w-6 opacity-40 shrink-0 ml-2',
                'data-name': 'SearchIcon'
            }, createImage(images.search, '', 'h-full w-full object-contain'))
        )
    );
}

function Dropdown(label, options = [], currentStateKey) {
    // State-like variables using the element itself
    let isOpen = false;
    const currentVal = libraryState[currentStateKey] !== label ? libraryState[currentStateKey] : label;

    const labelText = createElement('p', {
        className: "flex-grow font-medium text-base text-gray-700 truncate"
    }, currentVal);

    const optionsList = createElement('div', {
        className: "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden hidden z-50 transition-all transform origin-top scale-95 opacity-0",
        style: "transition: all 0.2s ease-out;"
    });

    // Add "All" option to reset filter
    const allOptions = [label, ...options];

    // Create option items
    allOptions.forEach(opt => {
        const item = createElement('div', {
            className: "px-5 py-3 hover:bg-indigo-50 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium border-b border-gray-50 last:border-none",
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
        className: 'shrink-0 size-4 opacity-50 transition-transform duration-300',
        'data-name': 'Chevron Down',
        style: "transition: transform 0.3s ease;"
    }, createImage(images.chevronDown, '', 'h-full w-full object-contain'));

    const dropdownBar = createElement('div', {
        className: "bg-white flex-grow h-14 relative border border-gray-200 rounded-2xl px-5 flex items-center justify-between shadow-sm cursor-pointer hover:border-indigo-300 transition-all",
        onclick: toggleDropdown
    },
        labelText,
        chevron,
        optionsList
    );

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownBar.contains(e.target) && isOpen) {
            toggleDropdown();
        }
    });

    return createElement('div', {
        className: "flex items-start shrink-0 w-52 relative"
    }, dropdownBar);
}

function mybook() {
    return createElement('div', {
        className: "flex flex-col items-center justify-center h-14 px-4 shrink-0 cursor-pointer group"
    },
        createElement('div', {
            className: 'relative',
            'data-name': 'My_book'
        },
            createElement('p', {
                className: "font-semibold text-lg text-indigo-600 whitespace-nowrap group-hover:text-indigo-800 transition-colors"
            }, 'My Book')
        ),
        createElement('div', {
            className: 'h-0.5 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300 rounded-full'
        })
    );
}

function SearchAndFilters() {
    const categories = ['Fiction', 'Science', 'History', 'Biography', 'Technology', 'Art', 'Educational'];
    const years = ['2024', '2023', '2022', '2021', '2020', 'Earlier'];
    const languages = ['English', 'Khmer', 'French', 'Chinese'];
    
    // New options for Educational category
    const educations = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Khmer Literature', 'Economics', 'Social Studies'];
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'University'];

    const filterBox = createElement('div', {
        className: "flex flex-wrap gap-5 items-center justify-center w-full",
        'data-name': 'filter box'
    });

    // Category Dropdown
    filterBox.appendChild(Dropdown('Category', categories, 'category'));

    // Conditional Dropdowns
    if (libraryState.category === 'Educational') {
        filterBox.appendChild(Dropdown('Education', educations, 'education'));
        filterBox.appendChild(Dropdown('Grade', grades, 'grade'));
    } else {
        filterBox.appendChild(Dropdown('Year', years, 'year'));
        filterBox.appendChild(Dropdown('Language', languages, 'language'));
    }

    filterBox.appendChild(mybook());

    return createElement('div', {
        className: "mx-auto w-full max-w-6xl flex flex-col items-center py-10 px-4 gap-8",
        'data-name': 'combine search filter',
        'id': 'search-and-filters'
    },
        SearchBar(),
        filterBox
    );
}
