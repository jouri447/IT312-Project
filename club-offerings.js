/* offerings.js - Club Offerings: random order + sorting */

window.onload = function () {
  setUpOfferings();
};
var offerings = [];   // each item: {card, name, price}
var offeringsList;    // the <ul> that holds the cards

function setUpOfferings() {
  var select = document.getElementById("offering-sort");

  offeringsList = document.getElementsByClassName("offerings-grid")[0];
  var cards = document.getElementsByClassName("offering-card");

  // read every card into the array
  for (var i = 0; i < cards.length; i++) {
    offerings.push({
      card: cards[i],
      name: cards[i].getElementsByTagName("h2")[0].innerHTML,
      price: parseInt(cards[i].getElementsByTagName("data")[0].value)
    });
  }

  shuffleOfferings();
  showOfferings();

  setUpNotifications();
  setUpFavorites();

  select.onchange = function () {
    sortOfferings(select.value);
    showOfferings();
  };
}

// put the cards on the page in the order of the array
function showOfferings() {
  for (var i = 0; i < offerings.length; i++) {
    offeringsList.appendChild(offerings[i].card);
  }
}

// random order
function shuffleOfferings() {
  for (var i = offerings.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
  }
}

// should offering a come after offering b?
function comesAfter(a, b, choice) {
  if (choice == "price-asc") {
    return a.price > b.price;
  } else if (choice == "price-desc") {
    return a.price < b.price;
  } else if (choice == "name-asc") {
    return a.name.toLowerCase() > b.name.toLowerCase();
  } else {
    return a.name.toLowerCase() < b.name.toLowerCase();
  }
}

// bubble sort
function sortOfferings(choice) {
  for (var i = 0; i < offerings.length - 1; i++) {
    for (var j = 0; j < offerings.length - 1 - i; j++) {
      if (comesAfter(offerings[j], offerings[j + 1], choice)) {
        var temp = offerings[j];
        offerings[j] = offerings[j + 1];
        offerings[j + 1] = temp;
      }
    }
  }
}


/* Notifications: DOM and mouse events from Lecture 11. */
function setUpNotifications() {
  var bells = document.getElementsByClassName('notification-toggle');
  var panel = document.getElementById('notification-panel');
  if (bells.length == 0 || !panel) return;
  var bell = bells[0];
  bell.onclick = function () {
    panel.hidden = !panel.hidden;
    bell.setAttribute('aria-expanded', String(!panel.hidden)); // accessibility
  };
  document.onclick = function (event) {
    var node = event.target;
    while (node != null) {
      if (node == bell || node == panel) return;
      node = node.parentNode;
    }
    panel.hidden = true;
    bell.setAttribute('aria-expanded', 'false');
  };
  document.onkeydown = function (event) {
    if (event.key == 'Escape') {
      panel.hidden = true;
      bell.setAttribute('aria-expanded', 'false');
      bell.focus();
    }
  };
}

/* Favorites: DOM, loops, and localStorage from Lectures 9-11. */
function setUpFavorites() {
  var storageKey = 'khayt-favorite-offerings';
  var cards = document.getElementsByClassName('offering-card');
  var toast = document.getElementById('favorites-message');
  var favorites = [];
  var toastTimer;
  try {
    var stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) favorites = stored;
  } catch (error) { favorites = []; }

  function findFavorite(name) {
    for (var j = 0; j < favorites.length; j++) {
      if (favorites[j] == name) return j;
    }
    return -1;
  }
  function showSaved(button, name) {
    var saved = findFavorite(name) != -1;
    button.className = saved ? 'bookmark-btn is-saved' : 'bookmark-btn';
    button.setAttribute('aria-pressed', String(saved)); // accessibility
    button.setAttribute('aria-label', (saved ? 'Remove ' : 'Save ') + name +
      (saved ? ' from favorites' : ' to favorites')); // accessibility
    button.title = saved ? 'Remove from favorites' : 'Save to favorites';
  }
  function connectButton(button, name) {
    showSaved(button, name);
    button.onclick = function () {
      var index = findFavorite(name);
      var wasSaved = index != -1;
      if (wasSaved) favorites.splice(index, 1);
      else favorites.push(name);
      try { localStorage.setItem(storageKey, JSON.stringify(favorites)); }
      catch (error) { /* storage may be disabled */ }
      showSaved(button, name);
      if (toast) {
        toast.textContent = name + (wasSaved ? ' removed from favorites.' : ' added to favorites!');
        toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.hidden = true; }, 3000);
      }
    };
  }
  for (var i = 0; i < cards.length; i++) {
    var buttons = cards[i].getElementsByClassName('bookmark-btn');
    var headings = cards[i].getElementsByTagName('h2');
    if (buttons.length > 0 && headings.length > 0) {
      connectButton(buttons[0], headings[0].textContent.trim());
    }
  }
}
