var form = document.getElementById("requestForm");

form.onsubmit = function(event) {
    event.preventDefault();

    var offering = document.getElementById("offering").value;
    var fullName = document.getElementById("fullname").value;
    var preferredDate = document.getElementById("preferred-date").value;
    var message = document.getElementById("message").value;
    var request = {
    offering: offering,
    fullName: fullName,
    preferredDate: preferredDate,
    message: message };
    var requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));
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
    document.getElementById("requestsList").innerHTML +=
        '<p><a href="member-dashboard.html">Return to Member Dashboard</a></p>';
}
};

function displayRequests() {
    var requests = JSON.parse(localStorage.getItem("requests")) || [];
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