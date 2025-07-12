import Player from "./Player.js";
import TootOtto from "./TootOtto.js";
import Cell from "./Cell.js";
import Winner from "./Winner.js";
import Letter from "./Letter.js"

class Interface {
    constructor() {
        this.game = null;
        this.selectedLetter = null;
    }

    registerEvents() {
        this.init();
        let start = document.getElementById("start");
        let letterTButton = document.getElementById("letterT");
        let letterOButton = document.getElementById("letterO");

        start.onclick = this.init.bind(this);

        letterTButton.onclick = () => {
            this.selectedLetter = Letter.LETTERT;
        }

        letterOButton.onclick = () => {
            this.selectedLetter = Letter.LETTERO;
        }
    }

    init() {
        let player = Player.PLAYER1;
        this.game = new TootOtto(player);
        let table = this.game.getBoard();
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < table.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < table[i].length; j++) {
                let td = document.createElement("td");
                td.onclick = this.play.bind(this);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }

        this.changeMessage();
        this.showQuant();
        this.addHover();
    }

    addHover() {
        const tbody = document.querySelector("tbody");

        if (!tbody) return; 

        tbody.addEventListener("mouseover", (event) => {
            if (event.target.tagName === "TD") {
                const colIndex = event.target.cellIndex;

                for (const row of tbody.rows) {
                    row.children[colIndex].classList.add("column-hover");
                }
            }
        });

        tbody.addEventListener("mouseout", (event) => {
            if (event.target.tagName === "TD") {
                const colIndex = event.target.cellIndex;

                for (const row of tbody.rows) {
                    row.children[colIndex].classList.remove("column-hover");
                }
            }
        });
    }

    coordinades(col) {
        return col.cellIndex;
    }

    setMessage(message) {
        const p = document.getElementById("message");
        p.textContent = message;

    }

    showQuant() {
        const quantT1 = document.getElementById("quantT1");
        const quantO1 = document.getElementById("quantO1");
        const quantT2 = document.getElementById("quantT2");
        const quantO2 = document.getElementById("quantO2");
        quantT1.textContent = `T: ${this.game.player1.quantT}`;
        quantO1.textContent = `O: ${this.game.player1.quantO}`;
        quantT2.textContent = `T: ${this.game.player2.quantT}`;
        quantO2.textContent = `O: ${this.game.player2.quantO}`;
    }

    changeMessage() {
        const winner = this.game.endOfGame();

        if (winner !== Winner.NONE) {
            let finalMessage = "Game Over";

            if (winner === Winner.PLAYER1) {
                finalMessage = "TOOT Wins"
            }
            if (winner === Winner.PLAYER2) {
                finalMessage = "OTTO Wins"
            }

            this.setMessage(finalMessage);
            return;
        }

        const turn = this.game.getTurn();
        const turnMessage = (turn === Player.PLAYER1) ? "TOOT Turn" : "OTTO Turn";
        this.setMessage(turnMessage);
    }

    play(event) {
        let td = event.target;
        let letter = this.selectedLetter;

        if (!letter) {
            this.setMessage("You must choose a letter fisrt");
            return;
        }

        let col = this.coordinades(td);

        try {
            let moveResult = this.game.move(col, letter);
            let position = moveResult.position;
            const tableRows = document.querySelectorAll("tr");
            let finalRow = tableRows[position.row];
            let finalCell = finalRow.children[position.col];

            finalCell.textContent = letter === Letter.LETTERT ? "T" : "O";
            letter === Letter.LETTERT ? finalCell.classList.add('letter-t') : finalCell.classList.add('letter-o');
            this.selectedLetter = null;
            this.changeMessage();
            this.showQuant();
        }

        catch (err) {
            this.setMessage(err.message);

        }
    }

}

let gui = new Interface();
gui.registerEvents();
