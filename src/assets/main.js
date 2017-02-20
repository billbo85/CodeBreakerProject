let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (attempt.value == '' || answer.value == '') {
        setHiddenFields();
    }

    if (!validateInput(input.value))
    {
        return false;
    } else {
        attempt++;
    }

    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else {
        if (attempt >= 10) {
            setMessage("You Lose :(");
            showAnswer(false);
            showReplay();
        } else {
            setMessage("Incorrect, try again.");
        }
    }

}
//implement new functions here
function setHiddenFields() {

    attempt = 0;
    answer = Math.floor(Math.random() * 9999).toString();

    while (answer.length < 4) {
        answer = "0"+answer;
    }
    console.log("answer: " + answer);
}

function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}

function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function getResults(input) {
    let correctGuesses = 0;
    let html = "<div class='row'><span class='col-md-6'>" + input + "</span>";
    html += "<div class='col-md-6'>";
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == answer.charAt(i)) {
            correctGuesses++;
            html += "<span class='glyphicon glyphicon-ok'></span>";
        } else if (answer.indexOf(input.charAt(i)) != -1) {
            html += "<span class='glyphicon glyphicon-transfer'></span>";
        } else {
            html += "<span class='glyphicon glyphicon-remove'></span>";
        }
    }
    html += "</div></div>";
    document.getElementById("results").innerHTML += html;

    if (correctGuesses == input.length) {
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
}

function showReplay() {
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}