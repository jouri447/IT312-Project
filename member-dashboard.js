var requests = JSON.parse(localStorage.getItem("requests")) || [];
var cards = document.getElementById("participationCards");

for (var i = 0; i < requests.length; i++) {

    var request = requests[i];

    var card = document.createElement("article");
    card.className = "participation-card";

    var image = document.createElement("img");
    var title = document.createElement("h3");

    if (request.offering == "fashion-illustration") {
        title.textContent = "Fashion Illustration Workshop";
        image.src = "images/fashion-illustration-workshop.jpeg";
    } else if (request.offering == "sustainable-fashion") {
        title.textContent = "Sustainable Fashion Course";
        image.src = "images/sustainable-fashion-course.jpeg";
    } else if (request.offering == "fashion-show") {
        title.textContent = "Fashion Show Experience";
        image.src = "images/fashion-show-experience.jpeg";
    }

    image.alt = title.textContent;

    var line = document.createElement("hr");

    var nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Name: " + request.fullName;

    var date = document.createElement("p");
    date.textContent = "Preferred Date: " + request.preferredDate;

    var statusParagraph = document.createElement("p");
    statusParagraph.textContent = "Status: Pending";

    var link = document.createElement("a");
    link.href = "club-offerings.html";
    link.className = "details-button";
    link.textContent = "View Details";

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(line);
    card.appendChild(nameParagraph);
    card.appendChild(date);
    card.appendChild(statusParagraph);
    card.appendChild(link);

cards.appendChild(card);
}
