function Group() {
    return createElement('div', {
        className: 'grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0'
    },
        createElement('div', {
            className: 'col-1 ml-0 mt-0 relative row-1 size-[65.366px]',
            'data-name': 'Facebook'
        }, createImage(images.facebook, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full')),
        createElement('div', {
            className: 'col-1 ml-[143.81px] mt-0 relative row-1 size-[65.366px]',
            'data-name': 'X'
        }, createImage(images.x, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full')),
        createElement('div', {
            className: 'col-1 ml-[71.9px] mt-0 relative row-1 size-[65.366px]',
            'data-name': 'Instagram'
        }, createImage(images.instagram, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full'))
    );
}

function Group1() {
    return createElement('div', {
        className: 'flex items-center gap-3 relative shrink-0'
    },
        createElement('div', {
            className: 'relative size-[24.72px]',
            'data-name': 'Copyright'
        }, createImage(images.copyright, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full')),
        createElement('p', {
            className: "font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative text-[24.72px] text-black whitespace-nowrap"
        }, 'Smart Library 2026')
    );
}

function Footer() {
    return createElement('div', {
        className: "w-full bg-white flex flex-col gap-6 items-center py-10 px-4 mt-20",
        'data-name': 'footer'
    },
        Group(),
        Group1(),
        createElement('p', {
            className: "font-['Inter:Regular',sans-serif] font-normal text-lg text-black text-center"
        }, 'Terms & policies')
    );
}
