UI.DomainSelect = (function(parent) {

  function DomainSelect(items) {
    parent.call(this, "Domain", "Domains", items);
    this.list.classList.add("light");
  }
  util.inherits(DomainSelect, parent);

  var _proto = DomainSelect.prototype,
    _super = parent.prototype;

  _proto._childType = UI.DomainSelectItem;


  return DomainSelect;

})(UI.MultiSelect);