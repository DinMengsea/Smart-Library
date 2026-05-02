const router = {
    navigateTo(page, data = {}) {
        const root = document.getElementById('root');
        if (!root) return;
        
        root.innerHTML = '';
        
        switch (page) {
            case 'library':
                root.appendChild(LibraryPage1());
                break;
            case 'detail':
                root.appendChild(BookDetailPage(data.book));
                break;
            case 'bookpage':
                root.appendChild(BookPage(data.book, data.chapter, data.unit));
                break;
            default:
                root.appendChild(LibraryPage1());
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
};

// Global function for easier access
window.navigateTo = router.navigateTo;
