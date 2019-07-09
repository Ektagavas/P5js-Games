// exported Bird class
class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -10;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    this.dead = false;

    if(brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 10, 1);
    }
    
    this.width = 64;
    this.height = 64;
    this.icon = birdSprite;
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);    
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if(this.y < 0) {
      this.dead = true;
      this.velocity = 0;
      this.y = 0;
    }
    if(this.y > height) {
      this.dead = true;
      this.y = height;
    }
  }

  offScreen() {
    return this.y < 0 || this.y > height;
  }

  mutate() {
    this.brain.mutate(0.1);
  }


  think(pipe) {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = pipe.top / height;
    inputs[2] = pipe.bottom / height;
    inputs[3] = pipe.x / width;
    inputs[4] = this.velocity / 10;
    let output = this.brain.predict(inputs);
    if(output > 0.5) {
      this.up();
    }
  }
}