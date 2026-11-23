// Club Manager Dashboard page (Jouri)
// Shows the manager's offerings in the My Offerings table:
//  1) the offerings the manager already had (saved as "my-offerings")
//  2) the offerings added on the "Add a New Offering" page (saved as "offerings")
// Edit and Delete work on both lists and the changes are saved in local storage.

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// The offerings the manager starts with (array of objects)
var startingOfferings = [
  { name: "Fashion Illustration Workshop", price: 100,  date: "2026-09-01" },
  { name: "Sustainable Fashion Course",    price: 1300, date: "2026-08-12" },
  { name: "Styling and Personal Image",    price: 200,  date: "2026-10-05" },
  { name: "Fashion Show Experience",       price: 0,    date: "2026-07-20" }
];

var myOfferings;     // "my-offerings" in local storage
var newOfferings;    // "offerings" in local storage (from Add a New Offering)

// "2026-09-01" -> "1 Sep 2026"
function formatDate(dateText) {
  var parts = dateText.split("-");
  return parseInt(parts[2]) + " " + months[parseInt(parts[1]) - 1] + " " + parts[0];
}

function loadOfferings() {
  myOfferings = JSON.parse(localStorage.getItem("my-offerings"));
  if (myOfferings == null) {
    myOfferings = startingOfferings;
  }
  newOfferings = JSON.parse(localStorage.getItem("offerings"));
  if (newOfferings == null) {
    newOfferings = [];
  }
}

function saveOfferings() {
  localStorage.setItem("my-offerings", JSON.stringify(myOfferings));
  localStorage.setItem("offerings", JSON.stringify(newOfferings));
}

// One table row. list is "my" or "new", index is the position in that list.
function makeRow(offering, list, index) {
  return "<tr>" +
           "<td class=\"offering-name\">" + offering.name + "</td>" +
           "<td>" + offering.price + " SAR</td>" +
           "<td><time datetime=\"" + offering.date + "\">" + formatDate(offering.date) + "</time></td>" +
           "<td>" +
             "<button type=\"button\" class=\"btn btn-dark\" onclick=\"editOffering('" + list + "', " + index + ")\">Edit</button> " +
             "<button type=\"button\" class=\"btn btn-light\" onclick=\"deleteOffering('" + list + "', " + index + ")\">Delete</button>" +
           "</td>" +
         "</tr>";
}

function showOfferings() {
  var rows = "";
  for (var i = 0; i < myOfferings.length; i++) {
    rows += makeRow(myOfferings[i], "my", i);
  }
  for (var j = 0; j < newOfferings.length; j++) {
    rows += makeRow(newOfferings[j], "new", j);
  }

  if (rows == "") {
    rows = "<tr><td colspan=\"4\">You have no offerings yet. Add one from the Add New Offering page.</td></tr>";
  }
  document.getElementById("offerings-body").innerHTML = rows;
}

// Returns the array that the row belongs to
function getList(list) {
  if (list == "my") {
    return myOfferings;
  }
  return newOfferings;
}

function deleteOffering(list, index) {
  var offerings = getList(list);
  if (confirm("Are you sure you want to delete \"" + offerings[index].name + "\"?")) {
    offerings.splice(index, 1);
    saveOfferings();
    showOfferings();
  }
}

function editOffering(list, index) {
  var offerings = getList(list);
  var offering = offerings[index];

  // New name (Cancel = stop editing)
  var name = prompt("Offering Name:", offering.name);
  if (name == null) {
    return;
  }
  if (name.search(/^\s*$/) != -1) {
    alert("Offering Name cannot be empty.");
    return;
  }
  if (name.search(/^\s*\d/) != -1) {
    alert("Offering Name cannot start with a number.");
    return;
  }

  // New price (Cancel = stop editing)
  var price = prompt("Price (SAR):", offering.price);
  if (price == null) {
    return;
  }
  if (price.search(/^\s*$/) != -1 || isNaN(price) || parseFloat(price) < 0) {
    alert("Price must be a number of 0 or more.");
    return;
  }

  offering.name = name;
  offering.price = parseFloat(price);
  saveOfferings();
  showOfferings();
  alert("\"" + offering.name + "\" was updated.");
}

window.onload = function () {
  loadOfferings();
  showOfferings();
};
