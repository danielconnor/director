UI.Match = (function(parent) {

  function Match(data) {
    parent.call(this);
    data = data || {};

    this.output = new UI.OutputInput(data.output);
    this.domains = new UI.DomainSelect(data.domains);
    this.mimeTypes = new UI.MimeTypeSelect(data.mimeTypes);

    this.append(this.output);
    this.append(this.domains);
    this.append(this.mimeTypes);
  }
  util.inherits(Match, parent);

  var _proto = Match.prototype,
    _super = parent.prototype;

  _proto.toJSON = function() {
    return {
      output: this.output.element.value,
      domains: this.domains.toJSON(),
      mimeTypes: this.mimeTypes.toJSON()
    };
  };

  _proto.isEmpty = function() {
    return false;
  };

  return Match;
})(UI.MultiSelectItem);