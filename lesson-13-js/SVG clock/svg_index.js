'use strict';
const baseRadius = 200; //радиус циферблата
const numbersBaseRadius = baseRadius / 1.25; //радиус оси цифр циферблата
const circleRadius = 30; // радиус кружков с цифрами
const dotSize = 14; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');
const deg = 6;

(function createSVG() {
  wrapper.appendChild(createWatch());
  wrapper.appendChild(createClockFace())
  wrapper.appendChild(createArrow(80, 8, 'rgb(0, 0, 0)', 'hours'));
  wrapper.appendChild(createArrow(100, 5, 'rgb(53, 53, 53)', 'minutes'));
  wrapper.appendChild(createArrow(120, 3, 'rgb(203, 45, 62)', 'seconds'));
  wrapper.appendChild(createDecorativeDot(dotSize))
  wrapper.appendChild(createDigitalWatch());
})();

setInterval(tickTimer, 1000);

function createWatch() {
  let base = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  base.setAttribute("stroke", "");
  base.setAttribute("fill", "rgb(241, 241, 241)");
  base.setAttribute("r", baseRadius);
  base.setAttribute("cx", 250);
  base.setAttribute("cy", 250);
  return base;
}

function createDigitalWatch() {
  let DigitalWatch = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  DigitalWatch.setAttribute('x', 220);
  DigitalWatch.setAttribute('y', 150);
  DigitalWatch.setAttribute('fill', 'rgb(53, 53, 53)');
  DigitalWatch.setAttribute('font-size', 20);
  DigitalWatch.setAttribute('id', 'digital-watch');
  return DigitalWatch;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let x = ((baseRadius - circleRadius) * 1.47) + Math.round(Math.sin(angle) * numbersBaseRadius);
    let y = ((baseRadius - circleRadius) * 1.47) - Math.round(Math.cos(angle) * numbersBaseRadius);
    let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', 'rgb(241, 241, 241)');
    text.setAttribute('font-size', 20);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = number;
    clockFace.appendChild(createHourCircle(x, y));
    clockFace.appendChild(text);
  }
  return clockFace;
}

function createHourCircle(circleX, circleY) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  circle.setAttribute("stroke", "");
  circle.setAttribute("fill", "rgb(141, 138, 138)");
  circle.setAttribute("r", 30);
  circle.setAttribute("cx", circleX);
  circle.setAttribute("cy", circleY);
  return circle;
}

function createDecorativeDot(size) {
  let dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  dot.setAttribute("stroke", "black");
  dot.setAttribute("fill", "black");
  dot.setAttribute("r", size);
  dot.setAttribute("cx", 250);
  dot.setAttribute("cy", 250);
  return dot;
}

function createArrow(arrowHeight, arrowWidth, color, id) {
  let arrow = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  arrow.setAttribute('x', 250);
  arrow.setAttribute('y', 250 - arrowHeight);
  arrow.setAttribute('rx', 20);
  arrow.setAttribute('ry', 20);
  arrow.setAttribute('width', arrowWidth);
  arrow.setAttribute('height', arrowHeight);
  arrow.setAttribute('fill', color);
  arrow.setAttribute('id', id);
  arrow.setAttribute('transform-origin', "center");
  return arrow;
}

function tickTimer() {
  var date = new Date();
  var textForDigitalWatch = document.getElementById('digital-watch');
  textForDigitalWatch.textContent = date.toLocaleTimeString();
  var hh = date.getHours() * 30;
  var mm = date.getMinutes() * deg;
  var ss = date.getSeconds() * deg;
  rotateHandle('hours', hh);
  rotateHandle('minutes', mm);
  rotateHandle('seconds', ss);
}

function rotateHandle(atr, angle) {
  var elem = document.getElementById(atr);
  elem.setAttribute('transform', "rotate(" + angle + ")");
}
