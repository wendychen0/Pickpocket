class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        this.load.image('wallet', './assets/wallet.png');
    }
    create(){
        //this.add.text(game.config.width/2, game.config.height/2 - 10, 'Next Pickpocket Scene').setOrigin(0.5);
        this.score = 0;
        numItems = Phaser.Math.Between(25, 35);
        //for (let i = 0; i < (numItems); i += 1){
            setTimeout(() => {
                this.addItem();
                this.itemsLeft += 1;
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

        this.clock = this.time.delayedCall(25000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 10, 'TIMES UP', scoreConfig).setOrigin(0.5);
        }, null, this);
    }
    update(){
            
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());
        
    }
    addItem(){
        let item = new Item(this, Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), 'wallet', 5, 'wallet');
        this.physics.add.existing(item);
    }
    incrementScore(points) {
        this.score += points;
        this.scoreLeft.text = this.score;
        itemsLeft += 1;
        //this.scoreText.setText('Score: ' + this.score); // Update the score text
    }
}