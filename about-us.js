// about-us.js - Validation for the "Join Our Team" form (About Us page)

function validateJoinForm() {
  var name = document.getElementById("name").value.trim();
  var photo = document.getElementById("photo").value;
  var dob = document.getElementById("dob").value;
  var email = document.getElementById("email").value.trim();
  var expertise = document.getElementById("expertise").value.trim();
  var skills = document.getElementById("skills").value.trim();
  var education = document.getElementById("education").value.trim();

  // 1) No empty fields
  if (name == "" || photo == "" || dob == "" || email == "" ||
      expertise == "" || skills == "" || education == "") {
    alert("Please fill in all the fields.");
    return false;
  }

  // 2) Name cannot start with a number
  if (/^[0-9]/.test(name)) {
    alert("Name cannot start with a number.");
    return false;
  }

  // 3) Photo must be an image file
  if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(photo)) {
    alert("Photo must be an image file (jpg, jpeg, png, gif, bmp, svg, webp).");
    return false;
  }

  // 4) Birth year must be 2008 or earlier
  var year = parseInt(dob);   // "2007-05-14" -> 2007
  if (year > 2008) {
    alert("Year of birth must be 2008 or earlier.");
    return false;
  }

  // Valid form
  alert("Thank you, " + name + "! Your request to join our team has been sent successfully.");
  document.getElementById("joinForm").reset();
  return false;
}
