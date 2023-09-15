const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const pacMan = document.getElementById("pacman");
const keys = {};
let leftWall = false, rightWall = false, topWall = false, bottomWall = false;
const player = {
    x: 0,
    y: 220,
    width: 40,
    height:40,
    speedX: 2,
    speedY: 2
};
ctx.drawImage(pacMan, player.x, player.y, player.width, player.height);


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
            player.speedX = 2;
            rightWall = !rightWall;
        }
        player.x -= player.speedX;
    }
}
if (keys['d'] || keys['D']) {
    if (!rightWall) {
        if(player.speedX === 0) {
            player.speedX = 2;
            leftWall = !leftWall;
        }
        player.x += player.speedX
    }
}

// y - moving
if (keys['w'] || keys['W']) {
    player.y -= player.speedY;
}
if (keys['s'] || keys['S']) {
    player.y += player.speedY;
}

}


function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(pacMan, player.x, player.y, player.width, player.height);

    if (player.x >= canvas.width - player.width) {
        player.speedX = 0;
        rightWall = true;
    }


    if (player.y >= canvas.height - player.height 
        || player.y < 0) {
        player.speedY = 0;
    }

    updatePlayerPosition();
    





    // Call requestAnimationFrame to schedule the next frame
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
  

