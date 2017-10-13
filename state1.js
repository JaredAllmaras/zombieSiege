//Start of gameplay
var cursors, vel = 200,  rocks, grass, player,zombie, zombies, barrelX, barrelY ,bullet, bullets, fireRate = 100, nextFire = 200,  healthBar;

demo.state1 = function(){};

demo.state1.prototype = {    
    preload: function() {
        game.load.tilemap('field', 'assets/Tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/Tilemaps/grass.png');
        game.load.image('rock', 'assets/Tilemaps/rock.png');
		game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.spritesheet('hunter', 'assets/sprites/hunterSprites.png', 58, 69);
        game.load.spritesheet('zombie','assets/sprites/zombieSprites.png', 52, 67);
        game.load.spritesheet('bloodSplatter', 'assets/sprites/bloodSpritesheet.png', 170, 120);
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 1152, 640);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //sets game map
        var map = game.add.tilemap('field');
        map.addTilesetImage('grass');
        map.addTilesetImage('rock');
        
        
        grass = map.createLayer('grass');

        map.setCollisionBetween(2, true, 'grass');
        map.setCollision(1, true, 'grass');
		
		/////////////////////////////////////////////////////
        //CODE FOR PLAYER
		/////////////////////////////////////////////////////
        //enables physics to player and sets player settings
        player = game.add.sprite(200, 200, 'hunter');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        player.scale.setTo(0.7, 0.7);
        player.anchor.setTo(0.5, 0.5);
        game.camera.follow(player);
        
        player.animations.add('upRight', [0, 1, 2, 3], 8, true);
        player.animations.add('upLeft', [4, 5, 6, 7], 8, true);
        player.animations.add('right', [8, 9, 10, 11], 8, true);
        player.animations.add('left', [12, 13, 14, 15], 8, true);
        player.animations.add('downRight', [16, 17, 18, 19], 8, true);
        player.animations.add('downLeft', [20, 21, 22, 23], 8, true);
        player.animations.add('up', [24, 25, 26,27], 8, true);
        player.animations.add('down', [28, 29, 30, 31], 8, true);
        player.health = 100;
        player.damage = 10;
	

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
            zombie = zombies.create(game.world.randomX,game.world.randomY,'zombie');
            zombie.body.collideWorldBounds = true;
            zombie.scale.setTo(0.7, 0.7);
            zombie.anchor.setTo(0.5, 0.5);
            zombie.alive = true;
            zombie.health = 100;
        }
        
        
        //adds animations to zombies group
        zombies.callAll('animations.add', 'animations', 'upLeft', [4, 5, 6, 7], 8, true);
        zombies.callAll('animations.add', 'animations', 'upRight', [0, 1, 2, 3], 8, true);
        zombies.callAll('animations.add', 'animations', 'downLeft', [12, 13, 14, 15], 8, true);
        zombies.callAll('animations.add', 'animations', 'downRight', [8, 9, 10, 11], 8, true);
        zombies.callAll('animations.add', 'animations', 'bloodSplatter' [0, 1, 2, 3, 4, 5, 6], 16, true);
                
        
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
		healthBar = game.add.text(game.world.width - 150,10,'HEALTH: ' + player.health +'%', {font:'20px Cambria', fill: '#fa0a0a'});
		healthBar.render = function(){
			healthBar.text = 'HEALTH : '+ player.health +'%'; 
            
        //DISPLAY HOUSE
        
            
		};
		healthBar.fixedToCamera = true;
		healthBar.cameraOffset.setTo(2,5);
        		
    },
    
    update: function() {
        
        
        
        //causes zombies to constantly move towards player
        zombies.forEach(game.physics.arcade.moveToObject, game.physics.arcade, false, player, 100);
        game.physics.arcade.collide(zombies, zombies);
        
        
        //checks zombieAngle between zombies and player and adjusts animation accordingly
        //angle measured in radians and range normalized to [0,2pi]
        zombies.forEach(function(self) {
            zombieAngle = (Phaser.Math.normalizeAngle(game.physics.arcade.angleBetween(self, player)))
            
            if(zombieAngle >= 0 && zombieAngle <= 1.5708) {
                self.animations.play('downRight');
            }
            if(zombieAngle > 1.5708 && zombieAngle <= 3.14159) {
                self.animations.play('downLeft');
            }
            if(zombieAngle > 3.14159 && zombieAngle <= 4.71239) {
                self.animations.play('upLeft');
            }
            if(zombieAngle > 4.71239 && zombieAngle <= 6.28319) {
                self.animations.play('upRight');
            }}
            , game.physics.arcade, false);
 
        //game controls for player
        if(cursors.up.isDown){
            player.body.velocity.y = -vel;
        }
        else if(cursors.down.isDown){
            player.body.velocity.y = vel;
        }
        else{
            player.body.velocity.y = 0;
        }
        if(cursors.left.isDown){
            player.body.velocity.x = -vel;
        }
        else if(cursors.right.isDown){
            player.body.velocity.x = vel;
        }
        else{
            player.body.velocity.x = 0;
            if (!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
                player.animations.stop(null, true);
            }
        }
        
        //controls direction player is facing
        playerAngle = Phaser.Math.normalizeAngle(game.physics.arcade.angleToPointer(player));
    
        //These statements determine the offset x,y coordinates of the gun determined by their animation and angle to
        //mouse pointer
        if((playerAngle >= 0 && playerAngle <= 0.4472) || playerAngle >= 5.58505){
            player.animations.play('right');
            barrelX = player.centerX + 14;
            barrelY = player.centerY - 14;
        }
        if(playerAngle >= 0.4472 && playerAngle < 1.39626) {
            player.animations.play('downRight');
            barrelX = player.centerX + 26;
            barrelY = player.centerY + 8;
        }
        if(playerAngle >= 1.39626 && playerAngle < 1.91986) {
            player.animations.play('down');
            barrelX = player.centerX + 28;
            barrelY = player.centerY + 24;
        }
        if(playerAngle >= 1.91986 && playerAngle < 2.61799 ) {
            player.animations.play('downLeft');
            barrelX = player.centerX + 4;
            barrelY = player.centerY + 28;
        }
        if(playerAngle >= 2.61799 && playerAngle < 3.66519) {
            player.animations.play('left');
            barrelX = player.centerX - 12;
            barrelY = player.centerY + 24;
        }
        if(playerAngle >= 3.66519 && playerAngle < 4.53786) {
            player.animations.play('upLeft');
            barrelX = player.centerX - 30;
            barrelY = player.centerY - 4;
        }
        if(playerAngle >= 4.53786 && playerAngle < 4.88692) {
            player.animations.play('up');
            barrelX = player.centerX - 28;
            barrelY = player.centerY - 24;
        }
        if(playerAngle >= 4.88692 && playerAngle < 5.58505) {
            player.animations.play('upRight');
            barrelX = player.centerX + 8;
            barrelY = player.centerY - 30;
        }
		
		//FIRE BULLETS 
        if (player.alive = true && game.input.activePointer.isDown) {
            this.fire(player.velocity, barrelX, barrelY);
    	}
        
        game.physics.arcade.overlap(zombies, bullets, this.hitGroup);
		game.physics.arcade.overlap(player, zombies, this.collidePlayer);

    },  
	
	render: function(){
		//Helps debug code
		
	},

    
    fire: function(playerSpeed, barrelX, barrelY) {

        if (game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = game.time.now + fireRate;

            bullet = bullets.getFirstDead();

            bullet.reset(barrelX, barrelY);

            //bulletVelocity = 300 + Phaser.Math.abs(playerVelocity);
            game.physics.arcade.moveToPointer(bullet, 800);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        }
    },
    	
    //give hunter health and other game objects health

	collidePlayer: function(player, zombie)
	{
		healthBar.render();
		player.health-= 10;

	},
    
    hitGroup: function(enemy, bullet) {
        bullet.kill();
        enemy.damage(20);
        var blood = game.add.sprite(enemy.x, enemy.y, 'bloodSplatter');
        blood.scale.setTo(0.3, 0.3);
        blood.anchor.setTo(0.5, 0.5);
        blood.animations.add('bloodSplatter');
        blood.play('bloodSplatter', 15, false, true);
    },
	

};
        