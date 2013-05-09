UI.MultiSelectList = (function(parent) {

  function MultiSelectList(items) {
    parent.call(this, "ul", {
      class: "multi-select-list"
    });
  }
  util.inherits(MultiSelectList, parent);

  var _proto = MultiSelectList.prototype,
    _super = parent.prototype;

  _proto.toJSON = function() {
    return this.children.map(function(child) {
      return child.toJSON();
    });
  };

  return MultiSelectList;

})(UI.Component);