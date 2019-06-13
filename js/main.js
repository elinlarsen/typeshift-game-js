/**
 * @todo: manage stop button, display results at the end of a party OR when touching stop
 * @todo : drag an drop button
 * @todo : function check combination and display the change of colors when the combination is right
 * @todo : display instructions , pop hover 
 */
(function () {
    "use strict";

    // --------------------------------
    // Playset variables
    // --------------------------------
    var allWords, allFrequentWords, wordsList = [], definitions = null;
    // allWords is the dictionnary where words will be compared
    // allFrequentWords is the list of words in which the parties will be generated 
    //wordsList is the list of words for each party. In eahc party, the length of words is the same


    function getJSONDictionnary() {
        return new Promise((resolve, reject) => {
            const jsonPath = "./../data/dictionary.json";
            fetch(jsonPath).then(res => {
                if (!res.ok) {
                    throw new Error("HTTP error, status = " + response.status);
                }
                return res.json();
            }).then(w => {
                allWords = Object.keys(w);
                cleanWords(allWords)
                resolve("whaaat");
            })
        })
    }

    
    


    function getJSONCleanData() {
        const jsonPath = "./../data/allFrequentWords.json";
        fetch(jsonPath).then(res => {
            if (!res.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return res.json();
        }).then(w => {
            allFrequentWords = shuffle(w);
            wordsList=createGameSet(allFrequentWords, 3, [4,5, 6])
        })
    }

    getJSONCleanData()


    const chrono = new Chronometer()
    const game = new Game(allWords)

    
    const btnRight = document.getElementById("btnRight")
    const btnHowTo = document.getElementById("howto")
    var btnLeft = document.getElementById('btnLeft');
    var minDec = document.getElementById('minDec');
    var minUni = document.getElementById('minUni');
    var secDec = document.getElementById('secDec');
    var secUni = document.getElementById('secUni');


    // --------------------------------
    // Data processing : reading, cleaning, filtering, shuffling
    // --------------------------------

    
    const shuffle =(array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;  
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    function cleanWords(words) {
        //return words.map((x) => {x.replace(/[^a-zA-Z ]/g, "")})
        return words.map((x) => { return x.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') })
    }

    function filterByLengthEqual(lengthToFilter, words) {
        return words.filter(word => word.length == lengthToFilter);
    }

    function createGameSet(words, nbInSet, lengthsToFilter){
        var fullArray=[];
        const clean=cleanWords(words)
        const nbOfSets=Math.floor(words.length/nbInSet); 
        for (let i=0; i<nbOfSets; i+=nbInSet){ //for each set 
            for (let l=0; l<lengthsToFilter.length; l++){ //for a given word length
                let len=lengthsToFilter[l];
                let byLength=filterByLengthEqual(len, clean) //filter the words by this length              
                let set=byLength.slice(i, i+nbInSet)
                if(set!== 'undefined' && set.length == 3){fullArray.push(set)}
            }
        }
        return fullArray
    }
    


    // --------------------------------
    // Create HTML content 
    // --------------------------------
    var grid = document.getElementById("grid")
    //var gridChildNodes = grid.childNodes

    function createLetterElement(l, index, indexWord) {
        const letter = document.createElement("span")
        grid.appendChild(letter);
        letter.className = "cell letter"
        letter.textContent = l

        if (indexWord == 0) { letter.style.gridRow = 2; /*letter.setAttribute("row", "2")*/ }
        if (indexWord == 1) { letter.style.gridRow = 3; /*letter.setAttribute("row", "3") */ }
        if (indexWord == 2) { letter.style.gridRow = 4; /*letter.setAttribute("row", "4")*/ }

        if (index == 0) { letter.style.gridColumn= 2; /*letter.setAttribute("col", "2")*/ }
        if (index == 1) { letter.style.gridColumn = 3; /*letter.setAttribute("col", "3") */ }
        if (index == 2) { letter.style.gridColumn = 4; /*letter.setAttribute("col", "4") */ }
        if (index == 3) { letter.style.gridColumn = 5; /*letter.setAttribute("col", "5") */ }
        if (index == 4) { letter.style.gridColumn = 6; /*letter.setAttribute("col", "6") */ }

        letter.setAttribute("draggable", "true")
    }

    function createEmptyElement(count, columnIndex) {
        var shadow = document.createElement("span")
        grid.appendChild(shadow);
        shadow.setAttribute("draggable", "false")
        shadow.setAttribute("dropzone", "false")

        if (count == 2) {
            shadow.className = "cell shadow"
            shadow.style.gridRow = 3
            shadow.style.gridColumn = columnIndex
        }
        else { shadow.className = "cell invisible" }
    }

    function createArrowRow(direction, len) {
        for (let i = 0; i < len; i++) {
            if (direction == "up" || direction == "down") {
                var arr = document.createElement("span")
                arr.setAttribute("draggable", "false")
                arr.className = "cell arrow " + direction
                grid.appendChild(arr)
            }
            else throw Error("direction must either be up or down")
        }
    }

    function drawCells(letters) {
        var count = 1;
        const len = letters[0].length
        // first row
        createEmptyElement(count, 1) // col1 
        createArrowRow("down", len) // col2 ... col 2+ len
        createEmptyElement(count, len + 2) // col 2 + len +1

        // rows with letters 
        letters.forEach((element, indexWord) => {
            createEmptyElement(count, 1)
            element.forEach((l, index) => { createLetterElement(l, index, indexWord) })
            createEmptyElement(count, len + 2)
            count++
        });

        // last rows
        createEmptyElement(count, 1)
        createArrowRow("up", len)
        createEmptyElement(count, len + 2)
    }

    function emptyGrid() {
        grid = document.getElementById("grid")
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }


    function drawGrid(letters) {
        const len = letters[0].length
        const nbWords = letters.length
        const nbRows = (nbWords - 1) * 2 + 2
        const nbColumns = len + 2
        grid.style.gridTemplateColumns = `repeat(${nbColumns}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${nbRows}, 1fr)`;
    }

    // --------------------------------
    // Dragging letters
    // --------------------------------

    const dragLetters = (dic) => {
        var draggedElement = null;
        const L = document.querySelectorAll(".letter")
        const nbLetters = L.length;
        const wordLen = L.length / 3;
        console.log("word length : ", wordLen, "nb of letters", nbLetters)

        const dragStart = (ev, j) => {
            console.log('------------------------------------')
        }

        const dragOver = (ev) => {
            ev.preventDefault() // enables to drop
        }

        const dropAndCheck = (ev, j, dic ) => {
            
            //L[j].className = 'cell letter';
            console.log("coucou2", draggedElement)
   
            const dragRow=parseInt(draggedElement.style.gridRowStart)
            const dragCol=parseInt(draggedElement.style.gridColumnStart)

            const dropRow=parseInt(ev.target.style.gridRowStart)    
            const dropCol=parseInt(ev.target.style.gridColumnStart)

            if (dragRow > dropRow && dragCol==dropCol) { dragDropUp(ev, j) }
            else if(dragRow < dropRow && dragCol==dropCol){dragDropDown(ev, j)}

            var proposition = new Proposition(wordLen, dic)
            proposition.turnBlue()
        }

        const dragDropUp = (ev, j, dic) => {
            console.log("drop up");
            const rowPos = parseInt(L[j].style.gridRowStart)
            if (j - 2 * wordLen >=0){
            L[j].style.gridRowStart = rowPos - 1
            L[j - wordLen].style.gridRowStart = rowPos - 2
            L[j - 2 * wordLen].style.gridRowStart = rowPos - 3
            }
        }

        const dragDropDown = (ev, j, dic) => {
            console.log("drop down");            
            const rowPos = parseInt(L[j].style.gridRowStart)
            if (j + 2 * wordLen <nbLetters){
            L[j].style.gridRowStart = rowPos + 1
            L[j + wordLen].style.gridRowStart = rowPos + 2
            L[j + 2 * wordLen].style.gridRowStart = rowPos + 3
            }
        }

        //for (let i = wordLen; i < 2 * wordLen; i++) { L[i].setAttribute("draggable", "false") }

        for (let i = 0; i < wordLen; i++) {
            let next = i + wordLen
            L[i].addEventListener("dragstart", function (evt) {
                
                draggedElement = evt.target;
                dragStart(evt, i);
            })
            L[next].addEventListener('dragover', function (evt) { dragOver(evt) })
            L[next].addEventListener('drop', function (evt) { dropAndCheck(evt, i, dic);})

        }

        for (let m = 2 * wordLen - 1; m < nbLetters; m++) {
            let prev = m - wordLen
            L[m].addEventListener("dragstart", function (evt) { 
                draggedElement = evt.target;
                dragStart(evt, m);
            })
            L[prev].addEventListener('dragover', function (evt) { dragOver(evt) })
            L[prev].addEventListener('drop', function (evt) { dropAndCheck(evt, m, dic ) })
        }

    }  

    // --------------------------------
    // Checking proposed combination of letters
    // --------------------------------

    class Proposition {
        constructor(wordLength, dic) {
            this.grid = document.getElementById("grid");
            this.nodes = grid.childNodes;
            this.len = wordLength;
            this.indexStart = (this.len + 2) * 2 + 1;
            this.indexEnd = this.indexStart + this.len;
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

        get proposed() {
            return this.getCombination()
        }

        isGuessRight() {
            var prop = this.getCombination().proposed
            if (this.dic.includes(prop)) { return true }
            else { return false }
        }

        turnBlue() {
            var res = this.isGuessRight()
            var index = this.getCombination().index
            if (res) {
                for (let i = 0; i < index.length; i++) {
                    this.nodes[index[i]].className = ' cell letter rightGuess'
                }
            }
        }
    }


    // --------------------------------
    // Chronometer
    // --------------------------------

    function printTime() {
        window.setInterval(() => { printMinutes(); printSeconds() }, 1000)
    }

    function printMinutes() {
        var min = chrono.twoDigitsNumber(chrono.getMinutes())
         minDec.textContent = min.charAt(0)
         minUni.textContent = min.charAt(1)
    }

    function printSeconds() {
        var sec = chrono.twoDigitsNumber(chrono.getSeconds())
        secDec.textContent = sec.charAt(0)
        secUni.textContent = sec.charAt(1)
    }

    function setStopBtn() {
        btnLeft.textContent = "STOP";
        btnLeft.className = "btn stop";
    }

    function setStartBtn() {
        btnLeft.textContent = "START";
        btnLeft.className = "btn start";
    }

    function setNextBtn() {
        btnRight.className = "btn triangle next";
    }

    function setHoldBtn() {
        btnRight.className = "btn triangle hold";
    }

    // START / STOP PARTY
    const btnLeftListener = (game, wordsList, chrono) => {
        let indexOfPlay = game.indexOfPlay
        let words = wordsList[indexOfPlay];
        let playset = new Playset(words)
        let letters = playset.selectRandomlyPseudo()
        let dic=allWords

        if (btnLeft.className == "btn start" && btnLeft.textContent == "START") {
            chrono.startClick()
            drawGrid(letters)
            drawCells(letters)
            dragLetters(dic)
            printTime()
            setStopBtn()
            setHoldBtn() 

        }
        else if (btnLeft.className == "btn stop" && btnLeft.textContent == "STOP") {
            chrono.stopClick()
            setStartBtn()
            setNextBtn()
        }
    }

    // --------------------------------
    // Intructions and Next Play button 
    // --------------------------------
    const btnHowToListener = () => {

    }

    // --------------------------------
    // Next Play button  (rigth button)
    // --------------------------------

    const btnRightListener = (game, wordsList, chrono) => {
        if (btnRight.className == "btn triangle next" && btnLeft.className == "btn stop") {
            
            console.log("next party !");
            game.nextPlay()
            emptyGrid()
            btnLeftListener(game, wordsList, chrono)
            //setHoldBtn ()
        }
        else if (btnRight.className == "btn triangle hold" && btnLeft.className == "btn start"){
            
            console.log("party blocked")
        }
        return
        //else if(btnRight.className=="btn triangle hold" && btnLeft.className=="btn stop"){}

    }

    // --------------------------------
    // Window event listener
    // --------------------------------

    window.addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM entièrement chargé et analysé");
        getJSONDictionnary().then(res => {
            console.log(res);
            btnLeft.addEventListener('click', function (evt) { btnLeftListener(game, wordsList, chrono) });
            btnLeft.click();
            btnHowTo.addEventListener('click', btnHowToListener)
            btnRight.addEventListener('click', function (evt) { btnRightListener(game, wordsList,  chrono) });
    
    
        })
      
    });


}());
