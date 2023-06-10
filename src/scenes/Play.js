class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        
    }
    create(){
        this.add.text(game.config.width/2, game.config.height/2 - 10, 'Next Pickpocket Scene').setOrigin(0.5).setFontSize(30);
    }
    update(){

    }
}