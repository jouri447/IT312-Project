/* Home Page: back-to-top and real-time footer clock.
   Theme behavior is shared across pages in theme.js. */
document.addEventListener('DOMContentLoaded', function () {
  var topButton = document.getElementById('back-to-top');
  if (topButton) {
    function updateTopButton() {
      topButton.style.display = window.scrollY > 200 ? 'block' : 'none';
    }
    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  var clock = document.getElementById('footer-clock');
  if (clock) {
    function updateClock() {
      var now = new Date();
      clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map(function (n) { return String(n).padStart(2, '0'); }).join(':');
      clock.dateTime = now.toTimeString().slice(0, 8);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
});
