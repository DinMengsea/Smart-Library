function createPaginationNumber(number, isActive) {
    return createElement('div', {
        className: `${isActive ? 'bg-white' : 'bg-blue-100'} relative rounded-md shrink-0 w-12 h-12 flex items-center justify-center border border-gray-300`
    },
        createElement('p', {
            className: "font-medium text-lg text-black"
        }, String(number))
    );
}

function Pagination() {
    return createElement('div', {
        className: 'w-full py-6 flex justify-center',
        'data-name': 'pagination'
    },
        createElement('div', {
            className: "flex gap-2 items-center justify-center"
        },
            createPaginationNumber(1, true),
            createPaginationNumber(2, false),
            createPaginationNumber(3, false),
            createPaginationNumber(4, false),
            createPaginationNumber(5, false)
        )
    );
}