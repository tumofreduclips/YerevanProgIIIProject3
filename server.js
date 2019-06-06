
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var GrassEaterEater = require("./modules/GrassEaterEater.js");
var Mard = require("./modules/Mard.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
mardArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
grassEaterEaterHashiv = 0;
mardHashiv = 0;
exanak = "";
orer = 0;
//! Setting global arrays  -- END



//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, mard, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < mard; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}

matrixGenerator(20, 20, 8,5,1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grassEaterEater = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(grassEaterEater);
                grassEaterEaterHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var mard = new Mard(x, y);
                mardArr.push(mard);
                mardHashiv++;
            }
            
        }
    }

}
creatingObjects();

function game() {
    if(grassArr[0]==undefined){
        var grass = new Grass(2, 5);
        grassArr.push(grass);
        grassHashiv++;
        var grass1 = new Grass(1, 5);
        grassArr.push(grass1);
        grassHashiv++;
        var grass2 = new Grass(3, 3);
        grassArr.push(grass2);
        grassHashiv++;
    }
    if(grassEaterArr[0]==undefined){
        var grassEater = new GrassEater(10, 5);
        grassEaterArr.push(grassEater);
        grassEaterHashiv++;
        var grassEater1 = new GrassEater(15, 2);
        grassEaterArr.push(grassEater1);
        grassEaterHashiv++;
        var grassEater2 = new GrassEater(10, 15);
        grassEaterArr.push(grassEater2);
        grassEaterHashiv++;
    }
    if(grassEaterEaterArr[0]==undefined){
        var grassEaterEater = new GrassEaterEater(2, 2);
        grassEaterEaterArr.push(grassEaterEater);
        grassEaterEaterHashiv++;
        var grassEaterEater1 = new GrassEaterEater(1, 1);
        grassEaterEaterArr.push(grassEaterEater1);
        grassEaterEaterHashiv++;
        var grassEaterEater2 = new GrassEaterEater(3, 3);
        grassEaterEaterArr.push(grassEaterEater2);
        grassEaterEaterHashiv++;
    }
    if(mardArr[0]==undefined){
        var mard = new Mard(9, 9);
        mardArr.push(mard);
        mardHashiv++;
    }
    
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (grassEaterEaterArr[0] !== undefined) {
        for (var i in grassEaterEaterArr) {
            grassEaterEaterArr[i].eat();
        }
    }
    if (mardArr[0] !== undefined) {
        for (var i in mardArr) {
            mardArr[i].eat();
        }
    }
        orer++
        if(orer<25){
            exanak = "Garun"
        }
        else if(orer >= 25 && orer<50){
            exanak = "Amar"
        }
        else if(orer >= 50 && orer<75){
            exanak = "Ashun"
        }
        else if(orer >= 70 && orer<=100){
            exanak = "Dzmer"
        }
        else if(orer>100){
            orer = 1;
            exanak = "Garun";
        }    
    
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        grassEaterEaterCounter:grassEaterEaterHashiv,
        whater: exanak,
        mardCounter:mardHashiv,
        grassKa:grassArr.length,
        grassEaterKa:grassEaterArr.length,
        grassEaterEaterKa:grassEaterEaterArr.length,
        mardKa:mardArr.length,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
setInterval(game, 100 )