const rabbitWidth = 199;
const rabbitHeight = 424;
const rabbitStartY = 3700;
const rabbitEndY = 4500;
let rabbitSpeed = 5;

// Create rabbit at a specific position

function createRabbit(x, y, options = {}) {
  let rabbitBlock = new Block(
    world,
    { x, y, w: rabbitWidth, h: rabbitHeight, image: rabbitImg },
    { isStatic: true, ...options } // Set isStatic to true
  );
  return rabbitBlock; // Return the rabbitBlock to access its position in the main code
}

function drawRabbit() {
  rabbit.forEach((rabbitBody) => {
    const pos = rabbitBody.body.position;
    image(rabbitImg, pos.x - rabbitWidth / 2, pos.y - rabbitHeight / 2, rabbitWidth, rabbitHeight);
  });
}
function animateRabbit() {
  rabbit.forEach((rabbitBody) => {
    const rabbitPos = rabbitBody.body.position;
    const rabbitIndex = rabbit.indexOf(rabbitBody);

    // Update the rabbit's position within the physics engine
    Matter.Body.setPosition(rabbitBody.body, { x: rabbitPos.x, y: rabbitPos.y + rabbitSpeed });

    // Check if the rabbit is close to the starting position, reverse direction if needed
    const returnThreshold = 5; // Adjust as needed
    if (rabbitSpeed > 0 && rabbitPos.y > rabbitEndY - returnThreshold) {
      rabbitSpeed *= -1;
    } else if (rabbitSpeed < 0 && rabbitPos.y < rabbitStartY + returnThreshold) {
      rabbitSpeed *= -1;
    }
  });
}

