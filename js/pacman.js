const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const pacMan = document.getElementById("pacman");

const player = {
    x: 0,
    y: 220,
    width: 40,
    height:40,
    speed: 2,
};


ctx.drawImage(pacMan, player.x, player.y, player.width, player.height);
