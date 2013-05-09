UI.MimeTypeSelect = (function(parent) {

  function MimeTypeSelect(items) {
    parent.call(this, "Mime Type", "Mime Types", items);
    this.list.classList.add("light");
  }
  util.inherits(MimeTypeSelect, parent);

  var _proto = MimeTypeSelect.prototype,
    _super = parent.prototype;

  _proto._childType = UI.MimeTypeItem;

  return MimeTypeSelect;
})(UI.MultiSelect);