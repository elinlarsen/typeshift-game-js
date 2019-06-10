class Playset{
    constructor(arrWords){ 
        this.words=arrWords; 
        this.pseudos=[]; 
        this.proposedCombination=[];
    }

    /** 
    * split words to letters
    */ 

    splitWordsToLetter(){
        var letters=[]
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
    * check whether a combination of words proposed by the user is a real word
    */

    check(combinattion){
        //check if the combination made by a drag and drop of a letter corresponds to a word
        //use this.proposedCombination=[];
    }

    
}