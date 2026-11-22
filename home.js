/* home.js - Home Page: theme button, Back to Top, footer clock */

window.onload = function () {
  setUpTheme();
  setUpBackToTop();
  setUpClock();
};

/* ---------- Home Page: two themes ---------- */
function setUpTheme() {
  var button = document.getElementById("theme-toggle");
  if (button) {
    button.onclick = function () {
      if (document.body.className == "dark") {
        document.body.className = "";
        button.innerHTML = "Switch to dark theme";
      } else {
        document.body.className = "dark";
        button.innerHTML = "Switch to light theme";
      }
    };
  }
}

/* ---------- Home Page: Back to Top button ---------- */
function setUpBackToTop() {
  var button = document.getElementById("back-to-top");
  if (button) {
    // appears when the user scrolls down
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 200) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    };
    // goes back to the top when clicked
    button.onclick = function () {
      window.scrollTo(0, 0);
    };
  }
}

/* ---------- Home Page: real-time clock in the footer ---------- */
function twoDigits(n) {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

function showTime() {
  var now = new Date();
  document.getElementById("footer-clock").innerHTML =
    twoDigits(now.getHours()) + ":" +
    twoDigits(now.getMinutes()) + ":" +
    twoDigits(now.getSeconds());
}

function setUpClock() {
  if (document.getElementById("footer-clock")) {
    showTime();
    setInterval(showTime, 1000);   // update every second
  }
}
