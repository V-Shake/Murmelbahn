function createElevatorRabbit(x, y, force) {

  let rabbit = new Block(
    { x: 2500, y: 5000, w: 356, h: 749, image: whiteRabbitImg },
    { isStatic: true }
  );
  
  let swingY = height / 2 + sin(frameCount * 0.2) * 100;
  Matter.Body.setPosition(
    rabbit.body,
    { x: rabbit.body.position.x, y: swingY }
  );

  return rabbit; // If you want to use or manipulate the created rabbit elsewhere
}
