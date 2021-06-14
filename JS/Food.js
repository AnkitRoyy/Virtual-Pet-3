class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;
    }

    display(){
        var x = 50, y = 110;

        imageMode(CENTER);
        image(milkImage,720,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 80;
                    y = y+55;
                }
                image(milkImage, x, y, 60,60);
                x = x+30;
            }
        }
    }

    getFoodStock(){
        return this.foodStock;
        /*var getFoodStockref = database.ref("foodStock");
        getFoodStockref.on("value", (data) => {
            foodstock = data.val();
        })*/
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
        /*database.ref('/').update({
            foodStock : foodStock
        })*/
    }

    deductFood(){
        this.foodStock -= 1;
        foodObj.updateFoodStock();
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
}