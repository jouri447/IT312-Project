var form = document.getElementById("requestForm");

// Requests are kept only while the member stays on this page
var requests = [];

form.onsubmit = function(event) {
    event.preventDefault();

    var offering = document.getElementById("offering").value;
    var fullName = document.getElementById("fullname").value;
    var preferredDate = document.getElementById("preferred-date").value;
    var message = document.getElementById("message").value;

    // Check the inputs and explain what is missing
    var errors = "";
    if (offering == "") {
        errors += "- Please select an offering.\n";
    }
    if (fullName.trim() == "") {
        errors += "- Please enter your full name.\n";
    } else if (/[0-9]/.test(fullName)) {
        errors += "- Name cannot contain numbers.\n";
    } else if (/[?!@]/.test(fullName)) {
        errors += "- Name cannot contain characters such as ?, ! or @.\n";
    } else if (!/^\s*[A-Za-z]+(\s+[A-Za-z]+)+\s*$/.test(fullName)) {
        errors += "- Please enter your full name (first and last name).\n";
    }
    if (preferredDate == "") {
        errors += "- Please choose a preferred date.\n";
    } else {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var parts = preferredDate.split("-");
        var chosen = new Date(parts[0], parts[1] - 1, parts[2]);
        if (chosen <= today) {
            errors += "- Preferred date must be a future date.\n";
        }
    }
    if (errors != "") {
        alert("Please fix the following:\n\n" + errors);
        return;
    }

    var offeringList = document.getElementById("offering");
    var request = {
    offering: offeringList.options[offeringList.selectedIndex].text,
    fullName: fullName,
    preferredDate: preferredDate,
    message: message };
    requests.push(request);
    displayRequests();

    var addAnother = confirm(
    "Request submitted successfully!\n\n" +
    "Would you like to add another request?\n\n" +
    "OK = Add another\n" +
    "Cancel = Return to Member Dashboard"
);

if (addAnother == true) {
    document.getElementById("offering").value = "";
    document.getElementById("fullname").value = "";
    document.getElementById("preferred-date").value = "";
    document.getElementById("message").value = "";
} else {
    window.location.href = "member-dashboard.html";
}
};

function displayRequests() {
    var list = document.getElementById("requestsList");

    list.innerHTML = "<h2>Submitted Requests</h2>";

    for (var i = 0; i < requests.length; i++) {
        var p = document.createElement("p");

        p.textContent = requests[i].fullName + " - " +
                        requests[i].offering + " - " +
                        requests[i].preferredDate;

        list.appendChild(p);
    }
}

displayRequests();
