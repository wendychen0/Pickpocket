// Player Prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2; // pixels per frame
        //this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            this.y = cursory;
            /*if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }*/
        }
        
        // reset on miss
        if(this.x <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    reset() {
        this.isFiring = false;
        this.x = 0 + borderPadding;//game.config.height - borderUISize - borderPadding;
    }
}