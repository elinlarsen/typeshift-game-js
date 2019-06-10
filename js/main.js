/**
 * @todo: manage stop button, display results at the end of a party OR when touching stop
 * @todo : drag an drop button
 * @todo : function check combination and display the change of colors when the combination is right
 * @todo : display instructions , pop hover 
 */
// --------------------------------
// Playset
// --------------------------------
const words=["spell", "great", "words"]
const easy=["buy", "sea", "cop"]
const playset3words= new Playset(easy)
const letters= playset3words.letters
const pseudos=playset3words.generatePseudoWords()

function createLetterElement(row, l){
    letter=document.createElement("span")
    row.appendChild(letter);
    letter.className="letter"
    letter.textContent=l
}

function createEmptyElement(row, count){
    if (count==2){
        shadow.className="shadow"
        shadow.textContent="S" + count
    }
    else{
        shadow=document.createElement("span")
        shadow.className="invisible"
        row.appendChild(shadow);
        shadow.textContent="I" + count
    }
}


function createArrowRow(direction, len){
    createRow()
    for (let i=0; i<len; i++){
        if (direction=="up" || direction =="down"){
            arr=document.createElement("span")
            arr.className="arrow "+direction
            row.appendChild(arr)
        }
        else throw Error ("direction must either be up or down")
    }   
}

function createWrapper(){
    wrap=document.createElement("div")
    wrap.className="wrapper"
    main.appendChild(wrap)
}

function createRow(){
    row=document.createElement("div")
    row.className="row"
    //wrap.appendChild(row)
    main.appendChild(row)
}


function createLetterBox(letters){
    //createWrapper()
    main=document.getElementById("main")
    var count=1;
    const len=letters[0].length
    createArrowRow("down", len)
    letters.forEach(element => {   
        createRow() 
        createEmptyElement(row, count)
        element.forEach( l => {  createLetterElement(row, l)})  
        createEmptyElement(row, count)
        count++
    });
    createArrowRow("up", len)
}



// --------------------------------
// Chronometer
// --------------------------------
const chrono=new Chronometer()

var btnLeft     = document.getElementById('btnLeft');
var minDec      = document.getElementById('minDec');
var minUni      = document.getElementById('minUni');
var secDec      = document.getElementById('secDec');
var secUni      = document.getElementById('secUni');

function printTime() {
    window.setInterval( () => {printMinutes(); printSeconds()}, 1000)
}

function printMinutes() {
    min=chrono.twoDigitsNumber(chrono.getMinutes())
    minDec.textContent=min.charAt(0)
    minUni.textContent=min.charAt(1)   
}

function printSeconds() {
    sec=chrono.twoDigitsNumber(chrono.getSeconds())
    secDec.textContent=sec.charAt(0)
    secUni.textContent=sec.charAt(1) 
}

function setStopBtn() {
    btnLeft.textContent="STOP";
    btnLeft.className="btn stop";
}

function setStartBtn() {
    btnLeft.textContent="START";
    btnLeft.classList= "btn start";  
}

// Start/Stop Button function
btnLeftListener = () =>{
    if (btnLeft.className=="btn start" && btnLeft.textContent=="START"){
        chrono.startClick()
        createLetterBox(letters)
        printTime()
        setStopBtn()    
    }    
    else if(btnLeft.className=="btn stop" && btnLeft.textContent=="STOP"){
        chrono.stopClick() 
        setStartBtn()
        // clear letter box and display results 
    }
}


window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

    btnLeft.addEventListener('click', btnLeftListener);

  });



