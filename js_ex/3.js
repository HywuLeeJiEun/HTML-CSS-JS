// html의 객체 불러오기 
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

// 3. 튕기는 공(ball) 구현하기

// 변수 설정

// 공의 반지름을 따로 변수로 설정
var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 원의 이동에 대한 조건이 포함된 함수 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); 

    // 공이 x좌표(width)의 범위를 넘어갈때, 
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx; // 다른 방향으로 틀어준다. 
    }
    // 공이 y좌표(heught)의 범위를 넘어갈때,
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy; // 다른 방향으로 틀어준다. 
    }

    // 공의 위치 변경 
    x += dx;
    y += dy;
}

setInterval(draw, 10);