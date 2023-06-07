class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('mat', './assets/picnicmat.png');
        this.load.image('avatar1', './assets/avatar1sm.png');
        this.load.image('cake', './assets/cake.png');
        this.load.image('cookie', './assets/cookie.png');
        this.load.image('sandwhich', './assets/sandwhich.png');
        this.load.image('watermelon', './assets/watermelon.png');
        this.load.image('bug', './assets/bug.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        //this.load.audio('music', './assets/upbeat.mp3');
      }

    create() {
      // place tile sprite
      this.picnic = this.add.tileSprite(0, 0, 680, 650, 'mat').setOrigin(0, 0);

      //let sfx = this.sound.add('music', {volume: 0.4});
      //sfx.loop = true;
      //sfx.play();

      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding -5, game.config.width, borderUISize * 2, 0xa0d2e8).setOrigin(0, 0);
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

      // add player
      this.avatar = new Player(this, borderPadding, game.config.height - borderUISize - borderPadding, 'avatar1').setOrigin(0, 0);
      this.avatar.setScale(0.7);

      // add bugs
      this.bug = new Food(this, game.config.width, borderUISize*6 + borderPadding*4 + 18, 'bug', 0, -10, true).setOrigin(0,0);
      this.bug.setScale(0.5);
      this.bug2 = new Food(this, 530, 200, 'bug', 0, -10, true).setOrigin(0,0);
      this.bug2.setScale(0.5);
      this.bug3 = new Food(this, 560, 300, 'bug', 0, -10, true).setOrigin(0,0);
      this.bug3.setScale(0.5);

      // add foods
      this.cake = new Food(this, game.config.width + borderUISize*6, borderUISize*4 + 35, 'cake', 0, 10, false).setOrigin(0, 0);
      this.cake.setScale(0.7);
      this.cookie = new Food(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 20, 'cookie', 0, 5, false).setOrigin(0,0);
      this.cookie.setScale(0.5);

      this.sandwhich = new Food(this, game.config.width + borderUISize*6 + 45, borderUISize*4 - 45, 'sandwhich', 0, 10, false).setOrigin(0,0);
      this.sandwhich.setScale(0.5);
      this.sandwhich.moveSpeed = 3.3;

      this.watermelon = new Food(this, game.config.width, borderUISize*6 + borderPadding*4 + 65, 'watermelon', 0, 10, false).setOrigin(0,0);
      this.watermelon.setScale(0.5);

      this.tweens.add({
        targets: [ this.bug2, this.bug3 ],
        x: '-= 470',
        yoyo: true,
        duration: 1600,
        ease: 'Sine.easeInOut',
        repeat: -1,
        delay: this.tweens.stagger(40)
      });

      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // animation config
      /*this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
      });*/

      // initialize score
      this.p1Score = 0;

      this.lives = 2;

      input = this.input;
      input.on('pointerdown', this.clicked, this);
      input.on('pointerup', this.notClicked, this);

      this.reached = false;
      // display score
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let clockConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let highScConfig = {
        fontFamily: 'Courier',
        fontSize: '26px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 115
      }

      //this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.p1Score, clockConfig);
      this.livesLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.lives, clockConfig);
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      this.highscoreText = this.add.text(borderUISize + borderPadding + 425, borderUISize + borderPadding*2, `HI:${highscore}`, highScConfig);

      // GAME OVER flag
      this.gameOver = false;

      scoreConfig.fixedWidth = 0;
      
      this.difficultyTimer = this.time.addEvent({
        delay: 10000,
        callback: this.increaseSpeed,
        callbackScope: this,
        loop: true
    });

    }
    update() {
      cursorx = input.x;
      cursory = input.y;

      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
      }
      // Game over at 0 lives
      if (this.lives == 0) {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        this.tweens.paused = true;
      }
      
      // check key input for restart
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.start("menuScene");
      }
      this.livesLeft.text = this.lives;

      if (this.lives > 0) {
        this.picnic.tilePositionX -= 4;
      }

      if (!this.gameOver) {               
        this.avatar.update();         // update avatar sprite
        this.cake.update();           // update foods/bug
        this.cookie.update();
        this.bug.update();
        this.sandwhich.update();
        this.watermelon.update();
      } 

      // check collisions
      if(this.checkCollision(this.avatar, this.bug)) {
        this.avatar.reset();
        this.collectFood(this.bug);
      }
      if (this.checkCollision(this.avatar, this.cookie)) {
        this.avatar.reset();
        this.collectFood(this.cookie);
      }
      if (this.checkCollision(this.avatar, this.cake)) {
        this.avatar.reset();
        this.collectFood(this.cake);
      }
      if (this.checkCollision(this.avatar, this.sandwhich)) {
        this.avatar.reset();
        this.collectFood(this.sandwhich);
      }
      if (this.checkCollision(this.avatar, this.watermelon)) {
        this.avatar.reset();
        this.collectFood(this.watermelon);
      }
      if (this.checkCollision(this.avatar, this.bug2)) {
        this.avatar.reset();
        this.collectFood(this.bug2);
        //console.log('hit bug2');
      }
    }
    checkCollision(player, food) {
        // simple AABB checking
        if (player.x < food.x + food.width - 5 && 
          player.x + player.width > food.x && 
          player.y < food.y + food.height - 10 &&
          player.height + player.y > food.y) {
            return true;
        } else {
            return false;
        }
    }
    collectFood(food) {
        // temporarily hide food
        food.alpha = 0;
        food.reset();     // reset food position
        food.alpha = 1;   // make food visible again
        // score add and repaint
        this.p1Score += food.points;
        console.log('score',this.p1Score);
        this.scoreLeft.text = this.p1Score;  
        
        if (food.isBug == true) {
          this.sound.play('hit');
          this.lives -= 1;
        } else {
          let num = Math.floor(Math.random() * 2);
          if (num == 0) {
            this.sound.play('collect1');
          }
          if (num == 1) {
            this.sound.play('collect2');
          }
        }  
    }
    increaseSpeed() {
      this.cake.moveSpeed += 1.5;
      this.cookie.moveSpeed += 1.5;
      this.bug.moveSpeed += 1.5;
      this.sandwhich.moveSpeed += 1.5;
      this.watermelon.moveSpeed += 1.5;
    }
    clicked(){
      mousedown = true;
    }
    notClicked(){
      mousedown = false;
    }
}