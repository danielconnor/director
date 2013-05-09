/*global util*/
window.DOMTokenList = window.DOMTokenList || (function() {
    "use strict";

    function DOMTokenList(element) {
      Array.call(this);
      this.element = element;
    }
    util.inherits(DOMTokenList, Array);

    DOMTokenList.prototype.toString = function() {
      return this.join(" ");
    };
    DOMTokenList.prototype.add = function(className) {
      if(!this.contains(className)) {
        this.push(className);
        this.element.className = this.toString();
      }
    };
    DOMTokenList.prototype.remove = function(className) {
      var loc;
      if((loc = this.indexOf(className)) > -1) {
        this.splice(loc, 1);
        this.element.className = this.toString();
      }
    };
    DOMTokenList.prototype.contains = function(className) {
      return this.indexOf(className) > -1;
    };
    DOMTokenList.prototype.item = function(loc) {
      return this[loc];
    };
    DOMTokenList.prototype.toggle = function(className) {
      var loc = this.indexOf(className),
        contains = loc > -1;

      if(contains) {
        this.splice(loc, 1);
      }
      else {
        this.push(className);
      }
      this.element.className = this.toString();

      return !contains;
    };

    return DOMTokenList;
})();

(function() {
  if(window.Element) {
    var _proto = Element.prototype;
    _proto.matchesSelector =
      _proto.matchesSelector ||
      _proto.mozMatchesSelector ||
      _proto.webkitMatchesSelector ||
      _proto.oMatchesSelector ||
      _proto.msMatchesSelector;
  }
})();

(function() {

  window.getMatchedCSSRules = window.getMatchedCSSRules || function(element) {
    var sheetList = document.styleSheets,
      i = sheetList.length,
      matches = [];

    while (i--) {
      var ruleList = sheetList[i].cssRules,
        j = ruleList.length;

      while(j--) {
        if (ruleList[j].type == CSSRule.STYLE_RULE &&
            element.matchesSelector(ruleList[j].selectorText)) {

          matches.push(ruleList[j].style);

        }
      }
    }
    return matches.length ? matches : null;
  };

})();

(function() {

  if(window.HTMLInputElement) {
    var input = document.createElement("input");

    if(input.valueAsNumber === undefined) {
      Object.defineProperty(HTMLInputElement.prototype, "valueAsNumber", {
        get: function() {
          return parseInt(this.value, 10);
        },
        set: function(val) {
          this.value = parseInt(val, 10);
        }
      });
    }

    input = null;
  }


})();
