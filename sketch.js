var dog1,dog2,database,foodStock,happyDog
var bedroomI,gardenI,washroomI
var foodS,feed,addFood
var lastFed
var foodObj
var gameState
var readingGameState
var changeGameState

function preload()
{
  dog1=loadImage("images/dogImg.png")
  dog2=loadImage("images/dogImg1.png")
  bedroomI=loadImage("images/Bed Room.png")
  gardenI=loadImage("images/Garden.png")
  washroomI=loadImage("images/Wash Room.png")
  
}


function setup() {
  database=firebase.database()
  createCanvas(1000, 600);
  

  foodStock=database.ref("food")
  foodStock.on("value",readValue)

  foodObj=new Food()

  readState=database.ref("gameState")
  readState.on("value",function(data){
  gameState=data.val()
  })

  fedTime=database.ref("feedTime")
  fedTime.on("value",function(data){
    lastFed=data.val()
  })

  dog=createSprite(800,400,20,20)
  dog.addImage(dog1)
  dog.scale=0.2


feed=createButton("Feed the Dog")
feed.position(700,95)
feed.mousePressed(feedDog)


addFood=createButton ("Add Food")
addFood.position (800,95)
addFood.mousePressed(addFoods)



}


function draw() {  

  background(46,139,87)
  
  currentTime=hour()
  if(currentTime==(lastFed+1)){
update("Playing")
foodObj.garden()
  }else if(currentTime==(lastFed+2)){
    update("Sleeping")
    foodObj.bedroom()
      }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
        update("Bathing")
        foodObj.washroom()
              }else {
                update("Hungry")
                foodObj.display()
              }

  
if(feed.mousePressed){

  foodObj.positionX=750
  foodObj.positionY=400
}
    fill (255,255,254)
   textSize (15)
if (lastFed>=12){

  text ("Last Fed : "+ lastFed%12 + "PM" ,350,30)

}else if (lastFed==0){
text ("Last Fed = 12 AM " ,350,30 )

}else {
  text ("Last Fed : " +lastFed + " AM" ,350,30)
}

if (gameState!="Hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
}else{
  feed.show()
  addFood.show()
  dog.addImage(dog2)
}


  drawSprites();
  
}

function readValue(data){
foodS=data.val()
foodObj.updateFoodStock(foodS)
}


function feedDog (){
dog.addImage (dog2)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  food:foodObj.getFoodStock(),
  feedTime:hour(),
  gameState:"Hungry"
})
}

function addFoods (){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}

function update(state){

  database.ref("/").update({
    gameState:state
  })
}

