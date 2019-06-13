export class Game {
    constructor(allWords) {
        this.levels = [1, 2, 3, 4, 5, 6];
        this.indexOfPlay = 0;
        this.dic = allWords;
        this.foundWords = {};
    }

    nextPlay() {
        this.indexOfPlay++
    }

    setFoundWord(w) {
        if (!this.foundWords[this.indexOfPlay]) {
            this.foundWords[this.indexOfPlay] = [];
            console.log("!this.foundWords[this.indexOfPlay]", !this.foundWords[this.indexOfPlay])
        } else {
            this.foundWords[this.indexOfPlay].push(w);
            console.log("word ", w, "added")
        }
    }

    getFoundWords = (indexOfPlay) => [...new Set(this.foundWords[indexOfPlay])].sort();

}