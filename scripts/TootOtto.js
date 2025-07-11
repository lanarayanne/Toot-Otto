
import CellState from "./CellState.js";
import GamePlayer from "./GamePlayer.js";
import Player from "./Player.js";


export default class TootOtto {
    constructor(player) {
        this.turn = player;
        this.letter;
        this.rows = 4;
        this.cols = 6;
        this.board = [];
        this.player1 = new GamePlayer(Player.PLAYER1);
        this.player2 = new GamePlayer(Player.PLAYER2);

        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = CellState.EMPTY;
            }
        }

        console.log(this.board);
    }

    getBoard() {
        return this.board;
    }

    getTurn() {
        return this.turn;
    }

    inLimit(value, limit) {
        return (value >= 0 && value < limit)
    }

    onBoard({x, y}) {
        return (this.inLimit(x, this.rows) && this.inLimit(y, this.cols));
    }

    move(cell, letter) {
        let { x, y } = cell;
        let player = (this.turn === Player.PLAYER1) ? this.player1 : this.player2;
        if (!this.onBoard(cell)) {
            throw new Error("Cell is not on board");
        }
        if (this.board[x][y] != CellState.EMPTY) {
            throw new Error("Cell is not empty");
        }
        if (this.turn === Player.PLAYER1) {
            this.board[x][y] = CellState.PLAYER1;
            letter === 'T' ? player.useLetterT : player.useLetterO;
            this.turn = Player.PLAYER2;
        } else {
            this.board[x][y] = CellState.PLAYER2;
            letter === 'T' ? player.useLetterT : player.useLetterO;
            this.turn = Player.PLAYER1;
        }

        // return this.endOfGame();
    }


}