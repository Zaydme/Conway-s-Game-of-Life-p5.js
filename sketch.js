document.body.style.margin = 0

const width = document.body.clientWidth 
const height = document.body.clientHeight
let w = 15;
let columns = Math.floor(width / w);
let rows = Math.floor(height / w);
let cells = []
let isLoop = true

let initialPopulation = 0.07


function setup() {
    createCanvas(width, height);
    frameRate(8);
    stroke(255);
    strokeWeight(1);
    initialGen()
}

function draw() {
    background(0);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (cells[i][j][0] == 1 ) fill(0);
            else fill(255);
            stroke(0);
            rect(i * w, j * w, w - 1, w - 1);
        }
    }

    if (isLoop) lifeisgoingon();
}

function initialGen() {

    for (let i=0;i<columns;i++) {   
            cells[i] = []
    }
    for (let i=0;i<columns;i++) {
        for (let j= 0;j<rows;j++) {
            cells[i][j] = []
            cells[i][j][0] = Math.random() < initialPopulation
            if (i == 0 || j == 0 || i == columns-1  || j == rows-1 ) cells[i][j][0] = 0;
            cells[i][j][1] = 0
        }
    }
}

function lifeisgoingon(){
    for (let i=0;i<columns;i++) {
        for (let j= 0;j<rows;j++) {
            if ( i != 0 && j != 0 && i != columns-1  && j != rows-1 ){
                cells[i][j][1] = (cells[i-1][j][0] == 1) + (cells[i+1][j][0] == 1) + (cells[i][j-1][0] == 1) + (cells[i][j+1][0] == 1) +  (cells[i+1][j+1][0] == 1) + (cells[i-1][j-1][0] == 1) + (cells[i+1][j-1][0] == 1) +  (cells[i-1][j+1][0] == 1)
            }
            if (cells[i][j][1] < 2) cells[i][j][0] = 0
            if (cells[i][j][1] > 3) cells[i][j][0] = 0
            if (cells[i][j][0] == 1 && (cells[i][j][1] == 3 || cells[i][j][1] == 2)) cells[i][j][0] = 1
            if (cells[i][j][0] == 0 && cells[i][j][1] == 3 ) cells[i][j][0] = 1
        }
    }

}
function mouseDragged() {
    ellipse(mouseX, mouseY, 5, 5);
    let Mcolumns = Math.floor(mouseX / w);
    let Mrows = Math.floor(mouseY / w);
    cells[Mcolumns][Mrows][0] = !cells[Mcolumns][Mrows][0]
    if (cells[Mcolumns][Mrows][0] == 1 ) fill(0);
    else fill(255);
    stroke(0);
    rect(Mcolumns * w, Mrows * w, w - 1, w - 1);
    if(!isLoop) redraw()
  }