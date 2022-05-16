var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

// 6. 부술 벽 객체 생성


// 변수 설정
var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// 하단에 배치될 박스(패들) 크기 지정
var paddleHeight = 10;
var paddleWidth = 75;

// 공의 위치 지정과 비슷하게 중앙에 위치하도록 작성
var paddleX = (canvas.width-paddleWidth)/2;

// 패들 움직임을 설정하기 위한 변수 
var rightPressed = false;
var leftPressed = false;

// 부술 벽 객체의 설정
var brickRowCount = 5; // 행 →
var brickColumnCount = 3; // 열 ↓

var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// 객체의 개수 넣기 ( 2차원 배열)
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = []; //열 
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 }; //행
    }
}


// 키보드 이벤트를 사용하기 위한 이벤트 리스너 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 키가 눌렸을때, 
function keyDownHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = true; //오른쪽
    }
    else if (e.code == "ArrowLeft") {
        leftPressed = true; //왼쪽
    }
}

// 키가 올라왔을때 (떼었을때), 
function keyUpHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = false; //오른쪽
    }
    else if (e.code == "ArrowLeft") {
        leftPressed = false; //왼쪽
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 패딩 그리기 함수
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 부술 벽 객체 함수
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}



// 원의 이동에 대한 조건이 포함된 함수 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 벽 객체 뿌리기
    drawBricks();
    drawBall(); 
    drawPaddle();

    // 공이 x좌표(width)의 범위를 넘어갈때, 
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx; // 다른 방향으로 틀어준다. 
    }
    if (y + dy < ballRadius) {
        dy = -dy; // 다른 방향으로 틀어준다. 
    }
    // 위쪽 벽에는 맞아도 게임 오버 되지 않도록 설정
    else if (y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else { // 아랫벽에 닿을 경우, 게임 오버!
            // + var game을 선언하지 않음!
            alert("Game Over");
            document.location.reload(); 
        }
    }

    // 패들이 x너비를 넘기지 않고 오른쪽으로 움직이게 함.
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    // 패들이 왼쪽(0이 되는 숫자)으로 움직일 수 있는 조건이면, 왼쪽으로 움직이게 함.
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // 공의 위치 변경 
    x += dx;
    y += dy;
}


// alert 사용을 위해 game 변수 설정
 setInterval(draw, 10);

