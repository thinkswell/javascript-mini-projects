
---

# Rick and Morty Memory Game

 ![Rick and Morty](https://github.com/user-attachments/assets/cc5aea27-9f5e-49ed-9acc-1477c5092512)
<!-- Substitua por um link real para uma imagem do jogo -->

## Descrição

**Rick and Morty Memory Game** é um jogo de memória simples e divertido onde os jogadores precisam encontrar todos os pares de cartas iguais no menor tempo possível. O jogo é temático da série **Rick and Morty**, apresentando personagens icônicos como Rick, Morty, Summer, e muitos outros!

O jogo também conta com uma funcionalidade de **cronômetro**, que desafia o jogador a encontrar todos os pares no menor tempo possível.

## Funcionalidades

- **Tema Rick and Morty**: Cartas personalizadas com personagens da série.
- **Funcionalidade de tempo**: Um cronômetro é iniciado quando o jogo começa, adicionando um elemento competitivo para tentar bater o próprio recorde.
- **Resolução adaptativa**: Funciona em diferentes tamanhos de tela.
- **Contador de tentativas**: Monitora quantas jogadas o jogador fez até completar o jogo.

## Como Jogar

1. Ao iniciar o jogo, as cartas são embaralhadas e dispostas viradas para baixo.
2. Clique em duas cartas para virá-las. Se forem iguais, elas permanecem viradas para cima. Se forem diferentes, as cartas serão viradas de volta.
3. O objetivo é encontrar todos os pares de cartas iguais no menor tempo possível.
4. O cronômetro começa automaticamente quando você faz a primeira jogada.
5. Tente bater o seu recorde com o menor número de tentativas e no menor tempo!

## Tecnologias Utilizadas

- **HTML5**: Para a estrutura do jogo.
- **CSS3**: Para o design e layout responsivo.
- **JavaScript**: Para a lógica do jogo, manipulação do DOM, controle do tempo e interatividade.

## Estrutura do Projeto

```bash
memory-game/
│
├── index.html        # Página principal do jogo
├── css/
│   └── style.css     # Estilos do jogo
├── js/
│   └── script.js     # Lógica do jogo em JavaScript
├── img/
│   └── personagens/  # Imagens dos personagens de Rick and Morty
└── README.md         # Este arquivo explicativo
```

## Funcionalidade do Cronômetro

O cronômetro começa automaticamente quando o jogador vira a primeira carta e para assim que todos os pares forem encontrados. O tempo é mostrado na tela durante o jogo, permitindo que o jogador acompanhe seu progresso.

## Instalação e Execução

1. Clone o repositório em sua máquina local:

   ```bash
   git clone https://github.com/EveeSilvaa/javascript-mini-projects.git
   ```

2. Navegue até a pasta do jogo da memória:

   ```bash
   cd javascript-mini-projects/memory-game
   ```

3. Abra o arquivo `index.html` no seu navegador para jogar.

## Melhorias Futuras

- Adicionar níveis de dificuldade (mais cartas).
- Sistema de pontuação baseado no tempo e no número de tentativas.
- Ranking para armazenar e exibir os melhores tempos dos jogadores.

## Contribuições

Fique à vontade para contribuir com melhorias ou novos recursos para o jogo! Basta seguir os passos para fork e pull request.

## Licença

Este projeto é licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
