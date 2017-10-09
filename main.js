var game = new Phaser.Game(1120,600, Phaser.AUTO);
var game = new Phaser.Game(600, 600, Phaser.AUTO);
game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.start('state1');