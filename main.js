<<<<<<< HEAD
var game = new Phaser.Game(1131,621, Phaser.AUTO);
=======
var game = new Phaser.Game(1120,600, Phaser.AUTO);
>>>>>>> ed2e7d9ce03a41c14d9c95a650cae6ce36b6d3a1
game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.start('state1');