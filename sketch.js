var database;

var dog;
var Milk = [];
var milkImage, dogImage, happyDogImage;
var foodObj;

var fedTime, lastFed, foodstock, foodStock;


function preload(){
  happyDogImage = loadImage("../images/happydog.png");
  dogImage = loadImage("../images/dog.png");

  milkImage = loadImage("../images/Milk.png");
}

function setup() {
  createCanvas(1000,500);
  
  database = firebase.database();

  dog = createSprite(800,270);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodObj = new Food();

  foodStock = database.ref('FoodStock');
  foodStock.on('value', readStock);

  feed = createButton("Feed the Dog");
  feed.position(870,140);
  feed.mousePressed(()=>
    feedDog(),
    foodObj.deductFood()
  );

  addFoodS =createButton("Add Food");
  addFoodS.position(780,140);
  addFoodS.mousePressed(addFood);
  
}

function draw() {
  background(46, 139, 87);

  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed >= 12){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 350, 30);
  }

  foodObj.display();

  drawSprites();
  text(mouseX+" "+mouseY,mouseX,mouseY);  
}

function addFood(){
  foods++;
  database.ref('/').update({
    FoodStock : foods
  })
}

function feedDog(){
  console.log("Function is running");                      
  dog.addImage(happyDogImage); 

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
  database.ref('/').update({
    foodStock: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods);
}