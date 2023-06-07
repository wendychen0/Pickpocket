class Training extends Phaser.Scene {
    constructor() {
        super("trainingScene");
    }
    preload() {
        this.load.image('pocket', './assets/pocket.png');

        this.load.audio('music', './assets/drammusic.mp3');
    }
    create() {
        let sfx = this.sound.add('music', {volume: 0.6});
        sfx.loop = true;
        sfx.play();

        this.pocket = this.add.image(game.config.width/2, 330, 'pocket');
    }
    update() {
        console.log('running');
    }
}
