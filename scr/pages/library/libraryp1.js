function LibraryPage1() {
    const container = createElement('div', {
        className: "library-page-container",
        'data-name': 'Library (page 1)'
    });

    const mainContent = createElement('div', {
        className: "library-main-content"
    });

    mainContent.appendChild(SearchAndFilters());
    mainContent.appendChild(TrendingBooksSection());

    container.appendChild(mainContent);
    container.appendChild(Footer());

    return container;
}

function bootstrapLibraryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const requestedPage = params.get('page');
    const requestedBookTitle = params.get('book');

    if (!requestedPage) {
        return false;
    }

    if (requestedPage === 'bookmark') {
        navigateTo('bookmark');
        return true;
    }

    if (requestedPage === 'detail' && requestedBookTitle) {
        const book = allBooks.find((entry) => entry.title === requestedBookTitle);
        if (book) {
            navigateTo('detail', { book });
            return true;
        }
    }

    return false;
}

if (!document.body.hasAttribute('data-app-initialized')) {
    document.addEventListener('DOMContentLoaded', function() {
        const root = document.getElementById('root');
        if (root && !root.hasChildNodes()) {
            const handledByQuery = bootstrapLibraryFromUrl();
            if (!handledByQuery) {
                root.appendChild(LibraryPage1());
            }
            document.body.setAttribute('data-app-initialized', 'true');
        }
    });
}
