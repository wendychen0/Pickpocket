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

        this.moveSpeed = 4;
        this.dropSpeed = 4;
        this.score = 0;
        this.reached = true;
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

        this.wallet = this.add.sprite(200, 60, 'wallet');
        this.wallet.setScale(0.3);
        this.pocket = this.add.image(game.config.width/2, 450, 'pocket');

        this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*5 + 20, this.score);
        this.timeLeft.setFontStyle('bold');
        this.timeLeft.setOrigin(0.5, 0.5);
        this.timeLeft.setFontSize(30);

        this.infoText = this.add.text(game.config.width/2, 190, 'press SPACE to drop', { fontSize: '25px', fill: '#ffffff' });
        this.infoText.setOrigin(0.5);
        this.infoText.setVisible(true);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 10, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 54, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        if (!isDropping && !this.gameOver) {
            if (isMovingRight) {
                this.wallet.x += this.moveSpeed; // horizontal speed
                if (this.wallet.x >= game.config.width - this.wallet.width/5) {
                    isMovingRight = false;
                }
            } else {
                this.wallet.x -= this.moveSpeed;
                if (this.wallet.x <= this.wallet.width/5) {
                    isMovingRight = true;
                }
            }
        
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            isDropping = true;
        }
        if (isDropping) {
            this.wallet.y += this.dropSpeed; // drop speed
        }
        if (isDropping && this.wallet.y > this.pocket.height - 25) {
            this.wallet.x = 200;
            this.wallet.y = 50;
            isDropping = false;
        }
        //if (this.wallet.y >= this.pocket.height && this.wallet.x ) {
            // Increase score
            //score = Math.max(0, score - 10);
            //scoreText.setText('Score: ' + score);
        //}
        //this.wallet.y += 5;
        if (Math.trunc(this.clock.elapsed/1000) == 5 && this.reached) {
            this.infoText.setVisible(false);
            //this.reached = false;
        }
        if (Math.trunc(this.clock.elapsed/1000) == 15 && this.reached) {
            this.moveSpeed += 4;
            this.dropSpeed += 2;
            this.reached = false;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
          }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());

    }
    /*endGame() {
        // Stop the timer
        timer.remove(false);
      
        // Display game over text
        var gameOverText = this.add.text(config.width / 2, config.height / 2, 'Game Over', { fontSize: '64px', fill: '#ffffff' });
        gameOverText.setOrigin(0.5);
    }*/
}
