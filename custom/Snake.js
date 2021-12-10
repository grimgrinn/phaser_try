import Phaser from "phaser";

export default class Snake {
  constructor(scene, x, y) {
    this.scene = scene;

    this.headPosition = new Phaser.Geom.Point(x, y);

    this.body = scene.add.group();

    this.head = this.body.create(x * 16, y * 16, "body");
    this.head.setOrigin(0);

    this.alive = true;

    this.speed = 100;

    this.moveTime = 0;

    this.tail = new Phaser.Geom.Point(x, y);

    this.heading = "RIGHT";
    this.direction = "RIGHT";
  }

  update(time) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  faceLeft() {
    if (this.direction === "UP" || this.direction === "DOWN") {
      this.heading = "LEFT";
    }
  }

  faceRight() {
    if (this.direction === "UP" || this.direction === "DOWN") {
      this.heading = "RIGHT";
    }
  }

  faceUp() {
    if (this.direction === "LEFT" || this.direction === "RIGHT") {
      this.heading = "UP";
    }
  }

  faceDown() {
    if (this.direction === "LEFT" || this.direction === "RIGHT") {
      this.heading = "DOWN";
    }
  }

  move(time) {
    switch (this.heading) {
      case "LEFT":
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
        break;

      case "RIGHT":
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
        break;

      case "UP":
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
        break;

      case "DOWN":
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
        break;

      default:
        break;
    }

    this.direction = this.heading;

    /** @TODO Start - Update the body segments */

    /** @type {[{ x: number, y: number }]} */
    const segments = this.body.getChildren();

    segments.forEach((child) => {
      child.x = this.headPosition.x * 16;
      child.y = this.headPosition.y * 16;

      this.tail.x = child.x;
      this.tail.y = child.y;
    });

    /** @TODO End */

    //  Check to see if any of the body pieces have the same x/y as the head
    //  If they do, the head ran into the body
    /*
    const hitBody = Phaser.Actions.GetFirst(
      segments,
      { x: this.head.x, y: this.head.y },
      1
    );
    */
    const hitBody = false;

    if (hitBody) {
      console.log("dead");

      this.alive = false;

      return false;
    } else {
      this.moveTime = time + this.speed;

      return true;
    }
  }

  grow() {
    this.body.create(this.tail.x, this.tail.y, "body").setOrigin(0);
  }

  collideWithFood(food) {
    const foodPos = food.getPos();

    if (this.head.x === foodPos.x && this.head.y === foodPos.y) {
      this.grow();

      this.scene.events.emit("food_eaten");

      food.eat();

      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.speed > 20 && food.total % 5 === 0) {
        this.speed -= 5;
      }

      return true;
    } else {
      return false;
    }
  }

  updateGrid(grid) {
    //  Remove all body pieces from valid positions list
    this.body.children.each(function (segment) {
      const bx = Math.floor(segment.x / 16);
      const by = Math.floor(segment.y / 16);

      grid[by][bx] = false;
    });

    return grid;
  }
}
