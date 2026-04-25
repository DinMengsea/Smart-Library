document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const underline = document.querySelector('.nav-underline');

    function moveUnderline(el) {
        if (!el) return;
        underline.style.width = `${el.offsetWidth}px`;
        underline.style.left = `${el.offsetLeft}px`;
    }

    // Initialize position
    moveUnderline(document.querySelector('.nav-links a.active'));

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", (e) => moveUnderline(e.target));
        
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            moveUnderline(this);
        });
    });

    document.querySelector('.nav-links').addEventListener("mouseleave", () => {
        moveUnderline(document.querySelector('.nav-links a.active'));
    });

    window.addEventListener("resize", () => {
        moveUnderline(document.querySelector('.nav-links a.active'));
    });
});
