function LibraryPage1() {
    const container = createElement('div', {
        className: "library-page-container",
        'data-name': 'Library (page 1)'
    });

    // Main content area
    const mainContent = createElement('div', {
        className: "library-main-content"
    });

    mainContent.appendChild(SearchAndFilters());
    
    const trendingSection = TrendingBooksSection();
    mainContent.appendChild(trendingSection);

    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}

// Initialize the app
if (!document.body.hasAttribute('data-app-initialized')) {
    document.addEventListener('DOMContentLoaded', function() {
        const root = document.getElementById('root');
        if (root && !root.hasChildNodes()) {
            root.appendChild(LibraryPage1());
            document.body.setAttribute('data-app-initialized', 'true');
        }
    });
}
