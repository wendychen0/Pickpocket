//
// 
/* 
*/

let config = {
    type: Phaser.AUTO,
    width: 680,
    height: 650,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Training, Play, Credits ]
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let input;
let cursorx;
let cursory;
let mousedown = false; 
let highscore = 0;