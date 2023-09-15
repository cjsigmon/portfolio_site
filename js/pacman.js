const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
//sprite sheet related
const spriteSheet = document.getElementById("sprite-sheet");
const frameWidth = 16; // Width of a single frame in pixels
const frameHeight = 16; // Height of a single frame in pixels
const frameCount = 2; // Number of frames in the spritesheet
    // sprite sheet animation
    let timeFrame = 0;
    let currentFrame = 0; // The current frame to display (on row)
    let frameRow = 0;
// input
const keys = {};
// on-screen objects
let leftWall = false, rightWall = false, topWall = false, bottomWall = false;
const boxWidth = 100, boxHeight = 140;

class Box {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.bottom = y + height;
      this.right = x + width;
    }

    isPlayerLeft() {
        // if player is in vertical range
        if (player.y > (this.y - player.height) && player.y < this.bottom) {
            // if on immediate left
            return player.x === this.x - player.width
        }
        return false;
    }
    isPlayerRight() {
        // if player is in vertical range
        if (player.y > (this.y - player.height) && player.y < this.bottom) {
            // if on immediate right
            return player.x === this.right;
        }
        return false;
    }

    isPlayerAbove() {
        // if player is in horizantal range
        if (player.x > (this.x - player.width) && player.x < this.right) {
            // if on immediate top
            return player.y > (this.y - (player.height + 1)) &&  player.y < (this.y - (player.height - 4));
        }
        return false;
    }
    isPlayerBelow() {
        // if player is in horizantal range
        if (player.x > (this.x - player.width) && player.x < this.right) {
            // if on immediate bottom
            return player.y > (this.bottom -4) && player.y < (this.bottom + 1);
        }
        return false;
    }



    renderSelf() {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
const topLBox = new Box(80, 80, boxWidth, boxHeight);
const bottomLBox = new Box(80, canvas.height - (boxHeight + 80), boxWidth, boxHeight);
const topRBox = new Box(canvas.width - (boxWidth + 80), 80, boxWidth, boxHeight);
const bottomRBox = new Box(canvas.width - (boxWidth + 80), canvas.height - (boxHeight + 80), boxWidth, boxHeight);

const player = {
    x: 0,
    y: 220,
    width: 40,
    height: 40,
    speedX: 4,
    speedY: 4,
    defaultSpeed: 4
};








// let the functions begin
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
  });
  
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});
  

// x - moving
function updatePlayerPosition() {
if (keys['a'] || keys['A']) {
    if (!leftWall) {
        if (player.speedX === 0) {
            player.speedX = player.defaultSpeed;
            rightWall = false;
        }
        player.x -= player.speedX;
        frameRow = 1;
    }
}
if (keys['d'] || keys['D']) {
    if (!rightWall) {
        if(player.speedX === 0) {
            player.speedX = player.defaultSpeed;
            leftWall = false;
        }
        player.x += player.speedX;
        frameRow = 0;
    }
}

// y - moving
if (keys['w'] || keys['W']) {
    if (!topWall) {
        if(player.speedY === 0) {
            player.speedY = player.defaultSpeed;
            bottomWall = false;
        }
        player.y -= player.speedY;
        frameRow = 2;
    }
}
if (keys['s'] || keys['S']) {
    if (!bottomWall) {
        if(player.speedY === 0) {
            player.speedY = player.defaultSpeed;
            topWall = false;
        }
        player.y += player.speedY;
        frameRow = 3;
    }
}

} // end function updatePlayerPosition()

function updatePlayerFrame() {
    if (timeFrame <= 10) {
        timeFrame++;
    } else {
        currentFrame = (currentFrame + 1) % frameCount;
        timeFrame = 0;
    }
}

function checkCollisions() {
    // check inner boxes
        // check for boxes on x-axis
        if (player.y < canvas.height/2) {
            rightWall = topLBox.isPlayerLeft() || topRBox.isPlayerLeft();
            leftWall = topLBox.isPlayerRight() || topRBox.isPlayerRight();
        } else {
            rightWall = bottomLBox.isPlayerLeft() || bottomRBox.isPlayerLeft();
            leftWall = bottomLBox.isPlayerRight() || bottomRBox.isPlayerRight();
        }
        // check for boxes on y-axis
        if (player.x < canvas.width/2) {
            topWall = topLBox.isPlayerBelow() || bottomLBox.isPlayerBelow();
            bottomWall = topLBox.isPlayerAbove() || bottomLBox.isPlayerAbove();
        } else {
            topWall = topRBox.isPlayerBelow() || bottomRBox.isPlayerBelow();
            bottomWall = topRBox.isPlayerAbove() || bottomRBox.isPlayerAbove();
        }
    // end check inner boxes
    // check outer walls
    if (player.x >= canvas.width - player.width) {
        player.speedX = 0;
        rightWall = true;
    }
    if (player.x <= 0) {
        player.speedX = 0;
        leftWall = true;
    }


    if (player.y >= canvas.height - player.height) {
        player.speedY = 0;
        bottomWall = true;
    }
    if (player.y <= 0) {
        player.speedY = 0;
        topWall = true;
    }
}



/// the main function
function animate(timestamp) {
    updatePlayerFrame(); // find the right one on sprite sheet

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        spriteSheet,
        currentFrame * frameWidth + 2,
        frameRow * frameHeight,
        frameWidth,
        frameHeight,
        player.x,
        player.y,
        player.width,
        player.height
    );
    topLBox.renderSelf();
    topRBox.renderSelf();
    bottomRBox.renderSelf();
    bottomLBox.renderSelf();

    checkCollisions();

    updatePlayerPosition();
    





    // Call requestAnimationFrame to schedule the next frame
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
  

