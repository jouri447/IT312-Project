/* Real-time clock in the footer (used on every page).
   Include this script at the end of the HTML body. */

// Add a 0 before numbers less than 10 (7 -> 07)
function twoDigits(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function updateClock() {
  var now = new Date();
  document.getElementById("footer-clock").innerHTML =
    twoDigits(now.getHours()) + ":" +
    twoDigits(now.getMinutes()) + ":" +
    twoDigits(now.getSeconds());
}

updateClock();
setInterval(updateClock, 1000);
