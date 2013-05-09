UI.MimeTypeItem = (function(parent) {

  function MimeTypeItem(data) {
    parent.call(this);
    this.element.insertAdjacentHTML("beforeend",'<div class="input-append input-prepend"><input class="span2" type="text"><span class="add-on">/</span><input class="span2" placeholder="*" type="text"></div>');

    var inputs = this.element.querySelectorAll("input[type=text]");

    this.type = new UI.Component(inputs[0]);
    this.subtype = new UI.Component(inputs[1]);

    if(data) {
      this.type.element.value = data.type || "";
      this.subtype.element.value = data.subtype || "";
    }
  }
  util.inherits(MimeTypeItem, parent);

  var _proto = MimeTypeItem.prototype,
    _super = parent.prototype;

  _proto.toJSON = function() {
    return {
      type: this.type.element.value,
      subtype: this.subtype.element.value
    };
  };

  _proto.isEmpty = function() {
    return !this.type.element.value.trim();
  };

  return MimeTypeItem;
})(UI.MultiSelectItem);