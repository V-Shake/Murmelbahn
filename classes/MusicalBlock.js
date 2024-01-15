/**
Creates a new rigid body model with a circle hull.
@param {Matter.World} world - The Matter.js world object
@param {object} attributes - Visual properties e.g. position, radius and color
@param {Matter.IBodyDefinition} [options] - Defines the behaviour e.g. mass, bouncyness or whether it can move
@extends Block
*/
// class MusicalBlock extends Block {
//   constructor(world, options) {
//     super(world, options);
//     // this.note = note; // Musical note associated with the ground segment
//     this.sound = loadSound('./assets/audio/do.mp3');
//   }

class MusicalBlock extends Block {
  /**
   * @param {Matter.World} world 
   * @param {object} attributes 
   * @param {Matter.IChamferableBodyDefinition} options 
   */
  constructor(world, attributes, options) {
    super(world, attributes, options);
    this.sound = new Audio('./assets/audio/do.mp3');
    this.sound.play();
  }

  playSound() {
    this.sound.play();
  }

// draw() {
//     // Customize the drawing logic for the musical ground
//     super.draw();
//     // fill(this.body.render.fillStyle);
//     // rect(this.body.position.x - this.body.vertices[0].x, this.body.position.y - this.body.vertices[0].y, this.body.width, this.body.height);
//   }

  // drawConstraints() {
  //   super.draw();
  // }

  collideWith(ball) {
    super.collideWith(ball);
    this.playSound();
  }
}

// Usage example:
// Create a musical ground (xylophone segment) for each note
// let musicalGroundC = new MusicalGround(world, { x: 0, y: 630, w: 200, h: 50, color: 'orange', isStatic: true }, 'do');
// let musicalGroundD = new MusicalGround(world, { x: 200, y: 220, w: 200, h: 50, color: 'yellow', isStatic: true }, 're');
// let musicalGroundE = new MusicalGround(world, { x: 400, y: 220, w: 200, h: 50, color: 'green', isStatic: true }, 'mi');
// Add the musical ground objects to the blocks array
// blocks.push(musicalGroundC, musicalGroundD, musicalGroundE);

