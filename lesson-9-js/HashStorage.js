function THashStorage() {
  this.store = {};
  this.addValue = function (key, value) {
    this.store[key] = value;
  }
  this.getValue = function (key) {
    return this.store[key];
  }
  this.deleteValue = function (key) {
    if (key in this.store) {
      return delete this.store[key];
    } else { return false; }
  }
  this.getKeys = function () {
    return Object.keys(this.store);
  }
}
var DrinkStorage = new THashStorage();
var addButton = document.getElementById('add-coctail');
var deleteButton = document.getElementById('delete-coctail');
var getButton = document.getElementById('get-coctail');
var allButton = document.getElementById('all-coctails');
var infoWindow = document.getElementById('info');

addButton.onclick = function () {
  do {
    var name = prompt('Введите название коктейля', 'Мохито').toLowerCase();
  } while (!name);
  do {
    var isAlcohol = prompt('Напиток алкогольный?', 'Да').toLowerCase();
  } while (!isAlcohol && (isAlcohol !== 'да' || isAlcohol !== 'нет'));
  do {
    var recipe = prompt('Рецепт приготовления',
      'Разрежьте лайм на 4 дольки. Положите листья мяты и 2 дольки лайма в стакан из толстого стекла. Подавите мяту и лайм мадлером или ложкой, чтобы они пустили сок. Добавьте ещё 1 дольку лайма и сахар, а после снова подавите.');
  } while (!recipe);

  DrinkStorage.addValue(name, { name, isAlcohol, recipe });
  console.log(DrinkStorage.getValue(name));
}
getButton.onclick = function () {
  var name = prompt('Введите название коктейля').toLowerCase();
  var info = DrinkStorage.getValue(name);
  infoWindow.innerHTML = 'Имя напитка: ' + info.name + '<br/>' + 'Алкогольный: ' + info.isAlcohol + '<br/>' + 'Рецепт: ' + info.recipe;
}
deleteButton.onclick = function () {
  var name = prompt('Введите название коктейля').toLowerCase();
  var del = DrinkStorage.deleteValue(name);
  if (del) { infoWindow.innerHTML = 'Коктейль удалён'; }
  else { infoWindow.innerHTML = 'Такого коктейля в хранилище нет'; }
}
allButton.onclick = function () {
  infoWindow.innerHTML = DrinkStorage.getKeys();
  console.log(DrinkStorage.getKeys());
}

