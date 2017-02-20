let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;

function guess() {

    let input = document.getElementById('user-guess').value;
    //add functionality to guess function here
    if (answer == '') {
        setHiddenFields();
    }

    if (validateInput(input)) {

        if (getResults(input)) {
            setMessage("You Win! :)");
            showAnswer(true);
        } else {
            if (attempt >= 10) {
                setMessage("You Lose :(");
                showAnswer(false);

            } else {
                setMessage("Incorrect, try again.");
            }
        }
    }
}
//implement new functions here
function setHiddenFields() {
    let randomNr = Math.floor(Math.random() * 9999).toString();
    while (randomNr.length < 4) {
        randomNr = "0"+randomNr;
    }
    answer = randomNr;
    attempt = 0;
}
function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}
function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    attempt++;
    return true;
}
function getResults(input) {
    let correct = 0;
    let html = "<div class='row'><span class='col-md-6'>" + input + "</span>";
    html += "<div class='col-md-6'>";
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == answer.charAt(i)) {
            correct++;
            html += "<span class='glyphicon glyphicon-ok'></span>";
        } else if (answer.indexOf(input.charAt(i)) != -1) {
            html += "<span class='glyphicon glyphicon-transfer'></span>";
        } else {
            html += "<span class='glyphicon glyphicon-remove'></span>";
        }
    }
    html += "</div></div>";
    document.getElementById("results").innerHTML += html;

    if (correct == input.length) {
        return true;
    } else {
        return false;
    }
}
function showAnswer(correct) {
    document.getElementById("code").innerHTML = answer;
    if (correct) {
        document.getElementById("code").className += " success";
    } else {
        document.getElementById("code").className += " failure";
    }
    showReplay();
}
function showReplay() {
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}