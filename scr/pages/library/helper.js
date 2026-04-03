function createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);
    
    // If attributes is a string, treat it as className
    if (typeof attributes === 'string') {
        element.className = attributes;
        attributes = {}; // Reset to empty object for the loop
    }
    
    // Set attributes
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    }
    
    // Append children
    children.forEach(child => {
        if (child == null || child === false) return;
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Helper to create images
function createImage(src, alt = '', className = '') {
    return createElement('img', {
        src,
        alt,
        className
    });
}

// Image placeholder URLs (using placeholder service for demo)
const images = {
    facebook: '../../assets/logo/facebook.png',
    x: '../../assets/logo/x.png',
    instagram: '../../assets/logo/instagram.png',
    copyright: '../../assets/icons/copyright.png',
    logo: '../../assets/logo/ourlogo.png',
    book1: '../../assets/book/book1.png',
    book2: '../../assets/book/book2.png',
    book3: '../../assets/book/book3.png',
    book4: '../../assets/book/book4.png',
    book5: '../../assets/book/book5.png',
    book6: '../../assets/book/book6.png',
    book7: '../../assets/book/book7.png',
    book8: '../../assets/book/book8.png',
    book9: '../../assets/book/book9.png',
    book10: '../../assets/book/book10.png',
    booke1: '../../assets/book/booke1.png',
    booke2: '../../assets/book/booke2.png',
    booke3: '../../assets/book/booke3.png',
    booke4: '../../assets/book/booke4.png',
    booke5: '../../assets/book/booke5.png',
    booke6: '../../assets/book/booke6.png',
    booke7: '../../assets/book/booke7.png',
    booke8: '../../assets/book/booke8.png',
    booke9: '../../assets/book/booke9.png',
    booke10: '../../assets/book/booke10.png',
    star: '../../assets/icons/star.png',
    bookmark: '../../assets/icons/bookmark.png',
    search: '../../assets/icons/search.png',
    chevronDown: '../../assets/icons/dropdown.png',
    check: '../../assets/icons/check.png',
    course: '../../assets/icons/course.png'

};

/**
 * Creates a star rating component.
 * @param {number} rating - Number of stars to display (default: 5)
 * @returns {HTMLElement} The star rating container
 */
function createStarRating(rating = 5) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const isFilled = i < rating;
        stars.push(
            createElement('div', {
                className: `star-icon-wrapper ${isFilled ? 'opacity-100' : 'opacity-30'}`,
                'data-name': 'Star'
            }, createImage(images.star, '', 'star-icon'))
        );
    }
    return createElement('div', {
        className: "star-rating-container",
        'data-name': 'Star Rating'
    }, ...stars);
}

/**
 * Shows a modal popup with a 50% opacity background.
 * @param {HTMLElement} content - The content to show in the modal
 */
function showModal(content) {
    const overlay = createElement('div', {
        className: "modal-overlay",
        onclick: (e) => {
            if (e.target === overlay) {
                overlay.remove();
                document.body.style.overflow = '';
            }
        }
    });

    const modalBody = createElement('div', {
        className: "modal-body",
        onclick: (e) => e.stopPropagation()
    });

    // Close Button
    const closeBtn = createElement('button', {
        className: "modal-close",
        onclick: () => {
            overlay.remove();
            document.body.style.overflow = '';
        }
    }, '×');

    modalBody.appendChild(closeBtn);
    modalBody.appendChild(content);
    overlay.appendChild(modalBody);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}