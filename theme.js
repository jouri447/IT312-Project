/* Shared theme: load on every page to keep the chosen theme across navigation. */
(function () {
  var storageKey = 'khayt-theme';
  function savedTheme() {
    try { return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
    catch (error) { return 'light'; }
  }
  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    var button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(savedTheme());
    var button = document.getElementById('theme-toggle');
    if (button) button.addEventListener('click', function () {
      var next = document.body.classList.contains('dark') ? 'light' : 'dark';
      try { localStorage.setItem(storageKey, next); } catch (error) { /* storage unavailable */ }
      applyTheme(next);
    });
  });
})();
