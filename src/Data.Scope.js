/*global util, UI, Data, EventEmitter*/
Data.Scope = (function() {
  "use strict";

  function Scope(object) {
    this._object = object;

    for(var i in object) {
      var prop = object[i];

      if(prop && typeof prop === "object") {
        this[i] = new Scope(prop);
      }
      else {
        this[i] = new Data.Property(object, i);
      }
    }
  }

  return util.inherits(Scope, EventEmitter, function(_proto, _super) {
    _proto._define = function(name) {
      return new Data.Property(this._object, name);
    };
  });

})();