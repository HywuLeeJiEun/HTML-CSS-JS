// html의 객체 불러오기 
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

// 2. 움직이는 공(ball) 구현하기

// 변수설정
var x = canvas.width/2; //x기준 가운데 좌표
var y = canvas.height-30; //y기준 하단에 배치 
var dx = 2;
var dy = -2;


//객체가 될 도형(원) 그리기
function drawBall() {
    ctx.beginPath();
    //원(x, y, 반지름, 시작각도, 끝각도, 방향설정)
    ctx.arc(x, y, 10, 0, Math.PI*2); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 원이 이동하듯이 그려주기
function draw() {
    //clearRect(x, y, width, height), 캔버스 화면 지우기 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); //함수 호출
    x += dx;
    y += dy;
}


// 주기적으로 작업을 실행하는 함수 (setInterval, setTimeout)
// setInterval(함수or코드, [delay], ...)     # delay -> 2000 = 2초
setInterval(draw, 10);

// tip. 작업을 멈추고 싶을땐 clearInterval(), clearTimeout()
// 이 경우, 실행중인 작업이 중단되는 것이 아닌 다음 스케쥴이 중지된다.