// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // x pos
    // y pos

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If Enemy is not past boundary
        // move forward
        // increment x by speed * dt (delta time) for constant time
    // else
        // reset position to start
    // this method will check if the current positoon of the enemy is not past the screen edge
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Defining the Player class
    // Constructor

            // Properties
                // x position = determine where player is on the game board
                // y position = determine where player is on the game board
                // Sprite image = provide image so Player is visible on screen

            // Methods
                // METHOD: Update position = gets run every cycle of the game engine loop; checking for Player's position on the board in relation to whatever we want
                    // Collision (check for collision FUNCTION to be called from the update position method) = this function checks whether or not the player's x/y position crosses with an enemy's x/y position 
                        // Did player collide with an enemy?
                    // Check for win location (check for victory FUNCTION)= function to check whether or not the player reached the end of the game, when the player reaches the top row of the board game grid
                        // Did player x/y position reach any of the 'Final' tiles in the top row of the game board grid?
                // METHOD: Render = this method will draw or redraw the player to the game board at every loop through the main game loop. In order to draw, the render function need the player's sprite image and the x/y position
                    // FUNCTION: Draw player psrite image on current x/y position
                // METHOD: Keyboard Input handler = handles the input from the event listener on the player's arrow keys; needs to execute this methos and make the correct changes to the x/y position that corresponds to the direction the player is moving the prite image arund the game board
                    // FUNCTION: update the player's sprite x/y position based on the user input
                // METHOD: Reset Hero
                    // set winning / ending x/y position to the starting x/y position 

// Now instantiate your objects.
    // New Player object (one, because it is a single player game)

// Place all enemy objects in an array called allEnemies
    // init allEnemies array = holds all of our undetermined number of enemies; to fill this array we can use a loop and for up to a number of desired enemies, create a new enemy object and push it into the allEnemies array
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
