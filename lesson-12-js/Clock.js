'use strict'

var radiusClock = 200; //радиус циферблата
var radiusNamber = 160; //радиус для цифр
var deg = 6; //поворот 6 градусов за секунду
var wrapper = document.getElementById('wrapper');
var clock = document.createElement('div');//div для циферблата
var elemForArrowHours = document.createElement("div") // div для стрелки часов
var elemForArrowMinutes = document.createElement("div") // div для стрелки минут
var elemForArrowSeconds = document.createElement("div") // div для стрелки секунд
var DigitalWatch = document.createElement("div");//div для цифровых часов

function createClock(parent,classEl,radius){
  clock.classList.add(classEl);
  clock.style.width = 2 * radius + 'px';
  clock.style.height = 2 * radius + 'px';
  parent.appendChild(clock);
   return clock;
}

createClock(wrapper,'clock',radiusClock);

function createNamber(parent,centerX,centerY,classEl,radius){
  for (var i = 1; i <= 12; i++) // отображаемый час
  {
    var Angle = i / 12 * Math.PI * 2; // отображаемый угол в радианах
    var X = centerX + Math.sin(Angle) * radius; // проверяем - для угла=0 sin=0
    var Y = centerY - Math.cos(Angle) * radius; // проверяем - для угла=0 cos=1
  
    var hour = document.createElement('div');
    hour.classList.add(classEl);
    hour.style.left = X - radiusNamber / 2 + 'px';
    hour.style.top = Y - radiusNamber / 2 + 'px';
    hour.innerHTML = i;
  
    parent.appendChild(hour);
  }
}

var ClockCenterX = clock.offsetLeft + clock.offsetWidth / 2;
var ClockCenterY = clock.offsetTop + clock.offsetHeight / 2;


function createArrow(elem, classelem) {
  elem.className = classelem;
  clock.appendChild(elem);
  elem.style.top = ClockCenterX - elem.offsetHeight + "px";
  elem.style.left = ClockCenterX - elem.offsetWidth + "px";
  var origin = elem.offsetHeight - 10;
  elem.style.transformOrigin = "center " + origin + "px";
  return elem;
}

createNamber(clock,ClockCenterX,ClockCenterY,'namber',radiusNamber);

DigitalWatch = clock.appendChild(DigitalWatch);
DigitalWatch.classList.add("digitalWatch");
DigitalWatch.style.left = ClockCenterX - DigitalWatch.offsetWidth + "px";
DigitalWatch.style.top = ClockCenterY - radiusNamber + "px";

createArrow(elemForArrowHours, "elemForArrowHours");
createArrow(elemForArrowMinutes, "elemForArrowMinutes");
createArrow(elemForArrowSeconds, "elemForArrowSeconds");

function arrow() {
  var date = new Date();
  DigitalWatch.innerHTML=date.toLocaleTimeString();
  var hh = date.getHours() * 30;
  var mm = date.getMinutes() * deg;
  var ss = date.getSeconds() * deg;

  elemForArrowHours.style.transform = "rotateZ(" + (hh) + (mm / 12) + "deg)";
  elemForArrowMinutes.style.transform = "rotateZ(" + mm + "deg)";
  elemForArrowSeconds.style.transform = "rotateZ(" + ss + "deg)";
}

window.onload = arrow();
window.setInterval(arrow, 1000);