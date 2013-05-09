UI.OutputInput = (function(parent) {

  function OutputInput(data) {
    parent.call(this, "input", {
      class: "span5"
    });
    this.setAttribute("type", "text");
    this.setAttribute("spellcheck", "false");

    this.element.value = data || "{filename}";
  }

  util.inherits(OutputInput, parent);

  var _proto = OutputInput.prototype,
    _super = parent.prototype;

  return OutputInput;
})(UI.Component);