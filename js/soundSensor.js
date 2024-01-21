function createSoundSensor(world, x, y, w, h, trigger) {
  const sounds = [
    './assets/audio/do.mp3',
    './assets/audio/re.mp3',
    './assets/audio/mi.mp3',
    './assets/audio/fa.mp3',
    './assets/audio/so.mp3',
    './assets/audio/la.mp3',
    './assets/audio/ti.mp3',
    './assets/audio/dom.mp3'
  ];

  let currentSoundIndex = 0;

  return new Block(
    world,
    {
      x: x,
      y: y,
      w: w,
      h: h,
      trigger: (ball, block) => {
        // Play the current sound in the sequence
        const sound = new Audio(sounds[currentSoundIndex]);
        sound.play();

        // Move to the next sound in the sequence
        currentSoundIndex = (currentSoundIndex + 1) % sounds.length;

        // If you want to trigger additional actions when the last sound is played:
        if (currentSoundIndex === 0) {
          // Do something special for the last sound in the sequence
        }
      }
    },
    { isStatic: true, isSensor: true }
  );
}
const soundSensor = createSoundSensor(world, 54, 3054 , 2586 , 54, (ball, block) => {
  if (currentSoundIndex === 0) {
  }
  // Your trigger logic here
});
