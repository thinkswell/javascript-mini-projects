export default class PreLoadScene extends Phaser.Scene {
  constructor() {
    super('PreLoadScene')
  }

  preload() {
    this.load.spritesheet('autronauta', 'assets/imgs/astronauta-sheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('explod', 'assets/imgs/explod.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('controles', 'assets/imgs/inputs.png', { frameWidth: 300, frameHeight: 71 })

    this.load.image('fundo', '/assets/imgs/fundo.png')
    this.load.image('piso', '/assets/imgs/piso.png')
    //this.load.image('grama', '/assets/imgs/grama-sheet.png')
    this.load.spritesheet('grama', '/assets/imgs/grama-sheet.png', { frameWidth: 128, frameHeight: 40 })
    this.load.spritesheet('alien1', '/assets/imgs/alien-1-sheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('alien2', '/assets/imgs/alien-2-sheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('chefao', '/assets/imgs/chefao-1-sheet.png', { frameWidth: 64, frameHeight: 64 })
    this.load.image('bala', '/assets/imgs/bala.png')
    this.load.image('balachefao', '/assets/imgs/bala-chefao.png')

    this.load.audio('battle', ['assets/musics/battle.wav'])
    this.load.audio('click', ['assets/musics/click.wav'])
    this.load.audio('death', ['assets/musics/death.mp3'])
    this.load.audio('fire', ['assets/musics/fire.mp3'])
    this.load.audio('menu', ['assets/musics/menu.wav'])
    this.load.audio('jump', ['assets/musics/jump.wav'])
    this.load.audio('hit', ['assets/musics/hit.mp3'])
    this.load.audio('gameover', ['assets/musics/gameover.wav'])
    this.load.audio('explode', ['assets/musics/explod.wav'])

    this.drawBar()
  }

  drawBar() {
    let progressBar = this.add.graphics()
    let progressBox = this.add.graphics()
    let loadingText = this.make.text({ x: this.cameras.main.width / 2, y: this.cameras.main.height / 2 - 15, text: 'Criando novo Protocolo...', style: { font: '20px dpcomic', fill: '#ffffff' } })
    let percentText = this.make.text({ x: this.cameras.main.width / 2, y: this.cameras.main.height / 2 + 24, text: '0%', style: { font: '18px dpcomic', fill: '#ffffff' } })
    let assetText = this.make.text({
      x: this.cameras.main.width / 2, 
      y: this.cameras.main.height / 2 + 70,
      text: '',
      style: {
        font: '16px dpcomic',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5)
    percentText.setOrigin(0.5, 0.5)

    loadingText.setOrigin(0.5, 0.5)
    progressBox.fillStyle(0x2d3c3c, .5)
    progressBox.fillRect(35, (window.innerHeight - 64) / 2, 320, 50)

    this.load.on('progress', percent => {
      progressBar.clear()
      progressBar.fillStyle(0x3a5339, 1)
      progressBar.fillRect(45, (window.innerHeight - 45) / 2, 300 * percent, 30)
      percentText.setText(parseInt(percent * 100) + '%');
    })

    this.load.on('fileprogress', file => assetText.setText(`Escrevendo relatório sobre ${file.key}.doc`))

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })

  }

  create() {
    if (typeof (Storage) === "undefined") console.log('Storage não disponivel.')

    if (!localStorage.getItem('scores'))
      localStorage.setItem('scores', JSON.stringify([]))

    window.menuMusic = this.sound.add('menu', {
      mute: false,
      volume: .3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    })

    window.battleMusic = this.sound.add('battle', {
      mute: false,
      volume: .3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    })

    window.clickMusic = this.sound.add('click')
    window.deathMusic = this.sound.add('death')
    window.fireMusic = this.sound.add('fire')
    window.jumpMusic = this.sound.add('jump')
    window.hitMusic = this.sound.add('hit')
    window.gameoverMusic = this.sound.add('gameover')
    window.explodeMusic = this.sound.add('explode', { volume: .2 })

    this.anims.create({
      key: 'grama-anim',
      frames: this.anims.generateFrameNumbers('grama', { start: 0, end: 10 }),
      frameRate: 3,
      repeat: -1,
    })

    this.anims.create({
      key: 'alien1-anim',
      frames: this.anims.generateFrameNumbers('alien1', { start: 0, end: 10 }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'alien2-anim',
      frames: this.anims.generateFrameNumbers('alien2', { start: 0, end: 7 }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'chefao-anim',
      frames: this.anims.generateFrameNumbers('chefao', { start: 0, end: 15 }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('autronauta', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('autronauta', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'none-right',
      frames: [{ key: 'autronauta', frame: 0 }],
      repeat: -1,
    })

    this.anims.create({
      key: 'none-left',
      frames: [{ key: 'autronauta', frame: 9 }],
      repeat: -1,
    })

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explod', { start: 0, end: 6 }),
    })

    this.anims.create({
      key: 'controller',
      frames: [{ key: 'controles', frame: 0 }],
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'controller-left',
      frames: [{ key: 'controles', frame: 1 }],
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'controller-rigth',
      frames: [{ key: 'controles', frame: 3 }],
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'controller-up',
      frames: [{ key: 'controles', frame: 4 }],
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'controller-bottom',
      frames: [{ key: 'controles', frame: 2 }],
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'controller-fire',
      frames: [{ key: 'controles', frame: 5 }],
      frameRate: .1,
      repeat: -1
    })

    menuMusic.play()
    this.scene.start('MenuScene')
  }
}