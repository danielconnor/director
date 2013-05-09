/*global util, UI, DOMElement, DOMTokenList*/
UI.Component = (function(parent) {
  "use strict";

  function Component(tagName, attributes) {
    parent.call(this, tagName);
    this.classList = this.element.classList || new DOMTokenList(this.element);
    this.setAttrs(attributes);
  }

  return util.inherits(Component, parent, function(_proto, _super) {

    _proto.hide = function() {
      this.classList.add("hidden");
    };
    _proto.show = function() {
      this.classList.remove("hidden");
    };

    // A set of functions that handle creating the content
    // to be inserted in the place of operations in a template
    var operations = {
      // event
      "*": function(node, evt, func, component) {
        node.addEventListener(evt, component[func].bind(component), false);
      },
      // assign
      "=": function(data, name) {
        var prop = data[name],
          node = document.createTextNode(prop());

        prop.events.addEventListener("change", function(val) {
            node.data = val;
        });
        return node;
      },
      // insert
      "+": function(data, name) {
        return new UI[name]().render().element;
      },
      "@": function(node, data, name, attr, before, after) {
        var prop = data[name],
          update;

        if(attr == "value" && node.getAttribute("type") == "text") {
          node.addEventListener("keyup", function() {
            prop(node.value);
          }, false);
          update = function(val) {
            node.value = val;
          };
        }
        else {
          update = function(val) {
            node.setAttribute(attr, before + val + after);
          };
        }
        prop.events.addEventListener("change", update);
        update(prop());
      }
    };

    /**
     * Render the component's template. Templates are handled differently than
     * other templating languages. The template is made up of operations that
     * specify the content at that location. Each operation takes arguments and
     * returns a node that will be inserted. This makes it extremely efficient
     * to update a single piece of data in the template. For example, in the
     * case of an assign operation, a TextNode is inserted, then when the data
     * is updated, the whole template does not need to be rendered. Rather the
     * content of the node is updated.
     * Also because only the content of nodes is changing, any event handler
     * that is bound, will stay bound.
     *
     * @param  {Scope} data   A Scope to use to provide data to the template.
     * @return {UI.Component} The component.
     */
    _proto.render = function(data) {

      var element = this.element = this.template.cloneNode(true),
          node,
          nodes;

      // Get all the nodes that were inserted above.
      nodes = element.getElementsByTagName("insert");

      while(node = nodes[0]) {
        // Perform the appropriate operation using the data from the node and replace
        // the node with the result of the operation.
        node.parentNode.replaceChild(operations[node.getAttribute("o")](data, node.getAttribute("n")), node);
      }
      nodes = element.querySelectorAll("[attr]");
      for(var i = 0; i < nodes.length; i++) {
        node = nodes[i];

        operations["@"](node, data, node.getAttribute("n"), node.getAttribute("attr"), node.getAttribute("before"), node.getAttribute("after"));
        node.removeAttribute("n"), node.removeAttribute("attr"), node.removeAttribute("before"), node.removeAttribute("after");
      }
      nodes = element.querySelectorAll("[evt]");
      for(var i = 0; i < nodes.length; i++) {
        node = nodes[i];

        operations["*"](node, node.getAttribute("evt"), node.getAttribute("f"), this);
        node.removeAttribute("evt"), node.removeAttribute("f");
      }

      return this;
    };


    _proto.measurement = "%";
    /**
     * Get or set the absolute left pos of the element relative to the document
     */
    util.defineProperty(_proto, "left", {
      get: function() {
        var total = 0;
        for (var el = this.element; el; el = el.offsetParent) {
          total += el.offsetLeft;
          if (this !== el)
            total += el.clientLeft - el.scrollLeft;
        }
        return total;
      },
      set: function(left) {
        this.element.style.left = (Math.round(left * 100) / 100) + this.measurement;
      }
    });

    /**
     * Get or set the absolute top pos of the element relative to the document
     */
    util.defineProperty(_proto, "top", {
      get: function() {
        var total = 0;
        for (var el = this.element; el; el = el.offsetParent) {
          total += el.offsetTop;
          if (this !== el)
            total += el.clientTop - el.scrollTop;
        }
        return total;
      },
      set: function(top) {
        this.element.style.top = (Math.round(top * 100 ) / 100) + this.measurement;
      }
    });

  });

})(DOMElement);