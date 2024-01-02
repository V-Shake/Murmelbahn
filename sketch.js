const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];
let murmel;

let canvasElem;
let off = { x: 0, y: 0 };

// das ist die Dimension des kompletten Levels 
const dim = { w: 3840, h: 2160 };
let direction = 0.2;

let bouncingSound = new Audio('./assets/audio/rubber-ball-bouncing-98700.mp3');

let ballSVG;

function preload() {
  ballSVG = loadImage('./assets/graphics/foreground/ball.svg'); // Replace with the actual path to your ball.svg file
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  // Das ist nötig für den 'Endless Canvas'
  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;

  new BlocksFromSVG(world, './assets/graphics/foreground/static.svg', blocks, { isStatic: true });

  // the ball has a label and can react on collisions
  murmel = new Ball(world,
    { x: 300, y: 100, r: 25, color: 'green' },
    { label: "Murmel", density: 0.004, restitution: 0.5, friction: 0, frictionAir: 0 }
  );
  blocks.push(murmel);

  // process collisions - check whether block "Murmel" hits another Block
  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block);
        // Play the sound effect
        bouncingSound.play();
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block);
        bouncingSound.play();
      }
    })
  })

  // run the engine
  blocks.push(new BlockCore(world,
    {
      x: 0, y: 0, w: 100, h: 4500,
      trigger: () => { direction *= -1; }
    },
    { isStatic: true }
  ));
  blocks.push(new BlockCore(world,
    {
      x: dim.w - 5, y: 0, w: 100, h: 4500,
      trigger: () => { direction *= -1; }
    },
    { isStatic: true }
  ));
  Runner.run(engine);
}

function scrollEndless(point) {
  // wohin muss verschoben werden damit point wenn möglich in der Mitte bleibt
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w - windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2), dim.h - windowHeight) };
  canvasElem.style.left = Math.round(off.x) + 'px';
  canvasElem.style.top = Math.round(off.y) + 'px';
  // korrigiert die Koordinaten
  translate(-off.x, -off.y);
  // verschiebt den ganzen Viewport
  window.scrollTo(off.x, off.y);
  // Matter mouse needs the offset as well
}

function keyPressed(event) {
  switch (keyCode) {
    case 32:
      console.log("Space");
      event.preventDefault();
      Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
      // Matter. Body.scale(murmel.body, 1.5, 1.5);
      break;
    case 66:
      console.log("Space");
      event.preventDefault();
      Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * -1, y: 0 });
      // Matter. Body.scale(murmel.body, 1.5, 1.5);
      break;
    default:
      console.log(keyCode);
  }
}

function draw() {
  clear();

  // position canvas and translate coordinates
  scrollEndless(murmel.body.position);

  // image(this.ballSVG, this.body.position.x - this.attributes.r, this.body.position.y - this.attributes.r, this.attributes.r * 2, this.attributes.r * 2);


  // animate attracted blocks
  blocks.forEach(block => block.draw());
}