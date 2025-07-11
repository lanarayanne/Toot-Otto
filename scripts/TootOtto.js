
import Winner from "./Winner.js";
import CellState from "./CellState.js";
import GamePlayer from "./GamePlayer.js";
import Player from "./Player.js";
import Letter from "./Letter.js"


export default class TootOtto {
    constructor(player) {
        this.turn = player;
        this.letter;
        this.rows = 4;
        this.cols = 6;
        this.board = [];
        this.colHight = [];
        this.player1 = new GamePlayer(Player.PLAYER1);
        this.player2 = new GamePlayer(Player.PLAYER2);

        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = CellState.EMPTY;
            }
        }

        this.colHight = new Array(this.cols).fill(3);

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

    onBoard({ x, y }) {
        return (this.inLimit(x, this.rows) && this.inLimit(y, this.cols));
    }


    move(col, letter) {
        let player = (this.turn === Player.PLAYER1) ? this.player1 : this.player2;

        if (this.colHight[col] < 0) {
            throw new Error("Column is full");
        }
        if ((letter === Letter.LETTERT && player.quantT <= 0) || (Letter.LETTERO && player.quantO <= 0)) {
            throw new Error(`There are no more '${letter}' pieces to be used`);
        }

        let row = this.colHight[col];
        let play;

        if (this.turn === Player.PLAYER1) {
            if (letter === Letter.LETTERT) {
                play = CellState.LETTERT
                player.useLetterT();
            } else {
                play = CellState.LETTERO
                player.useLetterO();
            }
            this.turn = Player.PLAYER2;

        } else {
            if (letter === Letter.LETTERT) {
                play = CellState.LETTERT
                player.useLetterT();
            } else {
                play = CellState.LETTERO
                player.useLetterO();
            }
            this.turn = Player.PLAYER1;

        }
        const lastRow = this.colHight[col];
        this.board[row][col] = play;
        this.colHight[col]--;

        let gameStatus = this.endOfGame();

        let moveResult = {
            position: { row: lastRow, col: col },
            status: gameStatus
        };

        return moveResult;

    }

    getLetter(cellState) {
        switch (cellState) {
            case CellState.LETTERT:
                return 'T';
            case CellState.LETTERO:
                return 'O';
            default:
                return '-';
        }
    }

    checkWinner(sequence) {
        const toot = "TOOT";
        const otto = "OTTO";

        if (sequence.includes(toot) && sequence.includes(otto)) {
            return Winner.DRAW;
        }
        if (sequence.includes(otto)) {
            return Winner.PLAYER2;
        }
        if (sequence.includes(toot)) {
            return Winner.PLAYER1;
        }

        return Winner.NONE;

    }

    endOfGame() {
        const board = this.board;
        const rows = this.rows;
        const cols = this.cols;
        let sequence = "";
        let winner;

        //Confere Horizontalmente
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let letter = this.getLetter(board[r][c]);
                sequence = sequence + letter;
            }

            winner = this.checkWinner(sequence);
            if (winner !== Winner.NONE) {
                return winner;
            }
            sequence = "";
        }

        //Confere Verticalmente
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                let letter = this.getLetter(board[r][c]);
                sequence = sequence + letter;
            }

            winner = this.checkWinner(sequence);
            if (winner !== Winner.NONE) {
                return winner;
            }

        }

        // Confere Diagonais principais
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c <= cols - 4; c++) {
                const sequence = this.getLetter(board[r][c]) +
                    this.getLetter(board[r + 1][c + 1]) +
                    this.getLetter(board[r + 2][c + 2]) +
                    this.getLetter(board[r + 3][c + 3]);

                const winner = this.checkWinner(sequence);
                if (winner !== Winner.NONE) {
                    return winner;
                }
            }
        }

        // //Confere Diagonais Secundárias
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 3; c < cols; c++) {
                const sequence = this.getLetter(board[r][c]) +
                    this.getLetter(board[r + 1][c - 1]) +
                    this.getLetter(board[r + 2][c - 2]) +
                    this.getLetter(board[r + 3][c - 3]);

                const winner = this.checkWinner(sequence);
                if (winner !== Winner.NONE) {
                    return winner;
                }
            }
        }

        return Winner.NONE;
    }


}