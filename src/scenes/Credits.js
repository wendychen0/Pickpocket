class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload() {
        this.load.image('creditstitle', './assets/creditstitle.png');
        
    }

    create() {

        let menuConfig = {
            fontSize: '25px',
            color: '#e6e6e6',
        }

        this.creditTitle = this.add.image(game.config.width/2, 120, 'creditstitle');
        this.creditTitle.setScale(0.65);
   
        this.return = this.add.text(game.config.width/2, 500, '→ to return to menu', { align: 'center' });
        this.return.setOrigin(0.5, 0.5);
        this.return.setFontSize(25);
        this.return.setFontStyle('bold');

        this.artSP = this.add.text(game.config.width/2, 220, 'Art, Sound, and Programming').setOrigin(0.5);
        this.artSP.setFontSize(25);
        this.artSP.setFontStyle('bold');
        this.name = this.add.text(game.config.width/2, 255, 'By Wendy Chen').setOrigin(0.5);
        this.name.setFontSize(25);
        this.name.setFontStyle('bold');

        let artText = 'Using pixilart.com and fontmeme.com';
        let soundText = 'Sfxr.me and Uppbeat.io in Phaser 3';
        this.art = this.add.text(game.config.width/2, 305, artText, menuConfig).setOrigin(0.5);
        this.sound = this.add.text(game.config.width/2, 338, soundText, menuConfig).setOrigin(0.5);;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
          }
    }
}