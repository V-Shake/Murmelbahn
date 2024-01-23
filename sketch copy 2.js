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
let carrot;

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
let rabbitImg;
const numRabbits = 3;
const rabbits = [];

const rabbit = {
  x: 347,
  y: 600,
  width: 356,
  height: 749,
  speed: 2,
  endY: 900
};

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

  console.log("Loaded audio file:", bouncingSound.src);

  backgroundImage = loadImage('./assets/graphics/background/backdrop.jpg');
  backgroundImage.resize(600, 1000);
  ballSVG = loadImage('./assets/graphics/foreground/ball.svg');
  fallingBookImg = loadImage('./assets/graphics/foreground/book.png');
  rabbitImg = loadImage('./assets/graphics/foreground/whiteRabbit.png');
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

  createFallingBook(1750, 35, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2600, 950, { force: { x: 0, y: 0.1 } }, false);

  createFallingBook(2623, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2250, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(1900, 1976, { force: { x: 0, y: 0.005 } }, false);

  blocks.push(new BlockCore(world, { x: -dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));
  blocks.push(new BlockCore(world, { x: dim.w + dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));

  blocks.push(new BlockCore(world,
    {
      x: 0, y: 0, w: 100, h: 10000,
      trigger: () => {
        direction *= -1;
        console.log('Left Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(new BlockCore(world,
    {
      x: dim.w - 5, y: 0, w: 100, h: 10000,
      trigger: () => {
        direction *= -1;
        console.log('Right Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(murmel);

  const soundSensor = createSoundSensor(world, 574, 3050, 4021, 20, sounds, () => {
    console.log(' Sound sensor triggered by the ball!');
  });

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

  const rabbitOptions = {
    label: 'Rabbit',
    isStatic: true,
    render: {
      sprite: {
        texture: rabbitImg,
        xScale: rabbit.width / rabbitImg.width,
        yScale: rabbit.height / rabbitImg.height,
      },
    },
  };
  const rabbitBody = Bodies.rectangle(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbitOptions);
  World.add(world, rabbitBody);
  rabbits.push(rabbitBody);

  // Create and add the remaining rabbits
  for (let i = 1; i < numRabbits; i++) {
    const newRabbitBody = Bodies.rectangle(rabbit.x + i * (rabbit.width + 10), rabbit.y, rabbit.width, rabbit.height, rabbitOptions);
    World.add(world, newRabbitBody);
    rabbits.push(newRabbitBody);
  }

  Runner.run(engine);
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
      if (active === -1) {
        active = 0;
        murmel = new Ball(world, { x: 300, y: 100, r: 60, color: 'green' }, { label: "Murmel", density: 0.003, restitution: 0.3, friction: 0, frictionAir: 0 });

        blocks.push(murmel);
        bouncingSound.play();
        event.preventDefault();
      } else {
        Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 2, y: 0 });
        bouncingSound.play();
        rabbit.y = 890;
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

function drawRabbit() {
  rabbits.forEach((rabbitBody) => {
    const pos = rabbitBody.position;
    image(rabbitImg, pos.x - rabbit.width / 2, pos.y - rabbit.height / 2, rabbit.width, rabbit.height);
  });
}

function animateRabbit() {
  rabbits.forEach((rabbitBody) => {
    const rabbitPos = rabbitBody.position;
    if (rabbitPos.y <= rabbit.endY && rabbitPos.y >= 600) {
      rabbitBody.position.y += rabbit.speed;
    } else if (rabbitPos.y < 600) {
      rabbitBody.position.y = 600;
      rabbit.speed *= -1; // Reverse direction when reaching the lowest position
    } else {
      rabbitBody.position.y = 900;
      rabbit.speed *= -1; // Reverse direction when reaching the highest position
    }
  });
}

function draw() {
  if (active < -1) {
  }

  clear();
  let bgWidth = width;
  let bgHeight = height;
  image(backgroundImage, 3840, 7200, bgWidth, bgHeight);
  scrollEndless(murmel ? murmel.body.position : { x: 0, y: 0 });
  animateRabbit(); // Add this line to continuously update the rabbit's position

  if (spacePressed && murmel) {
    Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
    spacePressed = false;
  }

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

  drawRabbit(); // Call the drawWhiteRabbit function to draw the rabbit
}
