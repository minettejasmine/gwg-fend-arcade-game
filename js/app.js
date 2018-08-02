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
// This method will check if the current positoon of the enemy is not past the screen edge
Enemy.prototype.update = function(dt) {
    // If Enemy is not past boundary
    if(this.x < this.boundary) {
        // Move forward
        // Increment x by speed * dt (delta time) for constant time, which ensures game runs at same speed for all computers.
        this.x += this.speed * dt; // if true, then increment the object's x property and assigned speed
    }
    else {
        this.x = this.resetPos; // Resets position to start; enables enemies to loop around the game board, going left to right
    }
};

// Draw the enemy on the screen, required method for game
// Call the drawImage method from the ctx (2d canvas) object with a few arguments: the result of the get method of the Resources object, which returns a cached image of the sprite from the url, the x parameter, the y parameter.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate enemy objects in the following variables, along with x/y position and speed.
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
const bug4 = new Enemy(-201, 166, 250);
const bug5 = new Enemy((-201*2.5), 166, 250);
const allEnemies = []; // Creates array that stores all enemies. This array receives the bug objects that are pushed to it.
allEnemies.push(bug1,bug2,bug3,bug4,bug5); // Push bug objects to the allEnemies array.
// console.log(allEnemies);

/*
// Create user/player class
// This class requires an update(), render() and
// a handleInput() method.
// Defining the User class
    // every class needs a constructor method in order to initialize a new object
    // add properties to the constructor method
    // draw user sprite on current x/y position on board
    // default x/y coordinates to 0, which is the top left corner of the board
    // Sprite image = provide image so User is visible on screen
    // In engine.js file, the drawImage method indicates 101 px for columns and 83 px for rows, which means each block on the grid has a width of 101 and a height of 83
*/
class User {
    constructor() {
        this.sprite = 'images/char-princess-girl.png';
        this.step = 101; // distance between one block to another from the x axis
        this.jump = 83; // distance between one block to another on the y axis
        this.startX = this.step * 2; // places User 2 blocks to the right (middle block) on the x axis
        this.startY = (this.jump * 4) + 55; // places User 5 blocks down form the top row on the Y axis; substract 20 px for more centered location on block; changed 20px to 55px to coincide with enemy y axis positioning
        this.x = this.startX; // reference to the start position that cannot be modified by the reset User method
        this.y = this.startY; // reference to the start position that cannot be modified by the reset User method
        this.victory = false;
    }

    // Using same render method as the one defined in the Enemy class starter code
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Add new method handleInput, which updates User's x and y property according to user input
    // @param {string} input = direction to travel
    handleInput(input) {
        /*
        Used a switch statement for this functionality. Could do a chain of if else statements to accomplish the same thing. Check the value of input and match it to the correct direction. Subtracting the value of x moves the character left, adding to x moves the character right. Adding to y causes the character to move down, while decreasing y makes the character move up. Top left corner is (0,0).
        */
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step; // Conditional that checks if user's x property is greater than 0 (left edge of the board). If it is greater than 0, then move left.
                }
                break;
            case 'up':
                if (this.y > this.jump) { // Added padding to top edge of board so that User doesnt get into the water.
                    this.y -= this.jump; // Use value defined in the User class constructor. Added conditional to prevent User from moving past the top edge of the board. Y axis starts at the top and increasing y means the User is moving down.
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step; // Use the value defined in the User class contructor; Added conditional that checks if User's x property is no greater than 4 steps to the right on the x axis.
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump; // Use the value defined in the User class contructor; Added conditional that checks if User's y property by setting the boundary for number of block heights form the top of the y axis. Using 4 block height to reach boundary because we have a 20 px padding on the starting position block.
                }
                break;
        }
    }
    update() {
        /*
        Update method: update position = gets run every cycle of the game engine loop; checking for Player User's position on the board in relation bugs
        //
        */
        for(let enemy of allEnemies) {
            /*
            // Add conditional to determine when the two objects collide on the x axis
            // Determine if the enemy.x + enemy.step (right side) is greater than the player’s this.x (left side).
            // Check if the enemy.x (left side) is less than the player’s this.x + this.step (right side).
            // Collision (check for collision function to be called from the update position method) = this function checks whether or not the player User's x/y position crosses/collides with an enemy's x/y position.
            // If the enemy object falls within these 2 points on the x axis (as well as the y axis), then a collision happens.
            */
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                this.reset();
            }
        }
        /*
        // Check for win location (check for victory)= function to check whether or not the player User reached the end of the game, when the player User reaches the top row of the board game grid.
        // Check if the User's y location is equal to the top/final row of tiles in the grid at 0 + 55px center offset
        */
        if(this.y === 55) {
            this.victory = true;
        }
    }
    // Reset User after collision
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }
}
// Create variable that enables initialization of new User object; store the new object in this variable called player.
const player = new User();

/*
// This listens for key presses and sends the keys to the player.handleInput() method.
// In this event listener, there is an object with key value pairs containing numbers and strings.
// Call a player method handleInput, which is being passed an argument of the value of the allowedKeys objects which corresponds with the event key code selected by the user.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});