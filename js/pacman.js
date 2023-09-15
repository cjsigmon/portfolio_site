const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const pacMan = document.getElementById("pac-r");
const spriteSheet = document.getElementById("sprite-sheet");
const frameWidth = 16; // Width of a single frame in pixels
const frameHeight = 16; // Height of a single frame in pixels
const frameCount = 2; // Number of frames in the spritesheet
let timeFrame = 0;
let currentFrame = 0; // The current frame to display (on row)
let frameRow = 0;
const keys = {};
var rotation = 0;
let leftWall = false, rightWall = false, topWall = false, bottomWall = false;
const player = {
    x: 0,
    y: 220,
    width: 40,
    height: 40,
    speedX: 4,
    speedY: 4,
    defaultSpeed: 4
};
class Box {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    renderSelf() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "red";

        ctx.stroke();
    }
}
const topLBox = new Box(player.width, player.height, 100, 100);

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

function animate(timestamp) {
    updatePlayerFrame();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    topLBox.renderSelf();


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

    updatePlayerPosition();
    





    // Call requestAnimationFrame to schedule the next frame
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
  

