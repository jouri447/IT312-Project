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

/* Notification dropdown: works on both Home and Club Offerings. */
document.addEventListener('DOMContentLoaded', function () {
  var bell = document.querySelector('.notification-toggle');
  var panel = document.getElementById('notification-panel');
  if (!bell || !panel) return;
  function closePanel() { panel.hidden = true; bell.setAttribute('aria-expanded', 'false'); }
  bell.addEventListener('click', function (event) {
    event.stopPropagation();
    var opening = !panel.hidden;
    panel.hidden = opening;
    bell.setAttribute('aria-expanded', String(!opening));
  });
  document.addEventListener('click', function (event) {
    if (!panel.contains(event.target) && !bell.contains(event.target)) closePanel();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { closePanel(); bell.focus(); }
  });
});

/* Save offerings by their names, so sorting/shuffling never changes favorites. */
document.addEventListener('DOMContentLoaded', function () {
  var storageKey = 'khayt-favorite-offerings';
  var buttons = document.querySelectorAll('.offering-card .bookmark-btn');
  var toast = document.getElementById('favorites-message');
  var favorites = [];
  var toastTimer;
  try {
    var stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) favorites = stored.filter(function (x) { return typeof x === 'string'; });
  } catch (error) { favorites = []; }
  function render(button, saved, name) {
    button.classList.toggle('is-saved', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', (saved ? 'Remove ' : 'Save ') + name + (saved ? ' from favorites' : ' to favorites'));
    button.title = saved ? 'Remove from favorites' : 'Save to favorites';
  }
  buttons.forEach(function (button) {
    var card = button.closest('.offering-card');
    var name = card.querySelector('h2').textContent.trim();
    render(button, favorites.includes(name), name);
    button.addEventListener('click', function () {
      var saved = favorites.includes(name);
      if (saved) favorites = favorites.filter(function (x) { return x !== name; });
      else favorites.push(name);
      try { localStorage.setItem(storageKey, JSON.stringify(favorites)); } catch (error) { /* storage blocked */ }
      render(button, !saved, name);
      if (toast) {
        toast.textContent = saved ? name + ' removed from favorites.' : name + ' added to favorites!';
        toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.hidden = true; }, 3000);
      }
    });
  });
});
