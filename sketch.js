const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const COLUMN_WIDTH = 15;
const COLUMNS = Math.floor(WIDTH / COLUMN_WIDTH);
const ROWS = Math.floor(HEIGHT / COLUMN_WIDTH);
let cells = [];
let isLoop = true;

const INITIAL_POPULATION = 0.1;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(8);
  stroke(255);
  strokeWeight(1);
  initialGen();
}

function draw() {
  background(0);
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (cells[i][j][0]) fill(0);
      else fill(255);
      stroke(0);
      rect(
        i * COLUMN_WIDTH,
        j * COLUMN_WIDTH,
        COLUMN_WIDTH - 1,
        COLUMN_WIDTH - 1,
      );
    }
  }

  if (isLoop) lifeIsGoingOn();
}

function initialGen() {
  for (let i = 0; i < COLUMNS; i++) {
    cells[i] = [];
  }
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      cells[i][j] = [];
      cells[i][j][0] = Math.random() < INITIAL_POPULATION;
      if (i === 0 || j === 0 || i === COLUMNS - 1 || j === ROWS - 1) cells[i][j][0] = 0;
      cells[i][j][1] = 0;
    }
  }
}

function lifeIsGoingOn() {
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (i !== 0 && j !== 0 && i !== COLUMNS - 1 && j !== ROWS - 1) {
        /*
        cells[i][j][0] is the living status (Boolean)
        cells[i][j][1] is the neighbors count
        */
        cells[i][j][1] = (cells[i - 1][j][0])
          + (cells[i + 1][j][0])
          + (cells[i][j - 1][0])
          + (cells[i][j + 1][0])
          + (cells[i + 1][j + 1][0])
          + (cells[i - 1][j - 1][0])
          + (cells[i + 1][j - 1][0])
          + (cells[i - 1][j + 1][0]);
      }
    }
  }
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (cells[i][j][1] < 2 || cells[i][j][1] > 3) cells[i][j][0] = false;
      if (cells[i][j][0] && (cells[i][j][1] === 3 || cells[i][j][1] === 2)) cells[i][j][0] = true;
      if (!cells[i][j][0] && cells[i][j][1] === 3) cells[i][j][0] = true;
    }
  }
}

function mouseClicked() {
  ellipse(mouseX, mouseY, 5, 5);
  const Mcolumns = Math.floor(mouseX / COLUMN_WIDTH);
  const Mrows = Math.floor(mouseY / COLUMN_WIDTH);
  cells[Mcolumns][Mrows][0] = !cells[Mcolumns][Mrows][0];
  if (cells[Mcolumns][Mrows][0]) fill(0);
  else fill(255);
  stroke(0);
  rect(
    Mcolumns * COLUMN_WIDTH,
    Mrows * COLUMN_WIDTH,
    COLUMN_WIDTH - 1,
    COLUMN_WIDTH - 1,
  );
  if (!isLoop) redraw();
}
