var gameState=0

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var coinGroup, coinImage;
var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;
var vault,vaultimg
var c
var gameOver, restart;
var police,policeimg
var d
var s
var bgimg
var bg
localStorage["HighestScore"] = 0;

function preload(){
  mario_running = loadAnimation("image1.png","image2.png","image4.png");
  mario_collided = loadAnimation("image3.png");
  groundImage = loadImage("backg.jpg");
  policeimg=loadAnimation("police_1.png","police_2.png","police_3.png","police_4.png","police_5.png","police_6.png","police_7.png","police_8.png")
  coinImage = loadImage("coin.png");
  obstacle2 = loadImage("car2.png");                                                                            
  obstacle1 = loadImage("car1.png");
  obstacle3 = loadImage("car3.png");
  obstacle4 = loadImage("car4.png");
  obstacle5 = loadImage("car5.png");
  obstacle6 = loadImage("car6.png");
  obstacle7 = loadImage("car7.png");
  obstacle8 = loadImage("car8.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  vaultimg=loadImage("vault.jpg")
  d=loadImage("unnamed.png")
  s=loadImage("stone.png")
  bgimg=loadImage("bg(2).png")
}

function setup() {
  createCanvas(600,200);
  bg=createSprite(600,200,600,800)
  bg.addImage("bgimg",bgimg)
  mario = createSprite(150,170,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.4;
  c=createSprite(300,160,20,20)
  c.addImage("d",d)
  c.scale=0.1
  
 // background("red")
  
 

 
 
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  coinGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
 
    police=createSprite(50,170,20,20)
    police.addAnimation("police",policeimg)
    police.scale=1
  
  
    ground = createSprite(0,200,1200,10);
   
  
}

function draw() {
 
c.velocityX=-2
 if(c.isTouching(mario)){
   gameState=1
 }

  //background("blue");
  textSize(20);
  fill(255);
  text("Score: "+ score, 500,40);
//text("life: "+ life , 500,60);
  drawSprites();
  if(gameState===1){
  ground.velocityX = -(6 + 3*score/100);
  }
  if (gameState===1){
    c.visible=false
   score = score + Math.round(getFrameRate()/60);
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && mario.y >= 140) {
      mario.velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY + 0.8
  if(gameState===1){
    if (ground.x < 0){
     
      ground.x = ground.width/2;
      ground.x = ground.width /2;
      
    }
    
  }
  //ground.visible=false
    mario.collide(ground);
    
    spawnCoin();
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(mario)){
        gameState = 2;
    } 
  }
  
  else if (gameState === 2 ) {
    gameOver.visible = true;
    restart.visible = true;
    mario.addAnimation("collided", mario_collided);
    

   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    
    //change the trex animation
    mario.changeAnimation("collided",mario_collided);
    mario.scale =0.35;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
}


function spawnCoin() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    coinGroup.add(coin);
    if(frameCount % 150 === 0) {
      bullet=createSprite(50,160,20,20)
      bullet.velocityX=2
  
  }
  }
  
}

 
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var r=Math.round(random(200,250))
    var obstacle = createSprite(600,175,10,40); 
    obstacle.debug=true
    obstacle.setCollider("rectangle", 0, 0, 20, 80, -45);
    //obstacle.addImage("s",s)   
   
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;
      case 8: obstacle.addImage(obstacle8);
              break;
      
              
    }
    obstacle.scale=0.3
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.2;
    
    //add each obstacle to the group
  
  }
}
function reset(){
  gameState = 0;
  gameOver.visible = false;
  restart.visible = false;
  c.x=400
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  mario.changeAnimation("running",mario_running);
  mario.y=160
  mario.scale =0.5;
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  
}