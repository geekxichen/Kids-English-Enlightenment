export * from './data/dailyWords_1';
export * from './data/dailyWords_2';
export * from './data/dailyWords_3';
export * from './data/sightWords';
export * from './data/sightWords_2';

export const ALPHABET = [
    { l:'A', word:'Apple', emoji:'🍎' }, { l:'B', word:'Bear', emoji:'🐻' }, { l:'C', word:'Cat', emoji:'🐱' }, { l:'D', word:'Dog', emoji:'🐶' },
    { l:'E', word:'Egg', emoji:'🥚' }, { l:'F', word:'Fish', emoji:'🐟' }, { l:'G', word:'Grape', emoji:'🍇' }, { l:'H', word:'House', emoji:'🏠' },
    { l:'I', word:'Ice', emoji:'🧊' }, { l:'J', word:'Juice', emoji:'🧃' }, { l:'K', word:'Kite', emoji:'🪁' }, { l:'L', word:'Lion', emoji:'🦁' },
    { l:'M', word:'Moon', emoji:'🌙' }, { l:'N', word:'Nest', emoji:'🪺' }, { l:'O', word:'Orange', emoji:'🍊' }, { l:'P', word:'Pig', emoji:'🐷' },
    { l:'Q', word:'Queen', emoji:'👸' }, { l:'R', word:'Rainbow', emoji:'🌈' }, { l:'S', word:'Sun', emoji:'☀️' }, { l:'T', word:'Turtle', emoji:'🐢' },
    { l:'U', word:'Umbrella', emoji:'☂️' }, { l:'V', word:'Violin', emoji:'🎻' }, { l:'W', word:'Whale', emoji:'🐋' }, { l:'X', word:'X-ray', emoji:'🩻' },
    { l:'Y', word:'Yo-yo', emoji:'🪀' }, { l:'Z', word:'Zebra', emoji:'🦓' }
];

export const WORD_FAMILIES = {
    'A': [
        { family: 'ab', words: [{c:'c', w:'cab', e:'🚕'}, {c:'l', w:'lab', e:'🔬'}] },
        { family: 'ad', words: [{c:'b', w:'bad', e:'👎'}, {c:'d', w:'dad', e:'👨'}, {c:'m', w:'mad', e:'😡'}, {c:'p', w:'pad', e:'📝'}, {c:'s', w:'sad', e:'😢'}] },
        { family: 'ag', words: [{c:'b', w:'bag', e:'👜'}, {c:'r', w:'rag', e:'🧽'}, {c:'t', w:'tag', e:'🏷️'}, {c:'w', w:'wag', e:'🐕'}] },
        { family: 'am', words: [{c:'h', w:'ham', e:'🍖'}, {c:'j', w:'jam', e:'🍓'}, {c:'r', w:'ram', e:'🐏'}, {c:'y', w:'yam', e:'🍠'}] },
        { family: 'an', words: [{c:'c', w:'can', e:'🥫'}, {c:'f', w:'fan', e:'🪖'}, {c:'m', w:'man', e:'👨'}, {c:'p', w:'pan', e:'🍳'}, {c:'r', w:'ran', e:'🏃'}, {c:'v', w:'van', e:'🚐'}] },
        { family: 'ap', words: [{c:'c', w:'cap', e:'🧢'}, {c:'g', w:'gap', e:'🕳️'}, {c:'l', w:'lap', e:'🦵'}, {c:'m', w:'map', e:'🗺️'}, {c:'n', w:'nap', e:'😴'}, {c:'t', w:'tap', e:'🚰'}] },
        { family: 'at', words: [{c:'b', w:'bat', e:'🦇'}, {c:'c', w:'cat', e:'🐱'}, {c:'f', w:'fat', e:'🐷'}, {c:'h', w:'hat', e:'🎩'}, {c:'m', w:'mat', e:'🔲'}, {c:'p', w:'pat', e:'✋'}, {c:'r', w:'rat', e:'🐀'}, {c:'s', w:'sat', e:'🪑'}] }
    ],
    'E': [
        { family: 'ed', words: [{c:'b', w:'bed', e:'🛏️'}, {c:'f', w:'fed', e:'🍼'}, {c:'r', w:'red', e:'🔴'}, {c:'w', w:'wed', e:'💍'}] },
        { family: 'eg', words: [{c:'b', w:'beg', e:'🙏'}, {c:'l', w:'leg', e:'🦵'}, {c:'p', w:'peg', e:'🪝'}] },
        { family: 'en', words: [{c:'d', w:'den', e:'🐻'}, {c:'h', w:'hen', e:'🐔'}, {c:'m', w:'men', e:'👨‍👨‍👦'}, {c:'p', w:'pen', e:'🖊️'}, {c:'t', w:'ten', e:'🔟'}] },
        { family: 'et', words: [{c:'g', w:'get', e:'🤲'}, {c:'j', w:'jet', e:'✈️'}, {c:'l', w:'let', e:'🚪'}, {c:'m', w:'met', e:'🤝'}, {c:'n', w:'net', e:'🥅'}, {c:'p', w:'pet', e:'🐶'}, {c:'s', w:'set', e:'🍽️'}, {c:'v', w:'vet', e:'🩺'}] }
    ],
    'I': [
        { family: 'ib', words: [{c:'b', w:'bib', e:'👶'}, {c:'r', w:'rib', e:'🍖'}] },
        { family: 'id', words: [{c:'h', w:'hid', e:'🫣'}, {c:'k', w:'kid', e:'🧒'}, {c:'l', w:'lid', e:'🥘'}] },
        { family: 'ig', words: [{c:'b', w:'big', e:'🐘'}, {c:'d', w:'dig', e:'⛏️'}, {c:'f', w:'fig', e:'🍈'}, {c:'p', w:'pig', e:'🐷'}, {c:'w', w:'wig', e:'👱'}] },
        { family: 'in', words: [{c:'b', w:'bin', e:'🗑️'}, {c:'f', w:'fin', e:'🐬'}, {c:'p', w:'pin', e:'📌'}, {c:'t', w:'tin', e:'🥫'}, {c:'w', w:'win', e:'🏆'}] },
        { family: 'ip', words: [{c:'d', w:'dip', e:'🥣'}, {c:'h', w:'hip', e:'🕺'}, {c:'l', w:'lip', e:'👄'}, {c:'r', w:'rip', e:'📄'}, {c:'s', w:'sip', e:'🧃'}, {c:'t', w:'tip', e:'🪙'}, {c:'z', w:'zip', e:'🤐'}] },
        { family: 'it', words: [{c:'b', w:'bit', e:'🤏'}, {c:'f', w:'fit', e:'🏃'}, {c:'h', w:'hit', e:'🥊'}, {c:'k', w:'kit', e:'🧰'}, {c:'p', w:'pit', e:'🕳️'}, {c:'s', w:'sit', e:'🪑'}] }
    ],
    'O': [
        { family: 'ob', words: [{c:'c', w:'cob', e:'🌽'}, {c:'j', w:'job', e:'💼'}, {c:'m', w:'mob', e:'👨‍👩‍👧‍👦'}, {c:'r', w:'rob', e:'🦹'}, {c:'s', w:'sob', e:'😭'}] },
        { family: 'od', words: [{c:'n', w:'nod', e:'😌'}, {c:'p', w:'pod', e:'🫛'}, {c:'r', w:'rod', e:'🎣'}] },
        { family: 'og', words: [{c:'d', w:'dog', e:'🐶'}, {c:'f', w:'fog', e:'🌫️'}, {c:'h', w:'hog', e:'🐗'}, {c:'j', w:'jog', e:'🏃'}, {c:'l', w:'log', e:'🪵'}] },
        { family: 'op', words: [{c:'c', w:'cop', e:'👮'}, {c:'h', w:'hop', e:'🐇'}, {c:'m', w:'mop', e:'🧹'}, {c:'p', w:'pop', e:'🍿'}, {c:'t', w:'top', e:'🔝'}] },
        { family: 'ot', words: [{c:'c', w:'cot', e:'🛏️'}, {c:'d', w:'dot', e:'🔵'}, {c:'h', w:'hot', e:'🔥'}, {c:'l', w:'lot', e:'📦'}, {c:'n', w:'not', e:'🚫'}, {c:'p', w:'pot', e:'🍲'}] }
    ],
    'U': [
        { family: 'ub', words: [{c:'c', w:'cub', e:'🐻'}, {c:'r', w:'rub', e:'🧼'}, {c:'s', w:'sub', e:'🥪'}, {c:'t', w:'tub', e:'🛁'}] },
        { family: 'ud', words: [{c:'b', w:'bud', e:'🌱'}, {c:'m', w:'mud', e:'💩'}] },
        { family: 'ug', words: [{c:'b', w:'bug', e:'🐛'}, {c:'d', w:'dug', e:'⛏️'}, {c:'h', w:'hug', e:'🫂'}, {c:'j', w:'jug', e:'🏺'}, {c:'m', w:'mug', e:'☕'}, {c:'p', w:'pug', e:'🐶'}, {c:'r', w:'rug', e:'🀄'}] },
        { family: 'um', words: [{c:'g', w:'gum', e:'🍬'}, {c:'h', w:'hum', e:'🎶'}, {c:'m', w:'mum', e:'👩'}, {c:'s', w:'sum', e:'➕'}] },
        { family: 'un', words: [{c:'b', w:'bun', e:'🍞'}, {c:'f', w:'fun', e:'🎉'}, {c:'n', w:'nun', e:'🧕'}, {c:'r', w:'run', e:'🏃'}, {c:'s', w:'sun', e:'☀️'}] },
        { family: 'up', words: [{c:'c', w:'cup', e:'☕'}, {c:'p', w:'pup', e:'🐶'}] },
        { family: 'ut', words: [{c:'c', w:'cut', e:'✂️'}, {c:'h', w:'hut', e:'🛖'}, {c:'n', w:'nut', e:'🌰'}] }
    ]
};
