let canvas = document.querySelector('canvas');
let brush = canvas.getContext('2d');
let speed = 300;

// start 
let start = document.querySelector('#start');
startTheGame = false;

let GAMEOVER = false; // wall se touch hone pr true ho jaye
let foodEaten = false;
// start.addEventListener('click',()=>{startTheGame = true ; GAMEOVER = false});
start.addEventListener('click', () => {
    startTheGame = true;
    GAMEOVER = false;
    snakeCells = [[0, 0]];
    score = 0;
    speed = 300;
    clearInterval(Intervalid);
    Intervalid = setInterval(() => {
        if (startTheGame) {
            update();
            draw();
        }
    }, 140);
});


// stop
let stop = document.querySelector('#gameover');





//main function 
let Intervalid = setInterval(() => {
        if(startTheGame){
        update()
        draw()}
    
    }, 140);


    





// stop the game by button 
// stop.addEventListener('click' , ()=>{
//     console.log('gameover');
//     clearInterval(Intervalid);
//     GAMEOVER = true;
//     gameover();
//     // startTheGame = false;
//     console.log(start.innerHTML);
//     start.innerHTML = 'restart';
//     GAMEOVER = false;
//     startTheGame = true;
    
// })
stop.addEventListener('click', () => {
    // console.log('gameover');
    clearInterval(Intervalid);
    GAMEOVER = true;
    gameover();
    start.innerHTML = 'Restart';
    startTheGame = false;
});



// each cell 
let cellSize = 50; // height or width for each cell

let snakeCells = [[0, 0]]; // array 
// console.log(snakeCells);



let score = 0; 


brush.fillStyle = "blue";





let khana = generateFood();






//keydown down up left right krne pr direction change ; 
let direction = 'right';//
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        direction = 'up';

    } else if (event.key === 'ArrowDown') {
        direction = 'down'

    } else if (event.key === 'ArrowLeft') {
        direction = 'left'

    } else if (event.key === 'Arrowright') {
        direction = 'right';
    }
    else {
        direction = 'right';
    }
    // console.log(event.key);

})



// function to draw
function draw() {
   
    if (GAMEOVER === true) {
        clearInterval(Intervalid);// clearinterval accept a id jisko wo clear kr dega
        // brush.clearRect(0, 0, 1000, 600);
        brush.fillStyle = "red";
       
        gameover();
        // brush
       



    } else {


        brush.clearRect(0, 0, 1000, 600);
        brush.fillStyle = "green";

        for (let cell of snakeCells) {
            brush.fillRect(cell[0], cell[1], cellSize, cellSize);
            brush.strokeStyle = "orange";
            brush.strokeRect(cell[0], cell[1], cellSize, cellSize);

        }
    }

    //draw food
    //  setTimeout(()=>{
    if (foodEaten) {
        foodEaten = false;
        khana = generateFood();
        
        score = score + 1;
        if (speed > 50){
            speed = speed - 20;
            console.log(`food ${speed}`);
        
        }
    
        // scoreboard.innerText = `Score = ${score}`;
    } else {
        brush.fillStyle = 'red';
        brush.strokeStyle = "white"

        // brush.strokeRect(khana[0], khana[1], cellSize, cellSize)
        // brush.fillRect(khana[0], khana[1], cellSize, cellSize);
        let frogImg = new Image();
        // brush.fillRect = 'black';
        frogImg.src = './frog.png';
        // for(let item of snakeCells){
        //     if (item[0] != khana[0]&& item[1] != khana[1]) {
                
        //     }
        //     else {

        //     }

        // }
        
        brush.drawImage(frogImg, khana[0], khana[1], cellSize, cellSize);

    }
    brush.font = "24px monospace"

    brush.fillText(`SCORE = ${score}`, 20, 25);

}



// function to update
function update() {
    let headx = snakeCells[snakeCells.length - 1][0];
    let heady = snakeCells[snakeCells.length - 1][1];
    if (direction == 'up') {
        newHeadx = headx;
        newHeady = heady - cellSize;
        if (newHeady < 0) GAMEOVER = true;
    }
    else if (direction == 'down') {
        newHeadx = headx;
        newHeady = heady + cellSize;
        if (newHeady == canvas.height) GAMEOVER = true;
    }
    else if (direction == 'right') {

        newHeadx = headx + cellSize;

        newHeady = heady;
        if (newHeadx == canvas.width) GAMEOVER = true;
    }
    else if (direction == 'left') {
        newHeadx = headx - cellSize;
        newHeady = heady;
        if (newHeadx < 0) GAMEOVER = true;


    }
    console.log(snakeCells);
    khelkhatam(newHeadx, newHeady);

    snakeCells.push([newHeadx, newHeady]);
    if (newHeadx == khana[0] && newHeady == khana[1]) {
        foodEaten = true;


    } else {
        snakeCells.shift();

    }


}

//game over funtion
function gameover(){
    startTheGame = true;
    start.innerHTML = "Restart";
    GAMEOVER = false;
    brush.font = "50px monospace";
    brush.fillText("GAME OVER !!!", canvas.width / 2 - 3 * cellSize, canvas.height / 2);
    brush.font = "30px monospace";
    brush.fillText("Your Score is : " + score, canvas.width / 2 - 3 * cellSize, canvas.height / 2 + 50);

}

// speed increase by 10 ms every 10 sec 
setInterval(() => {
    if (speed > 10) {
        speed = speed - 10;
        console.log(speed);
    }
    

}, 10000);


//function to generate food

function generateFood() {
    let foodPosition;
    let isOnSnake;

    do {
        isOnSnake = false;
        foodPosition = [
            Math.round((Math.random() * (canvas.width - cellSize)) / cellSize) * cellSize,
            Math.round((Math.random() * (canvas.height - cellSize)) / cellSize) * cellSize
        ];

        // Check if the food position is on the snake
        for (let cell of snakeCells) {
            if (cell[0] === foodPosition[0] && cell[1] === foodPosition[1]) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);

    return foodPosition;
}


// if snake bite itself
function khelkhatam(newHeadx, newHeady) {
    for (let item of snakeCells) {
        if (item[0] == newHeadx && item[1] == newHeady) {
            GAMEOVER = true;
        }
    }
}



// what to improve 
// speed is not decreasing
// food is generating on snake due to random 
