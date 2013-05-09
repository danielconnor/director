UI.MatchList = (function(parent) {

  function MatchList() {
    parent.call(this, "Match", "Matches");

    this.saveBtn = new UI.Component("button", {
      class: "btn primary"
    });
    this.saveBtn.addEventListener("click", this.save.bind(this), false);
    this.saveBtn.textContent("Save");

    this.append(this.saveBtn);
  }
  util.inherits(MatchList, parent);

  var _proto = MatchList.prototype,
    _super = parent.prototype;

  _proto._childType = UI.Match;

  _proto.load = function() {
    var storedData = localStorage.matches,
      data = [];
    if(storedData) {
      data = JSON.parse(storedData);
    }
    if(Array.isArray(data)) {
      this.addAll(data);
    }
  };

  _proto.save = function() {
    var data = this.toJSON();
    chrome.extension.getBackgroundPage().updateMatches(data);
    localStorage.matches = JSON.stringify(data);
  };


  return MatchList;
})(UI.MultiSelect);