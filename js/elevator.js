// Include the 'matter-wrap' plugin
Matter.use('matter-wrap');


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  engine = Matter.Engine.create();
  const world = engine.world;

  // Create the elevator first
  elevator = new Block(
    world,
    { x: 2862, y: 5000, w: 100, h: 200, color: 'red' }, // Adjust the width and height as needed
    { isStatic: false, friction: 0.3, restitution: 0.6 } // Set isStatic to false to allow movement
  );

  const anchor = { x: elevator.body.position.x, y: elevator.body.position.y - 100 };

  // Create a revolute constraint between the elevator and the anchor
  const constraintOptions = {
    pointA: anchor,
    bodyB: elevator.body,
    length: 0,
    stiffness: 0.1
  };
  const constraint = Matter.Constraint.create(constraintOptions);

  // Add the elevator and constraint to the world
  Matter.World.add(world, [elevator.body, constraint]);

  // enable wrapping for the elevator using matter-wrap
  elevator.body.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background(0);

  // move the elevator up and down
  let swingY = height / 2 + sin(frameCount * 0.02) * 100;
  Matter.Body.setPosition(
    elevator.body,
    { x: elevator.body.position.x, y: swingY }
  );

  // display the elevator
  elevator.draw();
}
