
// --------------------------------
// Playset
// --------------------------------
const words=["spell", "great", "words"]
const easy=["buy", "sea", "cop"]
const playset3words= new Playset(easy)
const letters= playset3words.letters
const pseudos=playset3words.generatePseudoWords()



function createLetterBox(letters){
    main=document.getElementById("main")
    letters.forEach(element => {
        row=document.createElement("div")
        row.className="row"
        main.appendChild(row)
        element.forEach( l => {
            letter=document.createElement("span")
            row.appendChild(letter);
            letter.className="letter"
            letter.textContent=l
        })      
    });
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
    }
}


window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

    btnLeft.addEventListener('click', btnLeftListener);

  });



