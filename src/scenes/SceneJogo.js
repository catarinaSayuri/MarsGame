export default class SceneJogo extends Phaser.Scene {
  constructor() {
    super("SceneJogo");
  }

  // Carrega os recursos visuais e sprites antes de criar a cena
  preload() {
    this.load.image("imagemFundo", "./assets/imagens/imagesMapa/Mapa_design.png"); // Fundo do mapa
    this.load.atlas(
      "jogadorAtlas",
      "assets/sprites/spritesheet.png",
      "assets/sprites/sprites.json"
    ); // Atlas do jogador
    this.load.image("npcImagem", "assets/sprites/frankmarssprite.png"); // Imagem do NPC
    this.load.image("botaoProximaCena", "assets/imagens/inteli.png"); // Botão para próxima cena

    // Verifica carregamento bem-sucedido do NPC
    this.load.on("filecomplete-image-npcImagem", () => {
      console.log("Imagem 'npcImagem' carregada com sucesso!");
    });
    this.load.on("loaderror", (arquivo) => {
      console.error(`Erro ao carregar o arquivo: ${arquivo.key}`);
    });
  }

  // Configura os elementos da cena: fundo, jogador, NPC, colisores e interações
  create() {
    // Adiciona o fundo do jogo
    this.add.image(350, 300, "imagemFundo").setScale(0.58);

    // Configura o botão invisível para mudar de cena
    this.botaoProximaCena = this.add.image(135, 420, "botaoProximaCena").setScale(0.3);
    this.botaoProximaCena.setInteractive();
    this.botaoProximaCena.setAlpha(0.0001);
    this.botaoProximaCena.on("pointerdown", () => {
      console.log("Botão clicado! Carregando cena do quarto...");
      this.scene.start("SceneQuarto");
    });

    // Configura os controles do teclado
    this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.teclasCursor = this.input.keyboard.createCursorKeys();

    // Cria o NPC apenas se a imagem foi carregada
    if (this.textures.exists("npcImagem")) {
      this.npcSprite = this.physics.add.sprite(155, 455, "npcImagem").setScale(1.5);
      this.npcSprite.setCollideWorldBounds(true);
    } else {
      console.error("Imagem 'npcImagem' não foi carregada corretamente!");
    }

    // Cria o jogador com física
    this.jogadorSprite = this.physics.add.sprite(330, 545, "jogadorAtlas").setScale(1.6);
    this.jogadorSprite.setCollideWorldBounds(true);

    // Inicializa animações, diálogos, popup e interatividade do NPC
    this.criarAnimacoes();
    this.configurarCaixaDeFala();
    this.configurarPopup();
    this.tornarNPCInterativo();

    // Cria colisores para obstáculos
    this.grupoColisores = this.physics.add.staticGroup();
    this.grupoColisores.create(150, 440).setVisible(false).setScale(2, 2); // Obstáculos
    this.grupoColisores.create(90, 440).setVisible(false).setScale(1.7, 2);
    this.grupoColisores.create(150, 390).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(90, 390).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(280, 520).setVisible(false).setScale(1, 1);
    this.grupoColisores.create(280, 430).setVisible(false).setScale(1, 1);
    this.grupoColisores.create(330, 430).setVisible(false).setScale(1, 1);
    this.grupoColisores.create(365, 480).setVisible(false).setScale(1, 1);
    this.physics.add.collider(this.jogadorSprite, this.grupoColisores);
  }

  // Cria as animações do jogador usando o atlas
  criarAnimacoes() {
    this.anims.create({
      key: "frente",
      frames: this.anims.generateFrameNames("jogadorAtlas", {
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
      frames: this.anims.generateFrameNames("jogadorAtlas", {
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
      frames: this.anims.generateFrameNames("jogadorAtlas", {
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
      frames: this.anims.generateFrameNames("jogadorAtlas", {
        prefix: "esquerda",
        start: 0,
        end: 3,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    console.log("Animações Carregadas:");
    console.log("Frente:", this.anims.exists("frente"));
    console.log("Costas:", this.anims.exists("costas"));
    console.log("Direita:", this.anims.exists("direita"));
    console.log("Esquerda:", this.anims.exists("esquerda"));
  }

  // Configura a caixa de diálogo para o NPC
  configurarCaixaDeFala() {
    this.caixaDeFala = this.add.rectangle(300, 380, 500, 100, 0xffffff, 1);
    this.caixaDeFala.setStrokeStyle(2, 0x000000);
    this.caixaDeFala.setVisible(false);
    this.caixaDeFala.setDepth(1);

    this.textoDialogo = this.add.text(300, 380, "", {
      fontSize: "18px",
      fill: "#000000",
      wordWrap: { width: 450, useAdvancedWrap: true },
      align: "center",
    });
    this.textoDialogo.setOrigin(0.5);
    this.textoDialogo.setVisible(false);
    this.textoDialogo.setDepth(2);
  }

  // Configura o popup que aparece perto do NPC
  configurarPopup() {
    this.containerPopup = this.add.container(0, 0);
    this.retanguloPopup = this.add.rectangle(0, 0, 150, 40, 0xffffff, 1);
    this.retanguloPopup.setStrokeStyle(2, 0x000000);
    this.textoPopup = this.add.text(0, 0, "Clique em mim", {
      fontSize: "16px",
      fill: "#000000",
      fontWeight: "bold",
    });
    this.textoPopup.setOrigin(0.5);
    this.containerPopup.add([this.retanguloPopup, this.textoPopup]);
    this.containerPopup.setVisible(false);
    this.containerPopup.setDepth(2);
  }

  // Torna o NPC interativo para exibir diálogo
  tornarNPCInterativo() {
    if (this.npcSprite) {
      this.npcSprite.setInteractive();
      this.npcSprite.on("pointerdown", () => {
        if (this.caixaDeFala.visible) {
          console.log("Diálogo fechado.");
          this.caixaDeFala.setVisible(false);
          this.textoDialogo.setVisible(false);
        } else {
          console.log("Diálogo aberto.");
          this.textoDialogo.setText("Bom dia! Meu nome é Franklin Mars. Preciso de sua ajuda!");
          this.caixaDeFala.setVisible(true);
          this.textoDialogo.setVisible(true);
        }
        this.containerPopup.setVisible(false);
      });
    } else {
      console.warn("NPC não disponível para interação.");
    }
  }

  // Atualiza o estado do jogo a cada frame
  update() {
    this.jogadorSprite.setVelocity(0); // Reseta a velocidade do jogador

    // Função auxiliar para tocar animações com segurança
    const reproduzirAnimacaoSegura = (chaveAnimacao) => {
      if (this.anims.exists(chaveAnimacao)) {
        this.jogadorSprite.anims.play(chaveAnimacao, true);
      } else {
        console.error(`Animação '${chaveAnimacao}' não encontrada!`);
      }
    };

    // Controla o movimento do jogador
    if (this.teclasCursor.left.isDown || this.teclaA.isDown) {
      this.jogadorSprite.setVelocityX(-160);
      reproduzirAnimacaoSegura("esquerda");
    } else if (this.teclasCursor.right.isDown || this.teclaD.isDown) {
      this.jogadorSprite.setVelocityX(160);
      reproduzirAnimacaoSegura("direita");
    } else if (this.teclasCursor.up.isDown || this.teclaW.isDown) {
      this.jogadorSprite.setVelocityY(-160);
      reproduzirAnimacaoSegura("costas");
    } else if (this.teclasCursor.down.isDown || this.teclaS.isDown) {
      this.jogadorSprite.setVelocityY(160);
      reproduzirAnimacaoSegura("frente");
    } else {
      this.jogadorSprite.anims.stop();
    }

    // Controla a visibilidade do popup baseado na distância do NPC
    if (this.npcSprite) {
      const distancia = Phaser.Math.Distance.Between(
        this.jogadorSprite.x,
        this.jogadorSprite.y,
        this.npcSprite.x,
        this.npcSprite.y
      );
      if (distancia < 100 && !this.caixaDeFala.visible) {
        this.containerPopup.setPosition(this.npcSprite.x, this.npcSprite.y - 50);
        this.containerPopup.setVisible(true);
      } else {
        this.containerPopup.setVisible(false);
      }
    }
  }
}