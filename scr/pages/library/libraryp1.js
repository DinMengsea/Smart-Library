function LibraryPage1() {
    const container = createElement('div', {
        className: "min-h-screen flex flex-col bg-[#f0effb]",
        'data-name': 'Library (page 1)'
    });

    // Main content area
    const mainContent = createElement('div', {
        className: "flex-grow"
    });

    mainContent.appendChild(SearchAndFilters());
    
    const trendingSection = TrendingBooksSection();
    // Add pagination to trending section
    trendingSection.appendChild(Pagination());
    mainContent.appendChild(trendingSection);

    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    if (root) {
        root.appendChild(LibraryPage1());
    }
});