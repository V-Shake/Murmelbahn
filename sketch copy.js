const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

let engine;
let world;
let mouse;
let isDrag = false;
let blocks = [];
let murmel;

let canvasElem;
let off = { x: 0, y: 0 };

const dim = { w: 3840, h: 2160 };

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');
  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;
  // Creating the canvas end wall as a sensor
  let leftSensor = Bodies.rectangle(0, windowHeight / 2, 10, windowHeight, { isSensor: true, isStatic: true, label: 'LeftSensor' });
  let rightSensor = Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, { isSensor: true, isStatic: true, label: 'RightSensor' });

  // Add a trigger function to change the color of the sensors to green
  leftSensor.trigger = function (ball, sensor) {
    sensor.render.fillStyle = '#00FF00'; // Green color
  };

  rightSensor.trigger = function (ball, sensor) {
    sensor.render.fillStyle = '#00FF00'; // Green color
  };

  World.add(world, [leftSensor, rightSensor]);



  let endWall = Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, { isSensor: true, isStatic: true, label: 'EndWall' });
  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach(pair => {
      if (pair.bodyA.label === 'Murmel' && pair.bodyB.label === 'RightSensor') {
        reverseBallDirection('left');
      } else if (pair.bodyB.label === 'Murmel' && pair.bodyA.label === 'RightSensor') {
        reverseBallDirection('left');
      } else if (pair.bodyA.label === 'Murmel' && pair.bodyB.label === 'LeftSensor') {
        reverseBallDirection('right');
      } else if (pair.bodyB.label === 'Murmel' && pair.bodyA.label === 'LeftSensor') {
        reverseBallDirection('right');
      }
    });
  });

  World.add(world, endWall);

  new BlocksFromSVG(world, 'static.svg', blocks, { isStatic: true });

  blocks.push(new BlockCore(world,
    {
      x: 200, y: 200, w: 60, h: 60, color: 'blue',
      trigger: (ball, block) => { ball.attributes.color = color(Math.random() * 256, Math.random() * 256, Math.random() * 256); }
    },
    { isStatic: false, density: 0.05, restitution: 0.5, frictionAir: 0.01 }
  ));

  murmel = new Ball(world,
    { x: 300, y: 100, r: 25, color: 'green' },
    { label: "Murmel", density: 0.004, restitution: 0.5, friction: 0.0, frictionAir: 0.0 }
  );
  blocks.push(murmel);

  mouse = new Mouse(engine, canvas, { stroke: 'blue', strokeWeight: 3 });

  mouse.on("startdrag", evt => {
    isDrag = true;
  });
  mouse.on("mouseup", evt => {
    if (!isDrag) {
      let ball = new Ball(world, { x: off.x + evt.mouse.position.x, y: off.y + evt.mouse.position.y, r: 15, color: 'yellow' }, { isStatic: false, restitution: 0.9, label: 'Murmel' });
      blocks.push(ball);
    }
    isDrag = false;
  });

  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach(pair => {
      if (pair.bodyA.label === 'Murmel' && pair.bodyB.label === 'RightSensor') {
        reverseBallDirection('left');
      } else if (pair.bodyB.label === 'Murmel' && pair.bodyA.label === 'RightSensor') {
        reverseBallDirection('left');
      } else if (pair.bodyA.label === 'Murmel' && pair.bodyB.label === 'LeftSensor') {
        reverseBallDirection('right');
      } else if (pair.bodyB.label === 'Murmel' && pair.bodyA.label === 'LeftSensor') {
        reverseBallDirection('right');
      }
    });
  });

  Runner.run(engine);
}

function scrollEndless(point) {
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w - windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2), dim.h - windowHeight) };
  canvasElem.style.left = Math.round(off.x) + 'px';
  canvasElem.style.top = Math.round(off.y) + 'px';
  translate(-off.x, -off.y);
  window.scrollTo(off.x, off.y);
  mouse.setOffset(off);
}

// schubsen
function keyPressed(event) {
  switch (keyCode) {
    case 32:
      event.preventDefault();
      Matter.Body.applyForce(murmel.body, murmel.body.position, { x: 0.15, y: 0 });
      break;
    default:
      console.log(keyCode);
  }
}

function draw() {
  clear();
  scrollEndless(murmel.body.position);
  blocks.forEach(block => block.draw());
  mouse.draw();
  //test
}

function reverseBallDirection(side) {
  // Change the ball's velocity to reverse its direction based on the side
  let forceX = side === 'left' ? -0.15 : 0.15; // Apply force based on the side
  Matter.Body.applyForce(murmel.body, murmel.body.position, { x: forceX, y: 0 });
}