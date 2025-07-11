import Player from "./Player.js";

export default class GamePlayer{
    constructor(player){
        this.player = player
        this.quantT = 6;
        this.quantO = 6;
    }

    useLetterT(){
        if(this.quantT > 0){
            this.quantT--;
        } else {
            throw new Error ("There are no more 'T' to be used");
        }
        
    }

    useLetterO(){
        if(this.quantT > 0){
            this.quantT--;
        } else {
            throw new Error ("There are no more 'O' to be used");
        }
    }
}