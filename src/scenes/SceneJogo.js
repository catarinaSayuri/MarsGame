export default class SceneJogo extends Phaser.Scene {
  constructor() {
    super("SceneJogo");
  }

  preload() {
    this.load.image("background", "assets/imagens/mapab.png");
    this.load.atlas(
      "boneco",
      "assets/sprites/spritesheet.png",
      "assets/sprites/sprites.json"
    );
  }

  create() {
    this.add.image(325, 320, "background").setScale(0.8);

    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "frente",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "frente",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "costas",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "costas",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "direita",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "direita",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "esquerda",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "esquerda",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.boneco = this.physics.add.sprite(250, 200, "boneco").setScale(2);
    this.boneco.setCollideWorldBounds(true);
    this.boneco.setOrigin(0.5, 0.5);
  }

  update() {
    this.boneco.setVelocity(0);

    if (this.cursors.left.isDown || this.a.isDown) {
      this.boneco.setVelocityX(-160);
      this.boneco.anims.play("esquerda", true);
    } else if (this.cursors.right.isDown || this.d.isDown) {
      this.boneco.setVelocityX(160);
      this.boneco.anims.play("direita", true);
    } else if (this.cursors.up.isDown || this.w.isDown) {
      this.boneco.setVelocityY(-160);
      this.boneco.anims.play("costas", true);
    } else if (this.cursors.down.isDown || this.s.isDown) {
      this.boneco.setVelocityY(160);
      this.boneco.anims.play("frente", true);
    } else {
      this.boneco.setVelocity(0);
      this.boneco.anims.stop();
    }
  }
}
