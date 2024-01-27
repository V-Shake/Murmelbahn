const resize = 1;
const rabbitWidth = 141*resize;
const rabbitHeight = 301*resize;
const rabbitStartY = 3930;
const rabbitEndY = 4170;
const rabbitSpeed = 3.5;

class Rabbit extends Block {
  constructor(world,x,y, options = {}) {
    super(world,
      {x: x, y: y, w: rabbitWidth, h: rabbitHeight, image: rabbitImg},
      { isStatic: true, ...options }
    );
    
    // Individual properties for each rabbit
    this.startY = options.startY || rabbitStartY;
    this.endY = options.endY || rabbitEndY;
    this.speed = options.speed || 4;
  }

  animate() {
    const rabbitPos = this.body.position;

    // Update the rabbit's position within the physics engine
    Matter.Body.setPosition(this.body, { x: rabbitPos.x, y: rabbitPos.y + this.speed });

    // Check if the rabbit is close to the starting position, reverse direction if needed
    const returnThreshold = 5; // Adjust as needed
    if (this.speed > 0 && rabbitPos.y > this.endY - returnThreshold) {
      this.speed *= -1;
    } else if (this.speed < 0 && rabbitPos.y < this.startY + returnThreshold) {
      this.speed *= -1;
    }
  }
}