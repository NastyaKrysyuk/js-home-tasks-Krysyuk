function TLocalStorage(name) {
  var self = this,
    pHash = {};
  self.reset = function () {
    localStorage.setItem(name, JSON.stringify(pHash));
  };
  self.addValue = function (key, value) {
    pHash[key] = value;
  };
  self.getValue = function (key) {
    return JSON.parse(localStorage[name])[key];
  };
  self.deleteValue = function (key) {
    return delete pHash[key];
  };
  self.getKeys = function () {
    return Object.keys(JSON.parse(localStorage[name]));
  };
}