var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gameState = "play"
var bullets = 10


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  OneHeart = loadImage("assets/heart_1.png")
  TwoHearts = loadImage("assets/heart_2.png")
  ThreeHearts = loadImage("assets/heart_3.png")
  ExplosionSound = loadSound("assets/explosion.mp3")
  LoseSound = loadSound("assets/explosion.mp3")
  WinSound = loadSound("assets/explosion.mp3")

}




function setup() {


zombieGroup = new Group()
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart_1 = createSprite(displayWidth-100, 70)
heart_1.addImage('heart_1', OneHeart)
heart_1.scale = 0.2
heart_1.visible = false; 

heart_2 = createSprite(displayWidth-100, 70)
heart_2.addImage('heart_2', TwoHearts)
heart_2.scale = 0.2
heart_2.visible = false; 

heart_3 = createSprite(displayWidth-100, 70)
heart_3.addImage('heart_3', ThreeHearts)
heart_3.scale = 0.2
heart_3.visible = false; 


}

function draw() {
  background(0); 
  if(gameState==="play"){


  zombies();




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullets = bullets-1
 
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets==0){
  gameState = "end"
}
if(zombieGroup.isTouching(player)){
  ExplosionSound.play();
  for(i=0; i < zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  }
  
}


  }

drawSprites();

if(gameState=="end"){
  zombieGroup.destroyEach();
  player.destroy();
  LoseSound.play();
}

}
function zombies(){
  if(frameCount %60 === 0){
    zombie = createSprite(Math.round(random(500,1000)),Math.round(random(50, 400)), width, height)
    zombie.addImage(zombieImg)
    zombie.scale = 0.3;
    zombie.velocityX = -4
    zombie.debug=true
    zombieGroup.add(zombie)
  } 
}
