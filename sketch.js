// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

let birds = [];
let savedBirds = [];
const TOTAL = 250;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;
var counter = 0;

var touched = false;
var prevTouched = touched;
let slider;


function preload() {
  pipeBodySprite = loadImage('graphics/pillar1.jpg');
  pipePeakSprite = loadImage('graphics/pillar2.jpg');
  birdSprite = loadImage('graphics/bird.png');
  bgImg = loadImage('graphics/bg2.png');
}

function setup() {
  createCanvas(800, 600);
  reset();
}

function draw() {
  for(let n=0; n < slider.value(); n++) {


   if (counter % 100 === 0) {
    pipes.push(new Pipe());
  }

  counter++;
 

  for(let i=0;i<birds.length;i++) {
    cpipe = getClosestPipe();
    birds[i].think(cpipe);
    birds[i].update();
    birds[i].show();
    
    for(let pipe of pipes) {
      if(pipe.hits(birds[i])) {
        birds[i].dead = true;
      } else {
        birds[i].score++;
      }
    }
  }


  for(let j=0;j<birds.length;j++) {
      if(birds[j].dead) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }


  if(birds.length === 0) {
    nextGeneration();
    pipes = [];
    counter = 0;
  }

  for(let i=pipes.length-1; i>=0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
  }
  background(0);

  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);

  for(let pipe of pipes) {
    pipe.show();
  }

  for(let bird of birds) {
    bird.show();
  }
  }
}


function getClosestPipe() {
  var closest = pipes[0];
    var D = abs(closest.x - this.x);
    var d;

    for(var i=1; i < pipes.length; i++) {
      d = abs(pipes[i].x - this.x);
      if(d < D) {
        closest = pipes[i];
        D = d;
      }
    }
    return closest;
}


function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  slider = createSlider(1, 100, 1);
  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  gameoverFrame = frameCount - 1;
  loop();
}
