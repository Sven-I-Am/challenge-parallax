document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let start;
let playing = false;
//setInterval("spawnObstacle()", 2000);

let background = document.getElementById('background');
let bgX = background.offsetLeft;
let ceiling = document.getElementById('ceiling');
let ceilingX = ceiling.offsetLeft;
let floor = document.getElementById('floor');
let floorX = floor.offsetLeft;
let cloud1 = document.getElementById('cloud1');
let cloud1X = cloud1.offsetLeft;
let cloud2 = document.getElementById('cloud2');
let cloud2X = cloud1.offsetLeft;
let cloud3 = document.getElementById('cloud3');
let cloud3X = cloud1.offsetLeft;
let hearts = document.getElementsByClassName('heart');
let obstacleLayer = document.getElementById('obstacles');
//let obstacles = obstacleLayer.getElementsByClassName('obstacle');
let speedX = 1;

let playerDiv = document.getElementById('player');

let playerIMG = document.getElementById('playerIMG');

let player = {
    height: playerDiv.offsetHeight,
    y: window.innerHeight/2,
    minY: ceiling.offsetHeight,
    maxY: window.innerHeight - playerDiv.offsetHeight - floor.offsetHeight,
    speedY: 0,
    drag: 0.99,
    gravity: 0.05,
    lives: 3,
    alive: true
}

playerDiv.style.top = player.y + "px";

  let climbing;
  let falling;
  let climbBool = false;

function keyDown(e) {
    if (e.keyCode === 32 && !climbBool && player.alive && playing) {
        climbBool = true;
        player.speedY = 5;
        clearInterval(falling);
        climbing = setInterval("up()", 5);
    }
}
function keyUp(e){
    if (e.keyCode === 32 && climbBool && player.alive && playing) {
        climbBool = false;
        player.speedY = 0;
        clearInterval(climbing);
        falling = setInterval("down()", 5);
    }
    if ((e.key === 'n' || e.key === 'N') && !playing){
        newGame();
    }
}

function up(){
    if (player.y > player.minY) {
        player.speedY *= player.drag;
        player.y -= player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        clearInterval(climbing);
        gotHit();
    }
}

function down(){
    if (player.y < player.maxY){
        player.speedY += player.gravity;
        player.y += player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        clearInterval(falling);
        gotHit();
    }
}

function newGame(){
    resetPlayer();
    playing = true;
    start = setInterval("play()", 10);
    falling = setInterval("down()", 5);
    document.getElementById('screen').style.visibility = "hidden";
}

function gameOver(){
    clearInterval(start);
    playing = false;
    player.alive = false;
    document.getElementById('screen').style.visibility = "visible";
    document.getElementById('gameOver').style.visibility = "inherit";
}

function gotHit(){
    player.lives--;
    hearts[player.lives].src = "ASSETS/GAME/HUD/livelost.png"
    playing = false;
    climbBool = false;
    playerIMG.src = "ASSETS/GAME/CHAR/hit.gif";
    player.speedY = 0;
    clearInterval(start);
    if (player.lives <= 0){
        gameOver();
    } else {
        setTimeout(()=>{
            player.y = window.innerHeight / 2;
            playerIMG.src = "ASSETS/GAME/CHAR/flying.gif";
            playing = true;
            falling = setInterval("down()", 5);
            start = setInterval("play()", 10);
        }, 500)
    }
}


function resetPlayer(){
    playerIMG.src = "ASSETS/GAME/CHAR/flying.gif";
    for(let i = 0; i<hearts.length;i++){
        hearts[i].src = "ASSETS/GAME/HUD/live.png";
    }
    player.lives = 3;
    player.alive = true;
    player.maxY = window.innerHeight - playerDiv.offsetHeight - floor.offsetHeight;
    player.y = window.innerHeight/2;
    playerDiv.style.top = player.y + "px";
    player.speedY = 0;
    player.lives = 3;
    player.alive = true;
}

let rotation = 0;
let cog = document.getElementById('cog');

function rotate(){
    rotation += 1;
    cog.style.transform = "rotate("+rotation+"deg)";
}
//
//
// obstacle = function() {
//     this.div = document.createElement( "div" ) ;
//     this.div.className = "obstacle layer";
//     this.div.style.backgroundImage = "url('../ASSETS/GAME/level-builder/spike1.png')";
//     document.getElementById('obstacles').appendChild( this.div );
// }
//
//
//
// function spawnObstacle(){
//     new obstacle;
// }
//
// function moveObstacles(){
//     obstacles = obstacleLayer.getElementsByClassName('obstacle');
//     for (let i=0; i<obstacles.length;i++){
//         let obstacleX = obstacles[i].offsetLeft;
//         if (obstacleX < -(window.innerWidth+obstacles[i].offsetWidth)){
//             obstacleLayer.removeChild(obstacles[i]);
//         } else {
//             obstacleX -= speedX;
//             obstacles[i].style.left = obstacleX + "px";
//         }
//     }
// }

function play(){
    bgX = moveElement(background, bgX, speedX);
    cloud1X = moveElement(cloud1, cloud1X, speedX*1.2);
    cloud2X = moveElement(cloud2, cloud2X, speedX*1.5);
    cloud3X = moveElement(cloud3, cloud3X, speedX*-1.2);
    floorX = moveElement(floor, floorX, speedX*2);
    ceilingX = moveElement(ceiling, ceilingX, speedX*-2);
    rotate();
    //moveObstacles();
}




function moveElement(el, elX, speed){
    elX -= speed;
    el.style.backgroundPositionX = elX + "px";
    return elX;
}
