class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.image('title', './assets/pickpocket.png');

      this.load.image('pocket', './assets/pocket.png');

      // load audio
      this.load.audio('collect1', './assets/foodCollect.wav');
      this.load.audio('collect2', './assets/foodCollect2.wav');
      this.load.audio('hit', './assets/hit.wav');
    }
    create() {
      this.title = this.add.sprite(game.config.width/2, 90, 'title');
      this.title.setScale(0.9);

      this.pocket = this.add.image(game.config.width/2, 330, 'pocket');


      this.start = this.add.text(game.config.width/2, 485, 'press SPACE to start', { align: 'center' });
      this.start.setOrigin(0.5, 0.5);
      this.start.setFontStyle('bold');
      this.start.setFontSize(36);

      this.credits = this.add.text(game.config.width/2, 555, '← for credits', { align: 'center' });
      this.credits.setOrigin(0.5, 0.5);
      this.credits.setResolution(window.devicePixelRatio);
      this.credits.setFontStyle('bold');
      this.credits.setFontSize(27);
      const fx = this.credits.preFX.addShadow(0, 0, 0.06, 0.75, 0x000000, 4, 0.8);

      

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // easy mode
          game.settings = {
            foodSpeed: 3,
            gameTimer: 30000
          }
          this.sound.play('sfx_select');
          this.scene.start('trainingScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start('creditsScene');
        }
    }
  }