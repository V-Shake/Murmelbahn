const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
const Constraint = Matter.Constraint; // Add this line to include Constraint

let engine;
let world;
let mouse;
let spacePressed = false;
let isDrag = false;
let bgX = 0;
let bgY = 0;
let active = -1;
let hangingBox; // Variable to store the hanging box
let stringConstraint;
let pendulum;
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
let ballOverlay;
let bookImg;
let fallingBook = [];
let rabbitImg;
const numRabbits = 3;
const rabbits = [];
const rabbit = [];



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
  ballOverlay = loadImage('./assets/graphics/foreground/ball.svg');
  ballSVG = loadImage('./assets/graphics/foreground/ball star.svg');
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
imageMode(CENTER)
  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world; // Set the world property to the engine's world

  new BlocksFromSVG(engine.world, './assets/graphics/foreground/static.svg', blocks, { isStatic: true, friction:1 });

  createFallingBook(1750, 35, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(2600, 950, { force: { x: 0, y: 0.1 } }, false);

  createFallingBook(2250, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(1850, 1976, { force: { x: 0, y: 0.005 } }, false);
  createFallingBook(1500, 1976, { force: { x: 0, y: 0.005 } }, false);
  createRabbit(547, 1200);


  blocks.push(new BlockCore(engine.world, { x: -dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));
  blocks.push(new BlockCore(engine.world, { x: dim.w + dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));

  blocks.push(new BlockCore(engine.world,
    {
      x: 0, y: 0, w: 100, h: 10000,
      trigger: () => {
        direction *= -1;
        console.log('Left Trigger');
      }
    },
    { isStatic: true }
  ));

  blocks.push(new BlockCore(engine.world,
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
  hangingBox = new Block(
    engine.world, {
      x: 750, // Adjust the x-coordinate based on your layout
      y: 100, // Adjust the y-coordinate based on your layout
      w: 100,
      h: 100,
      color: 'cyan'
    },
    { isStatic: false, density: 0.01 } // Adjust the density
  );

  // Constrain the hanging box to a fixed point (create a shorter string)
  hangingBox.constrainTo(null, { pointB: { x: 750, y: 50 }, length: 200, draw: true });

  // Add the hanging box to the blocks array
  blocks.push(hangingBox);


  // Constrain the hanging box to a fixed point (create a string)
  stringConstraint = Constraint.create({
    bodyA: hangingBox.body,
    pointA: { x: 0, y: -20 }, // Offset point for the string
    pointB: { x: 750, y: 50 }, // Fixed point for the string
    length: 0, // Initial length (will be adjusted later)
    stiffness: 0.1
  });

  // Add the hanging box and string to the blocks array
  blocks.push(hangingBox);
  blocks.push(stringConstraint);



  const soundSensor = createSoundSensor(engine.world, 574, 3050, 4021, 20, sounds, () => {
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

/*   const rabbitOptions = {
    label: 'Rabbit',
    isStatic: true,
    render: {
      sprite: {
        texture: rabbitImg,
        xScale: rabbit.width / rabbitImg.width,
        yScale: rabbit.height / rabbitImg.height,
      },
    },
  }; */
  //const rabbitBody = Bodies.rectangle(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbitOptions);
  //World.add(world, rabbitBody);
  ///rabbits.push(rabbitBody);

  // Create and add the 3 rabbits
 /*  for (let i = 0; i < numRabbits; i++) {
    const newRabbitBody = Bodies.rectangle(rabbit.x + i * (rabbit.width + 10), windowHeight + 100, rabbit.width, rabbit.height, rabbitOptions);
    rabbits.push(newRabbitBody);
  }
  ; */
  
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
      event.preventDefault();

      if (active === -1) {
        active = 0;
        murmel = new Ball(world, { x: 300, y: 100, r: 75, image: ballSVG }, { label: "Murmel", density: 0.003, restitution: 0.3, xfriction: 0, frictionAir: 0 });

        blocks.push(murmel);
        bouncingSound.play();
      } else {
        Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 2, y: 0 });
        bouncingSound.play();
       // rabbit.y = 890;
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
/* 
function drawRabbit() {
  rabbits.forEach((rabbitBody) => {
    const pos = rabbitBody.position;
    image(rabbitImg, pos.x - rabbit.width / 2, pos.y - rabbit.height / 2, rabbit.width, rabbit.height);
  });
}

function animateRabbit() {
  rabbits.forEach((rabbitBody) => {
    const rabbitPos = rabbitBody.position;
    if (rabbitPos.y <= rabbit.endY && rabbitPos.y >= rabbit.startY) {
      rabbitBody.position.y += rabbit.speed;
    } else if (rabbitPos.y < rabbit.startY) {
      rabbitBody.position.y = rabbit.startY;
      rabbit.speed *= -1;
    } else {
      rabbitBody.position.y = rabbit.endY;
      rabbit.speed *= -1;
    }

    // Update the visibility of the invisible rectangle
    const isVisible = rabbitPos.y >= 850 && rabbitPos.y <= 1164;
    invisibleRectangle.render.visible = isVisible;
  });
} */
function draw() {
  if (active < -1) {
  }

  clear();
  let bgWidth = width;
  let bgHeight = height;
  image(backgroundImage, 3840, 7200, bgWidth, bgHeight);
  scrollEndless(murmel ? murmel.body.position : { x: 0, y: 0 });
  //animateRabbit(); // Add this line to continuously update the rabbit's position

  if (spacePressed && murmel) {
    Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
    spacePressed = false;
  }

  if (murmel && murmel.draw) {
    image(ballOverlay, murmel.body.position.x, murmel.body.position.y) 

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
  
  rabbit.forEach(block => {
    if (block && block.draw) {
      block.draw();
    }
  });
  drawRabbit();
  animateRabbit();
  // drawRabbit();
  hangingBox.draw();

  // Draw the string (constraint)
  stroke(255);
  strokeWeight(2);
  line(
    stringConstraint.bodyA.position.x + stringConstraint.pointA.x,
    stringConstraint.bodyA.position.y + stringConstraint.pointA.y,
    stringConstraint.pointB.x,
    stringConstraint.pointB.y
  );

  }


