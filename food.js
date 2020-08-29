class Food {
    constructor() {
        this.image = loadImage("images/Milk.png");
        var foodStock;
        var lastFed;
    }

    getFoodStock() {
        
    }

    updateFoodStock() {

    }

    deductFood() {

    }

    display() {
        var x = 80, y = 100;

        imageMode(CENTER);
        this.image(this.image, 720, 720, 70, 70);

        if(foodStock != 0) {
            for(var i = 0; i < foodStock; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}