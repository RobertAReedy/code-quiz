/* I should only make the header stuff transparent
when viewing high scores, rather than disappearing
them entirely*/

/* The div called Main will stay for all states
of the program, and will not ever be removed*/

var mainEl = document.querySelector("#main-page");
var qSheetEl = document.createElement("div");

/**
 * Will show the sheet used for asking questions. Currently
 * in styling and HTML stage.
 */
var createQuestionSheet = function() {
    var questionAnswerBoxEl = document.createElement("div");
    var questionEl = document.createElement("h1");
    var answerButtons = [];
    var isCorrectEl = document.createElement("h2");

    qSheetEl.className = "question-sheet";
    questionEl.textContent = "What was the birthplace of Mesopotamian civilization?";
    isCorrectEl.textContent = "will be correct or incorrect";

    questionAnswerBoxEl.appendChild(questionEl);
    for (var i = 0; i < 4; i++) {
        answerButtons.push(document.createElement("button"));
        answerButtons[i].textContent = i + ": placeholder answer";
        questionAnswerBoxEl.appendChild(answerButtons[i]);
    }
    qSheetEl.appendChild(questionAnswerBoxEl);
    qSheetEl.appendChild(isCorrectEl);
    mainEl.appendChild(qSheetEl);
}

createQuestionSheet(); //for testing purposes

