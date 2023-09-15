const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const pacMan = document.getElementById("pacman");

const player = {
    x: 0,
    y: 220,
    width: 40,
    height:40,
    speedX: 2,
    speedY: 3
};
ctx.drawImage(pacMan, player.x, player.y, player.width, player.height);





function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(pacMan, player.x, player.y, player.width, player.height);
    
    
    player.x += player.speedX;
    player.y += player.speedY;

    if (player.x >= canvas.width - player.width 
        || player.x <= 0) {
        player.speedX = -player.speedX;
    }

    if (player.y >= canvas.height - player.height 
        || player.y <= 0) {
        player.speedY = -player.speedY;
    }
    





    // Call requestAnimationFrame to schedule the next frame
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  requestAnimationFrame(animate);
  

