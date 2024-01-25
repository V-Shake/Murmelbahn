function createSqueakSensor(world, x, y, w, h, sounds, trigger) {

  return new Block(
    world,
    {
      x: x,
      y: y,
      w: w,
      h: h,
      trigger: () => {
        // Play the current sound in the sequence
       
        squeak.play();

        // Move to the next sound in the sequence

        trigger();
      }
    },
    { isStatic: true, isSensor: true, label: 'squeak' }
  );
}