
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let whaterElement = document.getElementById('whater');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterEaterCountElement = document.getElementById('grassEaterEaterCount');
    let mardCountElement = document.getElementById("mardCount");
    let BodyImage = document.getElementById('bodyimage')
    let grassKaElement = document.getElementById('grassKaElement');
    let grassEaterKaElement = document.getElementById('grassEaterKaElement');
    let grassEaterEaterKaElement = document.getElementById('grassEaterEaterKaElement');
    let mardKaElement = document.getElementById('mardKaElement');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterEaterCountElement.innerText = data.grassEaterEaterCounter;
        mardCountElement.innerText = data.mardCounter;
        whaterElement.innerText = data.whater;
        grassKaElement.innerHTML = data.grassKa;
        grassEaterKaElement.innerHTML = data.grassEaterKa;
        grassEaterEaterKaElement.innerHTML = data.grassEaterEaterKa;
        mardKaElement.innerHTML = data.mardKa;

        
      //  console.log(whaterImageElement)
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        if(data.whater == "Garun"){
            BodyImage.style.backgroundImage="url('Garun.jpg')"
            BodyImage.style.backgroundSize="100%"
        }
        else if(data.whater == "Amar"){
            BodyImage.style.backgroundImage="url('Amar.jpg')"
            BodyImage.style.backgroundSize="100%"
        }
        else if(data.whater == "Ashun"){
            BodyImage.style.backgroundImage="url('Ashun.jpg')"
            BodyImage.style.backgroundSize="100%"
        }
        else if(data.whater == "Dzmer"){
            BodyImage.style.backgroundImage="url('Dzmer.jpg')"
            BodyImage.style.backgroundSize="100%"
        }
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(data.whater == "Garun"){
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                    else if(data.whater == "Amar"){
                        fill("darkgreen");
                        rect(j * side, i * side, side, side);
                    }
                    else if(data.whater == "Ashun"){
                        fill("darkorange");
                        rect(j * side, i * side, side, side);
                    }
                    else if(data.whater == "Dzmer"){
                        fill("azure");
                        rect(j * side, i * side, side, side);
                    }
                   
                } else if (matrix[i][j] == 2) {
                    if(data.whater == "Dzmer"){
                        fill("darkorange");
                        rect(j * side, i * side, side, side);
                    }
                    else{
                        fill("orange");
                        rect(j * side, i * side, side, side);
                    }
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
