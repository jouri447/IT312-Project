/* Extra functionality: notification bell (used on every page).
   Clicking the bell opens the notifications panel, clicking it again closes it.
   Include this script at the end of the HTML body. */

var bellButtons = document.getElementsByClassName("notification-toggle");
var notificationPanel = document.getElementById("notification-panel");

if (bellButtons.length > 0 && notificationPanel) {
  bellButtons[0].onclick = function () {
    if (notificationPanel.style.display == "block") {
      notificationPanel.style.display = "none";
    } else {
      notificationPanel.style.display = "block";
    }
  };
}
