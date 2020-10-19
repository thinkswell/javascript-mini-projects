export default class EndGame extends Phaser.Scene {
  constructor() {
    super('EndGameScene')
    this.pontuacao
  }

  init(data) {
    this.pontuacao = data.pontuacao
  }

  preload() {
    this.load.html('end-game', 'assets/html/end-game.html')
  }

  create() {
    gameoverMusic.play()
    this.pontuacaoText = this.add.text((380 / 2), innerHeight / 2 - 60, 'Scores: ' + this.pontuacao, { font: '22px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'center' }).setOrigin(0.5)
    let _this = this
    let endgame = this.add.dom(380 / 2, innerHeight / 2).createFromCache('end-game')

    endgame.addListener('click')
    endgame.addListener('mouseover')

    endgame.on('mouseover', () => {
      clickMusic.play()
    })

    endgame.on('click', event => {
      event.preventDefault()
      if (event.target.id === 'menu_jogo') {
        menuMusic.play()
        gameoverMusic.stop()
        _this.resetScores()
        _this.scene.start('MenuScene')
      }
    })
  }

  resetScores() {
    let name = document.getElementById('name').value

    let player = {
      name,
      scores: this.pontuacao || 0
    }

    const scores = JSON.parse(localStorage.getItem('scores'))
    scores.push(player)
    scores.sort(function (a, b) { return b.scores - a.scores })

    localStorage.setItem('scores', JSON.stringify(scores))

    this.pontuacao = 0
  }
}