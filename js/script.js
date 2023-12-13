const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Tem que arrumar o audio
//const audio = new audio("../assets/audio.mp3");

const size = 30;

const snake = [
    {x: 270, y: 240},
];

const randomNumber = (max, min)=>{
    return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = (max, min)=>{
    const number = randomNumber(0, canvas.width - size);
    return  Math.round(number / 30) * 30;
}

const randomColor = ()=>{
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}
const food = {
    x: randomPosition(),
    y:randomPosition(),
    color: randomColor()
};
let direction, loopId;

const drowFood = ()=>{
    const {x, y, color} = food;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
}

const drawSnake = ()=>{
    ctx.fillStyle = "white"
    
    snake.forEach((position, index)=>{
        if(index == snake.length - 1){
            ctx.fillStyle = "gray"
        }
        ctx.fillRect(position.x, position.y, size, size);
    });
};

const moveSnake = ()=>{
    if(!direction) return
    const head = snake[snake.length - 1];

    if (direction == "right"){
        snake.push({x: head.x + size, y: head.y});
    };
    if (direction == "left"){
        snake.push({x: head.x - size, y: head.y});
    };
    if (direction == "down"){
        snake.push({x: head.x , y: head.y + size});
    };
    if (direction == "up"){
        snake.push({x: head.x , y: head.y - size});
    };
    snake.shift();
}

const drawGrid = ()=>{
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#101920";

    for(let i = 30; i < canvas.width; i += 30){
        
        ctx.beginPath()
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        
        ctx.beginPath()
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
}

const  chackEat = ()=>{
    const head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y){
        snake.push(head);
        //audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position)=> position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }

}

const gameLoop = ()=>{
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);
    drawGrid();
    drowFood();
    moveSnake();
    drawSnake();
    chackEat();

   loopId = setTimeout(()=>{
        gameLoop();
    }, 200);
};

gameLoop();

document.addEventListener("keydown", ({ key })=>{
    if (key == "ArrowRight" && direction != "left"){
        direction = "right";
    }
    if (key == "ArrowLeft" && direction != "right"){
        direction = "left";
    }
    if (key == "ArrowDown" && direction != "up"){
        direction = "down";
    }
    if (key == "ArrowUp" && direction != "down"){
        direction = "up";
    }
});

