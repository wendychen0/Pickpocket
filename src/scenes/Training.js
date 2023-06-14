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
        this.playing = true;
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

        input = this.input;
        input.on('pointerdown', this.clicked, this);
        input.on('pointerup', this.notClicked, this);

        this.wallet = this.add.sprite(200, 60, 'wallet');
        this.wallet.setScale(0.3);
        this.pocket = this.add.image(game.config.width/2, 450, 'pocket');

        this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*5 + 20, this.score);
        this.timeLeft.setFontStyle('bold');
        this.timeLeft.setOrigin(0.5, 0.5);
        this.timeLeft.setFontSize(30);

        this.infoText = this.add.text(game.config.width/2, 190, 'press SPACE to drop', { fontSize: '25px', fill: '#ffffff' });
        this.infoText2 = this.add.text(game.config.width/2, 210, 'get 10 to pass', { fontSize: '25px', fill: '#ffffff' }).setOrigin(0.5);
        this.infoText.setOrigin(0.5);
        this.infoText.setVisible(true);
        this.infoText2.setVisible(true);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.score, scoreConfig);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            
            //this.gameOver = true;
        }, null, this);
    }
    update() {
        cursorx = input.x;
        cursory = input.y;
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

        // left and right wallet movement
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
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && (!this.passed || !this.gameOver)) {
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
        //left top x: 233, y: 306 right top x:458 y:307
        //82 length of wallet, 225 length of pocket
        if (this.checkPlacement(this.wallet, this.pocket)) {
            console.log('made it');
            this.wallet.y = 60;
            isDropping = false;
            this.score += 1;
            this.scoreLeft.text = this.score;
            this.sound.play('steal');
        }
        //if (this.wallet.y >= this.pocket.height && this.wallet.x - 40 >= this.pocket.x - 112 ) {
            // Increase score
            //score = Math.max(0, score - 10);
            //scoreText.setText('Score: ' + score);
        //}

        // timer for info text
        if (Math.trunc(this.clock.elapsed/1000) == 5 && this.reached) {
            this.infoText.setVisible(false);
            this.infoText2.setVisible(false);
        }

        // increase speed after 15 secs
        if (Math.trunc(this.clock.elapsed/1000) == 15 && this.reached) {
            this.moveSpeed += 4;
            this.dropSpeed += 2;
            this.reached = false;
        }
        if (Math.trunc(this.clock.elapsed/1000) == 30 && this.score < 10) {
            this.add.text(game.config.width/2, game.config.height/2 - 10, 'TIMES UP', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 54, 'Press (R) to Try Again or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        } else if (Math.trunc(this.clock.elapsed/1000) == 30 && this.score >= 10){
            this.add.text(game.config.width/2, game.config.height/2 - 10, 'Training Passed', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 54, 'Press → for the real test', scoreConfig).setOrigin(0.5);
            this.passed = true;
            this.wallet.x = 200;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.gameOver = false;
            isMovingRight = true;
          }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.gameOver = false;
        }
        if (this.passed && Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("playScene");
        }
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());
        //console.log('x',cursorx);
        //console.log('y',cursory);
    }
    checkPlacement(wallet, pocket) {
        if (wallet.x - 40 >= pocket.x - 112 &&
            wallet.x + 40 <= pocket.x + 112 &&
            wallet.y >= this.pocket.height - 60) {
            return true;
        } else {
            return false;
        }
    }
    clicked(){
        mousedown = true;
      }
    notClicked(){
        mousedown = false;
    }
}
