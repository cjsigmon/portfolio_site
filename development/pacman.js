const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const toggleButton = document.getElementById("toggle");
const workGrid = document.getElementById("grid-as-sidebar");
const HEX = document.getElementById("center-wrapper");
ctx.fillStyle = "white";

// Add a click event listener to the button
toggleButton.addEventListener("click", function() {
    // Toggle the visibility of the canvas by changing its style.display property
    if (canvas.style.display === "none" || canvas.style.display === "") {
        workGrid.id = "main-grid";
        HEX.style.display = "none";
        workGrid.style.backgroundColor = "black";
        canvas.style.display = "block"; // Show the canvas
        window.scrollTo({
            top: 140,
            behavior: 'smooth'
          });
    } else {
        workGrid.id = "grid-as-sidebar";
        canvas.style.display = "none"; // Hide the canvas
        workGrid.style.background = "none";
        HEX.style.display = "flex";

    }
});


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
const boxWidth = 230, boxHeight = 230;

class Dot {
    constructor(x, y, radius, fillStyle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillStyle = fillStyle;
    }

    renderSelf() {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

let dotMatrix = new Array(11);

// Loop to initialize 2D array elements.
for (let i = 0; i < dotMatrix.length; i++) {
    dotMatrix[i] = [];
    for (let j = 0; j < 16; j++) {
 
        const newDot = new Dot(((j+1)*60 - 30), ((i+1)* 61 - 30), 10, "red");
        dotMatrix[i].push(newDot);
    }
}

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
            return player.x >= (this.x - playerHitBox) && player.x <= (this.x - 3);
        }
        return false;
    }
    isPlayerRight() {
        // if player is in vertical range
        if (player.y > (this.y - player.height) && player.y < this.bottom) {
            // if on immediate right
            return player.x >= (this.right - 3) && player.x <= (this.right + 6);
        }
        return false;
    }

    isPlayerAbove() {
        // if player is in horizantal range
        if (player.x > (this.x - player.width) && player.x < this.right) {
            // if on immediate top
            return player.y >= (this.y - playerHitBox) && player.y <= (this.y - 3);
        }
        return false;
    }
    isPlayerBelow() {
        // if player is in horizantal range
        if (player.x > (this.x - playerHitBox) && player.x <= this.right) {
            // if on immediate bottom
            return player.y >= (this.bottom - 3) && player.y <= (this.bottom + 6);
        }
        return false;
    }



    renderSelf() {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 8;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

const topLBox = new Box(60, 60, boxWidth, boxHeight);
const bottomLBox = new Box(60, canvas.height - (boxHeight + 66), boxWidth, boxHeight);
const topMBox = new Box(canvas.width/2 - boxWidth/2, 60, boxWidth, boxHeight);
const bottomMBox = new Box(canvas.width/2 - boxWidth/2, canvas.height - (boxHeight + 66), boxWidth, boxHeight);
const topRBox = new Box(canvas.width - (boxWidth + 60), 60, boxWidth, boxHeight);
const bottomRBox = new Box(canvas.width - (boxWidth + 60), canvas.height - (boxHeight + 66), boxWidth, boxHeight);
const boxArr = [topLBox, bottomLBox, topMBox, bottomMBox, topRBox, bottomRBox];


const player = {
    x: 0,
    y: canvas.height/2 - 34,
    width: 54,
    height: 54,
    speedX: 3,
    speedY: 3,
    defaultSpeed: 3
};
const playerHitBox = player.width + (player.defaultSpeed * 2);



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

        // check for boxes on y-axis
        topWall = false;
        bottomWall = false;
        rightWall = false;
        leftWall = false;
        boxArr.forEach(element => {
            if (element.isPlayerLeft()) {
                rightWall = true;
            }
            if (element.isPlayerRight()) {
                leftWall = true;
            }
            if (element.isPlayerAbove()) {
                bottomWall = true;
            }
            if (element.isPlayerBelow()) {
                topWall = true;
            }
        });
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
    for (i = 0; i < dotMatrix.length; i++) {
        for (j = 0; j < dotMatrix[i].length; j++) {
            dotMatrix[i][j].renderSelf();
        }
    }

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
    leftWall = false;
    boxArr.forEach(box => {
        box.renderSelf();
    });

    checkCollisions();
    updatePlayerPosition();
    
    // Call requestAnimationFrame to schedule the next frame
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
  

