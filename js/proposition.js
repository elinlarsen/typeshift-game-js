// --------------------------------
// Checking proposed combination of letters
// --------------------------------

    class Proposition {
        constructor(wordLength, dic, foundWords) {
            this.grid = document.getElementById("grid");
            this.nodes = grid.childNodes;
            this.len = wordLength;
            this.dic = dic;
        }

        getCombination() {
            const row = 3
            const cols = [...Array(this.len + 2).keys()];
            var proposed = []
            var indexProposed = []
            for (let c = 2; c < cols.length; c++) {
                for (let i = 0; i < this.nodes.length; i++) {
                    //proposed.push(this.gridNodes[i].textContent)
                    if (this.nodes[i].style.gridRowStart == row && this.nodes[i].style.gridColumnStart == c) {
                        proposed.push(this.nodes[i].textContent)
                        indexProposed.push(i)
                    }
                }
            }
            return { proposed: proposed.join(""), index: indexProposed }
        }

        get found() {
            if (this.isGuessRight()){return this.getCombination().proposed}   
        }

        isGuessRight() {
            var prop = this.getCombination().proposed
            if (this.dic.includes(prop)) { return true }
            else { return false }
        }

        turnBlue() {
            var index = this.getCombination().index
            if (this.isGuessRight()) {
                for (let i = 0; i < index.length; i++) {
                    this.nodes[index[i]].className = ' cell letter rightGuess'
                }
            }
        }

        /*
        addFound(){
            var prop = this.getCombination().proposed
            if (this.isGuessRight() && !this.found.includes(prop)){
                this.found.push(prop)
            }
            return this.found
        }
        */


    }
