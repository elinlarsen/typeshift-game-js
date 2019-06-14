import { Game } from "./game.js"


(function () {
    "use strict";

    // --------------------------------
    // Playset variables
    // --------------------------------
    var allWords, allFrequentWords, wordsList = [];
 
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
                resolve("dictionnary read");
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
            wordsList = createGameSet(allFrequentWords, 3, [4, 5, 6])
        })
    }
    getJSONCleanData()

    const chrono = new Chronometer()
    const game = new Game(allWords)
    const btnRight = document.getElementById("btnRight")
    var btnLeft = document.getElementById('btnLeft');
    var minDec = document.getElementById('minDec');
    var minUni = document.getElementById('minUni');
    var secDec = document.getElementById('secDec');
    var secUni = document.getElementById('secUni');
    var grid = document.getElementById("grid");
    var foundAll = document.getElementById("found-words");

    // --------------------------------
    // Data processing : reading, cleaning, filtering, shuffling
    // --------------------------------

    const shuffle = (array) => {
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

    function createGameSet(words, nbInSet, lengthsToFilter) {
        var fullArray = [];
        const clean = cleanWords(words)
        const nbOfSets = Math.floor(words.length / nbInSet);
        for (let i = 0; i < nbOfSets; i += nbInSet) { //for each set 
            for (let l = 0; l < lengthsToFilter.length; l++) { //for a given word length
                let len = lengthsToFilter[l];
                let byLength = filterByLengthEqual(len, clean) //filter the words by this length              
                let set = byLength.slice(i, i + nbInSet)
                if (set !== 'undefined' && set.length == 3) { fullArray.push(set) }
            }
        }
        return fullArray
    }


    // --------------------------------
    // Create HTML content 
    // --------------------------------

    function createLetterElement(l, index, indexWord) {
        const letter = document.createElement("span");
        grid.appendChild(letter);
        letter.className = "cell letter";
        letter.textContent = l;

        if (indexWord == 0) { letter.style.gridRow = 2; /*letter.setAttribute("row", "2")*/ }
        if (indexWord == 1) { letter.style.gridRow = 3; /*letter.setAttribute("row", "3") */ }
        if (indexWord == 2) { letter.style.gridRow = 4; /*letter.setAttribute("row", "4")*/ }

        if (index == 0) { letter.style.gridColumn = 2; /*letter.setAttribute("col", "2")*/ }
        if (index == 1) { letter.style.gridColumn = 3; /*letter.setAttribute("col", "3") */ }
        if (index == 2) { letter.style.gridColumn = 4; /*letter.setAttribute("col", "4") */ }
        if (index == 3) { letter.style.gridColumn = 5; /*letter.setAttribute("col", "5") */ }
        if (index == 4) { letter.style.gridColumn = 6; /*letter.setAttribute("col", "6") */ }
        if (index == 5) { letter.style.gridColumn = 7; /*letter.setAttribute("col", "7") */ }
        if (index == 6) { letter.style.gridColumn = 8; /*letter.setAttribute("col", "8") */ }

        letter.setAttribute("draggable", "true");
    }

    function createEmptyElement(count, columnIndex) {
        var shadow = document.createElement("span");
        grid.appendChild(shadow);
        shadow.setAttribute("draggable", "false");
        shadow.setAttribute("dropzone", "false");

        if (count == 2) {
            shadow.className = "cell shadow";
            shadow.style.gridRow = 3;
            shadow.style.gridColumn = columnIndex;
        }
        else { shadow.className = "cell invisible" }
    }

    function createArrowRow(direction, len) {
        for (let i = 0; i < len; i++) {
            if (direction == "up" || direction == "down") {
                var arr = document.createElement("span");
                arr.setAttribute("draggable", "false");
                arr.className = "cell arrow " + direction;
                grid.appendChild(arr);
            }
            else throw Error("direction must either be up or down");
        }
    }

    function drawCells(letters) {
        var count = 1;
        const len = letters[0].length;

        if(!grid.firstChild){
            // first row
            createEmptyElement(count, 1); // col1 
            createArrowRow("down", len); // col2 ... col 2+ len
            createEmptyElement(count, len + 2); // col 2 + len +1

            // rows with letters 
            letters.forEach((element, indexWord) => {
                createEmptyElement(count, 1);
                element.forEach((l, index) => { createLetterElement(l, index, indexWord) });
                createEmptyElement(count, len + 2);
                count++
            });
            // last rows
            createEmptyElement(count, 1);
            createArrowRow("up", len);
            createEmptyElement(count, len + 2);
        }
    }

    function emptyGrid() {
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }

    function emptyFooter(){
        while(foundAll.firstChild){
            foundAll.removeChild(foundAll.firstChild)
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


    function createSpanAllFound(founds) {
        if(!foundAll.firstChild){
            const nbFounds=founds.length;
            const nbCols= Math.floor(nbFounds/3)+1;
            var nbInCols;
            if(nbFounds<=6){ nbInCols=2}
            else if (nbFounds<=12){nbInCols=3}
            else {nbInCols=4}

            for (let i=0; i<nbCols; i++){
                const colWords=document.createElement("span");
                colWords.className="col"+i
                for (let f = 0; f < nbInCols; f++) {  
                    const y=f+i*nbInCols;
                    foundAll.appendChild(colWords);         
                    const foundEl = document.createElement("span");
                    colWords.appendChild(foundEl); 
                    foundEl.className = "found col "+i;
                    foundEl.textContent = founds[y];                 
                }
            }
        } 
        else {
            console.log("footer of words has already words", foundAll.firstChild)
        }

    }

    function createSpanNotFound(founds){
        var notFound=playset.retrieveRealWord()
    }



    // --------------------------------
    // Dragging letters
    // --------------------------------

    const dragLetters = (dic, playset) => {
        var draggedElement = null;
        const L = document.querySelectorAll(".letter")
        const nbLetters = L.length;
        const wordLen = L.length / 3;

        const dragStart = (ev, j) => {
            console.log('------------------------------------')
        }

        const dragOver = (ev) => {
            ev.preventDefault(); // enables to drop
        }

        const dropAndCheck = (ev, j, dic) => {
            const dragRow = parseInt(draggedElement.style.gridRowStart);
            const dragCol = parseInt(draggedElement.style.gridColumnStart);
            const dropRow = parseInt(ev.target.style.gridRowStart);
            const dropCol = parseInt(ev.target.style.gridColumnStart);

            if (dragRow > dropRow && dragCol == dropCol) { dragDropUp(ev, j) }
            else if (dragRow < dropRow && dragCol == dropCol) { dragDropDown(ev, j) }

            var prop = new Proposition(wordLen, dic, playset.found);
            prop.turnBlue();
            prop.found==null ? console.log("not a word") :game.setFoundWord(prop.found)           
            endParty(); //are all letters been found ?   
        }

        const dragDropUp = (ev, j, dic) => {
            const rowPos = parseInt(L[j].style.gridRowStart);
            if (j - 2 * wordLen >= 0) {
                L[j].style.gridRowStart = rowPos - 1;
                L[j - wordLen].style.gridRowStart = rowPos - 2;
                L[j - 2 * wordLen].style.gridRowStart = rowPos - 3;
            }
        }

        const dragDropDown = (ev, j, dic) => {
            const rowPos = parseInt(L[j].style.gridRowStart)
            if (j + 2 * wordLen < nbLetters) {
                L[j].style.gridRowStart = rowPos + 1
                L[j + wordLen].style.gridRowStart = rowPos + 2
                L[j + 2 * wordLen].style.gridRowStart = rowPos + 3
            }
        }

        const endParty = ()=>{
            var R=document.querySelectorAll(".rightGuess")
            if(L.length==R.length)
            {
                let allFounds=game.getFoundWords(game.indexOfPlay)
                console.log("all letters found !", "words found : ", allFounds)
                createSpanAllFound(allFounds)
                btnLeft.click();
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
            L[next].addEventListener('drop', function (evt) { dropAndCheck(evt, i, dic); })

        }

        for (let m = 2 * wordLen - 1; m < nbLetters; m++) {
            let prev = m - wordLen
            L[m].addEventListener("dragstart", function (evt) {
                draggedElement = evt.target;
                dragStart(evt, m);
            })
            L[prev].addEventListener('dragover', function (evt) { dragOver(evt) })
            L[prev].addEventListener('drop', function (evt) { dropAndCheck(evt, m, dic) })
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
        let indexOfPlay = game.indexOfPlay;
        let words = wordsList[indexOfPlay];
        let dic = allWords;
        let playset = new Playset(words);
        let letters = playset.selectRandomlyPseudo();

        if (btnLeft.className == "btn start" && btnLeft.textContent == "START") {
            chrono.startClick();
            drawGrid(letters);
            drawCells(letters);
            dragLetters(dic, playset);
            printTime();
            setStopBtn();
            setHoldBtn();
        }
        else if (btnLeft.className == "btn stop" && btnLeft.textContent == "STOP") {
            chrono.stopClick();
            setStartBtn();
            setNextBtn();
            console.log("End of party, go to the next one !");
        }
    }


    // --------------------------------
    // Next Play button  (rigth button)
    // --------------------------------

    const btnRightListener = (game, wordsList, chrono) => {
        if (btnRight.className == "btn triangle next" && btnLeft.className == "btn start") {

            console.log("next party !");
            setNextBtn()
            game.nextPlay()
            emptyGrid()
            emptyFooter()
            chrono.resetClick()
            btnLeftListener(game, wordsList, chrono)
            //setHoldBtn ()
        }
        else if (btnRight.className == "btn triangle hold" && btnLeft.className == "btn stop") {
            throw new Error("party blocked")
        }
    }

    // --------------------------------
    // Window event listener
    // --------------------------------

    window.addEventListener("DOMContentLoaded", (event) => {
        getJSONDictionnary().then(res => {
            console.log(res);
            btnLeft.addEventListener('click', function (evt) { btnLeftListener(game, wordsList, chrono) });
            btnLeft.click();
            btnRight.addEventListener('click', function (evt) { btnRightListener(game, wordsList, chrono) });
        })

    });


}());
