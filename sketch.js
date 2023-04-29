var ground;        //variables declared
var lander;
var bg_img;
var lander_img;
var thrust;
var rcs_left , rcs_right;
var crash;
var land;
var normal;
var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;

function preload(){ // Images are loaded
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash = loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png","landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png")
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  normal = loadAnimation("normal.png");
  thrust.playing = true;
  thrust.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup(){
  createCanvas(1000,700); // Canvas created
  frameRate(80);         // Frame rate 
  timer = 1500;
  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;
  lander = createSprite(100,50,30,30); // Sprite created
  lander.addImage(lander_img);// image added
  lander.scale = 0.1;      // scale given
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('right',rcs_right);
  lander.addAnimation('normal',normal);

  ground = createSprite(500,690,1000,20);

 // lander.setCollider("rectangle",0,0,200,200);
  rectMode(CENTER);       // rect mode given to center the object
  textSize(15);      
}

function draw(){
  background(51);
  image(bg_img,0,0); // Image added
  push()
  fill(255);
  text("vertical velocity:"+round(vy),800,75);
  pop();
  vy += g    //vy = vy+g, gravity added to vertical velocity
  lander.position.y += vy; //  vertical velocity added to lander's y position
  lander.position.x += vx;
  drawSprites();
}

function keyPressed(){
  if (keyCode == UP_ARROW && fuel>0){
    upthrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
  } 
  if (keyCode == RIGHT_ARROW && fuel>0){
    lander.changeAnimation('left');
    right_thrust();
  } 
  if (keyCode == LEFT_ARROW && fuel>0){
    lander.changeAnimation('right');
     left_thrust();
  } 
}

function upthrust(){
  vy = -1;
  fuel -= 1;
}

function right_thrust(){
  vx += 0.2;
  fuel -= 1;
}

function left_thrust(){
  vx -= 0.2;
  fuel -=1;
}