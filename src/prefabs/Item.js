class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, points, name) {
        super(scene, x, y, texture, frame);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        //this.parentScene.physics.add.existing(this);
        this.x = x;
        this.y = y;
        if (name == 'wallet') {
            this.setScale(0.2);
        } else if (name == 'watch') {
            this.setScale(0.3);
        }
        
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
    
        
        if (itemsLeft < numItems) {
            this.parentScene.addItem();
            itemsLeft += 1;
            //console.log('add');
        }
        if (itemsLeft < numItems) {
            setTimeout(() => {
                this.parentScene.addItem();
                itemsLeft += 1;
            }, 5000);
        }
    }
}