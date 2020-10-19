export default class ManipuladorInimigosFase1 {
  constructor(scene) {
    this.scene = scene
    this.inimigos = scene.physics.add.group();
    this.atual = 0
    this.call = true
    this.ordas = {
      '1': {
        total: 5,
      },
      '2': {
        total: 8,
      },
      '3': {
        total: 15,
      },
      '4': {
        total: 1
      }
    }
  }

  addNivel() {
    if (this.inimigos.getChildren().length == 0 && this.call == true) {
      this.atual++
      this.call = false
      narrador.textoDeTempo()
    }
  }

  order1() {
    let total = this.ordas[1].total
    let espaco = 80
    for (let i = 0; i < total; i++) {
      let inimigo = this.inimigos.create(espaco, 50, 'alien1')
      inimigo.anims.play('alien1-anim', true)
      inimigo.body.setAllowGravity(false)
      inimigo.right = true
      inimigo.vida = Math.floor(Math.random() * 2)
      espaco += 50
    }
  }

  order2() {
    let total = this.ordas[2].total
    let espaco = 30
    for (let i = 0; i < total; i++) {
      let inimigo = this.inimigos.create(espaco, 50, 'alien1')
      inimigo.anims.play('alien1-anim', true)
      inimigo.body.setAllowGravity(false)
      inimigo.bottom = true
      inimigo.vida = Math.floor(Math.random() * 3)
      
      inimigo.velocity = (Math.random() * 400) + 80
      espaco += 45
    }
  }
  
  order3() {
    let total = this.ordas[3].total
    let espaco = 20
    let alter = {
      r: true,
      b: false
    }
    for (let i = 0; i < total; i++) {
      let inimigo = this.inimigos.create(espaco, 50, 'alien2')
      inimigo.anims.play('alien2-anim', true)
      inimigo.body.setAllowGravity(false)
      if (alter.r) alter.r = false
      else alter.r = true
      if (alter.b) alter.b = true
      else alter.b = false
      
      inimigo.right = alter.r
      inimigo.bottom = alter.b
      inimigo.velocity = (Math.random() * 400) + 80
      espaco += 20
    }
  }

  order4() {
    let chefao = this.inimigos.create(25, 150, 'chefao1')
    chefao.anims.play('chefao-anim', true)
    chefao.body.setAllowGravity(false)
    chefao.vida = 100
    chefao.isFire = true
    chefao.angulo = 0
    narrador.vidasChefeText = this.scene.add.text(20, 40, `Life Boss: ${chefao.vida}`, { font: '18px dpcomic', fill: '#FFFFFF', wordWrap: true, align: 'left' })
  }

  moveOrder() {
    if (this.atual == 1) this.move1()
    if (this.atual == 2) this.move2()
    if (this.atual == 3) this.move3()
    if (this.atual == 4) this.move4()
  }

  move1() {
    this.inimigos.getChildren().forEach(inimigo => {
      if (inimigo.right) inimigo.setVelocityX(100)
      else inimigo.setVelocityX(-100)


      if (inimigo.x >= 350) inimigo.right = false
      if (inimigo.x <= 50) inimigo.right = true
    }, this.scene)
  }

  move2() {
    this.inimigos.getChildren().forEach(inimigo => {
      if (inimigo.bottom) inimigo.setVelocityY(inimigo.velocity)
      else inimigo.setVelocityY(-inimigo.velocity)


      if (inimigo.y >= 550) inimigo.bottom = false
      if (inimigo.y <= 50) inimigo.bottom = true
    }, this.scene)
  }

  move3() {
    this.inimigos.getChildren().forEach(inimigo => {
      if (inimigo.bottom) inimigo.setVelocityY(inimigo.velocity)
      else inimigo.setVelocityY(-inimigo.velocity)

      if (inimigo.right) inimigo.setVelocityX(100)
      else inimigo.setVelocityX(-100)

      if (inimigo.y >= 550) inimigo.bottom = false
      if (inimigo.y <= 50) inimigo.bottom = true

      if (inimigo.x >= 350) inimigo.right = false
      if (inimigo.x <= 50) inimigo.right = true
    }, this.scene)
  }

  move4() {
    this.inimigos.getChildren().forEach(inimigo => {
      narrador.vidasChefeText.text = `Life Boss: ${inimigo.vida}`

      if (inimigo.vida <= 80 && inimigo.vida > 50) {
        if (inimigo.right) inimigo.setVelocityX(180)
        else inimigo.setVelocityX(-180)

        if (inimigo.x >= 350) inimigo.right = false
        if (inimigo.x <= 50) inimigo.right = true

        if (inimigo.isFire) {
          inimigo.isFire = false
          setTimeout(() => {
            let bullet = this.scene.physics.add.sprite(inimigo.x, inimigo.y + 30, 'balachefao')
            bullet.setVelocityY(150)
            this.scene.addColisaoPlayer(bullet)

            this.scene.physics.add.overlap(bullet, this.scene.grass, bullet => bullet.destroy(), null, this)
            inimigo.isFire = true
          }, 1300)
        }
      } else if (inimigo.vida <= 50 && inimigo.vida > 20) {
        if (inimigo.bottom) inimigo.setVelocityY(230)
        else inimigo.setVelocityY(-230)

        if (inimigo.right) inimigo.setVelocityX(230)
        else inimigo.setVelocityX(-230)

        if (inimigo.y >= 550) inimigo.bottom = false
        if (inimigo.y <= 50) inimigo.bottom = true

        if (inimigo.x >= 350) inimigo.right = false
        if (inimigo.x <= 50) inimigo.right = true

        if (inimigo.isFire) {
          inimigo.isFire = false
          setTimeout(() => {
            let bullet = this.scene.physics.add.sprite(inimigo.x, inimigo.y + 30, 'balachefao')
            bullet.setVelocityY(180)
            this.scene.addColisaoPlayer(bullet)

            this.scene.physics.add.overlap(bullet, this.scene.grass, bullet => bullet.destroy(), null, this)

            inimigo.isFire = true
          }, 500)
        }
      } else if (inimigo.vida <= 20) {
        if (inimigo.bottom) inimigo.setVelocityY(260)
        else inimigo.setVelocityY(-260)

        if (inimigo.right) inimigo.setVelocityX(260)
        else inimigo.setVelocityX(-260)

        if (inimigo.y >= 550) inimigo.bottom = false
        if (inimigo.y <= 50) inimigo.bottom = true

        if (inimigo.x >= 350) inimigo.right = false
        if (inimigo.x <= 50) inimigo.right = true

        if (inimigo.isFire) {
          inimigo.isFire = false
          setTimeout(() => {
            let bullet = this.scene.physics.add.sprite(inimigo.x, inimigo.y + 30, 'balachefao')
            bullet.setVelocityY(180)
            this.scene.addColisaoPlayer(bullet)

            this.scene.physics.add.overlap(bullet, this.scene.grass, bullet => bullet.destroy(), null, this)

            inimigo.isFire = true
          }, 200)
        }
      } else {
        let centreX = 190
        let centreY = 350
        let r = 160
        let angleDeg = inimigo.angulo
        let radians = angleDeg * (Math.PI / 180)
        let pointY = centreY - (Math.cos(radians) * r)
        let pointX = centreX + (Math.sin(radians) * r)
        inimigo.x = pointX
        inimigo.y = pointY
        inimigo.angulo += 1.5
      }
    }, this.scene)
  }
}