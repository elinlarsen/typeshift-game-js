/**
 * Dataset generated : 
 * - easy words : length max = 5 
 * - max length : testEasy (3 words), testLong (10 words), 100, 200, 
 */

// --------------------------------
// read the json file, extract the list of words
// --------------------------------

const jsonPath="./dictionary.json"

var dicObj = require(jsonPath); //require reads directly a json file, require() is not part of the standard JavaScript API. // But in Node.js, it's a built-in function with a special purpose: to load modules.

words=Object.keys(dicObj)

/**
 * @todo: find "replace" for each string of an array 
 * @todo : create unitary test for each function
 */
//words=words.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');


// --------------------------------
// clean data set : replace everything thatis not a letter by ""
// --------------------------------
function cleanWords(words){
    //return words.map((x) => {x.replace(/[^a-zA-Z ]/g, "")})
    return words.map( (x) => {return x.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')} )   
}

// --------------------------------
//select randomly X words from the list of words
// --------------------------------
function selectRandomlyWords(nbWordsToSample, words){
    wordsSampled=[];
    for (let i=0; i<nbWordsToSample; i++){
        randomIndex=Math.floor(Math.random() *words.length);
        wordsSampled.push(words[randomIndex]);
    }
 return wordsSampled
}

// --------------------------------
// filter words by length
// --------------------------------

function filterByLengthEqual(lengthToFilter, words){
    return words.filter(word => word.length == lengthToFilter);
}
function filterByLengthInf(lengthToFilter, words){
    return words.filter(word => word.length < lengthToFilter);
}


// --------------------------------
// Create set of words : each set corresponds to one game play
// --------------------------------

function createPartySet(words, nbInSet, lengthToFilter){
    fullArray=[];
    nbOfSets=Math.floor(words.length/nbInSet);
    clean=cleanWords(words)
    for (let i=0; i<nbOfSets; i++){
        byLength=filterByLengthEqual(lengthToFilter, clean)

        randomSet=selectRandomlyWords(nbInSet, byLength)

        fullArray.push(randomSet)
    }
    return fullArray
}
