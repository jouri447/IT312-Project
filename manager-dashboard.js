// Club Manager Dashboard page (Jouri)
// Reads the offerings added on the "Add a New Offering" page
// from local storage and shows them in the My Offerings table.

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-09-01" -> "1 Sep 2026" (same style as the other rows)
function formatDate(dateText) {
  var parts = dateText.split("-");
  return parseInt(parts[2]) + " " + months[parseInt(parts[1]) - 1] + " " + parts[0];
}

function showOfferings() {
  var offerings = JSON.parse(localStorage.getItem("offerings"));

  // No newly added offerings yet
  if (offerings == null || offerings.length == 0) {
    return;
  }

  var tableBody = document.getElementById("offerings-body");
  var rows = "";

  for (var i = 0; i < offerings.length; i++) {
    rows += "<tr>" +
              "<td class=\"offering-name\">" + offerings[i].name + "</td>" +
              "<td>" + offerings[i].price + " SAR</td>" +
              "<td><time datetime=\"" + offerings[i].date + "\">" + formatDate(offerings[i].date) + "</time></td>" +
              "<td>" +
                "<button type=\"button\" class=\"btn btn-dark\">Edit</button> " +
                "<button type=\"button\" class=\"btn btn-light\">Delete</button>" +
              "</td>" +
            "</tr>";
  }

  // Add the new rows after the offerings that are already in the table
  tableBody.innerHTML += rows;
}

window.onload = showOfferings;
