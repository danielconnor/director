(function(window) {
  var matches,
    anything = ".+";

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  var compilers = {
    "domains": function(domain) {
      return new RegExp((domain.subdomains ? "([^.]+\\.)*" : "^") + escapeRegExp(domain.name) + "$");
    },
    "mimeTypes": function(mime) {
      // mime types are allowed to have regular expressions so we don't need to escape them
      return new RegExp("^" + (mime.type || anything) + "/" + (mime.subtype || anything) + "$");
    }
  };

  function compilePropertyList(list, compiler) {
    return list ? list.map(compiler) : [];
  }

  function checkPropertyList(list, property) {
    function test(regex) {
      return regex.test(property);
    }
    return list.length === 0 || list.some(test);
  }

  function compileOutput(output) {
    return function(data) {
      return output.replace(/\{\s*([\w-]+?)\s*\}/g, function(s, $1) {
        return data[$1];
      });
    };
  }

  // compile each of the matches to regular expressions.
  function compileMatch(match) {
    var result = {
      output: compileOutput(match.output)
    };
    for(var i in compilers) {
      result[i] = compilePropertyList(match[i], compilers[i]);
    }
    return result;
  }

  window.updateMatches = function(data) {
    console.log(matches = data.map(compileMatch));
  };

  (function() {
    var storedData = localStorage.matches,
    data = [];
    if(storedData) {
      data = JSON.parse(storedData);
    }
    updateMatches(data);
  })();


  function checkForMatch(item) {
    for(var i = 0, il = matches.length; i < il; i++) {
      var match = matches[i],
        matchedDomain = checkPropertyList(match.domains, url.parse(item.url).hostname),
        matchedMimeType = checkPropertyList(match.mimeTypes, item.mime);

      if(matchedDomain && matchedMimeType) {
        return match.output;
      }
    }
    return false;
  }


  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  function itemInfo(item) {
    var date = new Date(item.startTime);

    return {
      dd: pad(date.getDate(), 2),
      mm: pad(date.getMonth() + 1, 2),
      yyyy: date.getFullYear(),
      ext: path.extname(item.url).substring(1),
      url: item.url,
      filename: path.basename(item.filename)
    };
  }

  chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    var match = checkForMatch(item);

    if(match) {
      suggest({
        filename: match(itemInfo(item))
      });
    }
  });



})(this);