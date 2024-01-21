function createFallingBook(x, y, force) {
  fallingBook.push(new Block(
    world,
    {
      x: x,
      y: y,
      w: 60,
      h: 487,
      image: bookImg,
      isTriggered: false,  // Neue Eigenschaft für den Trigger-Status hinzufügen
      trigger: (fallingBook, block) => {
        if (!block.isTriggered) {  // Überprüfen, ob der Trigger bereits ausgelöst wurde
          block.isTriggered = true;  // Trigger-Status auf "true" setzen, um Mehrfachauslösung zu verhindern
          Matter.Body.setStatic(block.body, false);
          Matter.Body.applyForce(block.body, block.body.position, force);
        }
      }
    },
    { isStatic: true, label: "book"}
  ));
}
