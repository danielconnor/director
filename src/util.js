/*global CSSRule*/
var util = (function() {
  "use strict";
  return {
    inherits: Object.create ? function(ctor, superCtor, cb) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if(typeof cb == "function") cb(ctor.prototype, superCtor.prototype);

      return ctor;
    } : function(ctor, superCtor, cb) {
      var T = function() {};
      T.prototype = superCtor.prototype;
      ctor.prototype = new T();
      ctor.constructor = ctor;

      if(typeof cb == "function") cb(ctor.prototype, superCtor.prototype);
      return ctor;
    },

    defineProperty: config.ACCESSORS ? Object.defineProperty : function(object, name, attrs) {
      var get = attrs.get, set = attrs.set;

      object[name] =
        set && get ? function(val) {
          if(arguments.length) return set.call(this, val);
          return get.call(this);
        } :
        set && !get ? function(val) {
          if(arguments.length) return set.call(this, val);
        } :
        !set && get ? function() {
          if(!arguments.length) return get.call(this);
        } : new Error("Getter and Setter not defined!");
    },

    isElement: function(obj) {
      try {
        //Using W3 DOM2 (works for FF, Opera and Chrom)
        return obj instanceof HTMLElement;
      }
      catch(e){
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have. (works on IE7)
        return (typeof obj==="object") &&
          (obj.nodeType===1) && (typeof obj.style === "object") &&
          (typeof obj.ownerDocument ==="object");
      }
    },

    getStyleBySelector: function(selector) {
      var sheetList = document.styleSheets;
      var ruleList;
      var i = sheetList.length, j;

      while (i--) {
        ruleList = sheetList[i].cssRules;
        for (j = 0; j < ruleList.length; j++) {
          if (ruleList[j].type == CSSRule.STYLE_RULE && ruleList[j].selectorText == selector) {
            return ruleList[j].style;
          }
        }
      }
      return null;
    },
    throttle: function(func, time) {
      var args,
        result,
        thisArg,
        timeoutId,
        lastCalled = 0;

      function trailingCall() {
        lastCalled = new Date();
        timeoutId = null;
        func.apply(thisArg, args);
      }

      return function() {
        var now = new Date(),
            remain = time - (now - lastCalled);

        args = arguments;
        thisArg = this;

        if (remain <= 0) {
          lastCalled = now;
          result = func.apply(thisArg, args);
        }
        else if (!timeoutId) {
          timeoutId = setTimeout(trailingCall, remain);
        }
        return result;
      };
    }
  };

})();
