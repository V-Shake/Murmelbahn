function createPendulum(world, x, y, length, color) {
    const body = Matter.Bodies.rectangle(x, y, 10, length, { isStatic: false, frictionAir: 0, restitution: 1 });
    World.add(world, body);
  
    const draw = () => {
      const pos = body.position;
      const angle = body.angle;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
  
      fill(color);
      stroke(0);
      strokeWeight(2);
      line(0, 0, 0, body.vertices[3].y - pos.y);
      ellipse(0, body.vertices[3].y - pos.y, 20, 20);
  
      pop();
    };
  
    return { body, draw };
  }
  
  // Add the following lines in your setup function
  const pendulum = createPendulum(world, 1000, 500, 200, 'blue');
  blocks.push(pendulum);
  