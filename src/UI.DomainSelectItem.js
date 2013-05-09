UI.DomainSelectItem = (function(parent) {

  function DomainSelectItem(data) {
    parent.call(this);
    this.element.insertAdjacentHTML("beforeend",'<div class="input-append"><input class="span3" type="text" required><label class="add-on"><input type="checkbox"> subdomains</label></div>');

    this.name = new UI.Component(this.element.querySelector("input[type=text]"));
    this.name.setAttribute("pattern", "^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$");

    this.subdomains = new UI.Component(this.element.querySelector("input[type=checkbox]"));

    if(data) {
      this.name.element.value = data.name || "";
      this.subdomains.element.checked = data.subdomains || false;
    }
  }
  util.inherits(DomainSelectItem, parent);

  var _proto = DomainSelectItem.prototype,
    _super = parent.prototype;

  _proto.isEmpty = function() {
    return !this.name.element.value.trim();
  };

  _proto.toJSON = function() {
    return {
      subdomains: this.subdomains.element.checked,
      name: this.name.element.value
    };
  };

  return DomainSelectItem;

})(UI.MultiSelectItem);