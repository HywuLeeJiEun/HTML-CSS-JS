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

var score = 0; // 점수를 나타낼 변수 
var lives = 3; // 목숨을 나타낼 변수

// 객체의 개수 넣기 ( 2차원 배열)
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = []; //열 
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status : 1 }; //행 , status 사용을 위해 지정
    }
}


// 키보드 이벤트를 사용하기 위한 이벤트 리스너 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 마우스 이벤트를 사용하기 위한 이벤트 리스너
document.addEventListener("mousemove", mouseMoveHandler, false);

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

// 마우스 이벤트에 대한 함수
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft; //요소의 테두리 상자의 픽셀수를 반환. 
    // 즉, 마우스 기준점이 캔버스 내부에 있다면,
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}




// 충돌 감지 함수 만들기
function collisionDetection() {
    // 행, 열 만큼 for문을 돌림
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            // 충돌됐을때 1, 
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;

                    // 점수 및 clear에 관한 내용
                    score ++;
                    // 모든 벽이 사라지면. 즉, 점수가 최대가 되면 
                    if(score == brickRowCount * brickColumnCount) {
                        alert("Congratulation!");
                        // 화면 reload
                        document.location.reload();

                    }
                }
            }
        }
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

// 부술 벽 객체 함수 (brick에 대한 if문 추가)
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
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
}

// 점수를 그려주는 함수
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// 목숨에 대한 함수
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else { //목숨이 0이 되면 게임이 종료되도록 함!
            lives--;
            if(!lives) {
                alert("Game Over");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

