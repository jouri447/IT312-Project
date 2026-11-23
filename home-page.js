/* Home Page: back to top, clock, and notifications. */
window.onload = function () {
  var topButton = document.getElementById('back-to-top');
  if (topButton) {
    function updateTopButton() {
      if (window.scrollY > 200) topButton.style.display = 'block';
      else topButton.style.display = 'none';
    }
    window.onscroll = updateTopButton;
    updateTopButton();
    topButton.onclick = function () { window.scrollTo(0, 0); };
  }
  var clock = document.getElementById('footer-clock');
  if (clock) {
    function twoDigits(number) {
      if (number < 10) return '0' + number;
      return String(number);
    }
    function updateClock() {
      var now = new Date();
      clock.textContent = twoDigits(now.getHours()) + ':' +
        twoDigits(now.getMinutes()) + ':' + twoDigits(now.getSeconds());
      clock.dateTime = now.toTimeString().slice(0, 8);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
  setUpNotifications();
};

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
