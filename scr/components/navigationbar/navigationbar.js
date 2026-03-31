// scr/components/navigationbar/navigationbar.js
export async function HeaderComponent(containerId) {
    try {
        // Get the directory of this script to find navigationbar.html
        const scriptUrl = new URL(import.meta.url);
        const scriptDir = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));
        const htmlPath = `${scriptDir}/navigationbar.html`;

        const response = await fetch(htmlPath);
        if (!response.ok) throw new Error('Failed to load navigationbar.html');

        const html = await response.text();

        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}   