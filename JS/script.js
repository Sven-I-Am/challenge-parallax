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
let obstacleLayer = document.getElementById('obstacles');
//let obstacles = obstacleLayer.getElementsByClassName('obstacle');
let speedX = 1;

let playerDiv = document.getElementById('player');
let playerIMG = document.getElementById('playerIMG');

let player = {
    height: playerDiv.offsetHeight,
    y: playerDiv.offsetTop,
    minY: ceiling.offsetHeight,
    maxY: window.innerHeight - playerDiv.offsetHeight - floor.offsetHeight,
    speedY: 0,
    speedX: 0,
    drag: 0.99,
    gravity: 0.1,
    alive: true
}

  let climbing;
  let falling;
  let climbBool = false;

function keyDown(e) {
    if (e.keyCode === 32 && !climbBool && player.alive) {
        climbBool = true;
        player.speedY = 5;
        clearInterval(falling);
        climbing = setInterval("up()", 5);
    }
}
function keyUp(e){
    if (e.keyCode === 32 && climbBool && player.alive) {
        climbBool = false;
        player.speedY = 0;
        clearInterval(climbing);
        falling = setInterval("down()", 5);
    }
    if ((e.key === 'n' || e.key === 'N') && !playing){
        newGame();
        playing = true;
        start = setInterval("play()", 10);
    }
}

function up(){
    if (player.y > player.minY) {
        player.speedY *= player.drag;
        player.y -= player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        gameOver();
    }
}

function down(){
    if (player.y < player.maxY){
        player.speedY += player.gravity;
        player.y += player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        gameOver();
    }
}

function newGame(){
    playerIMG.src = "ASSETS/GAME/CHAR/flying.gif";
    player.alive = true;
    document.getElementById('screen').style.visibility = "hidden";
}

function gameOver(){
    playing = false;
    playerIMG.src = "ASSETS/GAME/CHAR/hit.gif";
    player.speedY = 0;
    player.alive = false;
    clearInterval(falling);
    clearInterval(start);
    document.getElementById('screen').style.visibility = "visible";
    document.getElementById('gameOver').style.visibility = "inherit";
}



let rotation = 0;
let cog = document.getElementById('cog');
let cogY = cog.offsetTop;
console.log(cogY);
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
