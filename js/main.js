/**
 * @todo: manage stop button, display results at the end of a party OR when touching stop
 * @todo : drag an drop button
 * @todo : function check combination and display the change of colors when the combination is right
 * @todo : display instructions , pop hover 
 */
// --------------------------------
// Playset
// --------------------------------
const long = ["spell", "great", "words"]
const medium = ["abcd", "efgh", "ijkl"]
const short = ["buy", "sea", "cop"]

const playset3words = new Playset(long)
const letters = playset3words.letters
const pseudos = playset3words.generatePseudoWords()


// --------------------------------
// Create HTML content 
// --------------------------------
const grid = document.getElementById("grid")

function createLetterElement(l, index, indexWord) {

    console.log("letter : ", l, "index : ",index, "indexWord", indexWord);
    
    const len = letters[0].length
    const nbWords = letters.length
    const nbRows = (nbWords - 1) * 2 + 2
    const nbColumns = len + 2
    const wordLen=len/nbRows
    const letter = document.createElement("span")
    grid.appendChild(letter);
    letter.className = "cell letter"
    letter.textContent = l
    
    if (indexWord==0){letter.style.gridRow=2}
    if (indexWord==1){ letter.style.gridRow=3}
    if (indexWord==2){letter.style.gridRow=4}

    if(index==0){letter.style.gridColumnStart=2}
    if(index==1){letter.style.gridColumn=3}
    if(index==2){letter.style.gridColumn=4}
    if(index==3){letter.style.gridColumn=5}
    if(index==4){letter.style.gridColumn=6}
   
   
    letter.setAttribute("draggable", "true")
    letter.setAttribute("dropzone", "false")
    //letter.setAttribute("value", l)
}

function createEmptyElement(count, len) {
    shadow = document.createElement("span")
    grid.appendChild(shadow);
    shadow.setAttribute("draggable", "false")
    shadow.setAttribute("dropzone", "false")
    if (count == 2) {
        shadow.className = "cell shadow"
    }
    else {
        shadow.className = "cell invisible"
    }
    return shadow
}

function createArrowRow(direction, len) {
    for (let i = 0; i < len; i++) {
        if (direction == "up" || direction == "down") {
            arr = document.createElement("span")
            arr.setAttribute("draggable", "false")
            arr.className = "cell arrow " + direction
            grid.appendChild(arr)
        }
        else throw Error("direction must either be up or down")
    }
}

function drawCells(letters) {
    var count = 1;
    console.log(count);
    const len = letters[0].length
    // first row
    createEmptyElement(count, len) // col1 
    createArrowRow("down", len) // col2 ... col 2+ len
    createEmptyElement(count, len) // col 2 + len +1

    // rows with letters 
    letters.forEach( (element,indexWord)=> {
        createEmptyElement(count)
        element.forEach((l, index) => { createLetterElement(l, index, indexWord) })
        createEmptyElement(count)
        count++
    });

    // last rows
    createEmptyElement(count, len)
    createArrowRow("up", len)
    createEmptyElement(count, len)
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

getElement = () => {
    const L = document.querySelectorAll(".letter") 
    //console.log(L);
    
    const nbLetters = L.length;
    const wordLen = L.length / 3;
    console.log("word length : ", wordLen, "nb of letters", nbLetters)

    for (let i=wordLen; i<2*wordLen; i++){
        L[i].setAttribute("draggable", "false")
    }

    //for (let i = 0; i < wordLen; i++) {
        //console.log(i)
        //console.log(L[i].textContent)

            i=0
            next=i + wordLen

            //console.log( "letters is in first row", L[i].textContent )
            //console.log("index of next letter" + next, "next letter : ", L[next].textContent)
            
            L[i].addEventListener("dragstart", function(evt){dragStart(evt, i, L)}) 
            L[next].addEventListener('dragover', function (evt) { dragOver(evt) })
            L[next].addEventListener('dragenter', function (evt) { dragEnter(evt, i, next, L) })
            L[next].addEventListener('dragleave', function (evt) { dragLeave(evt, i,next, L) })
            L[next].addEventListener('drop', function (evt) {dragDropDown(evt,i,L)})
            L[i].addEventListener("dragend", function (evt) {dragEnd(evt,i,L)})
    //}
    /* for (let m=2*wordLen-1; i< nbLetters; i++){
            prev=m - wordLen
            //console.log( "letters is in third row",L[m].textContent )
            //console.log("index of prev letter" + prev, "prev letter", L[prev].textContent)
            
            L[m].addEventListener("dragstart", function(evt){dragStart(evt, m, L)})
            L[prev].addEventListener('dragover', function (evt) { dragOver(evt) })
            L[prev].addEventListener('dragenter', function (evt) { dragEnter(evt, m, prev, L) })
            L[prev].addEventListener('dragleave', function (evt) { dragLeave(evt, m,prev, L) })
            L[prev].addEventListener('drop', function (evt) {dragDropUp(evt,m,L)})       
            L[m].addEventListener("dragend", function (evt) {dragEnd(evt,m,L)})
    } */

dragStart = (ev, j, L) => {
    console.log("drag start, letter dragged is : " , ev.target.textContent, 'should be equal to', L[j].textContent);
    const wordLen = L.length / 3;
    //setTimeout(() =>{event.target.className='cell invisible';}, 0) 
}

dragEnd = (ev,j, L) => {
    console.log("drag end, letter that ended the drag is ", ev.target.textContent, "should be equal to ", L[j].textContent);
    ev.preventDefault();
    //dragged.className = 'cell letter'
}

dragOver =(ev) =>{
 ev.preventDefault() // enables to drop
}


dragEnter =(ev, j, follow, L)  => {
    ev.preventDefault();
    target = ev.target
    targetLetter=target.textContent
    console.log("drag enter");
    console.log("index i", j, "index follow", follow)
    console.log("DRAGGED letter", L[j].textContent, "ENTERS the target", targetLetter, 'should be equal to', L[follow].textContent );
    
    if(L[follow].textContent== targetLetter){ 
        target.setAttribute("dropzone", "true")} 
    else{
        target.setAttribute("dropzone", "false")
        // make conditions on mouse mouement
    }     
}


dragLeave = (ev, j, follow, L) => {
    ev.preventDefault();
    console.log("DRAGGED letter", L[j].textContent, "LEAVES the target", ev.target.textContent,"should be equal to ", L[follow].textContent);
    if(L[follow].textContent== targetLetter){ 
        target.setAttribute("dropzone", "false")} 
    //if(i-wordLen>=0){L[i-wordLen].setAttribute("dropzone", "false")} else{console.log("cannot go");}
    //if(i+ wordLen<L.length){L[i+ wordLen].setAttribute("dropzone", "false")} else{console.log("cannot go");}
}


dragDropUp = (ev, j, L) => {
    ev.preventDefault()
    const wordLen = L.length / 3;
    target = ev.target
    console.log(" drop up ");

    if(j>= 2*wordLen){ 
    //if(i>= 2*wordLen && target.querySelector([dropzone=true])){ 
        console.log("changing position with transition") // transition of each cell letter belonging to the same column up 
        L[j].style.gridRow +=1        
        L[j-wordLen].style.gridRow +=1
        L[j-2*wordLen].style.gridRow +=1
    }   
}

dragDropDown = (ev,j,L) =>{
    ev.preventDefault()
    const wordLen = L.length / 3;
    console.log(" drop down");
    target = ev.target

    if(j< wordLen){
    //if(i< wordLen  && target.querySelector([dropzone=true])){  // transition of each cell letter belonging to the same column up 
        
        rowPos= parseInt(L[j].style.gridRowStart)
        console.log("grid row : ",rowPos)
        console.log("next grid row : ",rowPos+1)

        L[j].style.gridRowStart =  rowPos + 1
        //L[j].style.transition= "all 1s linear"
        console.log("grid row : ",L[j].style.gridRowStart)
        L[j+wordLen].style.gridRowStart = rowPos+2
        L[j+2*wordLen].style.gridRowStart = rowPos+3
    }
}


} // end of get element function

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
    btnLeft.classList = "btn start";
}

// Start/Stop Button function
btnLeftListener = () => {
    if (btnLeft.className == "btn start" && btnLeft.textContent == "START") {
        chrono.startClick()
        drawGrid(letters)
        drawCells(letters)
        getElement()
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



