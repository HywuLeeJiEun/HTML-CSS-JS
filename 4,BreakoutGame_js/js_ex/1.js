// html의 객체 불러오기 
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

// 예제1) 캔버스에 도형 다양한 도형 그리기 

// 경로 그리기(beginPath(), closePath())
// 1. red 상자 그리기
ctx.beginPath();
ctx.rect(20, 40, 50, 50); //직사각형(x, y, width, height)
ctx.fillStyle = "#FF0000";
ctx.fill(); //내부 채우기
ctx.closePath();

// 2. green 원 그리기
ctx.beginPath();
//원(x, y, 반지름, 시작각도, 끝각도, 방향설정)
ctx.arc(240, 160, 20, 0, Math.PI*2, false); 
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//3. 내부가 빈 상자 그리기
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; // 도형의 윤곽선 색 설정
ctx.stroke();
ctx.closePath();


// [참고 사이트 : https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs]