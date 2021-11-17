let background = document.getElementById('background');
let bgX = background.offsetLeft;
let ground = document.getElementById('ground');
let groundX = ground.offsetLeft;
let cloud1 = document.getElementById('cloud1');
let cloud1X = cloud1.offsetLeft;
let cloud2 = document.getElementById('cloud2');
let cloud2X = cloud1.offsetLeft;
let cloud3 = document.getElementById('cloud3');
let cloud3X = cloud1.offsetLeft;

let player = document.getElementById('player');
let playerY = player.offsetTop;
let speedX = 1;
let speedY = 2;
let gravity = 2;

document.addEventListener('keydown', jump);
document.addEventListener('keyup', fall);
setInterval("moveBackGround()", 50);
setInterval("moveGround()", 50);
setInterval("moveCloud1()", 50);
setInterval("moveCloud2()", 50);
setInterval("moveCloud3()", 50);
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

function moveBackGround(){
    bgX -= speedX * 0.8;
    background.style.backgroundPositionX = bgX + "px";
}

function moveCloud1(){
    cloud1X -= speedX * 1.2;
    cloud1.style.backgroundPositionX = cloud1X + "px";
}

function moveCloud2(){
    cloud2X -= speedX * 1.4;
    cloud2.style.backgroundPositionX = cloud2X + "px";
}

function moveCloud3(){
    cloud3X += speedX * 1.2;
    cloud3.style.backgroundPositionX = cloud3X + "px";
}

function moveGround(){
    groundX -= speedX;
    ground.style.backgroundPositionX = groundX + "px";
}

function up(){
    if (playerY > 0) {
        playerY -= speedY;
        player.style.top = playerY + 'px';
    }
}

function down(){
    if (playerY < window.innerHeight - player.offsetHeight - (ground.offsetHeight * 0.5)){
        playerY += gravity;
        player.style.top = playerY + 'px';
    }
}
