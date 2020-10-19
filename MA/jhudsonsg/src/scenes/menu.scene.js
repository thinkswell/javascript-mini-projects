export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene')
  }

  preload() {
    this.load.html('menu', 'assets/html/menu.html')
  }

  create() {
    let _this = this
    let login = this.add.dom(380/2, innerHeight/2).createFromCache('menu')
    login.addListener('click')
    login.addListener('mouseover')

    login.on('mouseover', () => {
      clickMusic.play()     
    })

    login.on('click', event => {
      event.preventDefault()
      if (event.target.id === 'iniciar_jogo') _this.scene.start('MainScene')
      if (event.target.id === 'rank') _this.scene.start('RankScene')
      if (event.target.id === 'controles') _this.scene.start('ControllerScene')
      if (event.target.id === 'sair') window.location.href = 'https://github.com/jhudsonsg/MA'
    })
  }
}