var container = document.querySelector(".container"),
  matchList = new UI.MatchList();

matchList.load();
container.appendChild(matchList.element);

