import { HeaderComponent } from '../../components/navigationbar/navigationbar.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        HeaderComponent('navbar-mount');
        console.log("Navigation bar loaded successfully at 50% BG opacity context.");
    } catch (err) {
        console.error("Error loading navbar components:", err);
    }
});