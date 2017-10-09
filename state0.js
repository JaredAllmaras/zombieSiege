//MAIN MENU
var demo = {};

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){

    },
    create: function(){

        player.animations.add('upRight', [0, 1, 2, 3], 8, true);
        player.animations.add('upLeft', [4, 5, 6, 7], 8, true);
        player.animations.add('right', [8, 9, 10, 11], 8, true);
        player.animations.add('left', [12, 13, 14, 15], 8, true);
        player.animations.add('downRight', [16, 17, 18, 19], 8, true);
        player.animations.add('downLeft', [20, 21, 22, 23], 8, true);
        player.animations.add('up', [24, 25, 26,27], 8, true);
        player.animations.add('down', [28, 29, 30, 31], 8, true);
        player.health = 100;
	

		player.events.onKilled.add(function(){
			//PUT ANIMATION HERE FOR HUNTER DYING
			
			player.kill();
		});
		
		
		/////////////////////////////////////////////////
		//CODE FOR ZOMBIES
		////////////////////////////////////////////////
        //Create a group of Zombies 
        zombies = game.add.group();
        zombies.enableBody = true;       
		zombies.damageAmount = 10;
        //create zombies 
        for ( var i = 0; i<50; i++)
        {
            var zombie = zombies.create(game.world.randomX,game.world.randomY,'zombie');
            zombie.body.collideWorldBounds = true;
            zombie.scale.setTo(0.7, 0.7);
            zombie.anchor.setTo(0.5, 0.5);
            zombie.health = 100;
        }
        
        
        //adds animations to zombies group
        zombies.callAll('animations.add', 'animations', 'upLeft', [4, 5, 6, 7], 8, true);
        zombies.callAll('animations.add', 'animations', 'upRight', [0, 1, 2, 3], 8, true);
        zombies.callAll('animations.add', 'animations', 'downLeft', [12, 13, 14, 15], 8, true);
        zombies.callAll('animations.add', 'animations', 'downRight', [8, 9, 10, 11], 8, true);
        
		//Create Bullets and the group
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		
		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds',true);
		bullets.setAll('outOfBoundsKill', true);
        bullets.damage = 10;
		
		
        //sets zombie to collide with one another
        game.physics.arcade.collide(zombies, zombies);
        
        //creates a listener for keyboard input
        cursors = game.input.keyboard.createCursorKeys();
		
		//DISPLAY HEALTH
		healthBar = game.add.text(game.world.width-150,10,'HEALTH: ' + player.health +'%', {font:'20px Cambria', fill: '#fa0a0a'});
	
		healthBar.fixedToCamera = true;
		healthBar.cameraOffset.setTo(2,5);

		
    },
    update: function(){
        
    }
};