/* I should only make the header stuff transparent
when viewing high scores, rather than disappearing
them entirely*/

/* The div called Main will stay for all states
of the program, and will not ever be removed*/

var mainEl = document.querySelector("#main-page");

//The intro sheet
var introSheetEl = document.createElement("div");
introSheetEl.className = "intro-sheet";

//These are the variables that need to be updated
//on the question page
var qSheetEl = document.createElement("div");
qSheetEl.className = "question-sheet";
var questionEl = document.createElement("h1");
var answerButtons = [];
var isCorrectEl = document.createElement("h2");

//Variables that need to be updated on the 
//end page
var endSheetEl = document.createElement("div");
var nameInputEl = document.createElement("input");
var nameInputButtonEl = document.createElement("button");
nameInputButtonEl.textContent = "Submit";

/**
 * Will create the sheet shown to the user first.
 */
var createIntroSheet = function() {
    var introTitleEl = document.createElement("h1");
    var introLineEl = document.createElement("h2");
    var startButtonEl = document.createElement("button");
    introTitleEl.textContent = "Coding Quiz Challenge";
    introLineEl.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startButtonEl.textContent = "Start Quiz";


    introSheetEl.appendChild(introTitleEl);
    introSheetEl.appendChild(introLineEl);
    introSheetEl.appendChild(startButtonEl);
}

/**
 * Will create the sheet shown after testing is over.
 */
var createEndSheet = function() {
    var endTitleEl = document.createElement("h1");
    var showScoreEl = document.createElement("p");

    endTitleEl.textContent = "All done!";
    showScoreEl.textContent = "Your final score is " + "PLACEHOLDER";

    endSheetEl.appendChild(endTitleEl);
    endSheetEl.appendChild(showScoreEl);
    endSheetEl.appendChild(nameInputEl);
    endSheetEl.appendChild(nameInputButtonEl);
}

/**
 * Will create the sheet used for asking questions. Currently
 * in styling and HTML stage.
 */
var createQuestionSheet = function() {
    var questionAnswerBoxEl = document.createElement("div");
 
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
}

function showSheet(sheet) {
    mainEl.appendChild(sheet);
}

function hideSheet(sheet) {
    mainEl.removeChild(sheet);
}

createQuestionSheet();  
createIntroSheet(); 
createEndSheet();
showSheet(endSheetEl); //for testing


