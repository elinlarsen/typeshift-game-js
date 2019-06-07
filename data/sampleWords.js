/**
 * Dataset generated : 
 * - easy words : length max = 5 
 * - max length : testEasy (3 words), testLong (10 words), 100, 200, 
 */

// --------------------------------
// read the json file, extract the list of wors
// --------------------------------

const jsonPath="./dictionary.json"

var dicObj = require(jsonPath); //require reads directly a json file, require() is not part of the standard JavaScript API. // But in Node.js, it's a built-in function with a special purpose: to load modules.

words=Object.keys(dicObj)

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

words3=selectRandomlyWords(3, words)
words10=selectRandomlyWords(10, words)
console.log(words3)

// --------------------------------
// filter words by length
// --------------------------------


function filterByLengthEqual(lengthToFilter, words){
    return words.filter(word => word.length == lengthToFilter);
}
wordsLength4 = filterByLength(4, words)

function filterByLengthInf(lengthToFilter, words){
    return words.filter(word => word.length < lengthToFilter);
}

wordsShort=filterByLengthInf(6, words)

// --------------------------------
// Create set of words : each set corresponds to one game play
// --------------------------------

function createWordSet(words, nbInSet, lengthToFilter){
    fullArray=[];
    nbOfSets=Math.floor(words.length/nbInset);
    for (let i=0; i<nbOfSets; i++){
        byLength=filterByLengthEqual(lengthToFilter, words)

        randomSet=selectRandomlyWords(nbInSet, byLength)

        fullArray.push(randomSet)
    }
    return fullArray
}

Set4by4=createWordSet(words, 4, 4)


// --------------------------------
// Create dataset
// --------------------------------

// 3 --------------------------------
wordsLength3 = filterByLength(3, words)

// 4 --------------------------------

wordsLength4 = filterByLength(4, words)

// 5 --------------------------------

// 6 --------------------------------

shortWords10=selectRandomlyWords(10, wordsShort)
shortWords100=selectRandomlyWords(100, wordsShort)





