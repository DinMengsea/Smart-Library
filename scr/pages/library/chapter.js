/**
 * Creates a clean, simple header for a chapter.
 */
function createChapterHeader(chapterNum, unitRange) {
  const container = createElement('div', 'w-full');
  
  const content = createElement('div', {
    className: "chapter-header"
  });
  
  const leftSide = createElement('div', { className: "chapter-title-group" },
    createElement('span', { className: "chapter-num" }, chapterNum + "."),
    createElement('p', { className: "chapter-title" }, `Chapter ${chapterNum}`)
  );
  
  const rightSide = createElement('p', { 
    className: "chapter-range" 
  }, unitRange);
  
  content.appendChild(leftSide);
  content.appendChild(rightSide);
  container.appendChild(content);
  
  return container;
}

/**
 * Creates a simple, clean row for a unit.
 */
function createUnitRow(unitNum, description, book, chapter) {
  const container = createElement('div', {
    className: "unit-row",
    onclick: () => navigateTo('bookpage', { book, chapter, unit: { num: unitNum, desc: description } })
  });
  
  const leftContent = createElement('div', { className: "unit-left" },
    createElement('span', { className: "unit-num" }, unitNum),
    createElement('p', { 
        className: "unit-desc" 
    }, description)
  );

  const arrow = createElement('span', { 
    className: "unit-arrow" 
  }, "→");
  
  container.appendChild(leftContent);
  container.appendChild(arrow);
  
  return container;
}

/**
 * Creates a chapter section with its units.
 */
function createChapterSection(chapterNum, unitRange, units, book) {
  const container = createElement('div', 'chapter-section');
  
  container.appendChild(createChapterHeader(chapterNum, unitRange));
  
  const unitsContainer = createElement('div', { className: "units-container" });
  units.forEach(unit => {
    unitsContainer.appendChild(createUnitRow(unit.num, unit.desc, book, { num: chapterNum, range: unitRange }));
  });
  
  container.appendChild(unitsContainer);
  
  return container;
}

// Data Structure
const chaptersData = [
  {
    num: 1,
    range: '3 Units',
    units: [
      { num: 1, desc: 'The sum of the various strings' },
      { num: 2, desc: 'Body contact of the Swift' },
      { num: 3, desc: 'Shared thoughts and processes' }
    ]
  },
  {
    num: 2,
    range: '2 Units',
    units: [
      { num: 1, desc: 'Exponential functions and applications' },
      { num: 2, desc: 'Logarithmic functions deep dive' }
    ]
  },
  {
    num: 3,
    range: '1 Unit',
    units: [
      { num: 1, desc: 'Trigonometric equations and inequalities' }
    ]
  }
];

/**
 * Main function to generate the chapters list.
 */
function createChapters(book) {
  const chapters = [];
  
  chaptersData.forEach(chapter => {
    const chapterContainer = createElement('div', {
        className: "w-full overflow-hidden"
    });
    chapterContainer.appendChild(createChapterSection(chapter.num, chapter.range, chapter.units, book));
    chapters.push(chapterContainer);
  });
  
  return chapters;
}
