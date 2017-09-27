var demo = {}, cursors, vel = 200,  rocks, grass, player, zombies;

demo.state0 = function(){};

demo.state0.prototype = {    
    preload: function() {
        game.load.tilemap('field', 'assets/Tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/Tilemaps/grass.png');
        game.load.image('rock', 'assets/Tilemaps/rock.png');

        game.load.spritesheet('hunter', 'assets/sprites/hunter.png');
        game.load.spritesheet('zombieDown','assets/sprites/zombieSpritesheet.png', 67, 48);
        game.load.spritesheet('zombieUp', 'assets/sprites/zombieBackSpritesheet.png', 67, 52);
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        game.world.setBounds(0, 0, 1152, 640);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var map = game.add.tilemap('field');
        map.addTilesetImage('grass');
        map.addTilesetImage('rock');
        
        
        grass = map.createLayer('grass');

        map.setCollisionBetween(2, true, 'grass');
        map.setCollision(1, true, 'grass');
        
        player = game.add.sprite(200, 200, 'hunter');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        
        //Create Zombies 
        zombies = game.add.group();
        zombies.enableBody = true;
        //create zombies 
        for ( var i = 0; i<50; i++)
        {
        var zombie = zombies.create(game.world.randomX,game.world.randomY,'zombie');
        }
        
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        
        zombies.forEach(game.physics.arcade.moveToObject, game.physics.arcade, false, player, 100);
        
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
        