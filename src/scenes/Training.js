class Training extends Phaser.Scene {
    constructor() {
        super("trainingScene");
    }
    preload() {
        this.load.image('pocket', './assets/pocket.png');
        this.load.image('wallet', './assets/wallet.png');


        this.load.audio('music', './assets/drammusic.mp3');
    }
    create() {
        let sfx = this.sound.add('music', {volume: 0.6});
        sfx.loop = true;
        sfx.play();


        this.wallet = this.add.sprite(200, 30, 'wallet');
        this.wallet.setScale(0.3);
        this.pocket = this.add.image(game.config.width/2, 430, 'pocket');

        /*timer = this.time.addEvent({
            delay: 30000, // 30 seconds
            callback: endGame,
            callbackScope: this
        });
          
        // Display the timer text
        timerText = this.add.text(10, 10, 'Time: 30', { fontSize: '32px', fill: '#ffffff' });
        */
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (!isDropping) {
            if (isMovingRight) {
                this.wallet.x += 4; // Adjust the horizontal speed as needed
                if (this.wallet.x >= game.config.width - this.wallet.width / 5) {
                    isMovingRight = false;
                }
            } else {
                this.wallet.x -= 4;
                if (this.wallet.x <= this.wallet.width/5) {
                    isMovingRight = true;
                }
            }
        
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            isDropping = true;
        }
        if (isDropping) {
            this.wallet.y += 4; // adjust drop speed
        }
        if (isDropping && this.wallet.y > this.pocket.height - 25) {
            this.wallet.x = 200;
            this.wallet.y = 30;
            isDropping = false;
        }
        //if (this.wallet.y >= this.pocket.height && this.wallet.x ) {
            // Increase score
            //score = Math.max(0, score - 10);
            //scoreText.setText('Score: ' + score);
        //}
        //this.wallet.y += 5;
    }
    /*endGame() {
        // Stop the timer
        timer.remove(false);
      
        // Display game over text
        var gameOverText = this.add.text(config.width / 2, config.height / 2, 'Game Over', { fontSize: '64px', fill: '#ffffff' });
        gameOverText.setOrigin(0.5);
    }*/
}
