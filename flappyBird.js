// 캔버스(Canvas) 사용을 위한 요소
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


// load image
// 사용될 이미지를 모두 불러오기( 객체를 만들고 해당 이미지를 삽입 )
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png"; //뒷배경
fg.src = "img/fg.png"; //바닥 
pipeUp.src = "img/pipeUp.png"; //위쪽 파이프
pipeDown.src = "img/pipeDown.png"; //아래쪽 파이프


// load audio files (음향 설정)
// 이미지처럼 사용될 오디오를 불러옴.
var fly = new Audio();
var scor = new Audio();
var bg_sound = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


// variables (변수설정)
// 게임 진행에 필요한 객체들의 변수를 설정한다. ( 점수, 중력, ... )
var gap = 100; // 파이프의 떨어진 공간 크기 
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;


// 게임 구현 start
// key Event
document.addEventListener("keydown",moveUp);
// moveUp을 통해 캐릭터가 장애물을 피해 올라갈 수 있도록 함. 
function moveUp(){
    bY -= 30;   // -(위쪽), +(아래쪽)으로 가도록 함. 
    fly.play(); // 사운드 플레이
}


// pipe coordinates (파이프 좌표)
// 파이프(장애물)의 위치를 나타냄.
var pipe = [];

pipe[0] = {
        //ctx(현재상태)가 아닌 cvs를 불러온다. 
    x : cvs.width,
    y : 0 // 파이프 이미지 크기를 맞춰놓았으므로 변경할 필요 없음!
};


// Draw Image 
// ( 렌더링 컨텍스트 / 구조 설정 진행 후, 이미지를 뿌려줌. )
// tip. ctx.drawlmage(img), x, y, width, height); 의 형태로 사용 
function draw(){
    // 배경 이미지 그려주기 
    ctx.drawImage(bg,0,0);

    
    for(var i = 0; i < pipe.length; i++){
        // 값 변경이 일어나지 않게 하기 위해 const(constant) 사용
        const cp = pipeUp.height+gap;
        ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);  // 0 = pipe[i].y
        ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y+cp); //y를 파이프 자체 높이 + 빈 공간으로 계산해 배치시킴.
             
        pipe[i].x--; //x값을 반환한 뒤 x값 감소, 파이프가 움직이는 듯이 보이게 함.
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUp.height)-pipeUp.height //랜덤하게 길이를 변경해 파이프 길이를 다르게 함!
            }); 
        }


        // detect collision (충돌 감지)
        // 논리연산자를 이용해 상황 판단 (&&(true), ||(true가 하나여도 만족))
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUp.width && (bY <= pipe[i].y + pipeUp.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
             location.reload(); // 페이지를 재시작(reload)
        }
        

        // 점수 
        if(pipe[i].x == 5){
            score++;
            scor.play(); //사운드 플레이
        }
        
        
    }


    // 바닥 그리기
    ctx.drawImage(fg,0,cvs.height - fg.height);
    

    // 새 그리기
    ctx.drawImage(bird,bX,bY);
    // 새에게 중력을 적용 (점점 떨어지게끔 함.)
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    //화면에 애니메이션을 업데이트 (업데이트 준비가 될때마다 메소드를 호출)
    requestAnimationFrame(draw);
    
}

draw();

























