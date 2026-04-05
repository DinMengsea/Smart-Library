function Group() {
    return createElement('div', {
        className: 'footer-social-links'
    },
        createElement('div', {
            className: 'footer-social-link facebook',
            'data-name': 'Facebook'
        }, createImage(images.facebook, '', 'footer-social-icon')),
        createElement('div', {
            className: 'footer-social-link x',
            'data-name': 'X'
        }, createImage(images.x, '', 'footer-social-icon')),
        createElement('div', {
            className: 'footer-social-link instagram',
            'data-name': 'Instagram'
        }, createImage(images.instagram, '', 'footer-social-icon'))
    );
}

function Group1() {
    return createElement('div', {
        className: 'footer-copyright-group'
    },
        createElement('div', {
            className: 'footer-copyright-icon-wrapper',
            'data-name': 'Copyright'
        }, createImage(images.copyright, '', 'footer-social-icon')),
        createElement('p', {
            className: "footer-copyright-text"
        }, 'Smart Library 2026')
    );
}

function Footer() {
    return createElement('div', {
        className: "footer-container",
        'data-name': 'footer'
    },
        Group(),
        Group1(),
        createElement('p', {
            className: "footer-terms"
        }, 'Terms & policies')
    );
}
