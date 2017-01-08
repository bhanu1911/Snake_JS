window.onload = function()
{

    var canvas1 = document.createElement('canvas');
    var context = canvas1.getContext('2d');
    score_s = 0;
    level_s = 1;
    dir = 0;
    snake = new Array(3);
    runStatus = true;
    speed = 100;

    var board = new Array(25);
    for(var i = 0; i < board.length; i++)
    {
    	board[i] = new Array(25);
    }

    canvas1.width = 500;
    canvas1.length = 500;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas1);

    board = createSnake(board);
    board = createFood(board);

    drawGameData();

    window.addEventListener('keydown',function(e) {
    	if(e.keyCode === 38 && direction !== 3) {
    		direction = 2; //Up
    	}
    	else if(e.keyCode === 40 && direction !== 2) {
    		direction = 3; //Down
    	}
    	else if(e.keyCode === 37 && direction !== 0) {
    		direction = 1; //Left
    	}
    	else if(e.keyCode === 39 && direction !== 1) {
    		direction = 0; //Right
    	}});
    
    //1 is FOOD
    //2 is da snek 
    //rest is darker than niggers


    function drawGameData() 
    {

    	context.clearRect(0,0,canvas1.width,canvas1.height);

    	for(var i = snake.length - 1; i >= 0; i--) {

    		if(i === 0) {
    			switch(direction) {
    				case 0:  //RIGHT
    					snake[0] = {x: snake[0].x + 1, y: snake[0].y};
    					break;
    				case 1: //LEFT
    					snake[0] = {x: snake[0].x - 1, y: snake[0].y};
    					break;
    				case 2:  //UP
    					snake[0] = {x: snake[0].x, y: snake[0].y - 1};
    					break;
    				case 3: //DOWN
    					snake[0] = {x: snake[0].x, y: snake[0].y + 1};
    					break;
    				}
    			
    			if (snake[0].x < 0 || 
                    snake[0].x >= 25 ||
                    snake[0].y < 0 ||
                    snake[0].y >= 25) {
                    showGameOver();
                    return;
                }
                //Food related operations on the board
                if(board[snake[0].x][snake[0].y] === 1) {
                	score += 10;                           //Adds 10 to the score
                	board = createFood(board);             //creates the food on the board

                	snake.push({x: snake[snake.length - 1], y: snake[snake.length - 1]});
    				board[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;
                    }

                if(score % 100 === 0) {
                	level += 1;
                }    
        		else if (board[snake[0].x][snake[0].y] === 2) {
 					showGameOver();
 					return;
        		}

        		board[snake[0].x][snake[0].y] = 2;
        		}
     		else {
                // Remember that when they move, the body pieces move to the place
                // where the previous piece used to be. If it's the last piece, it
                // also needs to clear the last position from the matrix
                if (i === (snake.length - 1)) {
                    board[snake[i].x][snake[i].y] = null;
                }
                snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y };
                board[snake[i].x][snake[i].y] = 2;
            }
        }
		
		//Draws the main body of the game
		drawMain();

		//We start cycling through the matrix and build the matrix, 
		//the food and the snake using the given data at the time	
		for( var i = 0; i < board.length; i++) {
			for(var j = 0; j < board[0].length; j++) {
				//We check whether we have a food particle at this location	
				if(board[x][y] === 1)	{
					context.fillStyle = 'blue';
					context.fillRect(x * 10, y * 10 + 20, 10, 10);
				}
				//If it isn't a food particle, it could be a part of the snek's body
				else if(board[x][y] === 2) {
					context.fillStyle = 'green';
					context.fillRect(x * 10, y * 10 + 20, 10, 10);
				}
			}
		}

		//Here comes the "fun" part. We start going through the 
		//levels and decreasing the time at each level,
		//Thus making it harder for the player to keep up and 
		//making it unplayable at a certain point

		if(active) {
			setTimeout(drawGameData, speed - (level * 50));
		}
    }
    
    function drawMain() {
    	context.lineWidth = 3; //Our border has a 3 pixel width
    	context.strokeStyle = 'black';

        // The border is drawn on the outside of the rectangle, so we'll
        // need to move it a bit to the right and up. Also, we'll need
        // to leave a 20 pixels space on the top to draw the interface.
    	context.strokeRect(2, 20, canvas1.width - 1, canvas1.length - 24);
    	context.fillStyle = 'black';
    	context.font = '14px arial';
    	context.fillText('Score: ' + score + 'Level' + level);
    }

	//To generate the food, we will pick any location on random on the board and switch its value 
    function createFood(board) {
    	var RndX = Math.round(Math.random() * 24);
    	var RndY = Math.round(Math.random() * 24);

    	//Now we have to check if we're going out of bounds
    	//In which case, we'll keep on generating new numbers 
    	//Until we come back in
    	while(board[RndX][RndY] === 2) {
    		RndX = Math.round(Math.random() * 24);
    		RndY = Math.round(Math.random() * 24);
    	}

  		board[RndX][RndY] = 1;
  		return board;
  	}


    function createSnake(board) {
		var RndX = Math.round(Math.random() * 24);
    	var RndY = Math.round(Math.random() * 24);

    	while (RndX - snake.length < 0) {
            RndX = Math.round(Math.random() * 24);
    	}

    	for(var x = 0; x < snake.length; x++) {
    		snake[i] = { x: RndX - 1, y : RndY};
    		board[RndX][RndY] = 2;
    	}
    }

    function showGameOver(board) {
    	active = false;
    	context.clearRect(0,0,canvas1.width,canvas1.height);
    	context.fillStyle = 'black';
    	context.font = '18px sans-serif';
    	context.fillText('Game Over Bitch! Cyka Blyat!',((canvas1.width / 2) - (context.measureText('Game Over Bitch! Cyka Blyat!').width / 2)), 50);
    	context.font = '14 px sans-serif';
    	context.fillText('Your score was: ' + score, ((canvas.width / 2) - (context.measureText('Your Score Was: ' + score).width / 2)), 70);
    }
};