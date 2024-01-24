
const rabbitWidth = 356;
const rabbitHeight = 749;
const rabbitStartY = 800;
const rabbitEndY = 1400;
let rabbitSpeed = 8;
function createRabbit(x, y, options = {}, applyForceOnSpace = false) {
 
 
  
  let rabbitBlock = new Block(
    world,
    { x, y, w: rabbitWidth, h: rabbitHeight, image: rabbitImg },
    { isStatic: true }

   
  );
  rabbit.push(rabbitBlock);

}
function drawRabbit() {
  rabbits.forEach((rabbitBody) => {
    rabbitBody.draw()
    /* const pos = rabbitBody.position;
    image(rabbitImg, pos.x - rabbit.width / 2, pos.y - rabbit.height / 2, rabbit.width, rabbit.height); */
  });
}
function animateRabbit() {
  rabbit.forEach((rabbitBody) => {
    const rabbitPos = rabbitBody.body.position;
    if (rabbitPos.y < rabbitStartY || rabbitPos.y > rabbitEndY ) {

      rabbitSpeed *= -1; // Reverse direction when reaching the highest position

    }
    rabbitBody.body.position.y += rabbitSpeed;
    /*    if (rabbitPos.y <= rabbitEndY && rabbitPos.y >= rabbitStartY) {
      rabbitBody.body.position.y += rabbitSpeed;
    } else if (rabbitPos.y < rabbitStartY) {
      rabbitBody.body.position.y = rabbitStartY;
      rabbitSpeed *= -1; // Reverse direction when reaching the lowest position
    } else {
      rabbitBody.body.position.y = rabbitEndY;
      rabbitSpeed *= -1; // Reverse direction when reaching the highest position
    } */
  });
}