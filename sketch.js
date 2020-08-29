var dog, dogImg, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
	happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(400, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  })
  
  dog = createSprite(200, 400, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(380, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(480, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  
  foodObj.display();
  textSize(15);
  fill(255, 255, 254);
  if(lastFed >= 12) {
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  } else if(lastFed === 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    test("Last Feed : "+ lastFed + "AM", 350, 30);
  }
  drawSprites();
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}
