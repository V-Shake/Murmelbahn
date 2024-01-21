const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
let engine;
let world;
let mouse;
let spacePressed = false;
let isDrag = false;
let bgX = 0;
let bgY = 0;
let active = -1;

let blocks = [];
let murmel;
let bgMusic;


let canvasElem;
let off = { x: 0, y: 0 };

const dim = { w: 3840, h: 7200 };
let direction = 0.2;

let bouncingSound;
let backgroundImage;
let ballSVG;
let bookImg;
let fallingBook = [];

let sounds = [
  './assets/audio/do.mp3',
  './assets/audio/re.mp3',
  './assets/audio/mi.mp3',
  './assets/audio/fa.mp3',
  './assets/audio/so.mp3',
  './assets/audio/la.mp3',
  './assets/audio/ti.mp3',
  './assets/audio/dom.mp3'
];
function preload() {
  console.log("Preloading audio files...");

  bouncingSound = new Audio('./assets/audio/rubber-ball-bouncing-98700.mp3');
  bgMusic = new Audio('./assets/audio/bgmusic.mp3');

  // Log the loaded audio files
  console.log("Loaded audio file:", bouncingSound.src);

  backgroundImage = loadImage('./assets/graphics/background/backdrop.jpg');
  backgroundImage.resize(600, 1000);
  ballSVG = loadImage('./assets/graphics/foreground/ball.svg');
  fallingBookImg = loadImage('./assets/graphics/foreground/book.png');
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');
  canvasElem = document.getElementById('thecanvas');
  canvasElem.addEventListener('click', () => {
    bgMusic.play();
  });

  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;

  new BlocksFromSVG(world, './assets/graphics/foreground/static.svg', blocks, { isStatic: true });
  console.log(blocks);

  createFallingBook(1750, 35, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2600, 950, { force: { x: 0, y: 0.1 } }, false);
  createFallingBook(2823, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2450, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2100, 1976, { force: { x: 0, y: 0.005 } }, false);

  blocks.push(new BlockCore(world, { x: -dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  blocks.push(new BlockCore(world, { x: dim.w + dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));

  blocks.push(new BlockCore(world,
    {
      x: 0, y: 0, w: 100, h: 9000,
      trigger: () => {
        direction *= -1;
        console.log('Left Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(new BlockCore(world,
    {
      x: dim.w - 5, y: 0, w: 100, h: 9000,
      trigger: () => {
        direction *= -1;
        console.log('Right Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(murmel);

 
  // Create right sensor
  const soundSensor = createSoundSensor(world, 574 , 3050, 4021, 20, sounds, () => {
    console.log(' Sound sensor triggered by the ball!');
  });

  // Add the sensors to the blocks array
  blocks.push(soundSensor);

  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
      }
    })
  })

  Runner.run(engine);
}

function createSoundSensor(world, x, y, w, h, sounds, trigger) {
  let currentSoundIndex = 0;

  return new Block(
    world,
    {
      x: x,
      y: y,
      w: w,
      h: h,
      trigger: () => {
        // Play the current sound in the sequence
        const sound = new Audio(sounds[currentSoundIndex]);
        sound.play();

        // Move to the next sound in the sequence
        currentSoundIndex = (currentSoundIndex + 1) % sounds.length;

        trigger();
      }
    },
    { isStatic: true, isSensor: true, label: 'SoundSensor' }
  );
}

function createFallingBook(x, y, options = {}, applyForceOnSpace = false) {
  const bookWidth = 60;
  const bookHeight = 487;

  // Create a rectangular body for the falling book
  let fallingBlock = new Block(
    world,
    { x, y, w: bookWidth, h: bookHeight, image: fallingBookImg },
    { friction: 0.5, density: 0.0007, angularVelocity: 0.1, ...options }
  );
  fallingBook.push(fallingBlock);

  // Apply an initial force to make the book fall only if applyForceOnSpace is true
  if (applyForceOnSpace) {
    const force = options.force || { x: 0, y: 0.005 }; // Adjust the force as needed
    Matter.Body.applyForce(fallingBlock.body, fallingBlock.body.position, force);
  }

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
    case 32: // Space key
      if (active === -1) {
        active = 0;
        murmel = new Ball(world, { x: 300, y: 100, r: 60, color: 'green' }, { label: "Murmel", density: 0.003, restitution: 0.3, friction: 0, frictionAir: 0 });
        
        blocks.push(murmel);
        bouncingSound.play();
        event.preventDefault(); // Prevent the default behavior of the space key
      } else {

        Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 2, y: 0 });
        bouncingSound.play();

      }
      break;
    case 65:
      break;
    case 70:
      console.log("f");

      break;
    default:
      console.log(keyCode);
  }
}
function draw() {
  if (active < -1) {
    // Add any logic specific to the "active" state if needed
  }

  clear();
  let bgWidth = width;
  let bgHeight = height;
  image(backgroundImage, 3840, 7200, bgWidth, bgHeight);
  scrollEndless(murmel ? murmel.body.position : { x: 0, y: 0 });

  if (spacePressed && murmel) {
    Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
    spacePressed = false; // Reset the variable after applying force
  }

  // Ensure murmel is created before attempting to draw
  if (murmel && murmel.draw) {
    murmel.draw();
  }

  blocks.forEach(block => {
    if (block && block.draw) {
      block.draw();
    }
  });

  fallingBook.forEach(block => {
    if (block && block.draw) {
      block.draw();
    }
  });
}