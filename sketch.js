const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

let engine;
let world;
let mouse;
let isDrag = false;
let bgX = 0;
let bgY = 0;

let blocks = [];
let murmel;

let canvasElem;
let off = { x: 0, y: 0 };

const dim = { w: 3840, h: 7200 };
let direction = 0.2;

let bouncingSound = new Audio('./assets/audio/rubber-ball-bouncing-98700.mp3');
let backgroundImage;
let ballSVG;
let bookImg;
let fallingBook = [];

function preload() {
  backgroundImage = loadImage('./assets/graphics/background/backdrop.jpg');
  backgroundImage.resize(600, 1000);
  ballSVG = loadImage('./assets/graphics/foreground/ball.svg');
  fallingBookImg = loadImage('./assets/graphics/foreground/book.png');
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;

  new BlocksFromSVG(world, './assets/graphics/foreground/static.svg', blocks, { isStatic: true });

  murmel = new Ball(world,
    { x: 300, y: 100, r: 60, color: 'green' },
    { label: "Murmel", density: 0.003, restitution: 0.5, friction: 0, frictionAir: 0 }
  );
  
  createFallingBook(1850, 250, { force: { x: 0, y: 0.005 } });
  createFallingBook(2479, 950, { force: { x: 0, y: -0.005 } });
  createFallingBook(2800, 950, { force: { x: 0, y: 0.04 } });
  createFallingBook(2823, 1976 , { force: { x: 0, y: 0.005 } });
  createFallingBook(2300, 1976 , { force: { x: 0, y: 0.005 } });
  createFallingBook(2500, 1976 , { force: { x: 0, y: 0.005 } });
  createFallingBook(2100, 1976 , { force: { x: 0, y: 0.005 } });
  createFallingBook(2700, 1976 , { force: { x: 0, y: 0.005 } });
  createFallingBook(0, 1309 , { force: { x: 0, y: 0.005 } });





  blocks.push(new BlockCore(world, { x: -dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  blocks.push(new BlockCore(world, { x: dim.w + dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));

  // Trigger block on the left
  blocks.push(new BlockCore(world,
    {
      x: 0, y: 0, w: 100, h: 4500,
      trigger: () => {
        direction *= -1;
        console.log('Left Trigger');
      }
    },
    { isStatic: true }
  ));

  // Trigger block on the right
  blocks.push(new BlockCore(world,
    {
      x: dim.w - 5, y: 0, w: 100, h: 4500,
      trigger: () => {
        direction *= -1;
        console.log('Right Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(murmel);

  // Set up collision events
  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block);
        bouncingSound.play();
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block);
        bouncingSound.play();
      }
    })
  });

  Runner.run(engine);
}
function createFallingBook(x, y, options = {}) {
  const bookWidth =10;
  const bookHeight = 495;

  // Create a rectangular body for the falling book
  let fallingBlock = new Block(
    world,
    { x, y, w: bookWidth, h: bookHeight, image: fallingBookImg },
    { friction: 0.5, density: 0.0005, angularVelocity: 0.01, ...options }
  );
  fallingBook.push(fallingBlock);

  // Apply an initial force to make the book fall
  const force = options.force || { x: 0, y: 0.005 }; // Adjust the force as needed
  Matter.Body.applyForce(fallingBlock.body, fallingBlock.body.position, force);
}
function scrollEndless(point) {
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w - windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2), dim.h - windowHeight) };
  canvasElem.style.left = Math.round(off.x) + 'px';
  canvasElem.style.top = Math.round(off.y) + 'px';
  translate(-off.x, -off.y);
  window.scrollTo(off.x, off.y);
}

function keyPressed(event) {
  switch (keyCode) {
    case 32:
      console.log("Space");
      event.preventDefault();
      Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
      break;
    case 66:
      console.log("Space");
      event.preventDefault();
      Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * -1, y: 0 });
      break;
    default:
      console.log(keyCode);
  }
}

function draw() {
  clear();
  let bgWidth = width;
  let bgHeight = height;
  image(backgroundImage, 3840, 7200, bgWidth, bgHeight);
  scrollEndless(murmel.body.position);
  blocks.forEach(block => block.draw());
  fallingBook.forEach(block => block.draw());
}
