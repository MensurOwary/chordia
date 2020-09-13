const CHORDS = ["A", "E", "D", "Am", "Em", "Dm", "C", "G"];

function _shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function _makeChordPairs() {
    const l = CHORDS.length;
    const genChords = [];
    for (let i = 0; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
            genChords.push([CHORDS[i], CHORDS[j]]);
        }
    }
    return genChords;
}

let PAIRS = _shuffle(_makeChordPairs());

const chordListState = {
    currentIndex: -1,
};

let SAVED_PAIRS = [];

export const savePair = (pair) => {
    if (!SAVED_PAIRS.includes(pair)) {
        SAVED_PAIRS.push(pair);
    }
};

export const nextPair = () => {
    if (chordListState.currentIndex >= PAIRS.length - 1) {
        if (SAVED_PAIRS.length === 0) {
            PAIRS = _shuffle(_makeChordPairs());
        } else {
            PAIRS = _shuffle(PAIRS);
            SAVED_PAIRS = [];
        }
        chordListState.currentIndex = -1;
    }
    chordListState.currentIndex++;
    return PAIRS[chordListState.currentIndex];
};
