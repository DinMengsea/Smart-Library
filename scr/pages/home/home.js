// import { HeaderComponent } from '../../components/navigationbar/navigationbar.js';

// document.addEventListener('DOMContentLoaded', () => {
//     try {
//         HeaderComponent('navbar-mount');
//         console.log("Navigation bar loaded successfully at 50% BG opacity context.");
//     } catch (err) {
//         console.error("Error loading navbar components:", err);
//     }
// });

import { HeaderComponent } from '../../components/navigationbar/navigationbar.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        HeaderComponent('navbar-mount');
        
        // Select all cards
        const cards = document.querySelectorAll('.feature-card');

        // Define the routes based on the H3 text inside the card
        const routes = {
            "Digital Library": "../library/library.html",
            "Video Learning": "../courses/courses.html",
            "Quiz Master": "../quiz/quiz.html",
            "Book Store": "../bookstore/bookstore.html"
        };

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').innerText;
                const targetPath = routes[title];
                
                if (targetPath) {
                    window.location.href = targetPath;
                }
            });
        });

    } catch (err) {
        console.error("Error initializing homepage:", err);
    }
});