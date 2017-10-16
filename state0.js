//MAIN MENU
var demo = {};
var cursors, vel = 200,  rocks, grass, player, zombie, zombies, barrelX, barrelY , bullet, bullets, fireRate = 100, nextFire = 200,  button;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
	    game.load.tilemap('field', 'assets/Tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/Tilemaps/grass.png');
        game.load.image('rock', 'assets/Tilemaps/rock.png');
		game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.spritesheet('hunter', 'assets/sprites/hunterSprites.png', 58, 69);
        game.load.spritesheet('zombie','assets/sprites/zombieSprites.png', 52, 67);
        game.load.spritesheet('bloodSplatter', 'assets/sprites/bloodSpritesheet.png', 170, 120);
		
		game.load.sprite('button','assets/sprites/playButton.png');

    },
    create: function(){
<<<<<<< HEAD
<<<<<<< HEAD
        
=======

>>>>>>> dc91474f224cb5dd107ab828d2e3430f68decef7
=======

>>>>>>> dc91474f224cb5dd107ab828d2e3430f68decef7
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#e82a2a';
    game.world.setBounds(0, 0, 4000, 3200);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
	button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2,1,0);
    },
	
    update: function(){
        
		
    },
	
	actionOnClick: function(){
		button.onclick.start("state1.js");
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> dc91474f224cb5dd107ab828d2e3430f68decef7
=======

>>>>>>> dc91474f224cb5dd107ab828d2e3430f68decef7
		
	}
};