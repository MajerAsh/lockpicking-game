export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // Load images (replace with your own later)
    this.load.image("lockbody", "src/assets/lockbody.png");
    this.load.image("pin", "src/assets/pin.png");
    this.load.image("spring", "src/assets/spring.png");
  }

  create() {
    // Lock body sprite
    this.add.image(400, 300, "lockbody").setScale(0.8);

    // Group for pins
    this.pins = [];

    // Create 5 pins
    for (let i = 0; i < 5; i++) {
      const x = 250 + i * 60;
      const pin = this.add.sprite(x, 250, "pin").setScale(0.5);
      pin.setOrigin(0.5, 0);
      this.pins.push(pin);

      // Add a simple tween to make them “jiggle” slightly
      this.tweens.add({
        targets: pin,
        y: "+=10",
        yoyo: true,
        repeat: -1,
        duration: 800 + i * 100,
        ease: "Sine.inOut",
      });
    }

    // Add the tension wrench (just a key press for now)
    this.input.keyboard.on("keydown-SPACE", () => {
      this.applyTension();
    });

    this.add.text(10, 10, "Press SPACE to apply tension", {
      font: "18px monospace",
      fill: "#ccc",
    });
  }

  applyTension() {
    // Visual feedback: rotate pins slightly as if torque applied
    this.tweens.add({
      targets: this.pins,
      angle: Phaser.Math.Between(-5, 5),
      yoyo: true,
      duration: 200,
      ease: "Sine.inOut",
    });
  }
}
