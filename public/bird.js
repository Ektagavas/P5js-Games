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
      this.brain = new NeuralNetwork(5, 10, 2);
    }
    
    this.width = 64;
    this.height = 64;
  }

  show() {
      stroke(255);
      fill(255, 100);
      ellipse(this.x, this.y, 32, 32);
    
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    // this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if(this.y < 0) {
      this.dead = true;
      // this.score--;
      this.velocity = 0;
      this.y = 0;
    }
    if(this.y > height) {
      this.dead = true;
      // this.score--;
      this.y = height;
    }
  }

  offScreen() {
    return this.y < 0 || this.y > height;
  }

  mutate() {
    this.brain.mutate(x=>x*0.1);
  }


  think(pipe) {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = pipe.top / height;
    inputs[2] = pipe.bottom / height;
    inputs[3] = pipe.x / width;
    inputs[4] = this.velocity / 10;
    // let inputs = [1.1, 0.3, 0.4, 0.9];
    let output = this.brain.predict(inputs);
    if(output[0] > output[1]) {
      this.up();
    }
  }
}