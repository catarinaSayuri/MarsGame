export default class SceneInicial extends Phaser.Scene {
  // O construtor inicializa a cena e define seu nome
  constructor() {
    super("SceneInicial");
  }

  // Função chamada antes da criação da cena para carregar imagens
  preload() {
    this.carregarImagens();
  }

  // Função chamada após o preload, usada para criar elementos na tela
  create() {
    this.adicionarFundo(); // Adiciona o fundo à cena
    this.adicionarLogo(); // Adiciona o logo à cena
    this.adicionarBotoes(); // Adiciona os botões interativos
  }

  // Carrega as imagens necessárias para a cena
  carregarImagens() {
    const assetPaths = {
      botaoJogar: "./assets/imagens/imagesBotoes/botao.png",
      fundo: "./assets/imagens/imagesMapa/cenamenu.jpg",
      logo: "./assets/imagens/logo.png",
      botaoConfig: "./assets/imagens/imagesBotoes/botaoc.png",
      botaoSair: "./assets/imagens/imagesBotoes/botaosair.png",
    };

    // Percorre o objeto assetPaths e carrega cada imagem
    Object.entries(assetPaths).forEach(([key, path]) => {
      this.load.image(key, path);
    });
  }

  // Adiciona a imagem de fundo ao centro da tela
  adicionarFundo() {
    this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "fundo").setScale(0.7);
  }

  // Adiciona a logo no topo da tela
  adicionarLogo() {
    this.add.image(this.sys.game.config.width / 2, 80, "logo").setScale(0.5);
  }

  // Cria os botões interativos e define suas ações
  adicionarBotoes() {
    const botoes = [
      { key: "botaoConfig", x: 100, y: 550, scale: 0.3, onClick: this.openSettings.bind(this) },
      { key: "botaoSair", x: 350, y: 450, scale: 0.4, onClick: this.fecharJogo.bind(this) },
      { key: "botaoJogar", x: 350, y: 350, scale: 0.4, onClick: this.startGame.bind(this) },
    ];

    // Para cada botão, adicionamos a imagem, tornamos interativo e associamos o evento de clique
    botoes.forEach(({ key, x, y, scale, onClick }) => {
      const botao = this.add.image(x, y, key).setScale(scale).setInteractive();
      botao.on("pointerdown", onClick);
    });
  }

  // Inicia a transição para a cena do jogo ao clicar no botão "Jogar"
  startGame() {
    console.log("Botão clicado! Carregando cena do jogo...");
    
    // Adiciona um efeito de pixelização e fade out
    const pixelated = this.cameras.main.postFX.addPixelate(40);
    this.cameras.main.fadeOut(1000);

    // Animação de transição para a próxima cena
    this.add.tween({
      targets: pixelated,
      duration: 700,
      amount: 15,
      onComplete: () => this.scene.start("SceneJogo"),
    });
  }

  // Exibe mensagem no console ao abrir configurações (futuro desenvolvimento)
  openSettings() {
    console.log("SceneConfig: Abrindo configurações...");
  }

  // Fecha o jogo ou redireciona caso o fechamento não seja permitido
  fecharJogo() {
    console.log("Saindo do jogo...");
    try {
      window.close(); // Tenta fechar a aba
    } catch (error) {
      console.warn("Falha ao fechar a aba, redirecionando...");
      window.location.href = "https://www.mars.com/about/the-five-principles";
    }
  }  
}