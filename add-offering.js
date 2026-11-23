// Add a New Offering page (Jouri)
// Checks the form, then saves the offering in local storage
// as an array of objects so ALL added offerings are kept.

var instructorNames = {
  ghadha: "Ghadha Aldablan",
  lara: "Lara Almani",
  jouri: "Jouri Alsulaiman",
  reema: "Reema Alessa"
};

// Fill the instructor list with the people on the Manage Leaders & Instructors page.
// If that list was never changed, the four instructors already in the HTML are kept.
function loadInstructors() {
  var members = JSON.parse(localStorage.getItem("members"));
  if (members == null) {
    return;
  }

  var options = "<option value=\"\">-- Select an instructor --</option>";
  for (var i = 0; i < members.length; i++) {
    options += "<option value=\"" + members[i].name + "\">" + members[i].name + "</option>";
  }
  document.getElementById("offering-instructor").innerHTML = options;
}

window.onload = loadInstructors;

// Full name of the selected instructor
function getInstructorName(value) {
  if (instructorNames[value]) {
    return instructorNames[value];
  }
  return value;
}

// true if the text is empty or only spaces
function isEmpty(text) {
  return text.search(/^\s*$/) != -1;
}

function validateOffering() {
  var name = document.getElementById("offering-name").value;
  var description = document.getElementById("offering-description").value;
  var price = document.getElementById("offering-price").value;
  var date = document.getElementById("offering-date").value;
  var instructor = document.getElementById("offering-instructor");
  var image = document.getElementById("offering-image").value;

  var errors = "";

  // Offering name: not empty and cannot start with a number
  if (isEmpty(name)) {
    errors += "- Offering Name is missing.\n";
  } else if (name.search(/^\s*\d/) != -1) {
    errors += "- Offering Name cannot start with a number.\n";
  }

  if (isEmpty(description)) {
    errors += "- Description is missing.\n";
  }

  // Price: not empty and must be a number (0 or more)
  if (isEmpty(price)) {
    errors += "- Price is missing (it must be a number, enter 0 if free).\n";
  } else if (isNaN(price) || parseFloat(price) < 0) {
    errors += "- Price must be a number of 0 or more.\n";
  }

  if (date == "") {
    errors += "- Date is missing.\n";
  }

  if (instructor.value == "") {
    errors += "- Please select an instructor.\n";
  }

  // Image: not empty and must be an image file
  if (image == "") {
    errors += "- Image is missing.\n";
  } else if (image.search(/\.(jpg|jpeg|png|gif|svg|webp)$/i) == -1) {
    errors += "- The uploaded file must be an image (jpg, jpeg, png, gif, svg or webp).\n";
  }

  // Stop and explain what is missing
  if (errors != "") {
    alert("Please fix the following:\n\n" + errors);
    return false;
  }

  // Get the previously added offerings (or start a new array)
  var offerings = JSON.parse(localStorage.getItem("offerings"));
  if (offerings == null) {
    offerings = [];
  }

  // Add the new offering as an object
  var newOffering = {
    name: name,
    description: description,
    price: parseFloat(price),
    date: date,
    instructor: getInstructorName(instructor.value),
    image: image.substring(image.lastIndexOf("\\") + 1)
  };
  offerings.push(newOffering);
  localStorage.setItem("offerings", JSON.stringify(offerings));

  alert("The offering \"" + newOffering.name + "\" was added successfully.");

  // Clear the form
  document.getElementById("offering-name").value = "";
  document.getElementById("offering-description").value = "";
  document.getElementById("offering-price").value = "0";
  document.getElementById("offering-date").value = "";
  instructor.value = "";
  document.getElementById("offering-image").value = "";

  // Stay on the page (do not send the form)
  return false;
}
