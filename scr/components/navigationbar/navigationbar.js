// scr/components/navigationbar/navigationbar.js
export async function HeaderComponent(containerId) {
    try {
        const scriptUrl = new URL(import.meta.url);
        const scriptDir = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));
        const htmlPath = `${scriptDir}/navigationbar.html`;

        const response = await fetch(htmlPath);
        if (!response.ok) throw new Error('Failed to load navigationbar.html');

        const html = await response.text();

        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            setupNavigation();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function setupNavigation() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('.navlink');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Highlight active link based on current URL
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.navlink');
    
    allLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Simple path matching
        if (currentPath.includes(href.replace('../', '').replace('.html', ''))) {
            link.classList.add('active');
        }
    });

    // Special case for home
    if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('home.html')) {
        const homeLink = Array.from(allLinks).find(l => l.textContent === 'Home');
        if (homeLink) homeLink.classList.add('active');
    }
}
