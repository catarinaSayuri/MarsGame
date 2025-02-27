export default class SceneQuarto extends Phaser.Scene {
  constructor() {
    super("SceneQuarto");
  }

  // Carrega os recursos necessários antes de criar a cena
  preload() {
    console.log("Precarregando ativos da SceneQuarto...");
    this.load.image("fundoQuarto", "./assets/imagens/imagesCasa/casab.png"); // Imagem de fundo do quarto
    this.load.on("complete", () => console.log("Ativos carregados para SceneQuarto!")); // Notifica sucesso no carregamento
    this.load.on("loaderror", (arquivo) => console.error(`Erro ao carregar arquivo: ${arquivo.key}`)); // Notifica erro, se ocorrer
  }

  // Configura os elementos visuais e físicos da cena
  create() {
    console.log("Criando SceneQuarto...");

    // Define as dimensões da tela
    const larguraTela = 920;
    const alturaTela = 620;

    // Posiciona e ajusta o fundo da cena
    const imagemFundo = this.add.image(larguraTela / 2, alturaTela / 2, "fundoQuarto");
    imagemFundo.setOrigin(0.6, 0.6); // Ajusta o ponto de origem para centralizar
    const larguraImagem = imagemFundo.width;
    const alturaImagem = imagemFundo.height;
    const escalaX = larguraTela / larguraImagem;
    const escalaY = alturaTela / alturaImagem;
    const escalaFinal = Math.max(escalaX, escalaY); // Escala para cobrir a tela sem distorção
    imagemFundo.setScale(escalaFinal);

    console.log("SceneQuarto criada com sucesso!");
    console.log(`Dimensões da imagem: ${larguraImagem}x${alturaImagem}, Escala aplicada: ${escalaFinal}`);

    // Cria grupo de colisores para os móveis e paredes
    this.grupoColisores = this.physics.add.staticGroup();
    this.grupoColisores.create(275, 120).setVisible(false).setScale(3, 3); // Cama
    this.grupoColisores.create(410, 100).setVisible(false).setScale(1.3, 3); // Armário
    this.grupoColisores.create(420, 255).setVisible(false).setScale(3.3, 3.2); // Mesa com sofá
    this.grupoColisores.create(560, 410).setVisible(false).setScale(2, 1.5); // Balcão
    this.grupoColisores.create(620, 410).setVisible(false).setScale(2, 1.5);
    this.grupoColisores.create(510, 400).setVisible(false).setScale(1.3, 3); // Geladeira
    this.grupoColisores.create(255, 310).setVisible(false); // Cadeira sala inferior
    this.grupoColisores.create(255, 230).setVisible(false); // Cadeira sala superior
    this.grupoColisores.create(200, 120).setVisible(false).setScale(1.5, 1); // Baú
    this.grupoColisores.create(575, 110).setVisible(false); // Pia
    this.grupoColisores.create(640, 110).setVisible(false); // Privada
    this.grupoColisores.create(540, 510).setVisible(false).setScale(2, 2); // Mesa de jantar
    this.grupoColisores.create(445, 540).setVisible(false); // Vaso da cozinha
    this.grupoColisores.create(400, 490).setVisible(false).setScale(2, 1); // Paredes inferiores da sala
    this.grupoColisores.create(340, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(280, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(220, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(160, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(100, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(40, 490).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(415, 570).setVisible(false); // Parede esquerda da cozinha
    this.grupoColisores.create(150, 345).setVisible(false).setScale(1, 1.5); // Paredes esquerda da sala
    this.grupoColisores.create(150, 300).setVisible(false).setScale(1, 2);
    this.grupoColisores.create(150, 240).setVisible(false).setScale(1, 2);
    this.grupoColisores.create(150, 180).setVisible(false).setScale(1, 2);
    this.grupoColisores.create(150, 120).setVisible(false).setScale(1, 2);
    this.grupoColisores.create(120, 360).setVisible(false).setScale(2, 1); // Parede de entrada superior
    this.grupoColisores.create(70, 360).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(355, 90).setVisible(false).setScale(2, 1); // Paredes superiores sala e banheiro
    this.grupoColisores.create(470, 90).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(530, 90).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(590, 90).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(530, 230).setVisible(false).setScale(2, 1); // Parede inferior banheiro
    this.grupoColisores.create(590, 230).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(650, 230).setVisible(false).setScale(2, 1);
    this.grupoColisores.create(510, 250).setVisible(false).setScale(1, 2); // Parede direita sala
    this.grupoColisores.create(510, 310).setVisible(false).setScale(1, 2);

    // Inicializa o personagem jogável (cachorro) com física e frame inicial
    this.jogadorSprite = this.physics.add.sprite(95, 430, "jogadorAtlas").setScale(2);
    this.jogadorSprite.setCollideWorldBounds(true); // Limita o movimento às bordas da tela
    // Define um frame inicial para evitar a exibição de uma caixa preta
    if (this.textures.exists("jogadorAtlas") && this.anims.exists("direita")) {
      this.jogadorSprite.setFrame("direita0000"); // Define o primeiro frame da animação "frente"
      this.jogadorSprite.anims.play("direita", true); // Inicia a animação "frente"
      this.jogadorSprite.anims.stop(); // Para imediatamente para exibir apenas o frame inicial
    } else {
      console.error("Atlas 'jogadorAtlas' ou animação 'frente' não disponível na SceneQuarto!");
    }

    // Define colisões entre o jogador e os colisores
    this.physics.add.collider(this.jogadorSprite, this.grupoColisores);

    // Cria o retângulo invisível para mudar de cena
    this.portaSaida = this.physics.add.staticSprite(20, 425, null); // Posição próxima à "parede de entrada superior"
    this.portaSaida.setSize(50, 50); // Define o tamanho do retângulo (50x50 pixels)
    this.portaSaida.setVisible(false); // Torna o retângulo invisível
    // Configura a colisão com o jogador para mudar para SceneJogo
    this.physics.add.collider(this.jogadorSprite, this.portaSaida, () => {
      console.log("Colisão com a porta! Retornando para SceneJogo...");
      this.scene.start("SceneJogo"); // Muda para a cena SceneJogo
    });

    // Configura os controles do teclado
    this.teclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.teclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.teclasCursor = this.input.keyboard.createCursorKeys();

    console.log("Animações disponíveis na SceneQuarto:", 
      this.anims.exists("frente"), 
      this.anims.exists("costas"), 
      this.anims.exists("direita"), 
      this.anims.exists("esquerda")
    );
  }

  // Atualiza o estado do jogo a cada frame
  update() {
    this.jogadorSprite.setVelocity(0); // Reseta a velocidade do jogador

    // Função auxiliar para reproduzir animações com verificação
    const reproduzirAnimacaoSegura = (chaveAnimacao) => {
      if (this.anims.exists(chaveAnimacao)) {
        this.jogadorSprite.anims.play(chaveAnimacao, true);
      } else {
        console.error(`Animação '${chaveAnimacao}' não encontrada na SceneQuarto!`);
      }
    };

    // Controla o movimento do jogador com base nas teclas pressionadas
    if (this.teclasCursor.left.isDown || this.teclaA.isDown) {
      this.jogadorSprite.setVelocityX(-160); // Move para a esquerda
      reproduzirAnimacaoSegura("esquerda");
    } else if (this.teclasCursor.right.isDown || this.teclaD.isDown) {
      this.jogadorSprite.setVelocityX(160); // Move para a direita
      reproduzirAnimacaoSegura("direita");
    } else if (this.teclasCursor.up.isDown || this.teclaW.isDown) {
      this.jogadorSprite.setVelocityY(-160); // Move para cima
      reproduzirAnimacaoSegura("costas");
    } else if (this.teclasCursor.down.isDown || this.teclaS.isDown) {
      this.jogadorSprite.setVelocityY(160); // Move para baixo
      reproduzirAnimacaoSegura("frente");
    } else {
      this.jogadorSprite.anims.stop(); // Para a animação quando não há movimento
    }
  }
}