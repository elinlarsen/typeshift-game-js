class Playset{
    constructor(arrWords){ 
        this.words=arrWords; 
        this.pseudos=[]; 
        this.dic=arrWords.flat(); 
    }

    /** 
    * split words to letters
    */ 

    splitWordsToLetter(){
        const letters=[]
        this.words.forEach( (word) => {
        letters.push(word.split(''))
        })
        return letters
    }

    get letters() {
        return this.splitWordsToLetter();
      }

    /**
    * replacing letter without mutating the array
    */

    replaceLetter(letterArray, index, value){
        var res = letterArray.slice(0);
        res[index]=value
        return res
    }


   
    /** 
    * array comparison, array inclusion in array, add pseudo word
    */

    includeArr(arr1,arr2){
        var res=_.isEqual(arr1[0],arr2) //initialisation
        arr1.forEach(el1 => { return res = res || _.isEqual(el1,arr2) });
        return res
    }

    addPseudoWord(arr, pseudo){
        if(!this.includeArr(arr,pseudo)){arr.push(pseudo)}
        return arr
    }

    /** 
    * generate all possible combinations of letters keeping their position inside the words
    */ 
    generatePseudoWords(){
        const nbWords=this.words.length;
        const playSet=this.splitWordsToLetter()
        const wordLength=playSet[0].length
    
        playSet.forEach( (word) =>{

            word.forEach( (letter, indexL) => {

                for (let p=0; p< nbWords; p++)
                {
                    var pseudo=this.replaceLetter(word, indexL, playSet[p][indexL])
                    this.addPseudoWord(this.pseudos, pseudo)
                    for (let q=indexL; q<wordLength; q++)
                    {
                        if (p<nbWords-1){
                            var next=this.replaceLetter(pseudo, q, playSet[p+1][q])
                            this.addPseudoWord(this.pseudos, next)                           
                        }
                        if(p>=1){
                            var prev=this.replaceLetter(pseudo, q, playSet[p-1][q])
                            this.addPseudoWord(this.pseudos, prev)                
                        }
                    }   
                }               
            })
        })
        return this.pseudos
    }

     /**
     * 
     * From all generated sequences of letters, retrieve the sequences that are real words (ie are in the dictionary)
     * 
     */

    retrieveRealWord(){
        //retrieve  pseudos that are in doc 
        const realWords=[];       
        for (let p=0; p<this.pseudos.length; p++) {
            const joined=this.pseudos[p].join("")
            if(this.dic.includes(joined))
            {realWords.push(joined)}
        }
        return realWords
    }

    get realWords(){
        return this.retrieveRealWord()
    }

    /**
     * shuffle array
     */

    shuffle(array) {
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

    transpose(array){
        return array[0].map((col, i) => array.map(row => row[i]));
    }


    /**
     * select three random pseudo words to present at the beginning of a party
     */

     selectRandomlyPseudo(){
        var res=[]
        var transposed=this.transpose(this.letters)
        for (let w=0; w<transposed.length; w++){      
            res.push(this.shuffle(transposed[w]))
        }
        return this.transpose(res)
     }

    
}