/*global util, UI, Data, EventEmitter*/
Data.Property = (function() {
  "use strict";

  function Property(object, attr) {
    var emitter = new EventEmitter();

    function f(val, silent) {
      if(arguments.length) {
        if(val != object[attr]) {
          if(!silent) {
            emitter.emit("change", val);
          }
          return object[attr] = val;
        }
        return val;
      }
      else {
        return object[attr];
      }
    }

    // we could add the all the methods on the prototype of
    // EventEmitter to the function, but I think it's simpler
    // to just add the events property.
    f.events = emitter;
    return f;
  }

  return Property;

})();