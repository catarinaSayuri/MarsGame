export default class SceneJogo extends Phaser.Scene {
  constructor() {
    // Chama o construtor da classe Phaser.Scene e define o nome da cena como "SceneJogo"
    super("SceneJogo");
  }

  preload() {
    // Carrega a imagem do fundo do mapa
    this.load.image("background", "assets/imagens/mapab.png");

    // Carrega a spritesheet e o arquivo JSON contendo os frames de animação do personagem
    this.load.atlas(
      "boneco",
      "assets/sprites/spritesheet.png",
      "assets/sprites/sprites.json"
    );
  }

  create() {
    // Adiciona o fundo da cena na posição (325, 320) e ajusta o tamanho
    this.add.image(325, 320, "background").setScale(0.8);

    // Cria as teclas de movimentação usando W, A, S, D e as setas do teclado
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Cria a animação para andar para frente
    this.anims.create({
      key: "frente",
      frames: this.anims.generateFrameNames("boneco", {
        prefix: "frente",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1, // Faz a animação rodar em loop
    });

    // Cria a animação para andar para trás
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

    // Cria a animação para andar para a direita
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

    // Cria a animação para andar para a esquerda
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

    // Adiciona o personagem na posição (250, 200), ajusta o tamanho e define colisão com os limites da tela
    this.boneco = this.physics.add.sprite(250, 200, "boneco").setScale(2);
    this.boneco.setCollideWorldBounds(true); // Impede que o personagem saia da tela
    this.boneco.setOrigin(0.5, 0.5); // Define a origem do sprite no centro
  }

  update() {
    // Reseta a velocidade do personagem antes de verificar os inputs
    this.boneco.setVelocity(0);

    // Movimento para a esquerda (tecla A ou seta esquerda)
    if (this.cursors.left.isDown || this.a.isDown) {
      this.boneco.setVelocityX(-160); // Move o personagem para a esquerda
      this.boneco.anims.play("esquerda", true); // Ativa a animação correspondente
    } 
    // Movimento para a direita (tecla D ou seta direita)
    else if (this.cursors.right.isDown || this.d.isDown) {
      this.boneco.setVelocityX(160); // Move o personagem para a direita
      this.boneco.anims.play("direita", true);
    } 
    // Movimento para cima (tecla W ou seta para cima)
    else if (this.cursors.up.isDown || this.w.isDown) {
      this.boneco.setVelocityY(-160); // Move o personagem para cima
      this.boneco.anims.play("costas", true);
    } 
    // Movimento para baixo (tecla S ou seta para baixo)
    else if (this.cursors.down.isDown || this.s.isDown) {
      this.boneco.setVelocityY(160); // Move o personagem para baixo
      this.boneco.anims.play("frente", true);
    } 
    // Caso nenhuma tecla seja pressionada, para o personagem e interrompe a animação
    else {
      this.boneco.setVelocity(0);
      this.boneco.anims.stop();
    }
  }
}
