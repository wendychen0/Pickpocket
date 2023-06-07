// Item prefab
class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.foodSpeed;         // pixels per frame
    }

    update() {
        // move food left
        this.y -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.y <= 0 - this.height) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.y = game.config.width;
    }
}