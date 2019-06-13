class Game{
    constructor(allWords){
        this.levels=[1,2,3,4,5,6];
        this.indexOfPlay=0;
        this.dic=allWords
    }

    nextPlay(){
        this.indexOfPlay ++
    }

}