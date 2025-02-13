import SceneInicial from "./scenes/SceneInicial.js";
import SceneJogo from "./scenes/SceneJogo.js";

const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [SceneInicial, SceneJogo], // Registre as cenas
};

const game = new Phaser.Game(config);
