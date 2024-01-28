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
  let bgm;
  let squeak;
  let teddy;
  let pig;
  let trampolines = [];
  let confettiBlock;
  let endBell;
  let spacebarPressedTime;
  let spacebarLongPressThreshold = 500;


  let canvasElem;
  let off = { x: 0, y: 0 };

  const dim = { w: 3841, h: 7778 };
  let direction = 0.2;

  let bouncingSound;
  let bouncing;
  let keyPressedSound;
  let ballSVG;
  let ballOverlay;
  let bookImg;
  let fallingBook = [];
  let rabbitImg;
  let brownRabbitImg;
  const numRabbits = 3;
  const rabbits = [];
  let wheelAngle = 0;
  let ferrisWheelImg;
  let wheelTrigger = false;


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

    keyPressedSound = new Audio('./assets/audio/keyPressedSound.mp3');
    bouncingSound = new Audio('./assets/audio/rubber-ball-bouncing-98700.mp3');
    bouncing = new Audio ('./assets/audio/bouncing.mp3');
    bgMusic = new Audio('./assets/audio/bgmusic.mp3');
    bgm = new Audio('./assets/audio/bgm.mp3');
    squeak = new Audio('./assets/audio/squeak.mp3');
    teddy = new Audio('./assets/audio/teddy.mp3');
    pig = new Audio('./assets/audio/pig.mp3');
    endBell = new Audio('./assets/audio/endBell.mp3');




    console.log("Loaded audio file:", bouncingSound.src);

    ballOverlay = loadImage('./assets/graphics/foreground/ball.svg');
    ballSVG = loadImage('./assets/graphics/foreground/ball star.svg');
    fallingBookImg = loadImage('./assets/graphics/foreground/book.png');
    rabbitImg = loadImage('./assets/graphics/foreground/whiteRabbit.png');
    brownRabbitImg = loadImage('./assets/graphics/foreground/brownRabbit.png');
    ferrisWheelImg = loadImage('./assets/graphics/foreground/ferrisWheel.png');
    cabinImg = loadImage('./assets/graphics/foreground/cabinYellow.png');


}

  function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('thecanvas');
    canvasElem = document.getElementById('thecanvas');
    canvasElem.addEventListener('click', () => {
      bgMusic.play();
      // bgm.play(); 
    });

    imageMode(CENTER);

    canvasElem = document.getElementById('thecanvas');

    engine = Engine.create();
    world = engine.world; 

    new BlocksFromSVG(engine.world, './assets/graphics/foreground/static.svg', blocks, { isStatic: true, friction: 10 });

    createFallingBook(1750, 35, { force: { x: 0, y: 0.005 } }, false);
    createFallingBook(2500, 650, { force: { x: 0, y: 0.1 } }, false);

    createFallingBook(1900, 1376, { force: { x: 0, y: 0.005 } }, false);
    createFallingBook(1600, 1376, { force: { x: 0, y: 0.005 } }, false);
<<<<<<< HEAD
    createFallingBook(1300, 1376, { force: { x: 0, y: 0.005 } }, false);
    const rabbit1 = new Rabbit(world,x=800, y=4050);
    const rabbit2 = new Rabbit(world,x=1400, y=4140); // Adjust x-coordinate as needed
    const rabbit3 = new Rabbit(world,x=2000, y=3990); // Adjust x-coordinate as needed
=======
    createFallingBook(1400, 1376, { force: { x: 0, y: 0.005 } }, false);
    const rabbit1 = new Rabbit(world,x=800, y=4050, speed=4);
    const rabbit2 = new Rabbit(world,x=1400, y=4160, speed=6); // Adjust x-coordinate as needed
    const rabbit3 = new Rabbit(world,x=2000, y=3990, speed=4); // Adjust x-coordinate as needed
>>>>>>> 08019f153986dcbd78ce9c27709cf737caba8507

    mouse = new Mouse(engine, canvas, {stroke: 'magenta', strokeWeight: 2});
    // Add confetti block
// Add confetti block


// Preload confetti sound


  // Add confetti block to the blocks array
  blocks.push(confettiBlock);

    // Add each rabbit to the rabbit array
    rabbits.push(rabbit1, rabbit2, rabbit3);

    blocks.push(new BlockCore(engine.world, { x: -dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));
    blocks.push(new BlockCore(engine.world, { x: dim.w + dim.w / 2, y: dim.h / 2, w: dim.w, h: dim.h, color: 'black' }, { isStatic: true }));

    blocks.push(new BlockCore(engine.world,
      {
        x: 0, y: 0, w: 100, h: 15000,
        trigger: () => {
          direction *= -1;
          console.log('Left Trigger');
        }
      },
      { isStatic: true }
    ));

    blocks.push(new BlockCore(engine.world,
      {
        x: dim.w - 5, y: 0, w: 100, h: 15000,
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
      x: 3200,
      y: 1700,
      w: 244,
      h: 409,
      image: brownRabbitImg 
    },
    { isStatic: false, density: 0.00008 }
  );
  
  // Constrain the hanging box to a fixed point (create a shorter string)
  hangingBox.constrainTo(null, { pointB: { x: 3200, y: 1700 }, length: 200, draw: false });

    // Add the hanging box to the blocks array
    blocks.push(hangingBox);


  // Constrain the hanging box to a fixed point (create a string)
  stringConstraint = Constraint.create({
    bodyA: hangingBox.body,
    pointA: { x: 0, y: -20 }, // Offset point for the string
    pointB: { x: 3200, y: 1700 }, // Fixed point for the string
    length: 0, // Initial length (will be adjusted later)
    stiffness: 0.1
  });
    // Constrain the hanging box to a fixed point (create a string)
    stringConstraint = Constraint.create({
      bodyA: hangingBox.body,
      pointA: { x: 0, y: -20 }, // Offset point for the string
      pointB: { x: 3200, y: 1700 }, // Fixed point for the string
      length: 0, // Initial length (will be adjusted later)
      stiffness: 0.1
    });

    // Add the hanging box and string to the blocks array
    blocks.push(hangingBox);
    blocks.push(stringConstraint);


    const soundSensor = createSoundSensor(engine.world, 104, 2437, 4450, 20, sounds, () => {
      console.log(' Sound sensor triggered by the ball!');
    }, { restitution: 0.5 }); // Adjust the restitution value as needed
    
    blocks.push(soundSensor);
    blocks.push(soundSensor);


Events.on(engine, 'collisionStart', function (event) {
  var pairs = event.pairs;

  pairs.forEach((pair, i) => {
    // Handle collision with Murmel
    if (pair.bodyA.label == 'Murmel') {
      pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block);
      bouncing.play(); // Play bouncing sound
    }

    if (pair.bodyB.label == 'Murmel') {
      pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block);
      bouncing.play(); // Play bouncing sound
    }

    // Handle collision with Trampoline
    if (pair.bodyA.label == 'Murmel' && pair.bodyB.label == 'Trampoline') {
      // Check which trampoline was hit and play the corresponding sound
      if (pair.bodyB.plugin.block == trampolines[0]) {
        squeak.play(); // Play the "squeak" sound for the first trampoline
      } else if (pair.bodyB.plugin.block == trampolines[1]) {
        teddy.play(); // Play the "teddy" sound for the second trampoline
      } else if (pair.bodyB.plugin.block == trampolines[2]) {
        pig.play(); // Play the "piggy" sound for the third trampoline
      } else if (pair.bodyB.plugin.block == trampoline4) {
        endBell.play(); // Play the "endBell" sound for the 4th trampoline
      }
    }

    if (pair.bodyB.label == 'Murmel' && pair.bodyA.label == 'Trampoline') {
      // Check which trampoline was hit and play the corresponding sound
      if (pair.bodyA.plugin.block == trampolines[0]) {
        squeak.play(); // Play the "squeak" sound for the first trampoline
      } else if (pair.bodyA.plugin.block == trampolines[2]) {
        teddy.play(); // Play the "teddy" sound for the second trampoline
      } else if (pair.bodyA.plugin.block == trampolines[1]) {
        pig.play(); // Play the "piggy" sound for the third trampoline
      } else if (pair.bodyA.plugin.block == trampoline4) {
        endBell.play(); // Play the "endBell" sound for the 4th trampoline
      }
    }

    // Handle collision with Sound Sensor
    if (pair.bodyA.label == 'Murmel' && pair.bodyB.label == 'SoundSensor') {
      // Additional handling for sound sensor collision
      console.log('Murmel collided with Sound Sensor');
    }

    if (pair.bodyB.label == 'Murmel' && pair.bodyA.label == 'SoundSensor') {
      // Additional handling for sound sensor collision
      console.log('Murmel collided with Sound Sensor');
    }

    // collison with cabin floor results removal of body
    if (pair.bodyB.label == 'Murmel' && pair.bodyA.label == 'cabin') {
      console.log('Murmel collided with cabin');
      const second = 9;
      // wait for 3 seconds
      // wheelTrigger = true;
      console.log("wait for " + second + " seconds");
      setTimeout(function(){
        // remove bodyA from the world
        World.remove(engine.world, pair.bodyA);
        console.log("bodyA removed after " + second + " seconds");
      },1000*second);
    }
  });
});


// Riesenrad
let radius = 377;
rad = new Ball(
  world,
  { x: 600, y: 4938, r: radius, image: ferrisWheelImg},
  { isStatic: false, isSensor: true, angle: wheelAngle }
);

rad.constrainTo(null, { pointB: { x: 600, y: 4938 }, stiffness: 0.1, damping: 0.1, draw: false });

cnt = 6;
cabinH = 120;
cabinW = 20;
cabinFloorW = 200;
for (let i = 0; i < cnt; i++) {
  let x = (radius - 10) * Math.sin((2 * PI * i) / cnt);
  let y = (radius - 10) * Math.cos((2 * PI * i) / cnt);
  // Create left and right cabins
  let cabinLeft = new Block(world, { x: 3500 + x - 75, y: 560 + y + cabinH, w: cabinW, h: cabinH, xcolor: 'red' , image: cabinImg, offset:{x:-210/2,y:+105/2-25} }, { isStatic: false,});
  let cabinRight = new Block(world, { x: 3500 + x + 75, y: 560 + y + cabinH, w: cabinW, h: cabinH, xcolor: 'green' }, { isStatic: false });

  // Create a floor for the cabin
  let cabinFloor = new Block(world, { x: 3500 + x, y: 560 + y + cabinH / 2, w: cabinFloorW, h: cabinW, xcolor: 'white'}, { isStatic: false, label: 'cabin'  });

  // Constrain left and right cabins to 'rad'
  cabinLeft.constrainTo(rad, { pointA: { x: 0, y: cabinH / 2 }, pointB: { x: x, y: y }, stiffness: 0.1, damping: 0.12, draw: false, length: cabinH });
  cabinRight.constrainTo(rad, { pointA: { x: 0, y: cabinH / 2 }, pointB: { x: x, y: y }, stiffness: 0.1, damping: 0.12, draw: false, length: cabinH });

  cabinLeft.constrainTo(cabinRight, { pointA: { x: -cabinW, y: 0 }, pointB: { x: cabinW, y: 0 }, stiffness: 0.8, damping: 0.12, draw: false, length: cabinFloorW });

  // Constrain floor to left and right cabins
  cabinFloor.constrainTo(cabinLeft, { pointA: { x: cabinW / 2, y: cabinH / 2 }, pointB: { x: -cabinFloorW / 2, y: cabinW / 2 }, stiffness: 0.8, damping: 0.1, draw: false, length: 0 });
  cabinFloor.constrainTo(cabinLeft, { pointA: { x: cabinW / 2, y: cabinH / 2 - cabinW / 2 }, pointB: { x: -cabinFloorW / 2, y: -cabinW / 2 }, stiffness: 0.8, damping: 0.1, draw: false, length: 0 });
  cabinFloor.constrainTo(cabinRight, { pointA: { x: -cabinW / 2, y: cabinH / 2 }, pointB: { x: cabinFloorW / 2, y: cabinW / 2 }, stiffness: 0.8, damping: 0.1, draw: false, length: 0 });
  cabinFloor.constrainTo(cabinRight, { pointA: { x: -cabinW / 2, y: cabinH / 2 - cabinW / 2 }, pointB: { x: cabinFloorW / 2, y: -cabinW / 2 }, stiffness: 0.8, damping: 0.1, draw: false, length: 0 });

  // Add blocks to the array
  blocks.push(cabinLeft);
  blocks.push(cabinRight);
  blocks.push(cabinFloor);
}
  
blocks.push(rad);


    const trampoline1 = new Block(
      world,
      { x: 3460, y: 6170, w: 500, h: 150},
      {
        isStatic: true,
        restitution: 1.1,
        label: 'Trampoline',
        trigger: () => {
          squeak.play();
        },
      }
    );
    trampolines.push(trampoline1);
  
    const trampoline2 = new Block(
      world,
      { x: 2630, y: 6170, w: 500, h: 100},
      {
        isStatic: true,
        restitution: 1.1,
        label: 'Trampoline',
        trigger: () => {
          teddy.play();
          
        },
      }
    );
    trampolines.push(trampoline2);

    const trampoline3 = new Block(
      world,
      { x: 1575, y: 6170, w: 500, h: 100 },
      {
        isStatic: true,
        restitution: 1.1,
        label: 'Trampoline',
        trigger: () => {
          pig.play();
          
        },
      }
    );
    trampolines.push(trampoline3);

    const trampoline4 = new Block(
      world,
      { x: 3000, y: 7500, w: 500, h: 150, },
      {
        isStatic: true,
        label: 'Trampoline',
        trigger: () => {
          endBell.play(); // Play the "endBell" sound when the trampoline is touched
        },
      }
    );
    trampolines.push(trampoline4);



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
          murmel = new Ball(world, { x: 300, y: 100, r: 75, image: ballSVG }, { label: "Murmel", density: 0.0013, restitution: 0.3, friction: 0, frictionAir: 0 });

          blocks.unshift(murmel);
        } else {
          Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 2, y: 0 });
          keyPressedSound.play();
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
    }

    clear();
    let bgWidth = width;
    let bgHeight = height;
    scrollEndless(murmel ? murmel.body.position : { x: 0, y: 0 });
    //animateRabbit(); // Add this line to continuously update the rabbit's position

    // if (spacePressed && murmel) {
    //   Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction, y: 0 });
    //   spacePressed = false;
    // }

    if (keyIsPressed && keyCode === 32) {
      let pressDuration = millis() - spacebarPressedTime;
  
      if (pressDuration < spacebarLongPressThreshold) {
        // Apply force continuously while space key is held down
        Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 0.25, y: 0 });
        if (!spacebarPressedTime) {
          // Record the start time of spacebar press
          spacebarPressedTime = millis();
        }
      } else {
        // Handle long-press behavior here
        // For example, you can make the ball speed up more
        Matter.Body.applyForce(murmel.body, murmel.body.position, { x: direction * 0.25, y: 0 });
        if (!spacebarPressedTime) {
          // Record the start time of spacebar press
          spacebarPressedTime = millis();
        }
      }
    } else {
      // Reset the spacebarPressedTime when the space key is released
      spacebarPressedTime = null;
    }
  

    if (murmel && murmel.draw) {
      image(ballOverlay, murmel.body.position.x, murmel.body.position.y) 

    murmel.draw();
  }
  // update wheel
  Matter.Body.setAngle(rad.body, wheelAngle);
  Matter.Body.setAngularVelocity(rad.body, 0.007);
  wheelAngle -= 0.007;

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
    
    rabbits.forEach(rabbit => {
      if (rabbit && rabbit.draw) {
        rabbit.draw();
        rabbit.animate();
      }
    });

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

    trampolines.forEach((trampoline) => {
      trampoline.draw();
    });
    
    mouse.draw();
    }


