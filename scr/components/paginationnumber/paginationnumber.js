/**
 * Creates a single pagination number button.
 * @param {number|string} content - The content (number or '...')
 * @param {boolean} isActive - Whether this page is active
 * @returns {HTMLElement} The pagination button
 */
function createPaginationNumber(content, isActive) {
    const baseClass = "pagination-item";
    const activeClass = "pagination-item-active";
    const inactiveClass = "pagination-item-inactive";

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
        className: 'pagination-nav',
        'data-name': 'Pagination Navigation',
        'aria-label': 'Pagination'
    },
        createElement('div', {
            className: "pagination-container"
        },
            // Previous Button
            createElement('div', {
                className: `pagination-arrow previous ${currentPage === 1 ? 'pagination-arrow-disabled' : ''}`,
                onclick: () => currentPage > 1 && navigateToPage(currentPage - 1)
            }, '←'),

            // Numbers
            createElement('div', {
                className: "pagination-numbers",
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
                className: `pagination-arrow next ${currentPage === totalPages ? 'pagination-arrow-disabled' : ''}`,
                onclick: () => currentPage < totalPages && navigateToPage(currentPage + 1)
            }, '→')
        )
    );
}
