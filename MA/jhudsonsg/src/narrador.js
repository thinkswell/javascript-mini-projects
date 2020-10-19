export default class Narrador {
  constructor(scene, ManipuladorInimigosFase1) {
    this.scene = scene
    this.manipuladorInimigosFase1 = ManipuladorInimigosFase1

    this.texto = 0
    this.disabledText = false
    this.textoPadrao = '\n\n\nclick para avançar...'
    this.textos = [
      '...',
      'É você?',
      'Tudo bem não vejo problema nisso, rsrs.',
      'Bem, vamos la...',
      'Você foi escolhido para uma missão muito \nimportante!!!',
      'Hoje teremos que enfrentar um novo inimigo.',
      'Isso mesmo, alienígenas estão invadindo \no nosso Planeta.',
      'E você vai ser o responsável por nos defender.',
      'Vou mostrar a você onde será o ataque \nvamos nessa!',
      'É aqui, Boa sorte cadente!',
      'Mais uma coisa, desvie de suas \nbombas e dos inimigos.',
    ]

    this.texto2 = 0
    this.textos2 = [
      'Se prepare, eles estão vindo!!!',
      'Parabéns, foi até fácil, rsrs...',
      'Eiii eles estão vindo novamente!!!',
      'Muito bom, maaaas parece que está vindo mais!!',
      'Prepare-se \nParece que o proximo é MUITO GRANDE!'
    ]

    this.textoCena
  }

  init() {
    this.showTexto()
  }

  exec() {
    if (this.manipuladorInimigosFase1.atual > 0) {
      this.manipuladorInimigosFase1.addNivel()
      this.manipuladorInimigosFase1.moveOrder()
    }
  }

  getInimigos() {
    return this.manipuladorInimigosFase1.inimigos.getChildren()
  }

  avancar() {
    if (this.texto === 8) {
      this.texto++
      this.scene.createMap()
      this.showTexto()
    } else if (this.texto === 10) {
      if (this.disabledText) return
      this.disabledText = true

      this.textoCena.setVisible(false)
      menuMusic.stop()
      battleMusic.play()
      this.scene.createPlayer()

      setTimeout(() => {
        this.textoDeTempo()
      }, 5000)
    } else {
      this.texto++
      this.textoDeAvancar()
    }
  }

  showTexto() {
    this.textoCena = this.scene.add.text(0, 0, this.textos[this.texto] + this.textoPadrao, { font: '18px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'left' })
    this.textoCena.setInteractive()
    this.textoCena.on('pointerup', this.avancar.bind(this))
    this.alignCenter(this.textoCena)
  }

  textoDeAvancar() {    
    this.textoCena.text = this.textos[this.texto] + this.textoPadrao
    this.alignCenter(this.textoCena)
  }

  textoDeTempo() {
    let time = 5000
    this.textoCena.setVisible(true)

    this.textoCena.text = this.textos2[this.texto2]
    this.alignCenter(this.textoCena)

    setTimeout(() => {
      this.texto2++
      this.textoCena.setVisible(false)
      this.acoes()
    }, time)
  }

  acoes() {
    if (this.texto2 == 1) {
      this.manipuladorInimigosFase1.order1()
      this.scene.addColisaoInimigos()
      this.manipuladorInimigosFase1.atual++
    }
    if (this.texto2 == 2) {
      this.textoDeTempo()
    }
    if (this.texto2 == 3) {
      this.manipuladorInimigosFase1.order2()
      this.scene.addColisaoInimigos()
      this.manipuladorInimigosFase1.call = true
    }
    if (this.texto2 == 4) {
      this.manipuladorInimigosFase1.order3()
      this.scene.addColisaoInimigos()
      this.manipuladorInimigosFase1.call = true
    }
    if (this.texto2 == 5) {
      this.manipuladorInimigosFase1.order4()
      this.scene.addColisaoInimigos()
    }
  }

  alignCenter(element) {
    element.x = (Game.config.width / 2) - (element.width / 2)
    element.y = Game.config.height / 2
  }
}