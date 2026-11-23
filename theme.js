/* Shared theme. The script is included at the end of the HTML body. */
var themeStorageKey = 'khayt-theme';
function applyTheme(theme) {
  // Keep any other body classes intact.
  var classes = document.body.className.replace(/\bdark\b/g, '').trim();
  document.body.className = theme == 'dark' ? (classes + ' dark').trim() : classes;
  var button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = theme == 'dark' ? '☀ Light mode' : '☾ Dark mode';
    button.setAttribute('aria-pressed', String(theme == 'dark')); // accessibility
  }
}
var selectedTheme = 'light';
try { if (localStorage.getItem(themeStorageKey) == 'dark') selectedTheme = 'dark'; }
catch (error) { /* storage unavailable */ }
applyTheme(selectedTheme);
var themeButton = document.getElementById('theme-toggle');
if (themeButton) {
  themeButton.onclick = function () {
    selectedTheme = document.body.className.indexOf('dark') == -1 ? 'dark' : 'light';
    try { localStorage.setItem(themeStorageKey, selectedTheme); }
    catch (error) { /* storage unavailable */ }
    applyTheme(selectedTheme);
  };
}
