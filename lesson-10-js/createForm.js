'use strict'
var formFields = [
  { p: "Для внесения вашего сайта в каталог, заполните форму:", name: "form" },
  { label: "Разработчики:", type: "text", name: "author" },
  { label: "Название сайта:", type: "text", name: "title" },
  { label: "URL сайта:", type: "text", name: "url" },
  { label: "Дата  запуска сайта:", type: "text", name: "date" },
  { label: "Посетителей в сутки:", type: "text", name: "namber-persons" },
  { label: "Email для связи:", type: "text", name: "email" },
  { label: "Рубрика каталога:", type: "select", name: "direction", options: [{ value: "1", text: "здоровье" }, { value: "2", text: "уют" }, { value: "3", text: "бытовая техника" }] },
  { label: "Размещение:", type: "radio", name: "placement", options: [{ value: "1", text: "бесплатное " }, { value: "2", text: "платное" }, { value: "3", text: "VIP" }] },
  { label: "Разрешить отзывы", type: "checkbox", name: "comments", checked: "true" },
  { label: "Описание сайта:", type: "textarea", name: "article" },
  { value: "Опубликовать", type: "submit" }
]


function createForm(arr, form) {
  if (arr) {
    arr.forEach(addElement);
  }
  function addElement(element) {
    if (element.name == "form") {
      var NewTagElement = document.createElement('p');
      var NewTextElement = document.createTextNode(element.p);
      NewTagElement.appendChild(NewTextElement);
      form.appendChild(NewTagElement);
    }


    if (element.type == "tel" || element.type == "email" || element.type == "text") {
      var NewTagElement = document.createElement('p');
      var NewLabelElement = document.createElement('label');
      var NewInputElement = document.createElement('input');
      var NewTextElement = document.createTextNode(element.label);
      NewInputElement.type = element.type;
      NewInputElement.name = element.name;
      NewLabelElement.appendChild(NewTextElement);
      NewLabelElement.appendChild(NewInputElement);
      NewTagElement.appendChild(NewLabelElement);
      form.appendChild(NewTagElement);
    }

    if (element.type == "submit") {
      var NewTagElement = document.createElement('p');
      var NewInputElement = document.createElement('input');
      NewInputElement.type = element.type;
      NewInputElement.value = element.value;
      NewTagElement.appendChild(NewInputElement);
      form.appendChild(NewTagElement);
    }

    if (element.type == "select") {
      var NewTagElement = document.createElement('p');
      var NewLabelElement = document.createElement('label');
      var NewTextElement = document.createTextNode(element.label);
      var NewSelectElement = document.createElement('select');
      NewSelectElement.name = element.name;
      NewLabelElement.appendChild(NewTextElement);

      for (var i = 0; i < element.options.length; i++) {
        var NewOptionElement = document.createElement('option');
        NewOptionElement.value = element.options[i].value;
        var NewTextElement = document.createTextNode(element.options[i].text);
        NewOptionElement.appendChild(NewTextElement);
        NewSelectElement.appendChild(NewOptionElement);
      }
      NewLabelElement.appendChild(NewSelectElement);
      NewTagElement.appendChild(NewLabelElement);
      form.appendChild(NewTagElement);

    }


    if (element.type == "radio") {
      var NewTagElement = document.createElement('p');
      var NewLabelElement = document.createElement('label');
      var NewTextElement = document.createTextNode(element.label);
      NewLabelElement.appendChild(NewTextElement);
      NewTagElement.appendChild(NewLabelElement);

      for (var i = 0; i < element.options.length; i++) {

        var NewRadioElement = document.createElement('input');
        NewRadioElement.value = element.options[i].value;
        NewRadioElement.type = "radio";
        NewRadioElement.name = element.name;
        var NewLabelRElement = document.createElement('label');
        var NewTextElement = document.createTextNode(element.options[i].text);
        NewLabelRElement.appendChild(NewRadioElement);
        NewLabelRElement.appendChild(NewTextElement);
        NewTagElement.appendChild(NewLabelRElement);

      }
      form.appendChild(NewTagElement);
    }


    if (element.type == "checkbox") {
      var NewTagElement = document.createElement('p');
      var NewLabelElement = document.createElement('label');
      var NewTextElement = document.createTextNode(element.label);
      NewLabelElement.appendChild(NewTextElement);

      var NewCheckElement = document.createElement('input');
      NewCheckElement.type = "checkbox";
      NewCheckElement.name = element.name;
      (element.checked) ? NewCheckElement.checked = "true" : NewCheckElement.checked = "false";
      NewLabelElement.appendChild(NewCheckElement);
      NewTagElement.appendChild(NewLabelElement);
      form.appendChild(NewTagElement);
    }


    if (element.type == "textarea") {
      var NewTagElement = document.createElement('p');
      var NewLabelElement = document.createElement('label');
      var NewTextElement = document.createTextNode(element.label);
      NewLabelElement.appendChild(NewTextElement);
      var NewTextareaElement = document.createElement('textarea');
      NewTextareaElement.name = element.name;
      NewLabelElement.appendChild(NewTextareaElement);
      NewTagElement.appendChild(NewLabelElement);
      form.appendChild(NewTagElement);
    }
  }

}

createForm(formFields, MyForm);