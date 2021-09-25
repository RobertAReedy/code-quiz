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

//variables needed for the timer to work
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
    isCorrectEl.setAttribute("id", "hide-sheet");
    
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
var highScoreSectionEl = document.createElement("div");
var scoresEl = [];

/**
 * Takes a score object, sorts it into the scoresEl array, empties ----------------------------------------------
 * the highScoreSectionEl div of the high scores, then reappends them
 * based on the new scoresEl array
 */
var addToScoreSheet = function(scoreObj) {
    for (var i = 0; i <= scoresEl.length; i++) {
        if (i == scoresEl.length) {
            scoresEl.push(scoreObj);
            break; //fun fact I forgot this one too but debugger saved me
        }
        else if (scoreObj.score > scoresEl[i].score) {
            scoresEl.splice(i, 0, scoreObj);
            break; //fun fact I forgot to put this break in and nearly crashed my computer
        }
    }
    
    highScoreSectionEl.innerHTML = null;
    for (var i = 0; i < scoresEl.length; i++) {
        //scoresEl[i].name.textContent = (i+1) + ": " + scoresEl[i].name.textContent;
        highScoreSectionEl.appendChild(scoresEl[i].name);
    }
}

/**
 * Will create the high score sheet.
 */
var createHighScoreSheet = function() {
    var highScoreTitleEl = document.createElement("h1");
    var highScoreReturnButtonEl = document.createElement("button");
    var highScoreClearButtonEl = document.createElement("button");

    var testHighScore = {
        name: document.createElement("p"),
        score: 280
    };
    var testHighScore2 = {
        name: document.createElement("p"),
        score: 200
    }

    highScoreTitleEl.textContent = "High scores";
    highScoreReturnButtonEl.textContent = "Go back";
    highScoreReturnButtonEl.setAttribute("id", "go-back-button");
    highScoreClearButtonEl.textContent = "Clear high scores";

    testHighScore.name.textContent = "Robbie Draymond - " + testHighScore.score;
    testHighScore2.name.textContent = "Xander Mobis - " + testHighScore2.score;
    addToScoreSheet(testHighScore);
    addToScoreSheet(testHighScore2);

    highScoreSheetEl.appendChild(highScoreTitleEl);
    highScoreSheetEl.appendChild(highScoreSectionEl);
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
            question: "Which answer denotes a paragraph element in HTML?.",
            answer1: "1: <div>",
            answer2: "2: <para>",
            answer3: "3: <p>",
            answer4: "4: <h1>",
            correctAnswer: 3
        },
        {
            question: "Which symbol, when two are placed around other characters, denotes a string in javascript?",
            answer1: "1: Double quotes \"a string\"",
            answer2: "2: Brackets [a string].",
            answer3: "3: Single quotes \'a string\'",
            answer4: "4: Both answers 1 and 3.",
            correctAnswer: 4
        }
    ];
    setQuestion(questions[whichQuestion]);
}

var resetQuiz = function() {
    whichQuestion = 0;
    time = 300;
    clearInterval(timeInterval);
    isCorrectEl.setAttribute("id", "hide-sheet");
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

var submitHighScore = function() {
    if (nameInputEl.value.trim() != "") {
        console.log("name input wasn't empty");
        //code for submission here
        var userScoreSubmit = {
            name: document.createElement("p"),
            score: time
        };
        userScoreSubmit.name.textContent = nameInputEl.value.trim()+" - "+userScoreSubmit.score;
        console.log("activating addToScoreSheet...");
        addToScoreSheet(userScoreSubmit); 
         

        showSheet(highScoreSheetEl);
    }
    else {
        console.log("name input was empty");
        alert("We need something in the box to submit as a high score");
    }
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

nameInputButtonEl.addEventListener("click", function() {
    console.log("submit button clicked");
    submitHighScore();
});

/**
 * This takes the rest of the quiz
 */
var isCorrectHide;
document.addEventListener('click', function(e) { 
    if (e.target.className === "answer-button") {
        isCorrectEl.setAttribute("id", "");
        clearTimeout(isCorrectHide);
        isCorrectHide = setTimeout(function() {isCorrectEl.setAttribute("id", "hide-sheet");}, 1000);
        if (questions[whichQuestion].correctAnswer == (e.target.getAttribute("id"))) {
            console.log("Correct answer selected");
            isCorrectEl.textContent = "Correct!";
        }
        else {
            console.log("Incorrect answer selected");
            isCorrectEl.textContent = "Wrong!";
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
});