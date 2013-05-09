/*global util, EventEmitter, Node, Element*/
var DOMElement = (function(parent) {
  "use strict";

  /**
   * A wrapper for a native element to abstract
   * parts of the DOM Api.
   * @param {[type]} tagName [description]
   */
  function DOMElement(tagName) {
    parent.call(this);

    this.children = [];

    this.element = util.isElement(tagName) ? tagName :
      document.createElement(tagName || "div");

    this.style = this.element.style;
    this.element._domElement = this;
  }

  return util.inherits(DOMElement, parent, function(_proto, _super) {
    var last_id = 0;

    _proto.append = function(element) {
      if(arguments.length > 1) {
        for(var i = 0, il = arguments.length; i < il; i++) {
          this.append(arguments[i]);
        }
      }
      else if(element instanceof DOMElement) {
        this.children.push(element);
        this.element.appendChild(element.element);
      }
      else if(typeof element === "string") {
        var fragment = document.createTextNode(element);
        this.element.appendChild(fragment);
      }
      else {
        this.element.appendChild(element);
      }
      return this;
    };

    _proto.prepend = function(element) {
      if(arguments.length > 1) {
        for(var i = 0, il = arguments.length; i < il; i++) {
          this.prepend(arguments[i]);
        }
      }
      else if(element instanceof DOMElement) {
        this.children.unshift(element);
        this.element.insertBefore(element.element, this.element.firstChild);
      }
      else if(typeof element === "string") {
        var fragment = document.createTextNode(element);
        this.element.insertBefore(fragment, this.element.firstChild);
      }
      else {
        this.element.insertBefore(element, this.element.firstChild);
      }
      return this;
    };

    _proto.hide = function() {
      this.element.style.display = "none";
    };

    _proto.show = function() {
      this.element.style.display = "block";
    };

    _proto.insertAdjacentHTML = function(position, html) {
      return this.element.insertAdjacentHTML(position, html);
    };
    _proto.insertAdjacentElement = function(position, html) {
      return this.element.insertAdjacentElement(position, html);
    };

    _proto.remove = function(element) {
      this.children.splice(this.children.indexOf(element), 1);
      this.element.removeChild(element.element);
      return element;
    };

    _proto.removeSelf = function() {
      var parent = this.element.parentNode;
      if(parent._domElement) parent._domElement.remove(this);
    };

    _proto.setAttribute =
    _proto.setAttr = function(namespace, name, val) {
      if(!val) {
        this.element.setAttribute(namespace, name);
      }
      else {
        this.element.setAttributeNS(namespace, name, val);
      }
    };

    _proto.setAttrs = function(attrs) {
      var element = this.element;
      for(var name in attrs) {
        if(attrs.hasOwnProperty(name)) {
          element.setAttribute(name, attrs[name]);
        }
      }
    };

    _proto.getAttribute =
    _proto.getAttr = function(name) {
      return this.element.getAttributeNS(null, name);
    };

    _proto.removeAttribute =
    _proto.removeAttr = function(name) {
      return this.element.removeAttribute(name);
    };

    // there's no point in giving every element an id when generated, so just create one
    // when requested or return the one it already has
    util.defineProperty(_proto, "id", {
      get: function() {
        var id = this.getAttr("id");
        if(!id) {
          id = this.id = "0-_-0" + (++last_id) + "0-_-0";
        }
        return id;
      },
      set: function(id) {
        this.setAttr("id", id);
      }
    });

    _proto.addEventListener = function() {
      if(arguments.length === 3 && "on" + arguments[0] in this.element) {
        return Element.prototype.addEventListener.apply(this.element, arguments);
      }
      else {
        return _super.addEventListener.apply(this, arguments);
      }
    };

    util.defineProperty(_proto, "outerHTML", {
      get: function() {
        return this.outerHTML;
      }
    });

    util.defineProperty(_proto, "innerHTML", {
        get: function() {
          return this.element.innerHTML;
        },
        set: function(html) {
          this.element.innerHTML = html;
        }
    });

    util.defineProperty(_proto, "textContent", {
        get: function() {
          return this.element.textContent;
        },
        set: function(text) {
          this.element.textContent = text;
        }
    });

  });
})(EventEmitter);