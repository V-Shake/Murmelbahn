const sounds = {
  do: new Audio('./assets/audio/do.mp3'),
  re: new Audio('./assets/audio/re.mp3'),
  mi: new Audio('./assets/audio/mi.mp3'),
  fa: new Audio('./assets/audio/fa.mp3'),
  so: new Audio('./assets/audio/so.mp3'),
  la: new Audio('./assets/audio/la.mp3'),
  ti: new Audio('./assets/audio/ti.mp3'),
  do1: new Audio('./assets/audio/do1.mp3'),
};

function playSoundsSequentially() {
  // List of sound keys in the desired sequence
  const soundSequence = ['do', 're', 'mi', 'fa', 'so', 'la', 'ti', 'do1'];

  // Helper function to play the next sound in the sequence
  function playNextSound(index) {
    if (index < soundSequence.length) {
      const soundKey = soundSequence[index];
      const sound = sounds[soundKey];

      // Play the sound and wait for it to finish before playing the next one
      sound.play();
      sound.onended = () => playNextSound(index + 1);
    }
  }

  // Start playing sounds from the beginning of the sequence
  playNextSound(0);
}

// Export the function
export { playSoundsSequentially };
