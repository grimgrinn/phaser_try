import Phaser from "phaser";

export default class Food extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene);

    this.setTexture("food");
    this.setPosition(x * 16, y * 16);
    this.center();

    this.total = 0;

    scene.children.add(this);

    scene.events.on("food_eaten", this.eat.bind(this));

    this.idle = scene.tweens.add({
      targets: [this],
      props: {
        angle: {
          value: 360,
          duration: 1500,
          repeat: -1
        },
        alpha: {
          value: 0.5,
          duration: 500,
          yoyo: true,
          repeat: -1
        }
      }
    });
  }

  center() {
    const { x, y, width, height } = this;
    this.setPosition(x + width / 2, y + height / 2);
  }

  getPos() {
    const { x, y, width, height } = this;
    return {
      x: x - width / 2,
      y: y - height / 2
    };
  }

  eat() {
    this.total++;

    this.idle.pause();

    this.eatAnimation();
  }

  eatAnimation() {
    /**
     * @TODO gradually increase the size by 2 times (duration 250ms)
     * this.setScale(n) / scale
     *
     * @TODO gradually decrease the size by 2 times (duration 250ms)
     * this.setScale(n) / scale
     *
     * @TODO gradually decrease the alpha to 0 (duration 250ms)
     * this.setAlpha(n) / alpha
     */

    this.idle.resume();

    this.scene.events.emit("food_move");

    /** @TODO End */
  }
}
