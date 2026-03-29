/**
 * Creates a single pagination number button.
 * @param {number|string} content - The content (number or '...')
 * @param {boolean} isActive - Whether this page is active
 * @returns {HTMLElement} The pagination button
 */
function createPaginationNumber(content, isActive) {
    const baseClass = "relative rounded-lg shrink-0 size-10 flex items-center justify-center border transition-all duration-200 cursor-pointer text-sm font-semibold";
    const activeClass = "bg-blue-600 border-blue-600 text-white shadow-md z-10 scale-110";
    const inactiveClass = "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm bg-gray-50/30";

    return createElement('div', {
        className: `${baseClass} ${isActive ? activeClass : inactiveClass}`,
        role: 'button',
        'aria-label': `Page ${content}`
    },
        createElement('span', {
            className: ""
        }, String(content))
    );
}

/**
 * Creates the pagination container.
 * @param {number} currentPage - The currently active page
 * @param {number} totalPages - The total number of pages
 * @returns {HTMLElement} The pagination container
 */
function Pagination(currentPage = 1, totalPages = 1) {
    const navigateToPage = (page) => {
        updateLibrary({ page: page });
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(createPaginationNumber(i, currentPage === i));
    }

    return createElement('nav', {
        className: 'w-full py-12 flex justify-center',
        'data-name': 'Pagination Navigation',
        'aria-label': 'Pagination'
    },
        createElement('div', {
            className: "flex gap-3 items-center justify-center p-1"
        },
            // Previous Button
            createElement('div', {
                className: `size-10 flex items-center justify-center rounded-lg border border-gray-200 ${currentPage === 1 ? 'text-gray-300 pointer-events-none' : 'text-gray-600 hover:text-blue-600 hover:border-blue-300'} transition-colors cursor-pointer mr-2 bg-white`,
                onclick: () => currentPage > 1 && navigateToPage(currentPage - 1)
            }, '←'),

            // Numbers
            createElement('div', {
                className: "flex gap-3",
                onclick: (e) => {
                    const btn = e.target.closest('[role="button"]');
                    if (btn) {
                        const page = parseInt(btn.getAttribute('aria-label').replace('Page ', ''));
                        if (!isNaN(page)) navigateToPage(page);
                    }
                }
            },
                ...pages
            ),

            // Next Button
            createElement('div', {
                className: `size-10 flex items-center justify-center rounded-lg border border-gray-200 ${currentPage === totalPages ? 'text-gray-300 pointer-events-none' : 'text-gray-600 hover:text-blue-600 hover:border-blue-300'} transition-colors cursor-pointer ml-2 bg-white`,
                onclick: () => currentPage < totalPages && navigateToPage(currentPage + 1)
            }, '→')
        )
    );
}
