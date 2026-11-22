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
