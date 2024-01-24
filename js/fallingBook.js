function createFallingBook(x, y, options = {}, applyForceOnSpace = false) {
  const bookWidth = 60;
  const bookHeight = 447;

  let fallingBlock = new Block(
    world,
    { x, y, w: bookWidth, h: bookHeight, image: fallingBookImg },
    { friction: 0.5, density: 0.0006, angularVelocity: 0.1, ...options }
  );
  fallingBook.push(fallingBlock);

  if (applyForceOnSpace) {
    const force = options.force || { x: 0, y: 0.005 };
    Matter.Body.applyForce(fallingBlock.body, fallingBlock.body.position, force);
  }

}