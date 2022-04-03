"use strict";

var dragImage = null; //какая картинка сейчас перетаскивается
var dragShiftX;
var dragShiftY;
var wrapper = document.getElementById("wrapper");
var arrimg = document.getElementsByTagName('img'); //нашли все картинки в контейнере, вернулся массив[0..2]

for (var i = 0; i < arrimg.length; i++) {
  AddEventHandler(arrimg[i], 'mousedown', dragStart, false); //повесили слушателя события onmousedown на каждую картинку
  AddEventHandler(arrimg[i], 'mouseover', mouseOver, false);  //повесили слушателя события onmouseover на каждую картинку
}

function mouseOver(EO) {
  EO = EO || window.event;
  PreventDefault(EO);
  EO.target.style.cursor = 'pointer';
}

function dragStart(EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  dragImage = EO.target; //какую картинку перетаскиваем  
  wrapper.appendChild(dragImage);
  dragImage.style.cursor = 'pointer';
  console.log('drag start: ' + EO.target.id);
  var mouseX = EO.pageX; //координаты нажатия мышки по оси X
  var mouseY = EO.pageY; //координаты нажатия мышки по оси Y
  var imageX = dragImage.offsetLeft; //координаты картинки по оси X
  var imageY = dragImage.offsetTop; //координаты картинки по оси Y

  dragShiftX = mouseX - imageX;
  dragShiftY = mouseY - imageY;

  window.onmousemove = drag; //движение курсора мыши по элементу
  window.onmouseup = drop; //отпустили картинку(закончили перетаскивать)
}

function drag(EO) {
  EO = EO || window.event;
  PreventDefault(EO);
  console.log('move');
  var mouseX = EO.pageX;
  var mouseY = EO.pageY;
  var imageX = mouseX - dragShiftX;
  var imageY = mouseY - dragShiftY;

  dragImage.style.left = imageX + 'px'; //засетали координаты left перемещённой картинке (левый верхний угол)
  dragImage.style.top = imageY + 'px'; //засетали координаты top перемещённой картинке (левый верхний угол)
}

function drop(EO) {
  EO = EO || window.event;
  PreventDefault(EO);
  window.onmousemove = null;
  window.onmouseup = null;
  dragImage=null;
  console.log('drag finished: ' + EO.target.id);
}

// установка обработчика событий
function AddEventHandler(Elem, EventName, HandlerFunc, CaptureFlag) {
  if (Elem.addEventListener)
    Elem.addEventListener(EventName, HandlerFunc, CaptureFlag); // современные браузеры и IE >=9
  else
    if (!CaptureFlag) // перехват вообще невозможен
    {
      var EventName2 = 'on' + EventName;
      if (Elem.attachEvent) // IE <=8
      {
        // создаём обёртку для обработчика, чтобы обработчику правильно передавался this
        var IEHandlerF = function () { HandlerFunc.call(Elem); }
        Elem.attachEvent(EventName2, IEHandlerF);
        var StoreName = "__IEHandlerF_" + EventName;
        Elem[StoreName] = IEHandlerF; // сохраняем ссылку на обёртку, чтобы найти её при удалении обработчика
      }
      else // устаревшие браузеры
        if (!Elem[EventName2])
          Elem[EventName2] = HandlerFunc; // не сработает если несколько обработчиков одного события
    }
}

// отмена обработки события по умолчанию
// EO - объект события
function PreventDefault(EO) {
  if (EO.preventDefault)
    EO.preventDefault();
  else
    EO.returnValue = false;
}