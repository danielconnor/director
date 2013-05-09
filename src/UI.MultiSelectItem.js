UI.MultiSelectItem = (function(parent) {

  function MultiSelectItem(items) {
    parent.call(this, "li", {
      class: "list-item"
    });

    this.closeButton = new UI.Component("div", {
      class: "close"
    });
    this.closeButton.innerHTML("&times;");

    this.closeButton.addEventListener("click", this.removeSelf.bind(this), false);

    this.append(this.closeButton);
  }
  util.inherits(MultiSelectItem, parent);

  var _proto = MultiSelectItem.prototype,
    _super = parent.prototype;

  _proto.isEmpty = function() {
    return true;
  };

  Object.defineProperty(_proto, "empty", {
    get: function() { return this.isEmpty(); }
  });

  _proto.toJSON = function() {
    return {};
  };

  return MultiSelectItem;

})(UI.Component);