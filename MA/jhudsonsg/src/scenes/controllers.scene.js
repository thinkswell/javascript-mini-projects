export default class ControllerScene extends Phaser.Scene {
  constructor() {
    super('ControllerScene')
    this.cursors
    this.player
    this.bullets
    this.grass
    this.controllers
  }

  create() {
    this.controllers = this.add.sprite(0, 0, 'controles')
    this.controllers.x = Game.config.width / 2
    this.controllers.y = Game.config.height / 2 + 150

    this.cursors = this.input.keyboard.createCursorKeys()
    this.bullets = this.physics.add.group()
    this.grass = this.physics.add.staticGroup()

    for (let x = 64; x < Game.config.width + 128; x += 128) {
      this.grass.create(x, Game.config.height / 2 + 80, 'piso').setAlpha(0)
    }

    this.player = this.physics.add.sprite(Game.config.width / 2, Game.config.height / 2 + 50, 'autronauta')
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.grass)

    let prev = this.add.text((Game.config.width / 2) - 25, Game.config.height - 100, '👈', { font: '32px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'center' })
    prev.setInteractive()
    prev.on('pointerup', () => {      
      this.scene.start('MenuScene')
    })
  }

  update() {
    if (this.player) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true)
        this.controllers.anims.play('controller-left', true)
        this.right = false
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true)
        this.controllers.anims.play('controller-rigth', true)
        this.right = true
      } else if (this.cursors.up.isDown && this.player.body.touching.down) {
        jumpMusic.play()
        this.player.setVelocityY(-100)
        this.controllers.anims.play('controller-up', true)
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        fireMusic.play()
        let bullet = this.bullets.create(this.player.x, this.player.y - 30, 'bala')
        bullet.setVelocityY(-430)
        bullet.isBullet = true
        this.controllers.anims.play('controller-fire', true)

        setTimeout(() => {
          bullet.destroy()
        }, 1500)


      } else {
        if (this.right) this.player.anims.play('none-right', true)
        else this.player.anims.play('none-left', true)

        this.controllers.anims.play('controller', true)
        this.player.setVelocityX(0)
      }
    }
  }
}