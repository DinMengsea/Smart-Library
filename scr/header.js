// header.js
export async function HeaderComponent(containerId) {
    try {
        // Fetch the header HTML
        const response = await fetch('./header.html');
        if (!response.ok) throw new Error('Failed to load header.html');

        const html = await response.text();

        // Insert the HTML into the specified container
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Container with id "${containerId}" not found.`);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}