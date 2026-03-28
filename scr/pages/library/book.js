function createStarRating() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            createElement('div', {
                className: 'relative shrink-0 size-[24.588px]',
                'data-name': 'Star'
            }, createImage(images.star, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full'))
        );
    }
    return createElement('div', {
        className: "bg-white content-stretch flex gap-[4.553px] items-start overflow-clip py-[4.553px] relative shrink-0 w-[145.708px]",
        'data-name': 'Frame star'
    }, ...stars);
}

function FrameButton() {
    return createElement('div', {
        className: "bg-white content-stretch flex gap-[16.193px] items-center overflow-clip px-[4px] py-[7.773px] relative shrink-0 w-[376.966px]",
        'data-name': 'frame button'
    },
        createElement('div', {
            className: "content-stretch flex flex-col gap-[5.749px] h-[29.147px] items-center justify-center px-[18.396px] py-[7.474px] relative shadow-[3.449px_3.449px_3.507px_0px_rgba(0,0,0,0.25)] shrink-0 w-[101.043px]",
            'data-name': 'Readonline button'
        },
            createElement('div', {
                className: "absolute bg-[#d7eeff] inset-0 rounded-[7.988px]"
            },
                createElement('div', {
                    className: "absolute border-[0.575px] border-black border-solid inset-0 pointer-events-none rounded-[7.988px] shadow-[1.725px_1.725px_2.3px_0px_rgba(0,0,0,0.25)]",
                    'aria-hidden': 'true'
                })
            ),
            createElement('p', {
                className: "font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[9.2px] text-black whitespace-nowrap"
            }, 'Start Reading')
        ),
        createElement('div', {
            className: "content-stretch flex gap-[6.477px] h-[29.147px] items-center justify-center px-[20.727px] py-[8.42px] relative shadow-[3.886px_3.886px_3.951px_0px_rgba(0,0,0,0.25)] shrink-0 w-[101.043px]",
            'data-name': 'Markbook button'
        },
            createElement('div', {
                className: "absolute bg-[#d7eeff] inset-0 rounded-[9px]"
            },
                createElement('div', {
                    className: "absolute border-[0.648px] border-black border-solid inset-0 pointer-events-none rounded-[9px] shadow-[1.943px_1.943px_2.591px_0px_rgba(0,0,0,0.25)]",
                    'aria-hidden': 'true'
                })
            ),
            createElement('div', {
                className: 'relative shrink-0 size-[12.954px]',
                'data-name': 'Bookmark'
            }, createImage(images.bookmark, '', 'absolute inset-0 max-w-none object-contain pointer-events-none size-full')),
            createElement('p', {
                className: "font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[10.36px] text-black whitespace-nowrap"
            }, 'Mark Book')
        )
    );
}

function BookDisplay(title, author, description, bookImage) {
    return createElement('div', {
        className: "bg-white flex flex-col md:flex-row gap-6 items-center p-6 relative rounded-lg shadow-lg w-full max-w-4xl",
        'data-name': 'book display'
    },
        createElement('div', {
            className: 'h-48 w-32 shrink-0'
        }, createImage(bookImage, title, 'h-full w-full object-cover rounded')),
        createElement('div', {
            className: "flex flex-col gap-4 flex-grow w-full",
            'data-name': 'Frame detail'
        },
            createElement('div', {
                className: "flex flex-col sm:flex-row justify-between items-start gap-4"
            },
                createElement('div', {
                    className: "flex flex-col gap-1"
                },
                    createElement('h3', {
                        className: "font-bold text-xl text-black"
                    }, title),
                    createElement('p', {
                        className: "font-medium text-sm text-gray-600"
                    }, author)
                ),
                createElement('div', {
                    className: "flex flex-col items-start sm:items-end"
                },
                    createStarRating(),
                    createElement('p', {
                        className: "font-semibold text-sm text-black mt-1"
                    }, 'Review')
                )
            ),
            createElement('p', {
                className: "text-sm text-gray-700 line-clamp-3"
            }, description),
            FrameButton()
        )
    );
}

function ListDisplayBook() {
    const books = [
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy. It explores love, class, Read more ...',
            image: images.book1
        },
        {
            title: 'Clarissa, or The History of a Young Lady',
            author: 'Samuel Richardson',
            description: 'A long epistolary novel told through letters. It describes the tragic life of Clarissa Harlowe. Read more ...',
            image: images.book2
        },
        {
            title: 'The Adventures of Augie March',
            author: 'Saul Bellow',
            description: 'This novel follows Augie March, a young man growing up during the Great Depression. Read more ...',
            image: images.book3
        },
        {
            title: 'The Murder of Roger Ackroyd',
            author: 'Agatha Christie',
            description: 'A famous detective novel featuring Hercule Poirot. The story revolves around the mysterious murder. Read more ...',
            image: images.book4
        }
    ];

    return createElement('div', {
        className: "flex flex-col gap-8 items-center w-full py-6",
        'data-name': 'list display book'
    }, ...books.map(book => BookDisplay(book.title, book.author, book.description, book.image)));
}

function TrendingBooksSection() {
    return createElement('div', {
        className: "mx-auto w-full max-w-6xl flex flex-col gap-4 items-center px-4 py-8",
        'data-name': 'normal library'
    },
        createElement('div', {
            className: "w-full max-w-4xl text-left mb-4",
            'data-name': 'frame trending book'
        },
            createElement('h2', {
                className: "font-bold text-2xl text-black"
            }, 'Trending Books')
        ),
        ListDisplayBook()
    );
}
