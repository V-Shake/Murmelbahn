function createSoundSensor(world, x, y, w, h, sounds, trigger) {
  let currentSoundIndex = 0;

  return new Block(
    world,
    {
      x: x,
      y: y,
      w: w,
      h: h,
      trigger: () => {
        // Play the current sound in the sequence
        const sound = new Audio(sounds[currentSoundIndex]);
        sound.play();

        // Move to the next sound in the sequence
        currentSoundIndex = (currentSoundIndex + 1) % sounds.length;

        trigger();
      }
    },
    { isStatic: true, isSensor: true, label: 'SoundSensor' }
  );
}