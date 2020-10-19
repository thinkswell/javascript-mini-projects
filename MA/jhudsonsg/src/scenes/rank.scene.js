export default class RankScene extends Phaser.Scene {
  constructor() {
    super('RankScene')
  }

  create() {
    const scores = JSON.parse(localStorage.getItem('scores'))
    this.add.text((380 / 2) - 50, 50, 'Memorial', { font: '32px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'center' })
    let prev = this.add.text((380 / 2) - 100, 44, '👈', { font: '32px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'center' })
    prev.setInteractive()
    prev.on('pointerup', () => {      
      this.scene.start('MenuScene')
    })

    if (scores.length == 0) {
      this.add.text((380 / 2), 100, 'Sem candidatos...', { font: '28px dpcomic', fill: this.generateHexColor(), wordWrap: true, align: 'center' }).setOrigin(0.5)

    } else {
      for (let i = 0; i < 5; i++) {
        if (!scores[i]) continue
        this.add.text((380 / 2), (i + 1) * 35 + 70, `👻 ${scores[i].name}: ${scores[i].scores} pontos`, { font: '28px dpcomic', fill: this.generateHexColor(), wordWrap: true, align: 'center' }).setOrigin(0.5)
      }

    }
  }

  generateHexColor() {
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16)
  }
}