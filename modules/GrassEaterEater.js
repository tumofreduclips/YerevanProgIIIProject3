var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEaterEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 7;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x    , this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y - 1],
			[this.x - 1, this.y - 1],
			[this.x    , this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 2, this.y - 1],
			[this.x - 2, this.y    ],
			[this.x - 1, this.y    ],
			[this.x    , this.y    ],
			[this.x + 1, this.y    ],
			[this.x + 2, this.y    ],
			[this.x - 2, this.y + 1],
			[this.x - 1, this.y + 1],
			[this.x    , this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x + 2, this.y + 1],
			[this.x - 2, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x    , this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let grassEaterEater = new GrassEaterEater(x, y);
            grassEaterEaterArr.push(grassEaterEater);
            this.life = 10;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if(exanak == "Garun"){
                if (this.life >= 11) {
                    this.mul();
                    grassEaterEaterHashiv++;
                }
            }
            else if(exanak == "Amar"){
                if (this.life >= 13) {
                    this.mul();
                    grassEaterEaterHashiv++;
                }
            }
            else if(exanak == "Ashun"){
                if (this.life >= 15) {
                    this.mul();
                    grassEaterEaterHashiv++;
                }
            }
            else if(exanak == "Zdmer"){
                if (this.life >= 18) {
                    this.mul();
                    grassEaterEaterHashiv++;
                }
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        let emptyCell1 = this.chooseCell(1);
        let newCell1 = random(emptyCell1);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        else if(newCell1){
            let x = newCell1[0];
            let y = newCell1[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if(exanak == "Dzmer"){
            if (this.life < 5) {
                this.die();
            }
        }
        else if(exanak == "Garun"){
            if (this.life == 3) {
                this.die();
            }
        }
        else if(exanak == "Amar"){
            if (this.life < 4 ){
                this.die();
            }
        }
        else if(exanak == "Ashun"){
            if (this.life < 3) {
                this.die();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassEaterEaterArr) {
            if (grassEaterEaterArr[i].x == this.x && grassEaterEaterArr[i].y == this.y) {
                grassEaterEaterArr.splice(i, 1)
            }
        }
    }
}