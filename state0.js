var demo = {}, cursors, vel = 200,  rocks, grass, player;

demo.state0 = function(){};

demo.state0.prototype = {    
    preload: function() {
        game.load.tilemap('field', 'assets/Tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/Tilemaps/grass.png');
        game.load.image('rock', 'assets/Tilemaps/rock.png');

        game.load.image('hunter', 'assets/sprites/hunter.png');
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        
        var map = game.add.tilemap('field');
        map.addTilesetImage('grass');
        map.addTilesetImage('rock');
        
        
        grass = map.createLayer('grass');

        map.setCollisionBetween(2, true, 'grass');
        map.setCollision(1, true, 'grass');
        
        player = game.add.sprite(200, 200, 'hunter');
        game.physics.enable(player)
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        
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
        