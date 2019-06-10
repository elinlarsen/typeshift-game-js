const underscore= require('underscore')

// --------------------------------
// split words to letters
// --------------------------------

 function splitWordsToLetter(wordsArray){
    letters=[]
    for (let i=0; i<wordsArray.length; i++){
        lettersI=wordsArray[i].map( (x) => { return x.split('') })
        console.log(lettersI)
        letters.push(lettersI)
    }  
    return letters
}

wordsList=[["spell", "great", "words"], 
["array", "lover", "still"]]
splitWordsToLetter(wordsList)


// --------------------------------
// replacing letter without mutating the array
// --------------------------------

function replaceLetter(letterArray, index, value){
    //return letterArray.map( (letter) => {
       // if(letter==ToReplace){ letter=Replacing}
        //return letter 
    //})
    const res = letterArray.slice(0);
    res[index]=value
    return res
}


// --------------------------------
// array comparison, array inclusion in array, add pseudo word
// --------------------------------

function includeArr(arr1,arr2){

    res=underscore.isEqual(arr1[0],arr2) //initialisation

     arr1.forEach(el1 => { 
        //console.log( el1, "is equal to ", arr2, "is", underscore.isEqual(el1,arr2))
        return res = res || underscore.isEqual(el1,arr2)
    });
    //console.log(res)
    return res

}

function addPseudoWord(arr, pseudo){
    if(!includeArr(arr,pseudo))
    {arr.push(pseudo)
    //console.log( pseudo ,'is not included in the array')
    }
    else console.log('doublon!');
    return arr
}


// --------------------------------
// generate all possible combinations of letters keeping their position inside the words
// --------------------------------

// generate all but all duplicates 
function generatePseudoWords(playSet){
    var nbWords=playSet.length;
    var wordLength=playSet[0].length
    var pseudoWords=[]
    playSet.forEach(  (word, indexW) =>{
     
        word.forEach( (letter, indexL) => {

            for (p=0; p< nbWords; p++)
            {
                pseudo=replaceLetter(word, indexL, playSet[p][indexL])
                addPseudoWord(pseudoWords, pseudo)

                for (q=indexL; q<wordLength; q++)
                {
                    if (p<nbWords-1){
                        next=replaceLetter(pseudo, q, playSet[p+1][q])
                        addPseudoWord(pseudoWords, next)
                    }

                    if(p>=1){
                        prev=replaceLetter(pseudo, q, playSet[p-1][q])
                        addPseudoWord(pseudoWords, prev)
                    }
                }   
            }
        
        })

    })
    console.log(pseudoWords)
    console.log(pseudoWords.length)
    return pseudoWords
}



