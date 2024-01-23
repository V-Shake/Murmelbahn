const rabbit = {
  x: 2000  ,
  y: 4926,
  width: 356,
  height: 749,
  speed: 2,
  endY: 5409
};
function drawRabbit() {
  if (rabbit.body) {
    const pos = rabbit.body.position;
    image(rabbitImg, pos.x - rabbit.width / 2, pos.y - rabbit.height / 2, rabbit.width, rabbit.height);
  }
}


function animateRabbit() {
  const rabbitPos = rabbit.body.position;
  if (rabbitPos.y <= rabbit.endY && rabbitPos.y >= 4926) {
    rabbit.body.position.y += rabbit.speed;
  } else if (rabbitPos.y < 4926) {
    rabbit.body.position.y = 4926;
    rabbit.speed *= -1; // Reverse direction when reaching the lowest position
  } else {
    rabbit.body.position.y = 5409;
    rabbit.speed *= -1; // Reverse direction when reaching the highest position
  }
}