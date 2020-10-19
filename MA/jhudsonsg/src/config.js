import PreLoadScene from './scenes/preload.scene'
import MenuScene from './scenes/menu.scene'
import MainScene from './scenes/main.scene'
import EndGame from './scenes/end-game.scene'
import ControllerScene from './scenes/controllers.scene'
import RankScene from './scenes/rank.scene'

export default {
  type: Phaser.AUTO,
  width: 380,
  height: 590,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  parent: 'main',
  dom: {
      createContainer: true
  },
  scene: [PreLoadScene, MenuScene, MainScene, EndGame, ControllerScene, RankScene]
}