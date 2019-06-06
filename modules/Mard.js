var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Mard extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
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
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(3);
        let newCell1 = random(emptyCells1);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let mard = new Mard(x, y);
            mardArr.push(mard);
            this.life = 20;
        }
        else if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];
            matrix[y][x] = 4;
            let mard = new Mard(x, y);
            mardArr.push(mard);
            this.life = 20;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(3);
        let newCell1 = random(emptyCells1);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if(exanak == "Garun"){
                if (this.life >= 30) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Amar"){
                if (this.life >= 35) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Ashun"){
                if (this.life >= 40) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Zdmer"){
                if (this.life >= 42) {
                    this.mul();
                    mardHashiv++;
                }
            }
        }
        else if (newCell1) {

            this.life++;
            let x = newCell1[0];
            let y = newCell1[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterEaterArr) {
                if (grassEaterEaterArr[i].x == x && grassEaterEaterArr[i].y == y) {
                    grassEaterEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if(exanak == "Garun"){
                if (this.life >= 30) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Amar"){
                if (this.life >= 35) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Ashun"){
                if (this.life >= 40) {
                    this.mul();
                    mardHashiv++;
                }
            }
            else if(exanak == "Zdmer"){
                if (this.life >= 42) {
                    this.mul();
                    mardHashiv++;
                }
            }
        }
        else {
            this.life--;
            this.move();
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(1);
        let newCell1 = random(emptyCells1);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        else if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if(exanak == "Dzmer"){
            if (this.life < 15) {
                this.die();
            }
        }
        else if(exanak == "Garun"){
            if (this.life == 10) {
                this.die();
            }
        }
        else if(exanak == "Amar"){
            if (this.life < 12){
                this.die();
            }
        }
        else if(exanak == "Ashun"){
            if (this.life < 14) {
                this.die();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 1;

        for (let i in mardArr) {
            if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                mardArr.splice(i, 1)
            }
        }
    }
}