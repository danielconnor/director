UI.Checkbox = (function(parent) {

  function Dropdown(pairs) {
    parent.call(this, "select");

    this.addAll(pairs);
  }
  util.inherits(Dropdown, parent);

  var _proto = Dropdown.prototype,
    _super = parent.prototype;

  _proto.addAll = function(pairs) {
    for(var key in pairs) {
      this.add(key, pairs[key]);
    }
  };

  _proto.clearAll = function() {
    this.innerHTML = "";
  };

  _proto.add = function(key, value) {
    var option = document.createElement("option");
    option.value = "value";
    option.textContent = value;
    this.append(option);
  };

  return Dropdown;

})(UI.Control);