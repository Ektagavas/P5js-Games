let height1 = 320; //120;//400;
let width1 = 520; //200;//520;
const gameMat = [];
const sqUnit = 20;
let matHeight = Math.floor(height1 / sqUnit);
let matWidth = Math.floor(width1 / sqUnit);
let isMoving = true;
let block = null;
let isendGame = false;
let score = 0;

function mat2Coord(x, y) {
  return [x * sqUnit, y * sqUnit];
}

function coord2Mat(x, y) {
  return [Math.floor(x / sqUnit), Math.floor(y / sqUnit)];
}

function clearRow(y) {
  // console.log("===============",y);
  for (let j = y - 1; j >= 0; j--) {
    for (let i = 0; i < matHeight; i++) {
      gameMat[i][j + 1] = gameMat[i][j];
    }
  }
}

function clearRows(y, n) {
  // let ctr = 0;
  for (let i = 0; i < n && y < matWidth; i++, y++) {
    let col = gameMat.map(function (value, index) {
      return value[y];
    });
    if (col.every((val, i, arr) => val === 1)) {
      console.log(y);
      clearRow(y);
      score++;
    }
  }
}

class TetrisO {
  constructor() {
    this.mx = Math.floor(matHeight / 2) - 1;
    this.my = 0;
    const values = mat2Coord(this.mx, this.my);
    this.x = values[0];
    this.y = values[1];
    this.units = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
  }

  draw() {
    for (let i = 0; i < this.units.length; i++) {
      square(
        this.x + this.units[i][0] * sqUnit,
        this.y + this.units[i][1] * sqUnit,
        sqUnit
      );
    }
  }

  place() {
    for (let i = 0; i < this.units.length; i++) {
      gameMat[this.mx + this.units[i][0]][this.my + this.units[i][1]] = 1;
    }
    clearRows(this.my, 2);
  }

  moveDown() {
    if (
      this.my + 1 < matWidth &&
      gameMat[this.mx][this.my + 2] == 0 &&
      gameMat[this.mx + 1][this.my + 2] == 0
    ) {
      this.y += sqUnit;
      this.my += 1;
    } else {
      console.log("Trigger placement");
      this.place();
      isMoving = false;
    }
  }

  moveRight() {
    if (
      this.mx + 2 < matHeight &&
      gameMat[this.mx + 2][this.my] == 0 &&
      gameMat[this.mx + 2][this.my + 1] == 0
    ) {
      this.x += sqUnit;
      this.mx += 1;
    }
    // else {
    //   console.log('Trigger placement');
    //   this.place();
    //   isMoving=false;
    // }
  }

  moveLeft() {
    if (
      this.mx - 1 >= 0 &&
      gameMat[this.mx - 1][this.my] == 0 &&
      gameMat[this.mx - 1][this.my + 1] == 0
    ) {
      this.x -= sqUnit;
      this.mx -= 1;
    }
  }
}

class TetrisI {
  constructor() {
    this.mx = Math.floor(matHeight / 2) - 1;
    this.my = 0;
    const values = mat2Coord(this.mx, this.my);
    this.x = values[0];
    this.y = values[1];
    this.units = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    this.angle = 0;
  }

  draw() {
    for (let i = 0; i < this.units.length; i++) {
      square(
        this.x + this.units[i][0] * sqUnit,
        this.y + this.units[i][1] * sqUnit,
        sqUnit
      );
    }
  }

  place() {
    for (let i = 0; i < this.units.length; i++) {
      gameMat[this.mx + this.units[i][0]][this.my + this.units[i][1]] = 1;
    }
    clearRows(this.my, 4);
  }

  moveDown() {
    if (this.my + 4 < matWidth && gameMat[this.mx][this.my + 4] == 0) {
      this.y += sqUnit;
      this.my += 1;
    } else {
      console.log("Trigger placement");
      this.place();
      isMoving = false;
    }
  }

  moveRight() {
    if (
      this.mx + 1 < matHeight &&
      gameMat[this.mx + 1][this.my] == 0 &&
      gameMat[this.mx + 1][this.my + 1] == 0 &&
      gameMat[this.mx + 1][this.my + 2] == 0 &&
      gameMat[this.mx + 1][this.my + 3] == 0
    ) {
      this.x += sqUnit;
      this.mx += 1;
    }
  }

  moveLeft() {
    if (
      this.mx - 1 >= 0 &&
      gameMat[this.mx - 1][this.my] == 0 &&
      gameMat[this.mx - 1][this.my + 1] == 0 &&
      gameMat[this.mx - 1][this.my + 2] == 0 &&
      gameMat[this.mx - 1][this.my + 3] == 0
    ) {
      this.x -= sqUnit;
      this.mx -= 1;
    }
  }
}

class TetrisL {
  constructor() {
    this.mx = Math.floor(matHeight / 2) - 1;
    this.my = 0;
    const values = mat2Coord(this.mx, this.my);
    this.x = values[0];
    this.y = values[1];
    this.units = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ];
  }

  draw() {
    for (let i = 0; i < this.units.length; i++) {
      square(
        this.x + this.units[i][0] * sqUnit,
        this.y + this.units[i][1] * sqUnit,
        sqUnit
      );
    }
  }

  place() {
    for (let i = 0; i < this.units.length; i++) {
      gameMat[this.mx + this.units[i][0]][this.my + this.units[i][1]] = 1;
    }
    clearRows(this.my, 3);
  }

  moveDown() {
    if (
      this.my + 3 < matWidth &&
      gameMat[this.mx][this.my + 3] == 0 &&
      gameMat[this.mx + 1][this.my + 3] == 0
    ) {
      this.y += sqUnit;
      this.my += 1;
    } else {
      console.log("Trigger placement");
      this.place();
      isMoving = false;
    }
  }

  moveRight() {
    if (
      this.mx + 2 < matHeight &&
      gameMat[this.mx + 1][this.my] == 0 &&
      gameMat[this.mx + 1][this.my + 1] == 0 &&
      gameMat[this.mx + 1][this.my + 2] == 0 &&
      gameMat[this.mx + 2][this.my + 2] == 0
    ) {
      this.x += sqUnit;
      this.mx += 1;
    }
  }

  moveLeft() {
    if (
      this.mx - 1 >= 0 &&
      gameMat[this.mx - 1][this.my] == 0 &&
      gameMat[this.mx - 1][this.my + 1] == 0 &&
      gameMat[this.mx - 1][this.my + 2] == 0
    ) {
      this.x -= sqUnit;
      this.mx -= 1;
    }
  }
}

function getRandBlock() {
  // Generate random block
  let blockId = Math.floor(Math.random() * 3);
  let tblock = null;
  switch (blockId) {
    case 0:
      tblock = new TetrisO();
      break;
    case 1:
      tblock = new TetrisI();
      break;
    case 2:
      tblock = new TetrisL();
      break;
    default:
      tblock = new TetrisO();
  }
  return tblock;
}

function setup() {
  createCanvas(height1, width1);

  frameRate(2);

  // Init game matrix
  for (let i = 0; i < matHeight; i++) {
    gameMat[i] = [];
    for (let j = 0; j < matWidth; j++) {
      gameMat[i][j] = 0;
    }
  }
  block = getRandBlock();
  noLoop();

  // block = getRandBlock();
}

function drawGrid() {
  // Make the grid
  for (let i = 0; i < matHeight; i = i + 1) {
    for (let j = 0; j < matWidth; j = j + 1) {
      if (gameMat[i][j] == 0) {
        fill(255);
        square(i * sqUnit, j * sqUnit, sqUnit);
      } else {
        fill(175, 100, 220);
        square(i * sqUnit, j * sqUnit, sqUnit);
      }
    }
  }
}

function draw() {
  background(100);

  drawGrid();
  fill(101);
  rect(width - 80, 0, 80, 40);
  fill("white");
  textSize(15);
  text(`Score: ${score}`, width - 70, 15, height1, width1);

  fill(175, 100, 220);

  if (!isMoving) {
    block = getRandBlock();
    block.draw();
    if (gameMat[Math.floor(matHeight / 2) - 1][0] == 1) {
      endGame();
    } else {
      isMoving = true;
    }
  } else {
    block.draw();
    block.moveDown();
  }
}

function mousePressed() {
  // Start/stop the animation loop
  if (isLooping()) {
    noLoop();
  } else if (!isendGame) {
    loop();
  }
}

function keyPressed() {
  // Draw one frame
  if (keyCode === DOWN_ARROW && isMoving) {
    redraw();
  } else if (keyCode === RIGHT_ARROW && isMoving) {
    redraw();
    block.moveRight();
  } else if (keyCode === LEFT_ARROW && isMoving) {
    redraw();
    block.moveLeft();
  }
}

function endGame() {
  // Pause the sketch
  isendGame = true;
  noLoop();
  console.log("End game", score);
  textSize(22);
  textAlign(CENTER, CENTER);
  fill(000, 80);
  rect(0, 0, width, height);
  fill(000);
  rect(width / 4, height / 2 - 40, width / 2, 80);
  fill("white");
  let startText = `GAME OVER!!
Score: ${score}`;
  text(startText, 0, 0, height1, width1);
  describeElement("Start text", `Text reading, "${startText}"`);
}
