//Create variables here
var dog1, dog2, dog, happyDog, foodS, foodStock;
var database;

function preload()
{
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(300,300,10,10);
  dog.addImage(dog1);
  dog.scale = 0.15;

  foodStock= database.ref('Food');
    foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87)  

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
  }

  drawSprites();
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); 
  text("Note: Press Up Arrow Key To Feed Fur Fur Milk!",130,10,300,20);
}

function readStock(data){
  foodS = data.val();

}
function writeStock(x){
  if(x<=0){ 
    x=0;
  }

  else{ 
    x=x-1; 
  } 

  database.ref('/').update({
     Food:x 
  })

}