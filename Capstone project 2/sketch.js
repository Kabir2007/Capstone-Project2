//Game code starts from here

//Creating empty space in computer;s memory

var boy,boyimg;
var back,back1; 
var block1,block2;
var tiger1,tigerimg,tigerGroup;
var score;
var lose,loseimg;
var restart,restartimg;
var gamestate;
var START = 0;
var PLAY = 1;
var END = 2;
var food,appleimg,strawberryimg,foodGroup;

// Pre-loading images

function preload(){

boyimg = loadImage("boy.png");
back1 = loadImage("jungle.jpg");
tigerimg = loadImage("tiger.png");
appleimg = loadImage("apple.png");
strawberryimg = loadImage("strawberry.png");
loseimg = loadImage("1lose.jpg");
restartimg = loadImage("3.jpg");

}

// Ending pre-loading of images

// Setting initials of game

function setup() {

// Creating gamespace    

createCanvas(600,600);   

foodGroup = new Group();
tigerGroup = new Group();

lose = createSprite(300,300,10,10);
lose.addImage("lose",loseimg);
lose.scale = 1;

gamestate = START;
 
back = createSprite(300,165);
back.addImage("back",back1);
back.scale = 3;

restart = createSprite(300,500);
restart.addImage("restart",restartimg);
restart.scale = 0.6;

boy = createSprite(120,360,10,10);
boy.addImage("boy",boyimg);
boy.scale = 0.12;

block1 = createSprite(300,310,600,20);
block1.visible = false;

block2 = createSprite(300,570,600,20);
block2.visible = false;

score = 0;

}

// Ending setting initials of game

// Starting the draw loop

function draw() {

// Clearing the background    

background(rgb(255,255,255));

// Start mode of game

if(gamestate === START){

score = 0;    

if(keyDown("space")){

gamestate = PLAY;

}

boy.visible = false;
back.visible = false;
lose.visible = false;
restart.visible = false;

fill(rgb(255,0,0));
textSize(31);
text("Press space to start",10,150);
text("Touch as much fruits as possible",10,250);
text("Don't touch the tigers",10,350);
text("Contol the boy with up and down arrows",10,450);

}

// Play mode of game

if(gamestate === PLAY){

boy.visible = true;
back.visible = true;
restart.visible = false;

back.velocityX = -(8 + score/10);

if(back.x < 0){
    
back.x = back.width/2;
    
}
    
boy.collide(block1);
boy.collide(block2);
    
if(keyDown("up_arrow")){
        
boy.y = boy.y - 10; 
                    
}   
    
if(keyDown("down_arrow")){
        
boy.y = boy.y + 10; 
                        
} 
    
spawnTiger();
spawnFood();

if(boy.isTouching(foodGroup)){

score = score + 10;
foodGroup.destroyEach();

}

if(boy.isTouching(tigerGroup)){

gamestate = END;
    
}

}

// End mode of game

if(gamestate === END){

foodGroup.destroyEach();
tigerGroup.destroyEach();
boy.visible = false;
back.visible = false;
lose.visible = true;
restart.visible = true;

if(keyDown("r")){

gamestate = START;

}

}

// Drawing sprites

drawSprites(); 

// Showing score

fill(rgb(114, 247, 212));
textSize(20);
text("Score : " + score,400,100);

}

// Ending the draw loop

// Spawning tigers

function spawnTiger(){

if(frameCount % 150 === 0){

tiger1 = createSprite(640,Math.round(random(360,500)));
tiger1.addImage("tiger2",tigerimg);
tiger1.scale = 0.07;

tiger1.velocityX = -(8 + score/10);

food.lifetime = 200;
tigerGroup.add(tiger1);

}

}

// Spawning food

function spawnFood(){

var rand = Math.round(random(1,2));

if(frameCount % 40 === 0){ 
    
food = createSprite(700,Math.round(random(370,490)),10,10);
food.velocityX = -(8 + score/10);

var rand = Math.round(random(1,2));    

switch(rand){

case 1:food.addImage("apple",appleimg);
food.scale = 0.1;
break;
case 2:food.addImage("strawberry",strawberryimg);
food.scale = 0.07;
default : break;

}

food.lifetime = 200;
foodGroup.add(food);

}

}

//Ending code of game