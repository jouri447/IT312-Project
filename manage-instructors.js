// Manage Activity Leaders & Instructors page (Jouri)
// The list is an array of objects saved in local storage,
// so deletions and additions stay after the page is reloaded.

var defaultMembers = [
  { name: "Ghadha Aldablan",  expertise: "Fashion Design",             photo: "images/ghadha-aldablan.svg" },
  { name: "Lara Almani",      expertise: "Styling & Personal Image",   photo: "images/lara-almani.svg" },
  { name: "Jouri Alsulaiman", expertise: "Textile & Sustainability",   photo: "images/jouri-alsulaiman.svg" },
  { name: "Reema Alessa",     expertise: "Fashion Illustration",       photo: "images/reema-alessa.svg" }
];

var members;

function loadMembers() {
  members = JSON.parse(localStorage.getItem("members"));
  if (members == null) {
    members = defaultMembers;
  }
}

function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
}

// Show a checkbox card for every person in the array
function showMembers() {
  var list = document.getElementById("member-list");
  var cards = "";

  if (members.length == 0) {
    list.innerHTML = "<p>There are no activity leaders or instructors.</p>";
    return;
  }

  for (var i = 0; i < members.length; i++) {
    var expertise = members[i].expertise.replace(/&/g, "&amp;");
    cards += "<div class=\"member-card\">" +
               "<input type=\"checkbox\" id=\"del-" + i + "\" name=\"delete-member\" value=\"" + i + "\">" +
               "<label for=\"del-" + i + "\">" +
                 "<img src=\"" + members[i].photo + "\" alt=\"Photo of " + members[i].name + "\" width=\"90\" height=\"90\">" +
                 "<strong>" + members[i].name + "</strong>" +
                 "<span class=\"expertise\">" + expertise + "</span>" +
               "</label>" +
             "</div>";
  }
  list.innerHTML = cards;
}

function deleteMembers() {
  var boxes = document.getElementsByName("delete-member");
  var selected = 0;

  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected++;
    }
  }

  if (selected == 0) {
    alert("Please select at least one person to delete.");
    return false;
  }

  if (confirm("Are you sure you want to delete the " + selected + " selected person(s)?")) {
    // Keep only the people that were NOT checked
    var remaining = [];
    for (var j = 0; j < boxes.length; j++) {
      if (!boxes[j].checked) {
        remaining.push(members[j]);
      }
    }
    members = remaining;
    saveMembers();
    showMembers();
  }

  return false;
}

function addMember() {
  var name = document.getElementById("member-name").value;
  var photo = document.getElementById("member-photo").value;
  var dob = document.getElementById("member-dob").value;
  var email = document.getElementById("member-email").value;
  var expertise = document.getElementById("member-expertise");
  var skills = document.getElementById("member-skills").value;
  var education = document.getElementById("member-education").value;

  var errors = "";

  if (name.trim() == "") {
    errors += "- Name is missing.\n";
  } else if (name.search(/^\d/) != -1) {
    errors += "- Name cannot start with a number.\n";
  }

  if (photo == "") {
    errors += "- Photo is missing.\n";
  } else if (photo.search(/\.(jpg|jpeg|png|gif|svg|webp)$/i) == -1) {
    errors += "- Photo must be an image file (jpg, jpeg, png, gif, svg or webp).\n";
  }

  if (dob == "") {
    errors += "- Date of Birth is missing.\n";
  }

  if (email.trim() == "") {
    errors += "- Email is missing.\n";
  } else if (email.search(/^[\w.\-]+@[\w\-]+(\.[\w\-]+)+$/) == -1) {
    errors += "- Email is not valid (example: name@example.com).\n";
  }

  if (expertise.value == "") {
    errors += "- Please select an Area of Expertise.\n";
  }

  if (skills.trim() == "") {
    errors += "- Skills are missing.\n";
  }

  if (education.trim() == "") {
    errors += "- Education is missing.\n";
  } else if (education.search(/^\d/) != -1) {
    errors += "- Education cannot start with a number.\n";
  }

  if (errors != "") {
    alert("Please fix the following:\n\n" + errors);
    return false;
  }

  // Add the new person to the array (a placeholder photo is used,
  // and no profile page is needed)
  var newMember = {
    name: name.trim(),
    expertise: expertise.options[expertise.selectedIndex].text,
    photo: "images/instructor-placeholder.svg"
  };
  members.push(newMember);
  saveMembers();
  showMembers();

  alert(newMember.name + " was added to the list.");

  // Clear the form
  document.getElementById("member-name").value = "";
  document.getElementById("member-photo").value = "";
  document.getElementById("member-dob").value = "";
  document.getElementById("member-email").value = "";
  expertise.value = "";
  document.getElementById("member-skills").value = "";
  document.getElementById("member-education").value = "";

  return false;
}

window.onload = function () {
  loadMembers();
  showMembers();
};
