/**
 * Creates a clean, simple header for a chapter.
 */
function createChapterHeader(chapterNum, unitRange) {
  const container = createElement('div', 'w-full');
  
  const content = createElement('div', {
    className: "flex items-center justify-between px-6 py-4 bg-gray-50 border-y border-gray-100"
  });
  
  const leftSide = createElement('div', { className: "flex items-center gap-3" },
    createElement('span', { className: "text-blue-600 font-bold" }, chapterNum + "."),
    createElement('p', { className: "font-bold text-gray-900 text-lg" }, `Chapter ${chapterNum}`)
  );
  
  const rightSide = createElement('p', { 
    className: "text-xs font-bold text-gray-400 uppercase tracking-widest" 
  }, unitRange);
  
  content.appendChild(leftSide);
  content.appendChild(rightSide);
  container.appendChild(content);
  
  return container;
}

/**
 * Creates a simple, clean row for a unit.
 */
function createUnitRow(unitNum, description) {
  const container = createElement('div', {
    className: "group flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
  });
  
  const leftContent = createElement('div', { className: "flex items-center gap-6" },
    createElement('span', { className: "text-gray-300 font-bold text-sm w-4" }, unitNum),
    createElement('p', { 
        className: "text-gray-700 group-hover:text-blue-600 font-medium transition-colors" 
    }, description)
  );

  const arrow = createElement('span', { 
    className: "text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" 
  }, "→");
  
  container.appendChild(leftContent);
  container.appendChild(arrow);
  
  return container;
}

/**
 * Creates a chapter section with its units.
 */
function createChapterSection(chapterNum, unitRange, units) {
  const container = createElement('div', 'flex flex-col w-full');
  
  container.appendChild(createChapterHeader(chapterNum, unitRange));
  
  const unitsContainer = createElement('div', { className: "flex flex-col bg-white" });
  units.forEach(unit => {
    unitsContainer.appendChild(createUnitRow(unit.num, unit.desc));
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
function createChapters() {
  const chapters = [];
  
  chaptersData.forEach(chapter => {
    const chapterContainer = createElement('div', {
        className: "w-full overflow-hidden"
    });
    chapterContainer.appendChild(createChapterSection(chapter.num, chapter.range, chapter.units));
    chapters.push(chapterContainer);
  });
  
  return chapters;
}
