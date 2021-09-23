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

//where the questions will be stored as objects
var questions = [];

var timerEl = document.querySelector("#timer");
var time = 300;
var timeInterval;

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
    startButtonEl.setAttribute("id", "start-button"); 

    introSheetEl.setAttribute("id", "hide-sheet");
    introSheetEl.appendChild(introTitleEl);
    introSheetEl.appendChild(introLineEl);
    introSheetEl.appendChild(startButtonEl);

    mainEl.appendChild(introSheetEl);
}



/**
 * Will create the sheet used for asking questions. 
 */
var createQuestionSheet = function() {
    var questionAnswerBoxEl = document.createElement("div");
    
    questionEl.textContent = "What was the birthplace of Mesopotamian civilization?";
    isCorrectEl.textContent = "will be correct or incorrect";
    
    questionAnswerBoxEl.appendChild(questionEl);
    for (var i = 0; i < 4; i++) {
        answerButtons.push(document.createElement("button"));
        answerButtons[i].textContent = i + ": placeholder answer";
        answerButtons[i].className = "answer-button";
        answerButtons[i].setAttribute("id", (i+1)); //------------------------------------------------------
        questionAnswerBoxEl.appendChild(answerButtons[i]);
    }
    qSheetEl.appendChild(questionAnswerBoxEl);
    qSheetEl.appendChild(isCorrectEl);

    qSheetEl.setAttribute("id", "hide-sheet");

    mainEl.appendChild(qSheetEl);
}

//Variables that need to be updated on the 
//end page
var endSheetEl = document.createElement("div");
endSheetEl.className = "end-sheet";
var nameInputEl = document.createElement("input");
var nameInputButtonEl = document.createElement("button");
nameInputButtonEl.textContent = "Submit";
var showScoreEl = document.createElement("p");

/**
 * Will create the sheet shown after testing is over.
 */
var createEndSheet = function() {
    var endTitleEl = document.createElement("h1");
    var nameInputLabelEl = document.createElement("label");

    endTitleEl.textContent = "All done!";
    showScoreEl.textContent = "Your final score is " + "PLACEHOLDER" + ".";
    nameInputLabelEl.textContent = "Enter initials:";

    endSheetEl.appendChild(endTitleEl);
    endSheetEl.appendChild(showScoreEl);
    endSheetEl.appendChild(nameInputLabelEl);
    endSheetEl.appendChild(nameInputEl);
    endSheetEl.appendChild(nameInputButtonEl);

    endSheetEl.setAttribute("id", "hide-sheet");

    mainEl.appendChild(endSheetEl);
}

//variables needed visible for the high score sheet
var highScoreSheetEl = document.createElement("div");
highScoreSheetEl.className = "high-score-sheet";
var scoresEl = [];

/**
 * Will create the high score sheet.
 */
var createHighScoreSheet = function() {
    var highScoreTitleEl = document.createElement("h1");
    var highScoreReturnButtonEl = document.createElement("button");
    var highScoreClearButtonEl = document.createElement("button");

    var testHighScore = {
        name: document.createElement("p"),
        score: 20
    }
    var testHighScore2 = {
        name: document.createElement("p"),
        score: 10
    }

    highScoreTitleEl.textContent = "High scores";
    highScoreReturnButtonEl.textContent = "Go back";
    highScoreReturnButtonEl.setAttribute("id", "go-back-button");
    highScoreClearButtonEl.textContent = "Clear high scores";

    testHighScore.name.textContent = "xX_n00bpwnzer420_Xx";
    testHighScore2.name.textContent = "a dead mouse";
    scoresEl.push(testHighScore);
    scoresEl.push(testHighScore2);

    highScoreSheetEl.appendChild(highScoreTitleEl);
    for (var i = 0; i < scoresEl.length; i++) {
        highScoreSheetEl.appendChild(scoresEl[i].name);
        scoresEl[i].name.textContent = (i + 1) + ": " + scoresEl[i].name.textContent + " - " + scoresEl[i].score;
    }
    highScoreSheetEl.appendChild(highScoreReturnButtonEl);
    highScoreSheetEl.appendChild(highScoreClearButtonEl);

    highScoreSheetEl.setAttribute("id", "hide-sheet");
  
    mainEl.appendChild(highScoreSheetEl);
}


function showSheet(sheet) {
    introSheetEl.setAttribute("id", "hide-sheet");
    qSheetEl.setAttribute("id", "hide-sheet");
    endSheetEl.setAttribute("id", "hide-sheet");
    highScoreSheetEl.setAttribute("id", "hide-sheet");
    sheet.setAttribute("id", "");
}

// Functionality code below ------------------------------------------------------------------------------

/**
 * Function called start() to set a single question and its answers
 */
var setQuestion = function(question) {
    questionEl.textContent = question.question;
    answerButtons[0].textContent = question.answer1;
    answerButtons[1].textContent = question.answer2;
    answerButtons[2].textContent = question.answer3;
    answerButtons[3].textContent = question.answer4;
}

/**
 * Begins once the start button is pressed. This function will take the quiz.
 */
var whichQuestion = 0;
var startQuiz = function() {
    timeInterval = null;
    timeInterval = setInterval(function() {
        timerEl.textContent = "Time: " + time;
        console.log("time remaining: " + time);
        time--;
        if (time <= 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
    console.log("set interval script passed");
    questions = [
        {
            question: "What is the difference between a parameter and an argument?",           
            answer1: "A parameter is accepted by a function, and an argument is given to one.",
            answer2: "A function can have many arguments, but only one parameter.",
            answer3: "A parameter can be reassigned, but a function cannot.",
            answer4: "There is no difference.",
            correctAnswer: 1
        },
        {
            question: "The answer is the fourth answer.",
            answer1: "1: lorem upside down idk",
            answer2: "2: just a test.",
            answer3: "3: we dream ourselves awake",
            answer4: "4: Pick this answer.",
            correctAnswer: 4
        }
    ];
    setQuestion(questions[whichQuestion]);
}

var resetQuiz = function() {
    whichQuestion = 0;
    time = 300;
    clearInterval(timeInterval);
    console.log("reset activated");
}

/**
 * Shows the final result, and prompts the user to enter their initials for a high score
 */
var showResults = function() {
    clearInterval(timeInterval);
    timerEl.textContent = "Time: " + time;
    showScoreEl.textContent = "Your final score is " + time + ".";
}

createIntroSheet(); 
createQuestionSheet();
createEndSheet();
createHighScoreSheet();
showSheet(introSheetEl);


document.getElementById("start-button").addEventListener("click", function() {
    showSheet(qSheetEl);
    startQuiz();
});

document.getElementById("high-score-button").addEventListener("click", function() {
    showSheet(highScoreSheetEl);
});

document.getElementById("go-back-button").addEventListener("click", function() {
    showSheet(introSheetEl);
    resetQuiz();
});

/**
 * This takes the rest of the quiz
 */
document.addEventListener('click', function(e) { 
    if (e.target.className === "answer-button") {

        if (questions[whichQuestion].correctAnswer == (e.target.getAttribute("id"))) {
            console.log("Correct answer selected");
        }
        else {
            console.log("Incorrect answer selected");
            if (time > 10) {
                time -= 10;
            }
        }
        whichQuestion++;
        if (whichQuestion < questions.length) {
            setQuestion(questions[whichQuestion]);
        }
        else {
            showSheet(endSheetEl);
            showResults();
        }
    }
})



