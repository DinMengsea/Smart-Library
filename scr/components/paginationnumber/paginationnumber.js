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
 * @returns {HTMLElement} The pagination container
 */
function Pagination() {
    return createElement('nav', {
        className: 'w-full py-12 flex justify-center',
        'data-name': 'Pagination Navigation',
        'aria-label': 'Pagination'
    },
        createElement('div', {
            className: "flex gap-3 items-center justify-center p-1"
        },
            // Previous Button (Simplified for now)
            createElement('div', {
                className: "size-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer mr-2 bg-white"
            }, '←'),

            // Numbers
            createPaginationNumber(1, true),
            createPaginationNumber(2, false),
            createPaginationNumber(3, false),
            createPaginationNumber(4, false),
            createElement('span', { className: "text-gray-400 mx-1" }, '...'),
            createPaginationNumber(10, false),

            // Next Button
            createElement('div', {
                className: "size-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer ml-2 bg-white"
            }, '→')
        )
    );
}
