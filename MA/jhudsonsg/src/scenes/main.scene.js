import config from '../config'
import ManipuladorInimigosFase1 from '../manipulador.inimigos.fase1'
import Narrador from '../narrador'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')

    this.grass
    this.cursors
    this.player
    this.bullets
    this.narrador
    this.pontuacaoText
    this.pontuacaoValue
    this.right = true
  }

  create() {
    this.pontuacaoValue = 0
    this.narrador = new Narrador(this, new ManipuladorInimigosFase1(this))

    window.narrador = this.narrador

    this.bullets = this.physics.add.group()
    this.cursors = this.input.keyboard.createCursorKeys()
    this.grass = this.physics.add.staticGroup()

    this.narrador.init()
  }

  createMap() {
    this.add.image(0, 0, 'fundo').setOrigin(0, 0)

    this.grass = this.physics.add.staticGroup()

    for (let x = 64; x < config.width + 128; x += 128){
      this.grass.create(x, config.height - 16, 'piso')
      let grama = this.add.sprite(x, config.height - 20, 'grama')
      grama.anims.play('grama-anim', true)
    }
  }

  createPlayer() {
    this.pontuacaoText = this.add.text(20, 20, 'Scores: ' + this.pontuacaoValue, { font: '18px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'left' })
    this.player = this.physics.add.sprite(config.width / 2, config.height - 50, 'autronauta')
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.grass)
  }

  update() {
    if (this.player) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true)
        this.right = false
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true)
        this.right = true
      } else if (this.cursors.up.isDown && this.player.body.touching.down) {
        jumpMusic.play()
        this.player.setVelocityY(-100);
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        fireMusic.play()
        let bullet = this.bullets.create(this.player.x, this.player.y - 30, 'bala')
        bullet.setVelocityY(-430)
        bullet.isBullet = true

        this.physics.add.overlap(bullet, this.grass, () => {
          this.addExplod(bullet)
          bullet.destroy()
        }, null, this)


        this.addColisaoPlayer(bullet)

        this.narrador.getInimigos().forEach(inimigo =>
          this.physics.add.overlap(inimigo, bullet, (inimigo, bullet) => {
            this.detruir(inimigo, bullet)
            inimigo.alpha = 0.2
            setTimeout(() => {
              inimigo.alpha = 1
            }, 100)
          }, null, this))
      } else {
        if (this.right) this.player.anims.play('none-right', true)
        else this.player.anims.play('none-left', true)
        this.player.setVelocityX(0);
      }

      this.bullets.getChildren().forEach(bullet => {
        if (bullet.y > config.height) bullet.destroy()
        if (bullet.y <= 70) bullet.angle += 4;
      }, this);

      this.narrador.exec()
    }
  }

  addColisaoPlayer(obj) {
    this.physics.add.overlap(this.player, obj, this.dead, null, this)
  }

  addColisaoInimigos() {
    this.narrador.getInimigos().forEach(inimigo => this.addColisaoPlayer(inimigo))
  }

  dead(player, obj) {
    obj.destroy()
    player.destroy()
    this.player = null
    deathMusic.play()
    battleMusic.stop()
    this.scene.start('EndGameScene', { pontuacao: this.pontuacaoValue })
  }

  addPontuacao() {
    if (this.narrador.manipuladorInimigosFase1.atual == 1) this.pontuacaoValue += 100
    if (this.narrador.manipuladorInimigosFase1.atual == 2) this.pontuacaoValue += 150
    if (this.narrador.manipuladorInimigosFase1.atual == 3) this.pontuacaoValue += 180

    this.pontuacaoText.text = 'Scores: ' + this.pontuacaoValue
  }

  addExplod(obj) {
    let explod = this.add.sprite(obj.x, obj.y, 'explod')
    explod.anims.play('explode', true)
    explodeMusic.play()
    explod.once('animationcomplete', () => { explod.destroy() })
  }

  detruir(obj1, obj2) {
    let _return = false

    if (obj1.vida && obj1.vida > 0) {
      if (obj2.isBullet) obj2.destroy()
      obj1.vida--
      _return = true
      hitMusic.play()
    }

    if (obj2.vida && obj2.vida > 0) {
      if (obj1.isBullet) obj1.destroy()
      obj2.vida--
      _return = true
      hitMusic.play()
    }

    this.addExplod(obj1)

    if (_return) return

    deathMusic.play()
    this.addPontuacao()
    obj1.destroy()
    obj2.destroy()
  }
}