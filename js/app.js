// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png'; // URL of enemy sprite image.
        this.x = x; // x pos
        this.y = y + 55; // y pos, centered across the blocks by adding 55 px to the y axis
        this.speed = speed;
        this.step = 101; // distance between one block to another from the x axis
        this.boundary = this.step * 5;
        this.resetPos = -this.step;
    }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// This method is called within the game repeatedly.
// dt gives the enemy a constant speed across the game board as it loops through the code in the game loop
// this method will check if the current positoon of the enemy is not past the screen edge
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If Enemy is not past boundary
    if(this.x < this.boundary) {
        // move forward
        // increment x by speed * dt (delta time) for constant time
        this.x += this.speed * dt; //if true, then increment the object's x property and assigned speed
    }   
    else {
        this.x = this.resetPos; // resets position to start; enables enemies to loop around the game board, going left to right
    }  
};

// Draw the enemy on the screen, required method for game
// calls the drawImage method from the ctx (2d canvas) object with a few arguments: the result of the get method of the Resources object, which returns a cached image of the sprite from the url, the x parameter, the y parameter
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const bug1 = new Enemy(-101, 0, 200); // Instantiates an enemy object, which is stored in this variable, along with the x/y position and speed.
const bug2 = new Enemy(-101, 83, 300); // Instantiates an enemy object, which is stored in this variable, along with the x/y position and speed.
const bug3 = new Enemy((-101*2.5), 83, 300); // Instantiates an enemy object, which is stored in this variable, along with the x/y position and speed.
const allEnemies = []; // Creates array that stores all enemies; push bug objects to this array.
allEnemies.push(bug1,bug2,bug3); // Push bug object to array.
console.log(allEnemies);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Defining the Hero class
    // every class needs a constructor method in order to initialize a new object
    // add properties to the constructor method
    // draw player Hero sprite on current x/y position on board
    // default x/y coordinates to 0, which is the top left corner of the board
    // Sprite image = provide image so Player Hero is visible on screen
    // In engine.js file, the drawImage method indicates 101 px for columns and 83 px for rows, which means each block on the grid has a width of 101 and a height of 83

class Hero { 
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101; // distance between one block to another from the x axis
        this.jump = 83; // distance between one block to another on the y axis
        this.startX = this.step * 2; // places Hero 2 blocks to the right (middle block) on the x axis
        this.startY = (this.jump * 4) + 55; // places Hero 5 blocks down form the top row on the Y axis; substract 20 px for more centered location on block; changed 20px to 55px to coincide with enemy y axis positioning
        this.x = this.startX; // reference to the start position that cannot be modified by the reset Hero method
        this.y = this.startY; // reference to the start position that cannot be modified by the reset Hero method
        this.victory = false;
    }
    
    // Using same render method as the one defined in the Enemy class starter code
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // add new method handleInput, which updates hero's x and y property according to user input
    // @param {string} input = direction to travel
    handleInput(input) {
        // used a switch statement for this functionality; could do a chain of if else statements to accomplish the same thing: check the value of input and match it to the correct direction; subtracting the value of x moves the character left, adding to x moves the character right; adding to y causes the character to move down, while decreasing y makes the character move up; top left corner is (0,0)
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step; // Conditional that checks if hero's x property is greater than 0 (left edge of the board). If it is greater than 0, then move left.
                }
                break;
            case 'up':
                if (this.y > this.jump) { // Added padding to top edge of board so that Hero doesnt get into the water.
                    this.y -= this.jump; // Use value defined in the Hero class constructor. Added conditional to prevent Hero from moving past the top edge of the board. Y axis starts at the top and increasing y means the Hero is moving down.
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step; // Use the value defined in the Hero class contructor; Added conditional that checks if Hero's x property is no greater than 4 steps to the right on the x axis.
                } 
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump; // Use the value defined in the Hero class contructor; Added conditional that checks if Hero's y property by setting the boundary for number of block heights form the top of the y axis. Using 4 block height to reach boundary because we have a 20 px padding on the starting position block.
                }
                break;
        }
    }
    update() {
        // METHOD: Update position = gets run every cycle of the game engine loop; checking for Player Hero's position on the board in relation bugs
            // Collision (check for collision FUNCTION to be called from the update position method) = this function checks whether or not the player Hero's x/y position crosses/collides with an enemy's x/y position 
                
        for(let enemy of allEnemies) {
            /*
            // Did player Hero's x/y position collide with an enemy?
            // Add conditional to determine when the two objects collide on the x axis
            // Determine if the enemy.x + enemy.step (right side) is greater than the player’s this.x (left side)
            // Check if the enemy.x (left side) is less than the player’s this.x + this.step (right side). 
            // If the enemy object falls within these 2 points on the x axis (as well as the y axis), then a collision happens.
            */
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                this.reset();
            }
        }
        /*
        // Check for win location (check for victory FUNCTION)= function to check whether or not the player Hero reached the end of the game, when the player Hero reaches the top row of the board game grid
        // Did player Hero x/y position reach any of the 'Final' tiles in the top row of the game board grid?
        // Check if the hero's y location is equal to the top of the grid at 0 + 55px center offset
        */
        if(this.y === 55) {
            this.victory = true;
        }  
    }
    // Reset hero after collision
    reset() { 
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }
}
// create variable that enables initialization of new Hero object; store the new object in this variable
// Place the Hero object in a variable called player
const player = new Hero();


            // Methods
               

                // METHOD: Render = this method will draw or redraw the player Hero to the game board at every loop through the main game loop. In order to draw, the render function need the player Hero's sprite image and the x/y position
                    // FUNCTION: Draw player Hero sprite image on current x/y position
                // METHOD: Keyboard Input handler = handles the input from the event listener on the player Hero's arrow keys; needs to execute this methos and make the correct changes to the x/y position that corresponds to the direction the player Hero is moving the prite image arund the game board
                    // FUNCTION: update the player Hero's sprite x/y position based on the user input



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// In this event listener there is an object with key value pairs containing numbers and strings
// Call a player method handleInput, which is being passed an argument of the value of the allowedKeys objects which corresponds with the event key code selected by the user
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});