var form = document.getElementById("evaluationForm");

form.onsubmit = function(event) {
    event.preventDefault();

    var offering = document.getElementById("completed-offering").value;
    var feedback = document.getElementById("written-feedback").value;
    var stars = document.getElementsByName("rating");
    var rating = 0;

    for (var i = 0; i < stars.length; i++) {
        if (stars[i].checked == true) {
            rating = Number(stars[i].value);
        }
    }

    if (offering == "" || rating == 0 || feedback.trim() == "") {
        alert("Please complete all required fields.");
        return;
    }

    if (rating >= 4) {
        alert("Thank you for your positive feedback!");
    } else {
        alert("We are sorry your experience did not meet your expectations. Thank you for your feedback!");
    }

    form.reset();
    document.getElementById("evaluationReturn").style.display = "block";
};