function initState() {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = 1000
    canvas.height = 1000
    pen = canvas.getContext("2d");
    cs = 66;
    speed = 10;
    score = 5;
    food_img = new Image();
    food_img.src = "./Assets/apple.png"
    trophy = new Image();
    trophy.src = "Assets/trophy.png";
    food = getRandomFood(),
    // pen.fillStyle = "black";

    snake = {
        initial_len: 5,
        cell: [],
        direction : "right",
        createSnake: function () {
            for (let i = this.initial_len; i > 0; i--) {
                this.cell.push({
                    x: i,
                    y: 0
                })
            }
        },

        drawSnake: function () {
            for (let i = 0; i < this.cell.length; i++) {
                // console.log(this.cell[i]);
                pen.fillStyle = "black"
                pen.fillRect(this.cell[i].x * cs, this.cell[i].y * cs, cs - 2, cs - 2)
            }
        },

        updateSnake: function () {
            var headx = this.cell[0].x;
            var heady = this.cell[0].y;

            if(headx == food.x && heady == food.y)
            {
                food = getRandomFood();
                score++;
            }
            else{
                this.cell.pop();
            }

             var nextx,nexty;
            console.log(this.direction)

            if(this.direction == "right")
            {
                nextx = headx + 1;
                nexty = heady;
            }
            else if(this.direction == "left")
            {
                nextx = headx -1;
                nexty = heady;

            }
            else if(this.direction == "up")
            {
                nextx = headx;
                nexty = heady -1;

            }
            else if(this.direction == "down")
            {
                nextx = headx;
                nexty = heady +1;

            }

            this.cell.unshift({
                x: nextx,
                y: nexty
            });
        }
    }
    snake.createSnake();

    function keyPressed(e){
        console.log("key is pressed" , e.key);

        if(e.key == "ArrowLeft")
        {
            if(snake.direction != "right"){
                snake.direction= "left";
            }
        }
        else if(e.key == "ArrowRight")
        {
            if(snake.direction != "left"){
                snake.direction= "right";
            }
        }
        else if(e.key == "ArrowUp")
        {
            if(snake.direction != "down"){
                snake.direction= "up";
            }
        }
        else if(e.key == "ArrowDown")
        {
            if(snake.direction != "up"){
                snake.direction= "down";
            }
        }
    }
    document.addEventListener("keydown" , keyPressed);
}

function getRandomFood(){

    var foodX =Math.round(Math.random() * (canvas.width -cs) /cs);
    var foodY =Math.round(Math.random() * (canvas.height -cs) /cs);

    let food ={
        x : foodX,
        y : foodY,
        color : "red"
    }
    return food;
}


function draw() {
    pen.clearRect(0, 0, canvas.width, canvas.height)
    snake.drawSnake();
    // pen.fillStyle = food.color;
    
    pen.drawImage(trophy ,0, 40);
    pen.font = "30px Roboto";
    pen.fillText(score,40,80)
    // pen.drawImage(food_img , food.x *cs , food.y *cs);
    pen.fillStyle = food.color
    pen.fillRect(food.x * cs , food.y * cs , cs,cs);
}

function update() {
    if(snake.cell[0].x * cs + cs + 3 >= canvas.width || snake.cell[0].y * cs + cs >= canvas.height || snake.cell[0].x < 0 || snake.cell[0].y < 0)
    {
        alert("game over");
        initState()
    }
    snake.updateSnake();
}

function gameloop() {
    draw();
    update();
}


initState()
// gameloop();

f = setInterval(gameloop, 100);