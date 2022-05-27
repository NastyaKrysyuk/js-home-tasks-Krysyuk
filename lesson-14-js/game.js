'use strict'
const widthField = 600; //ширина поля
const heightField = 400; //длина поля
const widthRacket = 20; //ширина ракетки
const heightRacket = 120; //длина ракетки
const radiusBall = 15; //радиус мяча
let scoreR = 0;
let scoreL = 0
let wrapper = document.getElementById('wrapper');
var isGameStarted = null;

//UI
wrapper.appendChild(createField(widthField, heightField, 'field'));
wrapper.appendChild(createButton('btn_start'));
wrapper.appendChild(createScore('score'));

function createField(width, height, id) {
  let field = document.createElement('div');
  field.id = id;
  field.style.width = width + 'px';
  field.style.height = height + 'px';
  field.appendChild(createRacket(widthRacket, heightRacket, 'racket-1'));
  field.appendChild(createRacket(widthRacket, heightRacket, 'racket-2'));
  field.appendChild(createBall(radiusBall, radiusBall, 'ball'));
  return field;
}

function createRacket(width, height, id) {
  let racket = document.createElement('div');
  racket.id = id;
  racket.style.width = width + 'px';
  racket.style.height = height + 'px';
  return racket;
}


function createBall(width, height, id) {
  let ball = document.createElement('div');
  ball.id = id;
  ball.style.width = width * 2 + 'px';
  ball.style.height = height * 2 + 'px';
  return ball;
}

function createButton(id) {
  let btnStart = document.createElement('div');
  btnStart.id = id;
  btnStart.textContent = 'Start!';
  btnStart.onclick = startGame;
  return btnStart;
}

function createScore(id) {
  let scoreArea = document.createElement('div');
  scoreArea.id = id;
  showScore(scoreArea);
  return scoreArea;
}

function showScore(elem) {
  elem.innerHTML = scoreL + ':' + scoreR;
}

//UX
var Racket = {
  speedL: 0,
  speedR: 0,
  posLY: (heightField - heightRacket) / 2,
  posRY: (heightField - heightRacket) / 2,
  posLX: widthRacket, // 0 + widthRocket    позиция правой стороны левой ракетки
  posRX: widthField - widthRacket, // widthField - widthRocket    позиция левой стороны правой ракетки

  //обновляем положение ракеток
  update() {
    document.getElementById('racket-1').style.top = this.posLY + 'px';
    document.getElementById('racket-2').style.top = this.posRY + 'px';

    this.posLY -= Racket.speedL;
    //остановить левую ракетку сверху/снизу
    if (this.posLY < field.getBoundingClientRect().top) {
      this.posLY = field.getBoundingClientRect().top;
    }
    if (this.posLY + heightRacket > field.getBoundingClientRect().top + field.getBoundingClientRect().height) {
      this.posLY = field.getBoundingClientRect().top + field.getBoundingClientRect().height - heightRacket;
    }

    this.posRY += Racket.speedR;
    //остановить правую ракетку сверху/снизу
    if (this.posRY < field.getBoundingClientRect().top) {
      this.posRY = field.getBoundingClientRect().top;
    }
    if (this.posRY + heightRacket > field.getBoundingClientRect().top + field.getBoundingClientRect().height) {
      this.posRY = field.getBoundingClientRect().top + field.getBoundingClientRect().height - heightRacket;
    }
  }
};

var Ball = {
  posY: heightField / 2, // центр поля
  posX: widthField / 2, // центр поля
  speedX: 0,
  speedY: 0,
  update() {
    document.getElementById('ball').style.top = this.posY + 'px';
    document.getElementById('ball').style.left = this.posX + 'px';
    this.posY += this.speedY;
    this.posX += this.speedX;

    // при столкновении верх || низ
    if (this.posY - radiusBall < 0 || this.posY > field.getBoundingClientRect().height - radiusBall) {
      this.speedY = -this.speedY;
    }

    //лево отбить 
    if (collides(this.posX, Racket.posLX, this.posY, Racket.posLY)) {
      this.speedX = -this.speedX;
    }

    //право отбить
    if (collides(this.posX, Racket.posRX, this.posY, Racket.posRY)) {
      this.speedX = -this.speedX;
    }

    //право гол 
    if ((this.posY + radiusBall * 2 < Racket.posLY || this.posY > (Racket.posLY + heightRacket)) && this.posX <= wrapper.getBoundingClientRect().left + radiusBall / 2) {
      goal('right');
    }

    //лево гол 
    if ((this.posY + radiusBall * 2 < Racket.posRY || this.posY > (Racket.posLY + heightRacket)) && this.posX + radiusBall * 2 >= wrapper.getBoundingClientRect().left + widthField) {
      goal('left');
    }
  }
}

//гол
function goal(side) {
  if (!isGameStarted) {
    return;
  }
  if (side === 'left') {
    scoreL++;
  }
  if (side === 'right') {
    scoreR++;
  }
  //останавливаем мяч
  Ball.speedX = 0
  Ball.speedY = 0
  //обновляем счёт
  var scoreArea = document.getElementById('score');
  showScore(scoreArea);
  //остановили игру
  isGameStarted = false;
}

//столкновение двух объектов
function collides(ballX, racketX, ballY, racketY) {
  return ballX < racketX + widthRacket
    && ballX + radiusBall * 2 > racketX
    && ballY < racketY + heightRacket
    && ballY + radiusBall * 2 > racketY
}

var racketIntervals = [];

function intervalUpdateRacketPos() {
  const newInt = setInterval(() => {
    Racket.update();
  }, 10)
  racketIntervals.push(newInt)
}

function clearAllIntervals() {
  racketIntervals.forEach((int) => {
    clearInterval(int)
  })
}

window.addEventListener("keydown", function (EO) {
  EO = EO || window.event;
  EO.preventDefault();

  if (EO.key === 'Shift') {
    Racket.speedL = 5;
  }

  if (EO.key === 'Control') {
    Racket.speedL = -5;
  }

  if (EO.key === 'ArrowUp') {
    Racket.speedR = -5;
  }

  if (EO.key === 'ArrowDown') {
    Racket.speedR = 5;
  }
  intervalUpdateRacketPos();
});

window.addEventListener("keyup", function (EO) {
  clearAllIntervals();
  EO = EO || window.event;
  EO.preventDefault();

  if (EO.key === 'Shift') {
    Racket.speedL = 0;
  }

  if (EO.key === 'Control') {
    Racket.speedL = 0;
  }

  if (EO.key === 'ArrowUp') {
    Racket.speedR = 0;
  }

  if (EO.key === 'ArrowDown') {
    Racket.speedR = 0;
  }
});

//запускаем мяч 
function startGame() {
  if (isGameStarted) {
    return;
  }
  isGameStarted = true;
  Ball.posX = widthField / 2;
  Ball.posY = heightField / 2;
  Ball.speedX =getRandomSpeed(-4, 4);
  Ball.speedY = getRandomSpeed(-4, 4);
  game();
}

function getRandomSpeed(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var speedBall=Math.floor(Math.random() * (max - min + 1)) + min;
  if (speedBall===0){speedBall++}
  return speedBall; //Максимум и минимум включаются
}

//запускаем игру 
function game() {
  Ball.update();
  requestAnimationFrame(game);
}




