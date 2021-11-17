let background = document.getElementById('background');
let bgX = background.offsetLeft;
let ground = document.getElementById('ground');
let groundX = ground.offsetLeft;
let footLevel = document.getElementById('footLevel');
let cloud1 = document.getElementById('cloud1');
let cloud1X = cloud1.offsetLeft;
let cloud2 = document.getElementById('cloud2');
let cloud2X = cloud1.offsetLeft;
let cloud3 = document.getElementById('cloud3');
let cloud3X = cloud1.offsetLeft;
let player = document.getElementById('player');
let playerY = player.offsetTop;
let obstacleLayer = document.getElementById('obstacles');

let obstacles = obstacleLayer.getElementsByClassName('obstacle');
let speedX = 1;
let speedY = 3;
let gravity = 3;
let rotation = 0;
let cog = document.getElementById('cog');
let cogY = cog.offsetTop;
console.log(cogY);
function rotate(){
    rotation += 1;
    cog.style.transform = "rotate("+rotation+"deg)";
}


obstacle = function() {
    this.div = document.createElement( "div" ) ;
    this.div.className = "obstacle layer";
    this.div.style.backgroundImage = "url('../ASSETS/GAME/level-builder/spike1.png')";
    document.getElementById('obstacles').appendChild( this.div );
}

document.addEventListener('keydown', jump);
document.addEventListener('keyup', fall);
document.addEventListener('click', spawnObstacle);

setInterval("play()", 10);
//setInterval("spawnObstacle()", 5000);

function spawnObstacle(){
    new obstacle;
}

function moveObstacles(){
    obstacles = obstacleLayer.getElementsByClassName('obstacle');
    for (let i=0; i<obstacles.length;i++){
        let obstacleX = obstacles[i].offsetLeft;
        if (obstacles[i].offsetLeft < -(window.innerWidth+obstacles[i].offsetWidth)){
            obstacles[i].remove();
        }
        obstacleX -= speedX;
        obstacles[i].style.left = obstacleX + "px";
    }
}

function play(){
    bgX = moveElement(background, bgX, speedX);
    cloud1X = moveElement(cloud1, cloud1X, speedX*1.2);
    cloud2X = moveElement(cloud2, cloud2X, speedX*1.5);
    cloud3X = moveElement(cloud3, cloud3X, speedX*-1.2);
    groundX = moveElement(ground, groundX, speedX*2);
    rotate();
    moveObstacles();
}




function moveElement(el, elX, speed){
    elX -= speed;
    el.style.backgroundPositionX = elX + "px";
    return elX;
}

let climbing;
let falling = setInterval("down()", 10);
let climbBool = false;

function jump(e) {
    if (e.keyCode === 32 && !climbBool) {
        climbBool = true;
        clearInterval(falling);
        climbing = setInterval("up()", 10);
    }
}

function fall(e) {
    if (e.keyCode === 32 && climbBool) {
        climbBool = false;
        clearInterval(climbing);
        falling = setInterval("down()", 10);
    }
}

function up(){
    if (playerY > 0) {
        playerY -= speedY;
        player.style.top = playerY + 'px';
    }
}

function down(){
    if (playerY < window.innerHeight - player.offsetHeight - footLevel.offsetHeight){
        playerY += gravity;
        player.style.top = playerY + 'px';
    }
}