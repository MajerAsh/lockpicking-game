export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.isTensionApplied = false;
  }

  preload() {
    this.load.image("lockbody", "src/assets/lockbody.png");
    this.load.image("pin", "src/assets/pin.png");
  }

  create() {
    this.add.image(400, 300, "lockbody").setScale(0.8);

    // 🔹 Create tension bar graphics
    this.tensionBar = this.add.rectangle(400, 500, 200, 10, 0x444444);
    this.tensionFill = this.add.rectangle(400, 500, 0, 10, 0x00ff88); //Change the color or size by adjusting here. For example, 0xff8800 gives an orange “stress” bar
    this.tensionFill.setOrigin(0, 0.5);
    this.tensionFill.x = 300; // left edge of bar

    this.tensionText = this.add
      .text(400, 470, "TENSION", {
        font: "16px monospace",
        fill: "#888",
      })
      .setOrigin(0.5);

    // 🔹 Pins
    this.pins = [];
    const pinStartY = 260;
    const pinSpacing = 60;

    for (let i = 0; i < 5; i++) {
      const x = 250 + i * pinSpacing;
      const pin = this.add.sprite(x, pinStartY, "pin").setScale(0.5);
      pin.setOrigin(0.5, 0);
      pin.isSet = false;
      pin.defaultY = pinStartY;
      this.makeInteractive(pin);
      this.pins.push(pin);
    }

    // 🔹 Spacebar control
    this.input.keyboard.on("keydown-SPACE", () => {
      this.isTensionApplied = true;
      this.cameras.main.flash(100, 100, 255, 100);
    });

    this.input.keyboard.on("keyup-SPACE", () => {
      this.isTensionApplied = false;
    });

    this.statusText = this.add.text(
      10,
      10,
      "Click and drag pins. Hold SPACE for tension.",
      {
        font: "18px monospace",
        fill: "#ccc",
      }
    );
  }

  makeInteractive(pin) {
    pin.setInteractive({ draggable: true });
    this.input.setDraggable(pin);

    pin.on("drag", (pointer, dragX, dragY) => {
      if (pin.isSet) return;
      const newY = Phaser.Math.Clamp(dragY, 150, pin.defaultY);
      pin.y = newY;
    });

    pin.on("dragend", () => {
      if (this.isTensionApplied && pin.y < pin.defaultY - 80) {
        this.setPin(pin);
      } else {
        this.tweens.add({
          targets: pin,
          y: pin.defaultY,
          duration: 300,
          ease: "Bounce.easeOut",
        });
      }
    });
  }

  setPin(pin) {
    pin.isSet = true;
    this.tweens.add({
      targets: pin,
      y: pin.defaultY - 70,
      duration: 200,
      ease: "Power2",
    });

    this.tweens.add({
      targets: pin,
      angle: Phaser.Math.Between(-5, 5),
      yoyo: true,
      repeat: 1,
      duration: 150,
    });

    if (this.pins.every((p) => p.isSet)) this.unlock();
  }

  unlock() {
    this.statusText.setText("🔓 Lock opened!");
    this.cameras.main.shake(300, 0.01);
  }

  update() {
    // 🔹 Animate tension bar fill based on spacebar
    const targetWidth = this.isTensionApplied ? 200 : 0;
    const currentWidth = this.tensionFill.displayWidth;
    const lerpSpeed = 0.2;
    this.tensionFill.displayWidth = Phaser.Math.Linear(
      currentWidth,
      targetWidth,
      lerpSpeed
    );

    // Optional wobble effect when tension is held
    if (this.isTensionApplied) {
      this.tensionFill.y = 500 + Math.sin(this.time.now * 0.02) * 2;
    } else {
      this.tensionFill.y = 500;
    }
  }
}
