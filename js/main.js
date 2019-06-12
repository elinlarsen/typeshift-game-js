/**
 * @todo: manage stop button, display results at the end of a party OR when touching stop
 * @todo : drag an drop button
 * @todo : function check combination and display the change of colors when the combination is right
 * @todo : display instructions , pop hover 
 */

const jsonPath="../data/dictionary.json"
// var dicObj = $.getJSON(jsonPath)
	

function getJSONData() {
    fetch(jsonPath, {
        method: "GET"
    }).then(res => {
        console.log(res)
        return res.json();
    })
}

//dicObj=getJSONData()


//var dicObj = require(jsonPath); //require reads directly a json file, require() is not part of the standard JavaScript API. // But in Node.js, it's a built-in function with a special purpose: to load modules.

//wordsDic=Object.keys(dicObj)

wordsDicShort=["boy", "cup", "soy", "bee", "body", "cop", "buy", "sea"]

// --------------------------------
// Playset
// --------------------------------
const long = ["spell", "great", "words"]
const medium = ["abcd", "efgh", "ijkl"]
const short = ["bey", "sua", "cop"]

const playset3words = new Playset(short, wordsDicShort)
const letters = playset3words.letters
const pseudos = playset3words.generatePseudoWords()
const real= playset3words.realWords
console.log(real);



// --------------------------------
// Create HTML content 
// --------------------------------
var grid = document.getElementById("grid")
var gridChildNodes=grid.childNodes

function createLetterElement(l, index, indexWord) {
    const letter = document.createElement("span")
    grid.appendChild(letter);
    letter.className = "cell letter"
    letter.textContent = l

    if (indexWord == 0) { letter.style.gridRow = 2; letter.setAttribute("row", "2")}
    if (indexWord == 1) { letter.style.gridRow = 3; letter.setAttribute("row", "3") }
    if (indexWord == 2) { letter.style.gridRow = 4 ; letter.setAttribute("row", "4")}

    if (index == 0) { letter.style.gridColumnStart = 2; letter.setAttribute("col", "2") }
    if (index == 1) { letter.style.gridColumn = 3; letter.setAttribute("col", "3") }
    if (index == 2) { letter.style.gridColumn = 4; letter.setAttribute("col", "4") }
    if (index == 3) { letter.style.gridColumn = 5; letter.setAttribute("col", "5") }
    if (index == 4) { letter.style.gridColumn = 6; letter.setAttribute("col", "6") }

    letter.setAttribute("draggable", "true")
}

function createEmptyElement(count, columnIndex) {
    shadow = document.createElement("span")
    grid.appendChild(shadow);
    shadow.setAttribute("draggable", "false")
    shadow.setAttribute("dropzone", "false")

    if (count == 2) {
        shadow.className = "cell shadow"
        shadow.style.gridRow = 3
        shadow.style.gridColumn = columnIndex
    }
    else {shadow.className = "cell invisible"}
}

function createArrowRow(direction, len) {
    for (let i = 0; i < len; i++) {
        if (direction == "up" || direction == "down") {
            arr = document.createElement("span")
            arr.setAttribute("draggable", "false")
            arr.className = "cell arrow " + direction
            grid.appendChild(arr)
        }
        else throw Error("direction must either be up or down")}
}

function drawCells(letters) {
    var count = 1;
    console.log(count);
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

getElement = (dic) => {
    const L = document.querySelectorAll(".letter")
    const nbLetters = L.length;
    const wordLen = L.length / 3;
    console.log("word length : ", wordLen, "nb of letters", nbLetters)

    for (let i = wordLen; i < 2 * wordLen; i++) { L[i].setAttribute("draggable", "false") }

   for (let i = 0; i < wordLen; i++) {
        let next = i + wordLen 
        L[i].addEventListener("dragstart", function (evt) { dragStart(evt, i) }) 
        L[next].addEventListener('dragover', function (evt) { dragOver(evt) })
        L[next].addEventListener('drop', function (evt) { dropAndCheck(evt, i, dic) })     
    }

    for (let m = 2 * wordLen - 1; m < nbLetters; m++) {
        let prev = m - wordLen
        L[m].addEventListener("dragstart", function (evt) { dragStart(evt, m,) })
        L[prev].addEventListener('dragover', function (evt) { dragOver(evt) } )
        L[prev].addEventListener('drop', function (evt) { dropAndCheck(evt, m, dic) })      
    }

    dragStart = (ev, j) => {
        console.log('------------------------------------') 
        console.log("drag START, letter dragged ", ev.target.textContent,'=?', L[j].textContent, " pos ", j);
        setTimeout(() =>{ev.target.className='cell invisible'}, 0) 
    }

    dragOver = (ev) => {
        ev.preventDefault() // enables to drop
    }

    /*
    dragEnd= ()=>{
        var proposition= new Proposition(wordLen, dic)
        var prop=proposition.proposed
        var guess=proposition.isGuessRight()
        console.log("is the combination proposed, ", prop , "right ? ", guess)
        proposition.turnBlue()
    }
    */ 

    dropAndCheck = (ev,j, dic) =>{

        L[j].className='cell letter'

        if(j< wordLen){dragDropDown(ev, j)}
        else if(j>= 2 * wordLen){dragDropUp(ev, j)}

        var proposition= new Proposition(wordLen, dic)
        var prop=proposition.proposed
        var guess=proposition.isGuessRight()
        console.log("is the combination proposed, ", prop , "right ? ", guess)
        proposition.turnBlue()
    }

    dragDropUp = (ev, j, dic) => { 
        let rowPos = parseInt(L[j].style.gridRowStart)
        console.log("drop UP, grid row : ", rowPos, "next grid row : ", rowPos + 1)
        
        L[j].style.gridRowStart = rowPos - 1
        L[j - wordLen].style.gridRowStart = rowPos - 2
        L[j - 2 * wordLen].style.gridRowStart = rowPos - 3
    }

    dragDropDown = (ev, j, dic) => {       
        let rowPos = parseInt(L[j].style.gridRowStart)
        console.log("Drop DOWN, grid row : ", rowPos, "next grid row : ", rowPos + 1)
        //L[j].style.gridRowStart = rowPos + 1
        //L[j + wordLen].style.gridRowStart = rowPos + 2
    // L[j + 2 * wordLen].style.gridRowStart = rowPos + 3
    }

}  // end of get element function

// --------------------------------
// Checking proposed combination of letters
// --------------------------------

class Proposition{
    constructor(wordLength, dic){
        this.grid= document.getElementById("grid");
        this.nodes=grid.childNodes;
        this.len=wordLength;
        this.indexStart=(this.len+2)*2+1;
        this.indexEnd= this.indexStart+this.len;
        this.dic=dic;
    }

    getCombination(){
        const row=3
        const cols=[...Array(this.len+2).keys()];       
        var proposed=[]
        var indexProposed=[]
        for (let c=2; c<cols.length; c++){
            for(let i=0; i< this.nodes.length; i++){
                //proposed.push(this.gridNodes[i].textContent)
                if (this.nodes[i].style.gridRowStart==row && this.nodes[i].style.gridColumnStart==c){
                    proposed.push(this.nodes[i].textContent)
                    indexProposed.push(i)
                }
            }
        }
        return {proposed: proposed.join(""), index: indexProposed}
    }

    get proposed(){
        return this.getCombination()
    }

    isGuessRight () {
        var prop=this.getCombination().proposed
        if (this.dic.includes(prop)){return true}
        else {return false}
    }

    turnBlue (){
        var res=this.isGuessRight()
        var index=this.getCombination().index
        if(res){
            for (let i=0; i<index.length; i++){
                console.log(index[i])
                console.log(this.nodes)
                this.nodes[index[i]].className =' cell letter rightGuess'
            }
        }
    }
}


// --------------------------------
// Chronometer
// --------------------------------
const chrono = new Chronometer()

var btnLeft = document.getElementById('btnLeft');
var minDec = document.getElementById('minDec');
var minUni = document.getElementById('minUni');
var secDec = document.getElementById('secDec');
var secUni = document.getElementById('secUni');

function printTime() {
    window.setInterval(() => { printMinutes(); printSeconds() }, 1000)
}

function printMinutes() {
    min = chrono.twoDigitsNumber(chrono.getMinutes())
    minDec.textContent = min.charAt(0)
    minUni.textContent = min.charAt(1)
}

function printSeconds() {
    sec = chrono.twoDigitsNumber(chrono.getSeconds())
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

// Start/Stop Button function
btnLeftListener = () => {
    if (btnLeft.className == "btn start" && btnLeft.textContent == "START") {
        chrono.startClick()
        drawGrid(letters)
        drawCells(letters)
        getElement(wordsDicShort)
        printTime()
        setStopBtn()
        
    }
    else if (btnLeft.className == "btn stop" && btnLeft.textContent == "STOP") {
        chrono.stopClick()
        setStartBtn()
        // clear letter box and display results 
    }
}


window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

    btnLeft.addEventListener('click', btnLeftListener);


});



