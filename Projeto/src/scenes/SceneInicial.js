export default class SceneInicial extends Phaser.Scene {
  constructor() {
    super("SceneInicial");
  }

  preload() {
    this.load.image("botao", "assets/imagens/botao.png");
    this.load.image("fundo", "assets/imagens/imagesb (2).png");
    this.load.image("logo", "assets/imagens/logo.png");
    console.log("SceneInicial: Assets carregados.");
  }

  create() {
    this.add.image(350, 300, "fundo").setScale(0.6);
    this.add.image(350, 80, "logo").setScale(0.4);

    let botao = this.add.image(350, 500, "botao").setScale(0.5);
    botao.setInteractive();

    botao.on("pointerover", () => {
      console.log("Mouse sobre o botão");
    });

    botao.on("pointerout", () => {
      console.log("Mouse saiu do botão");
    });

    botao.on("pointerdown", () => {
      console.log("Botão clicado! Carregando cena do jogo...");
      this.scene.start("SceneJogo");
    });
  }


  
}
