import Player from "./Player.js";
import TootOtto from "./TootOtto.js";

class Interface {
    constructor(){
        this.game = null;
    }

    registerEvents(){
        this.init();
        let start = document.getElementById("start");
        start.onclick = this.init.bind(this);
    }

    init(){
        let player = Player.PLAYER1;
        this.game = new TootOtto(player);
        let table = this.game.getBoard();
        
    }

}

let gui = new Interface();
gui.registerEvents();
gui.game.move({x:1, y:2}, 'T');