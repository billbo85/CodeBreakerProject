
let attempt = document.getElementById('attempt');
let answer = document.getElementById('answer');
function guess() {

    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if (answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }



    if (validateInput(input.value)) {

        if (getResults(input.value)) {
            setMessage("You Win! :)");
            showAnswer(true);
        } else {
            if (attempt.value >= 10) {
                setMessage("You Lose! :(");
                showAnswer(false);
                showReplay();

            } else {
                setMessage("Incorrect, try again.");
                showReplay();
            }
        }
    }
}
//implement new functions here
function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 10000).toString();
    while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
        attempt.value = 0;
}

function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}
function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    attempt.value++;
    return true;
}
function getResults(input) {
    let correct = 0;
    let html = "<div class='row'><span class='col-md-6'>" + input + "</span>";
    html += "<div class='col-md-6'>";
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == answer.value.charAt(i)) {
            correct++;
            html += "<span class='glyphicon glyphicon-ok'></span>";
        } else if (answer.value.indexOf(input.charAt(i)) != -1) {
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
    document.getElementById("code").innerHTML = answer.value;
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