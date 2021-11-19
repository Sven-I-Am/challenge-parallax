//Get all elements from the DOM

let background = document.getElementById('background');
let ceiling = document.getElementById('ceiling');
let floor = document.getElementById('floor');
let cloud1 = document.getElementById('cloud1');
let cloud2 = document.getElementById('cloud2');
let cloud3 = document.getElementById('cloud3');
let hearts = document.getElementsByClassName('heart');
let obstacleLayer = document.getElementById('obstacles');
let obstacles = obstacleLayer.getElementsByClassName('obstacle');
let playerDiv = document.getElementById('player');
let playerIMG = document.getElementById('playerIMG');
let showscore = document.getElementById('score');
let jumpSound = document.getElementById('jumpSound');

//Get X coordinate from elements

let bgX = background.offsetLeft;
let ceilingX = ceiling.offsetLeft;
let floorX = floor.offsetLeft;
let cloud1X = cloud1.offsetLeft;
let cloud2X = cloud1.offsetLeft;
let cloud3X = cloud1.offsetLeft;

//Declare booleans

let playing = false;
let climbBool = false;
let paused = false;
let shown = true;

//Declare the setInterval variables

let climbing;
let falling;
let start;
let spawnObst;

//Initiate player

let player = {
    height: playerDiv.offsetHeight,
    y: window.innerHeight/2,
    minY: ceiling.offsetHeight,
    maxY: window.innerHeight - playerDiv.offsetHeight - floor.offsetHeight,
    speedY: 0,
    drag: 0.99,
    gravity: 0.05,
    lives: 3,
    alive: true,
    score: 0
}
playerDiv.style.top = player.y + "px";
showscore.innerText = player.score;

//Set animation variables

let speedX = 1;
let rotation = 0;

//Add event listeners to document

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//Key handlers

function keyDown(e) {
    if (e.keyCode === 32 && !climbBool && player.alive && playing&& !paused) {
        climbBool = true;
        player.speedY = 5;
        clearInterval(falling);
        climbing = setInterval("up()", 5);
        playJumpSound();
    }
}
function keyUp(e){
    if (e.keyCode === 32 && climbBool && player.alive && playing && !paused) {
        climbBool = false;
        player.speedY = 0;
        clearInterval(climbing);
        falling = setInterval("down()", 5);
    }
    if ((e.key === 'n' || e.key === 'N') && !playing){
        newGame();
    }
    if ((e.key === 'p' || e.key === 'P') && playing){
        if(!paused){
            clearIntervals();
            paused = true;
            gamePaused();

        } else {
            setIntervals();
            paused = false;
            gamePaused();
        }
    }
    if (e.key === 'c' || e.key === 'C'){
        if(!shown){
            shown = true;
            showControls();
        } else {
            shown = false;
            showControls();
        }
    }
}

//sound effects

function playJumpSound(){
    jumpSound.currentTime = 0;
    jumpSound.play();
    jumpSound.loop = false;
    jumpSound.volume = 0.1;
}

//Player functions

function up(){
    if (player.y > player.minY) {
        player.speedY *= player.drag;
        player.y -= player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        gotHit();
    }
}

function down(){
    if (player.y < player.maxY){
        player.speedY += player.gravity;
        player.y += player.speedY;
        playerDiv.style.top = player.y + 'px';
    } else {
        gotHit();
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
    player.score = 0;
}

function gotHit(){
    player.lives--;
    hearts[player.lives].src = "ASSETS/GAME/HUD/livelost.png"
    playing = false;
    climbBool = false;
    playerIMG.src = "ASSETS/GAME/CHAR/hit.gif";
    player.speedY = 0;
    clearIntervals();
    while(obstacleLayer.firstChild){
        obstacleLayer.removeChild(obstacleLayer.lastChild);
    }
    if (player.lives <= 0){
        gameOver();
    } else {
        setTimeout(()=>{
            player.y = window.innerHeight / 2;
            playerIMG.src = "ASSETS/GAME/CHAR/flying.gif";
            playing = true;
            setIntervals();
        }, 500)
    }
}

//Obstacle functions

obstacle = function() {
    this.img = document.createElement( "img" ) ;
    this.img.className = "obstacle";
    this.img.src = "ASSETS/GAME/OBST/cog_1.png";
    let bottom = window.innerHeight-floor.offsetHeight-this.img.offsetHeight;
    let top = ceiling.offsetHeight;
    let x = Math.floor(Math.random()* bottom) + top;
    this.img.style.top = x + "px";
    document.getElementById('obstacles').appendChild( this.img);
}

function spawnObstacle(){
    new obstacle;
}

//Collision checks

function checkCollision(el){
    let rect = el.getBoundingClientRect();
    return {
        "TL": [rect.left, Math.round(rect.top)],
        "TR": [rect.left+ rect.width, Math.round(rect.top)],
        "BL": [rect.left, Math.round(rect.left+rect.height)],
        "BR": [rect.left+rect.width, Math.round(rect.left+rect.height)]
    }
}

//Score counter

setInterval(()=>{
    if (playing && !paused){
        player.score++;
        showscore.innerText = player.score;
    }
}, 1000);

//Game state functions

function newGame(){
    resetPlayer();
    showscore.innerText = player.score;
    playing = true;
    setIntervals();
    document.getElementById('screen').style.visibility = "hidden";
    document.getElementById('gameOver').style.visibility = "hidden";
    document.getElementById('newGame').style.visibility = "hidden";
    document.getElementById('pause').style.visibility = "hidden";
}

function gameOver(){
    playing = false;
    player.alive = false;
    document.getElementById('screen').style.visibility = "visible";
    document.getElementById('gameOver').style.visibility = "visible";
    document.getElementById('newGame').style.visibility = "visible";
}

function gamePaused(){
    if (paused){
        document.getElementById('screen').style.visibility = "visible";
        document.getElementById('pause').style.visibility = "visible";
    } else {
        document.getElementById('screen').style.visibility = "hidden";
        document.getElementById('pause').style.visibility = "hidden";
    }
}

function showControls(){
    if (shown){
        document.getElementById('controls').style.visibility = "visible";
    } else {
        document.getElementById('controls').style.visibility = "hidden";
    }
}

//Animation functions

function animate(){
    bgX = moveElement(background, bgX, speedX);
    cloud1X = moveElement(cloud1, cloud1X, speedX*1.2);
    cloud2X = moveElement(cloud2, cloud2X, speedX*1.5);
    cloud3X = moveElement(cloud3, cloud3X, speedX*-1.2);
    floorX = moveElement(floor, floorX, speedX*2);
    ceilingX = moveElement(ceiling, ceilingX, speedX*-2);
    moveObstacles();
}

function rotate(el, speed){
    rotation += speed;
    el.style.transform = "rotate("+rotation+"deg)";
}

function moveElement(el, elX, speed){
    elX -= speed;
    el.style.backgroundPositionX = elX + "px";
    return elX;
}

function moveObstacles(){
    obstacles = obstacleLayer.getElementsByClassName('obstacle');
    let speed = speedX * 3;
    if (player.score%30 === 0){
        speed += 0.2;
    }
    for (let i=0; i<obstacles.length;i++){

        let obstacleX = obstacles[i].offsetLeft;
        if (obstacleX < -(window.innerWidth+obstacles[i].offsetWidth)){
            obstacleLayer.removeChild(obstacles[i]);
        } else {
            let playerCoords = checkCollision(playerDiv);
            let obstacleCoords = checkCollision(obstacles[i]);
            obstacleX -= speed;
            obstacles[i].style.left = obstacleX + "px";
            rotate(obstacles[i], speedX*-8);
            if(obstacleCoords.TL[0] <= playerCoords.TR[0]  && obstacleCoords.TR[0] >= playerCoords.TL[0] && obstacleCoords.TL[1] <= playerCoords.BL[1]  && obstacleCoords.BL[1] >= playerCoords.TL[1]){

                    console.log(obstacleCoords.TL[0] +' <= ' +  playerCoords.TR[0] + ' && ' + obstacleCoords.TR[0] + ' >= ' +  playerCoords.TL[0]);
                    console.log(obstacleCoords.TL[1] +' <= ' + playerCoords.BL[1] + ' && ' + obstacleCoords.BL[1] + ' >= ' +  playerCoords.TL[1]);
                    gotHit();
            }
        }
    }
}

//Interval clear and set

function clearIntervals(){
    clearInterval(falling);
    clearInterval(climbing);
    clearInterval(start);
    clearInterval(spawnObst);
}

function setIntervals(){
    falling = setInterval("down()", 5);
    start = setInterval("animate()", 10);
    spawnObst = setInterval("spawnObstacle()", Math.floor(Math.random()* 5000) + 2000);
}