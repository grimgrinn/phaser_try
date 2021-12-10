import Phaser from "phaser";
import MainScene from "../custom/MainScene";

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: 640,
    height: 480
  },
  parent: "game-container",
  scene: MainScene,
  dom: {
    createContainer: true
  }
};

new Phaser.Game(config);
