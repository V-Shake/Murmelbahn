class MusicalBlock extends Block {
  /**
   * @param {Matter.World} world 
   * @param {object} attributes 
   * @param {Matter.IChamferableBodyDefinition} options 
   */
  constructor(world, attributes, options) {
    super(world, attributes, options);
    this.sound = new Audio('./assets/audio/do.mp3');
    // this.sound = new Audio[8];
    // this.sound[0] = new Audio('./assets/audio/do.mp3'); 
    // this.sound[1] = new Audio('./assets/audio/re.mp3'); 
    // this.sound[2] = new Audio('./assets/audio/mi.mp3'); 
    // this.sound[3] = new Audio('./assets/audio/fa.mp3');
    // this.sound[4] = new Audio('./assets/audio/so.mp3');
    // this.sound[5] = new Audio('./assets/audio/la.mp3');
    // this.sound[6] = new Audio('./assets/audio/ti.mp3');
    // this.sound[7] = new Audio('./assets/audio/do1.mp3');     
  }
}