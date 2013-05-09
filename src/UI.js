window.UI = {
  compile: function(str) {
    var div = document.createElement("div");
    str =
      str
        // insert
        .replace(/\{([\=\+])\s*(.+?)\s*\}/g, "<insert o=\"$1\" n=\"$2\"></insert>")
        // attributes
        .replace(/([^\s]+)=(['"])([^']*?)\{@\s*([^\s]+?)\s*\}([^']*?)\2/g, "class=$2attr$2 attr=$2$1$2 before=$2$3$2 n=$2$4$2 after=$2$5$2")
        // eventhandlers
        .replace(/on([^\s]+)=\{\*\s*?([^\s]+?)\s*?\}/g, "class=\"evt\" evt=\"$1\" f=\"$2\"");

    div.innerHTML = str;
    return div;
  }
};