class Food {

constructor(){

  this .foodStock=0
  this.lastFed
    
this.image=loadImage("Milk (1).png")

}
updateFoodStock(foodStock){
    this.foodStock=foodStock
    }
getFoodStock(){

 return    this.foodStock
}

deductFoodStock(){
if(this.foodStock>0){
this.foodStock=this.foodStock-1
}
}
getFedTime(lastFed){
    this.lastFed=lastFed
}

bedroom(){
background(bedroomI,550,550)
}

garden(){
background(gardenI,550,550)
}

washroom(){
background(washroomI,550,550)

}

display(){

var x=80,y=100

imageMode (CENTER)


if (this.foodStock!=0){

    for (var i=0;i< this.foodStock;i++){
if (i%10===0){
    x=80
    y=y+50
}
image (this.image,x,y,50,50)
x=x+30

    }
}

}
}




