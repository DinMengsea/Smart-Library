
function BookPage(book, chapter, unit) {
    if (!book || !chapter || !unit) return LibraryPage1();

    const container = createElement('div', 'reader-container');
    // We'll let CSS handle the top positioning or set it more dynamically
    if (window.innerWidth < 768) {
        container.style.top = '80px'; 
    } else {
        container.style.top = '80px';
    }
    container.style.zIndex = '10'; // Keep it below any modals but above regular content

    // Header inside the reader (contains back button and title)
    const readerHeader = createElement('div', 'reader-header');
    
    const backBtn = createElement('button', {
        className: 'reader-back-btn',
        onclick: () => navigateTo('detail', { book })
    }, 
        createElement('div', 'reader-back-icon-wrapper', 
            createElement('span', { style: { fontSize: '2rem', color: 'white', fontWeight: '300' } }, '‹')
        ),
        createElement('span', { className: 'hidden sm:inline ml-2' }, 'Back')
    );
    
    const titleGroup = createElement('div', 'reader-title-group',
        createElement('h1', 'reader-title', book.title),
        createElement('p', 'reader-subtitle', `Chapter ${chapter.num} - ${unit.desc}`)
    );
    
    // Reader actions (could be bookmark, settings, etc. - based on reader.css)
    const readerActions = createElement('div', 'reader-actions',
        createElement('button', 'reader-action-btn', 
            createImage(images.bookmark, 'Bookmark', 'reader-action-icon')
        )
    );
    
    readerHeader.appendChild(backBtn);
    readerHeader.appendChild(titleGroup);
    readerHeader.appendChild(readerActions);
    
    container.appendChild(readerHeader);

    // Main content area - where the pages are shown
    const scroller = createElement('div', 'reader-scroller no-scrollbar');

    // Create all 15 pages
    for (let i = 1; i <= 15; i++) {
        const pageWrapper = createElement('div', 'reader-page-wrapper',
            createElement('div', 'reader-page-content',
                createImage(images[`bp${i}`], `Page ${i} of ${unit.desc}`, 'reader-page-img')
            )
        );
        scroller.appendChild(pageWrapper);
    }

    container.appendChild(scroller);

    // Mouse drag-to-scroll (Simulation of "hand" scroll for laptops)
    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.style.cursor = 'grabbing';
        scroller.style.scrollSnapType = 'none'; // Disable snapping while dragging
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });

    const endDragging = () => {
        if (!isDown) return;
        isDown = false;
        scroller.style.cursor = 'grab';
        scroller.style.scrollSnapType = 'x mandatory'; // Re-enable snapping
    };

    scroller.addEventListener('mouseleave', endDragging);
    scroller.addEventListener('mouseup', endDragging);

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2; 
        scroller.scrollLeft = scrollLeft - walk;
    });

    // Footer with Previous/Next buttons, progress bar, and page indicator
    const footer = createElement('div', 'reader-footer');

    // Find context for navigation
    const currentChapterIndex = chaptersData.findIndex(c => c.num === chapter.num);
    const chapterInfo = chaptersData[currentChapterIndex];
    const currentUnitIndex = chapterInfo ? chapterInfo.units.findIndex(u => u.num === unit.num) : -1;

    const scrollToPage = (dir) => {
        const pageWidth = scroller.clientWidth;
        const pageIndex = Math.round(scroller.scrollLeft / pageWidth);
        
        if (dir === 'next') {
            if (pageIndex < 14) {
                scroller.scrollTo({ left: scroller.scrollLeft + pageWidth, behavior: 'smooth' });
            } else {
                // Try to go to next unit
                if (currentUnitIndex < chapterInfo.units.length - 1) {
                    const nextUnit = chapterInfo.units[currentUnitIndex + 1];
                    navigateTo('bookpage', { book, chapter, unit: nextUnit });
                } else if (currentChapterIndex < chaptersData.length - 1) {
                    const nextChapter = chaptersData[currentChapterIndex + 1];
                    const nextUnit = nextChapter.units[0];
                    navigateTo('bookpage', { book, chapter: { num: nextChapter.num, range: nextChapter.range }, unit: nextUnit });
                }
            }
        } else {
            if (pageIndex > 0) {
                scroller.scrollTo({ left: scroller.scrollLeft - pageWidth, behavior: 'smooth' });
            } else {
                // Try to go to previous unit
                if (currentUnitIndex > 0) {
                    const prevUnit = chapterInfo.units[currentUnitIndex - 1];
                    navigateTo('bookpage', { book, chapter, unit: prevUnit });
                } else if (currentChapterIndex > 0) {
                    const prevChapter = chaptersData[currentChapterIndex - 1];
                    const prevUnit = prevChapter.units[prevChapter.units.length - 1];
                    navigateTo('bookpage', { book, chapter: { num: prevChapter.num, range: prevChapter.range }, unit: prevUnit });
                }
            }
        }
    };

    const prevBtn = createElement('button', {
        className: 'reader-nav-btn',
        style: { borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '14px', fontWeight: '600' },
        onclick: () => scrollToPage('prev')
    }, 
        createElement('span', {}, '←'),
        createElement('span', { className: 'prev-btn-text hidden md:inline' }, 'Previous')
    );

    const progressContainer = createElement('div', 'reader-progress-container');
    const progressBar = createElement('div', 'reader-progress-bar', { style: { width: '6.67%' } });
    progressContainer.appendChild(progressBar);

    const pageIndicator = createElement('span', 'reader-page-indicator', 'Page 1 of 15');

    const updateNavigationButtons = () => {
        const pageIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
        const currentPage = pageIndex + 1;
        progressBar.style.width = `${(currentPage / 15) * 100}%`;
        pageIndicator.textContent = `Page ${currentPage} of 15`;

        // Update button texts at boundaries
        const prevText = prevBtn.querySelector('.prev-btn-text');
        const nextText = nextBtn.querySelector('.next-btn-text');

        if (pageIndex === 0) {
            if (currentUnitIndex > 0 || currentChapterIndex > 0) {
                prevText.textContent = 'Previous Lesson';
            } else {
                prevText.textContent = 'Previous';
            }
        } else {
            prevText.textContent = 'Previous';
        }

        if (pageIndex === 14) {
            if (chapterInfo && (currentUnitIndex < chapterInfo.units.length - 1 || currentChapterIndex < chaptersData.length - 1)) {
                nextText.textContent = 'Next Lesson';
            } else {
                nextText.textContent = 'Next';
            }
        } else {
            nextText.textContent = 'Next';
        }
    };

    scroller.addEventListener('scroll', updateNavigationButtons);
    
    // Initial update
    setTimeout(updateNavigationButtons, 0);

    const nextBtn = createElement('button', {
        className: 'reader-nav-btn',
        style: { borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '14px', fontWeight: '600' },
        onclick: () => scrollToPage('next')
    }, 
        createElement('span', { className: 'next-btn-text hidden md:inline' }, 'Next'),
        createElement('span', {}, '→')
    );

    footer.appendChild(prevBtn);
    footer.appendChild(progressContainer);
    footer.appendChild(pageIndicator);
    footer.appendChild(nextBtn);

    container.appendChild(footer);

    return container;
    }
