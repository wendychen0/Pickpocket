class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        this.load.image('wallet', './assets/wallet.png');
        this.load.image('watch', './assets/watch.png');
        this.load.spritesheet('watch-anim', './assets/watch-anim.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 8});

    }
    create(){
        //this.add.text(game.config.width/2, game.config.height/2 - 10, 'Next Pickpocket Scene').setOrigin(0.5);
        this.score = 0;
        numItems = Phaser.Math.Between(25, 30);
        //for (let i = 0; i < (numItems); i += 1){
            setTimeout(() => {
                this.addItem();
                itemsLeft += 1;
            }, 1000);
            
        //}
        let scoreConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '28px',
            backgroundColor: '#F4E972',
            color: '#30302c',
            align: 'right',
            padding: {
              top: 7,
              bottom: 7,
              left: 5,
              right: 5,
            },
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.score, scoreConfig);
        this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*5 + 20, this.score);
        this.timeLeft.setFontStyle('bold');
        this.timeLeft.setOrigin(0.5, 0.5);
        this.timeLeft.setFontSize(30);

        this.anims.create({
            key: 'watch-fade',
            frames: this.anims.generateFrameNumbers('watch-anim', { start: 0, end: 8, first: 0}),
            frameRate: 12
        });

        this.itemsLeft = this.add.text(borderUISize + borderPadding, game.config.height/2 - 40, itemsLeft, scoreConfig).setOrigin(0.5);

        this.clock = this.time.delayedCall(25000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 10, 'TIMES UP', scoreConfig).setOrigin(0.5);
        }, null, this);
    }
    update(){
            
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());
        //itemsLeft.text = itemsLeft;
        
    }
    addItem(){
        let item1 = new Item(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), 'wallet', 0, 2, 'wallet');
        let item2 = new Item(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), 'watch', 0, 1, 'watch');
        let item = Phaser.Math.Between(1,2);
        if (itemsLeft < numItems) {
            if (item == 1){
                this.physics.add.existing(item1);
                this.item1 = item1;
                //itemsLeft += 1;
            } else {
                this.physics.add.existing(item2);
                this.item2 = item2;   
                //itemsLeft += 1;
            }
        }
        this.itemsLeft.text = itemsLeft;
        console.log('left',itemsLeft);
        console.log('num',numItems);
    }
    incrementScore(points) {
        this.score += points;
        this.scoreLeft.text = this.score;
    }
    takeWatch() {
        this.item2.setVisible(false);
        let boom = this.add.sprite(this.item2.x, this.item2.y, 'watch-anim').setOrigin(0, 0);
        boom.anims.play('watch-fade');             // play fade animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            //this.item2.setVisible(true);                   // make visible again
            this.item2.destroy();                       // remove explosion sprite
        });
    }
}