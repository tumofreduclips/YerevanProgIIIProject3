var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);

            if (newCell) 
                {
                    let x = newCell[0];
                    let y = newCell[1];
                    matrix[y][x] = 2;
                    let grassEater = new GrassEater(x, y);
                    grassEaterArr.push(grassEater);
                    this.life = 3;
                }
            }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
            if(exanak == "Garun"){
                if (this.life >= 14) {
                    this.mul();
                    grassEaterHashiv++;
                }
            }
            else if(exanak == "Amar"){
                if (this.life >= 15) {
                    this.mul();
                    grassEaterHashiv++;
                }
            }
            else if(exanak == "Ashun"){
                if (this.life >= 17) {
                    this.mul();
                    grassEaterHashiv++;
                }
            }
            else if(exanak == "Zdmer"){
                if (this.life >= 20) {
                    this.mul();
                    grassEaterHashiv++;
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

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if(exanak == "Dzmer"){
            if (this.life < 6) {
                this.die();
            }
        }
        else if(exanak == "Garun"){
            if (this.life < 3) {
                this.die();
            }
        }
        else if(exanak == "Amar"){
            if (this.life < 5) {
                this.die();
            }
        }
        else if(exanak == "Ashun"){
            if (this.life < 4 ){
                this.die();
            }
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
    }
}