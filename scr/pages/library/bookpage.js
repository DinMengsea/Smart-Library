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
        className: "fixed inset-0 z-[100] flex flex-col overflow-hidden",
        style: { backgroundColor: '#0F092C' },
        'data-name': 'Book Reader'
    });

    // Add CSS to hide scrollbar
    const style = document.createElement('style');
    style.textContent = `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    // --- HEADER ---
    const header = createElement('header', {
        className: "h-16 flex items-center justify-between px-6 border-b border-white/10 z-20 shrink-0",
        style: { backgroundColor: '#0F092C' }
    });

    const backBtn = createElement('button', {
        className: "flex items-center gap-2 text-gray-400 hover:text-white transition-all font-bold group",
        onclick: () => navigateTo('detail', { book })
    }, 
        createElement('div', { className: "size-6 flex items-center justify-center group-hover:-translate-x-1 transition-transform invert brightness-200" }, 
            createImage('../../assets/icons/back.png', 'Back', 'object-contain size-full')
        ),
        createElement('span', { className: "hidden sm:inline" }, 'Back')
    );

    const bookTitleInfo = createElement('div', { className: "flex flex-col items-center" },
        createElement('h2', { className: "font-bold text-white text-sm sm:text-base leading-tight text-center" }, book.title),
        createElement('p', { className: "text-[10px] text-blue-400 font-bold uppercase tracking-widest" }, 
            unit ? `Chapter ${chapter?.num || 1} • Unit ${unit.num}` : 'Full Book'
        )
    );

    const actionButtons = createElement('div', { className: "flex items-center gap-4" },
        createElement('button', {
            className: "p-2 hover:bg-white/10 rounded-full transition-colors",
            onclick: () => toggleMarkBook(book.title)
        }, createImage(book.isMarked ? '../../assets/icons/check.png' : '../../assets/icons/bookmark.png', 'Bookmark', 'size-5 opacity-70 invert brightness-200')),
        createElement('button', {
            className: "hidden sm:flex p-2 hover:bg-white/10 rounded-full transition-colors",
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
        className: "flex-grow flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar",
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
            className: "min-w-full h-full flex items-center justify-center snap-center p-4 sm:p-10"
        }, 
            createElement('div', {
                className: "relative h-full max-w-full aspect-[1/1.414] bg-white shadow-2xl rounded-lg overflow-hidden border border-white/5"
            }, createImage(src, `Page ${index + 1}`, 'h-full w-full object-contain pointer-events-none'))
        );
        scrollContainer.appendChild(pageWrapper);
    });

    // --- NAVIGATION OVERLAYS ---
    const navOverlay = createElement('div', { className: "absolute inset-0 pointer-events-none flex justify-between items-center px-4 sm:px-12 z-10" });
    
    const prevBtn = createElement('button', {
        className: "pointer-events-auto p-4 bg-white/10 backdrop-blur shadow-2xl rounded-full hover:bg-blue-600 hover:text-white transition-all group opacity-0 translate-x-4",
        style: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
        onclick: () => {
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft -= width;
        }
    }, createImage('../../assets/icons/previous.png', 'Previous', 'size-8 invert brightness-200 transition-all'));

    const nextBtn = createElement('button', {
        className: "pointer-events-auto p-4 bg-white/10 backdrop-blur shadow-2xl rounded-full hover:bg-blue-600 hover:text-white transition-all group",
        style: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
        onclick: () => {
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft += width;
        }
    }, createImage('../../assets/icons/next.png', 'Next', 'size-8 invert brightness-200 transition-all'));

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
        className: "h-16 flex items-center justify-between px-8 border-t border-white/10 z-20 shrink-0",
        style: { backgroundColor: '#0F092C' }
    });

    const pageIndicator = createElement('span', { className: "text-sm font-bold text-gray-400 min-w-[120px]" }, `Page 1 / ${pageImages.length}`);
    
    const progressBg = createElement('div', { 
        className: "flex-grow max-w-2xl mx-auto h-2 bg-white/10 rounded-full overflow-hidden relative cursor-pointer",
        onclick: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const index = Math.round(percent * (pageImages.length - 1));
            const width = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft = index * width;
        }
    });
    const progressBar = createElement('div', { 
        className: "absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 rounded-full",
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
