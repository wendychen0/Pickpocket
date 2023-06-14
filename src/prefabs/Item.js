class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, points, name) {
        super(scene, x, y, texture, points, name);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        //this.parentScene.physics.add.existing(this);
        this.x = x;
        this.y = y;
        this.setScale(0.2);
        this.points = points;
        this.name = name;

        this.setInteractive();
        this.on('pointerdown', this.onClick, this);
        //this.item = this.scene.physics.add.sprite(x, y, 'player2', 'tank1');
    }
    update(){

    }
    onClick() {
        //this.parentScene.sound.play('collect');
        this.parentScene.incrementScore(this.points); 
        this.destroy();
        console.log('left',itemsLeft);
        console.log('num',numItems);
        if (itemsLeft < numItems) {
            this.parentScene.addItem();
            console.log('add');
        }
        if (itemsLeft < numItems) {
            setTimeout(() => {
                this.parentScene.addItem();
            }, 5000);
        }
    }
}