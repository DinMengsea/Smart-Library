/**
 * BookPage Component - A beautiful, horizontal scrolling book reader.
 * @param {object} book - The book being read
 * @param {object} chapter - The current chapter info
 * @param {object} unit - The current unit info
 */
function BookPage(book, chapter = null, unit = null) {
    if (!book) return LibraryPage1();

    const pageImages = [
        '../../assets/pagebook/bp1.png', '../../assets/pagebook/bp2.png',
        '../../assets/pagebook/bp3.png', '../../assets/pagebook/bp4.png',
        '../../assets/pagebook/bp5.png', '../../assets/pagebook/bp6.png',
        '../../assets/pagebook/bp7.png', '../../assets/pagebook/bp8.png',
        '../../assets/pagebook/bp9.png', '../../assets/pagebook/bp10.png',
        '../../assets/pagebook/bp11.png', '../../assets/pagebook/bp12.png',
        '../../assets/pagebook/bp13.png', '../../assets/pagebook/bp14.png',
        '../../assets/pagebook/bp15.png'
    ];

    const container = createElement('div', {
        className: "reader-container",
        style: { backgroundColor: '#0F092C' },
        'data-name': 'Book Reader'
    });

    // --- HEADER ---
    const header = createElement('header', {
        className: "reader-header",
        style: { backgroundColor: '#0F092C' }
    });

    const backBtn = createElement('button', {
        className: "reader-back-btn",
        onclick: () => navigateTo('detail', { book })
    }, 
        createElement('div', { className: "reader-back-icon-wrapper" }, 
            createImage('../../assets/icons/back.png', 'Back', 'reader-back-icon')
        ),
        createElement('span', { className: "hidden sm:inline" }, 'Back')
    );

    const bookTitleInfo = createElement('div', { className: "reader-title-group" },
        createElement('h2', { className: "reader-title" }, book.title),
        createElement('p', { className: "reader-subtitle" }, 
            unit ? `Chapter ${chapter?.num || 1} • Unit ${unit.num}` : 'Full Book'
        )
    );

    const actionButtons = createElement('div', { className: "reader-actions" },
        createElement('button', {
            className: "reader-action-btn",
            onclick: () => toggleMarkBook(book.title)
        }, createImage(book.isMarked ? '../../assets/icons/check.png' : '../../assets/icons/bookmark.png', 'Bookmark', 'reader-action-icon')),
        createElement('button', {
            className: "hidden sm:flex reader-action-btn",
            onclick: () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    container.requestFullscreen();
                }
            }
        }, createElement('span', { className: "text-gray-400 font-bold" }, '[ ]'))
    );

    header.appendChild(backBtn);
    header.appendChild(bookTitleInfo);
    header.appendChild(actionButtons);

    // --- SCROLLABLE CONTENT AREA ---
    const scrollContainer = createElement('div', {
        className: "reader-scroller no-scrollbar",
        'data-name': 'Page Scroller'
    });

    // Track current page based on scroll position
    scrollContainer.addEventListener('scroll', () => {
        const width = scrollContainer.offsetWidth;
        const index = Math.round(scrollContainer.scrollLeft / width);
        updateUIForPage(index);
    });

    pageImages.forEach((src, index) => {
        const pageWrapper = createElement('div', {
            className: "reader-page-wrapper"
        }, 
            createElement('div', {
                className: "reader-page-content"
            }, createImage(src, `Page ${index + 1}`, 'reader-page-img'))
        );
        scrollContainer.appendChild(pageWrapper);
    });

    // --- NAVIGATION OVERLAYS ---
    const navOverlay = createElement('div', { className: "reader-nav-overlay" });
    
    const prevBtn = createElement('button', {
        className: "reader-nav-btn",
        style: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', opacity: '0', transform: 'translateX(1rem)', pointerEvents: 'none' },
        onclick: () => {
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft -= width;
        }
    }, createImage('../../assets/icons/previous.png', 'Previous', 'reader-nav-icon'));

    const nextBtn = createElement('button', {
        className: "reader-nav-btn",
        style: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
        onclick: () => {
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft += width;
        }
    }, createImage('../../assets/icons/next.png', 'Next', 'reader-nav-icon'));

    navOverlay.appendChild(prevBtn);
    navOverlay.appendChild(nextBtn);

    const mainContainer = createElement('div', { 
        className: "relative flex-grow flex flex-col overflow-hidden",
        style: { backgroundColor: '#0F092C' }
    });
    mainContainer.appendChild(scrollContainer);
    mainContainer.appendChild(navOverlay);

    // --- FOOTER / PROGRESS ---
    const footer = createElement('footer', {
        className: "reader-footer",
        style: { backgroundColor: '#0F092C' }
    });

    const pageIndicator = createElement('span', { className: "reader-page-indicator" }, `Page 1 / ${pageImages.length}`);
    
    const progressBg = createElement('div', { 
        className: "reader-progress-container",
        onclick: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const index = Math.round(percent * (pageImages.length - 1));
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft = index * width;
        }
    });
    const progressBar = createElement('div', { 
        className: "reader-progress-bar",
        style: { width: `${(1 / pageImages.length) * 100}%` }
    });
    progressBg.appendChild(progressBar);

    function updateUIForPage(index) {
        pageIndicator.textContent = `Page ${index + 1} / ${pageImages.length}`;
        const progress = ((index + 1) / pageImages.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        prevBtn.style.opacity = index === 0 ? '0' : '1';
        prevBtn.style.transform = index === 0 ? 'translateX(1rem)' : 'translateX(0)';
        prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = index === pageImages.length - 1 ? '0' : '1';
        nextBtn.style.transform = index === pageImages.length - 1 ? 'translateX(-1rem)' : 'translateX(0)';
        nextBtn.style.pointerEvents = index === pageImages.length - 1 ? 'none' : 'auto';
    }

    footer.appendChild(pageIndicator);
    footer.appendChild(progressBg);

    container.appendChild(header);
    container.appendChild(mainContainer);
    container.appendChild(footer);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        const width = scrollContainer.offsetWidth;
        if (e.key === 'ArrowLeft') scrollContainer.scrollLeft -= width;
        if (e.key === 'ArrowRight') scrollContainer.scrollLeft += width;
        if (e.key === 'Escape') navigateTo('detail', { book });
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    const observer = new MutationObserver((mutations) => {
        if (!document.body.contains(container)) {
            window.removeEventListener('keydown', handleKeyDown);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial State
    setTimeout(() => updateUIForPage(0), 100);

    return container;
}
