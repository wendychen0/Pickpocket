// Food prefab
class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, checkBug) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.foodSpeed;         // pixels per frame
        this.isBug = checkBug;   // check if the item is a bug
    }

    update() {
        // move food left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}