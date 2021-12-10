import Phaser from "phaser";
import Food from "./Food";
import Snake from "./Snake";

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
  }

  init() {
    this.events.on("food_move", this.repositionFood.bind(this));
  }

  preload() {
    this.load.image(
      "food",
      "https://labs.phaser.io/assets/games/snake/food.png"
    );
    this.load.image(
      "body",
      "https://labs.phaser.io/assets/games/snake/body.png"
    );
  }

  create() {
    const { width, height } = this.game.config;
    this.add.rectangle(0, 0, width, height, 0x00ff00, 0.6).setOrigin(0);

    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = this.add.text(width / 2, 20, "Score: 0", {}).setOrigin(0.5);
    this.updateScore();
  }

  /**
   * @param {number} time
   * @param {number} delta
   */
  update(time, delta) {
    if (!this.snake.alive) return this.scene.restart();

    switch (true) {
      case this.cursors.left.isDown:
        this.snake.faceLeft();
        break;
      case this.cursors.right.isDown:
        this.snake.faceRight();
        break;
      case this.cursors.up.isDown:
        this.snake.faceUp();
        break;
      case this.cursors.down.isDown:
        this.snake.faceDown();
        break;
      default:
        break;
    }

    if (this.snake.update(time)) {
      this.snake.collideWithFood(this.food);
    }
  }

  repositionFood() {
    console.log("Food was eaten");

    const { width, height } = this.game.config;

    /** @type {[[boolean]]} */
    const blankGrid = new Array(height / 16).fill(
      new Array(width / 16).fill(true)
    );

    /** @type {[[boolean]]} */
    const snakeGrid = this.snake.updateGrid(blankGrid);

    /**
     * @TODO Moving food to a random space
     * The game is divided into cells: 40 width and 30 height
     * Each cell contains information, false if the cell is busy and true if free
     */

    this.food.setPosition((width / 40) * 22, (height / 30) * 10);
    this.food.center();

    /** @TODO End */
  }

  /**
   * @TODO make score text update
   */
  updateScore() {
    this.score.setText(`Score: ${this.food.total}`);
    this.children.moveUp(this.score);
  }
}
