var gameState = PLAY;
var PLAY = 1;
var END = 0;
var FINISH = 2;
var score = 0;

var gameForm, gameFormImg;
var playbutton, howToPlayButton, homeButton;
var playbuttonImg, howToPlayButtonImg, homeButtonImg;
var story, backbutton, backbuttonImg, storyImg;

var ron, ronImg, ron2Img;
var coin, coinImg, coinsGroup;
var obstacle1Img, obstacle2Img, obstacle3Img;
var bg, bgImg;
var invisibleGroundTop, invisibleGroundBottom;
var skullImg, skull2Img, angryImg;
var skullsGroup, angrysGroup;
var gameover, restart, youWin;
var gameoverImg, restartImg, youWinImg;
var obstaclesGroup;

var jumpSound;

function preload() {
  bgImg = loadImage("bg.jpg");
  ronImg = loadAnimation("ron1.png", "ron2.png", "ron3.png", "ron4.png", "ron5.png", "ron6.png", );
  ron2Img = loadAnimation("ron4.png");
  gameFormImg = loadImage("game form.jpg");
  playbuttonImg = loadImage("play button.png");
  howToPlayButtonImg = loadImage("howtoplay.png");
  storyImg = loadImage("story.jpg");
  backbuttonImg = loadImage("back.png");
  coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png",);
  skullImg = loadAnimation("skull1.png", "skull2.png", "skull3.png", "skull4.png", "skull5.png", "skull6.png", "skull7.png",);
  angryImg = loadAnimation("angry1.png", "angry2.png", "angry3.png", "angry4.png", "angry5.png", "angry6.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  youWinImg = loadImage("youWin.png");
  jumpSound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600,400);

  bg = createSprite(500, 200, 20, 20);
  bg.addImage("background", bgImg);
  bg.scale = 1;

  ron = createSprite(100, 230, 20, 20);
  ron.addAnimation("running", ronImg);
  ron.addAnimation("ron", ron2Img);
  ron.scale = 0.4;

  invisibleGroundBottom = createSprite(300, 290, 600, 20);
  invisibleGroundBottom.visible = false;

  invisibleGroundTop = createSprite(300, 60, 600, 20);
  invisibleGroundTop.visible = false;

  gameForm = createSprite(300, 200, 20, 20);
  gameForm.addImage("form", gameFormImg);
  gameForm.visible = true;

  playbutton = createSprite(150, 300, 20, 20);
  playbutton.addImage("play", playbuttonImg);
  playbutton.scale = 0.3;
  playbutton.visible = true;
  playbutton.debug = false;

  howToPlayButton = createSprite(160, 210, 20, 20);
  howToPlayButton.addImage("howtoplay", howToPlayButtonImg);
  howToPlayButton.scale = 0.5;
  howToPlayButton.visible = true;
  howToPlayButton.debug = false;

  gameover = createSprite(300, 200, 20, 20);
  gameover.addImage("gameover", gameoverImg);
  gameover.scale = 0.6;
  gameover.visible = false;

  story = createSprite(300, 200, 20, 20);
  story.addImage("story", storyImg);
  story.scale = 0.47;
  story.visible = false;

  backbutton = createSprite(500, 20, 20, 20);
  backbutton.addImage("back", backbuttonImg);
  backbutton.scale = 0.2;
  backbutton.visible = false; 
  
  restart = createSprite(300, 350, 20, 20);
  restart.addImage("restart", restartImg);
  restart.scale = 0.12;
  restart.visible = false;

  youWin = createSprite(300, 200, 20, 20);
  youWin.addImage("youWin", youWinImg);
  youWin.visible = false;
  
  coinsGroup = createGroup();
  obstaclesGroup = createGroup();

}

function draw() {
  background("black");

if (gameState === PLAY) {

  spawnCoins();
  spawnObstacles();


  bg.velocityX = -12;

  ron.collide(invisibleGroundBottom);
  ron.collide(invisibleGroundTop);

  ron.velocityY = ron.velocityY + 0.8;
 
  ron.setCollider("circle",0, 0, 100);
  ron.debug = false;

  if (keyDown("space")&& ron.y >= 220) {
    ron.velocityY = -15;
    jumpSound.play();
  //  ron.changeAnimation("ron", ron2Img);
  }
  
  

  if (bg.x < 0) {
    bg.x = width;
  }

  if (ron.isTouching(obstaclesGroup)) {
    gameState = END;
  } 
  

}
  else if (gameState === END) {

    bg.velocityX = 0;
    ron.velocityY = 0;

    restart.visible = true;
    restart.setCollider("circle", 0, -15, 220);
    restart.debug = false;
    gameover.visible = true;
    gameover.depth = ron.depth
  
    coinsGroup.setVelocityXEach(0);
    coinsGroup.setLifetimeEach(-1);

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    ron.changeAnimation("ron", ron2Img);

    if (mousePressedOver(restart)) {
        reset();
    }
  

  }

  if (gameState === FINISH) {
    youWin.visible = true;
    bg.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    coinsGroup.destroyEach();
    obstaclesGroup.destroyEach();

    ron.velocityY = 0;
  }

  howToPlayButton.setCollider("rectangle",-14,5,howToPlayButton.width/1.5,howToPlayButton.height/5);
  playbutton.setCollider("rectangle",-5,0,playbutton.width/1.2,playbutton.height/3.1);
  backbutton.setCollider("rectangle",-5,0,backbutton.width/0.7,backbutton.height/1.3);

  if (mousePressedOver(howToPlayButton)) {
    
     story.visible = true
     backbutton.visible = true;
  }

  if (mousePressedOver(backbutton)) {
    story.visible = false;
    backbutton.visible = false;
  }


  if (mousePressedOver(playbutton)) {
    gameState = PLAY;
    gameForm.visible = false;
    playbutton.visible = false;
    howToPlayButton.visible = false;
  }

  if (mousePressedOver(backbutton)) {
    story.visible = false;
    backbutton.visible = false
  }

  if (score === 100) {
    gameState = FINISH;
  }

  drawSprites();
  Score();
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,100,40,10);
    coin.y = Math.round(random(100,270));
    coin.addAnimation("coin", coinImg);
    coin.velocityX = -12;
    coin.scale = 0.3;
    coin.setCollider("circle", 0, 0, 70);
    coin.debug = false;
    
    coin.lifetime = 200;
    
    coin.depth = ron.depth;
    ron.depth = ron.depth + 1;
    
    coinsGroup.add(coin);
  }
}

function spawnObstacles(){
  if (frameCount % 30 === 0){
    var obstacle = createSprite(900,165,10,40);
    obstacle.velocityX = -12;

    obstacle.y = Math.round(random(100, 260));
    obstacle.setCollider("circle", -45, 0, 100);
    obstacle.debug = false;

     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addAnimation("running", skullImg);
               break;
       case 2: obstacle.addAnimation("running",angryImg);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.27;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);

     obstacle.depth = ron.depth
     ron.depth = ron.depth + 1;
  }
 }

function reset() {

  gameState = PLAY;

   obstaclesGroup.destroyEach();
   coinsGroup.destroyEach();

   ron.changeAnimation("running", ronImg);

   gameover.visible = false;
   restart.visible = false;

   score = 0;
}

function Score()
{
   if(ron.isTouching(coinsGroup)) {

     //increment the score by 1
      score = score + 1;
  }
     textFont("algerian");
     textSize(17);
     fill("white");
     text("Score : "+ score, 500, 50);
       
  
}