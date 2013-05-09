UI.MultiSelect = (function(parent) {

  function MultiSelect(type, title, items) {
    parent.call(this, "div");

    this.title = new UI.Component("h3");
    this.title.innerHTML(title);

    this.list = new UI.MultiSelectList("ul");

    this.button = new UI.Component("button", {
      class: "btn primary"
    });
    this.button.textContent("Add " + type);
    this.button.addEventListener("click", this.add.bind(this), false);

    this.addAll(items);
    this.append(this.title);
    this.append(this.list);
    this.append(this.button);
  }
  util.inherits(MultiSelect, parent);

  var _proto = MultiSelect.prototype,
    _super = parent.prototype;

  _proto._childType = UI.MultiSelectItem;

  _proto.addAll = function(items) {
    if(!Array.isArray(items)) return;
    items.forEach(function(item) {
      this.add(item);
    }, this);
  };

  _proto.add = function(data) {
    if(data instanceof Event) data = null;
    if(!data && this.list.children.length && this.list.children[this.list.children.length - 1].empty) {
      return;
    }
    this.list.append(new this._childType(data));
  };

  _proto.toJSON = function() {
    return this.list.toJSON();
  };

  return MultiSelect;

})(UI.Component);