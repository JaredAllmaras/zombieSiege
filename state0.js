var demo = {}, cursors, vel = 200,  rocks, grass, player, zombies;

demo.state0 = function(){};

demo.state0.prototype = {    
    preload: function() {
        game.load.tilemap('field', 'assets/Tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/Tilemaps/grass.png');
        game.load.image('rock', 'assets/Tilemaps/rock.png');

        game.load.spritesheet('hunter', 'assets/sprites/hunter.png');
        game.load.spritesheet('zombie','assets/sprites/zombieSprites.png', 52, 67);
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
        
        //enables physics to player
        player = game.add.sprite(200, 200, 'hunter');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5, 0.5);
        game.camera.follow(player);
        
        //Create Zombies 
        zombies = game.add.physicsGroup();
        zombies.enableBody = true;
        
        //create zombies 
        for ( var i = 0; i<50; i++)
        {
            var zombie = zombies.create(game.world.randomX,game.world.randomY,'zombie');
            zombie.anchor.setTo(0.5, 0.5);
        }
        
        //adds animations to zombies group
        zombies.callAll('animations.add', 'animations', 'upLeft', [4, 5, 6, 7], 8, true);
        zombies.callAll('animations.add', 'animations', 'upRight', [0, 1, 2, 3], 8, true);
        zombies.callAll('animations.add', 'animations', 'downLeft', [12, 13, 14, 15], 8, true);
        zombies.callAll('animations.add', 'animations', 'downRight', [8, 9, 10, 11], 8, true);
        
        //sets zombie to collide with one another
        game.physics.arcade.collide(zombies, zombies);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        
        //causes zombies to constantly move towards player
        zombies.forEach(game.physics.arcade.moveToObject, game.physics.arcade, false, player, 100);
        
        
        //checks angle between zombies and player and adjusts animation accordingly
        if(zombies.forEach(function(self) {
            angle = (Phaser.Math.normalizeAngle(game.physics.arcade.angleBetween(self, player)))
            
            if(angle >= 0 && angle <= 1.5708) {
                self.animations.play('downRight');
            }
            if(angle > 1.5708 && angle <= 3.14159) {
                self.animations.play('downLeft');
            }
            if(angle > 3.14159 && angle <= 4.71239) {
                self.animations.play('upLeft');
            }
            if(angle > 4.71239 && angle <= 6.28319) {
                self.animations.play('upRight');
            }}
            , game.physics.arcade, false));

        
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
        }       
    }
};
        