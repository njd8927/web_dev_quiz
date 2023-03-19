var mainHeader = document.querySelector('.main-header');
var startPage = document.querySelector('.start-page');
var startBtn = document.querySelector('#start-button');
var questionDisplay = document.querySelector('.question-display');
var quest = document.querySelector('#quest');
var timerDisplay = document.querySelector('#timer-display');
var answerDisplay = document.querySelector('#answer-display');
var nextBtn = document.querySelector('#next-button');

var currentQuestion = questions;

//CREATE A VARIABLE TO TRACK CURRENT QUESTION INDEX
var currentQuestionIndex = 0;
//CREATE A VARIABLE THAT WILL HOLD THE CURRENT QUESTION OBJECT (QUESTIONS & ANSWERS ARE THE OBJECTS)
var currentQuestion;
//CREATE A VARIABLE TO STORE THE CURRENT TIMER COUNT
var count = 10;

//FUNCTION THAT IS CALLED WHEN THE END OF THE QUESTIONS ARRAY IS REACHED THAT PROMPTS USER TO RESTART
function promptUserToRestart() {
    var userChoice = confirm('Would you like to restart?');

    if (userChoice) {
        displayQuestion();
    } else {
        startBtn.classList.remove('hide');
        questionDisplay.innerText = 'Have a great day!';
        answerDisplay.classList.add('hide');
        nextBtn.classList.add('hide');
    }
}
//FUNCTION TO HIDE THE TIMER AND SHOW THE ANSWER AND NEXT BUTTON
function showAnswer() {
    answerDisplay.innerText = question.answer;
    timerDisplay.classList.add('hide');
    nextBtn.classList.remove('hide');
    answerDisplay.classList.remove('hide');

    currentQuestionIndex++;

    // IF THE CURRENTQUESTIONINDEX IS EQUAL TO THE QUESTIONS ARRAY LENGTH, 
    // THEN WE STOP QUESTIONS AND CONFIRM IF THE USER WOULD LIKE TO RESTART

    if (currentQuestionIndex === questions.length) {
        currentQuestionIndex = 0;
        nextBtn.classList.add('hide');
        promptUserToRestart();
    }
}

// CREATE A FUNCTION THAT STARTS A TIMER AT 5 SECONDS 
// AND COUNTS DOWN TO ZERO, THEN CALLS SHOWANSWER
function startTimer() {
    timerDisplay.classList.remove('hide');
    timerDisplay.innerText = '10';
    // CREATE A SETINTERVAL AND STORE IT TO A VARIABLE THAT TRIGGERS EVERY SECOND
    var timer = setInterval(function () {
        // DECREASE COUNT BY ONE
        count--;
        // SET TIMER DISPLAY TO THE COUNT VARIABLE
        timerDisplay.innerText = count;
        // IF COUNT IS EQUAL TO ZERO, STOP TIMER AND SHOW ANSWER/NEXT BUTTON
        if (!count) {
            // !COUNT = NOT COUNT
            clearInterval(timer);
            count = 5;
            showAnswer();
        }
    }, 1000);
}
// CREATE A FUNCTION THAT GRABS THE CURRENT CARD OBJECT 
// AND DISPLAYS THE QUESTION TO THE WINDOW
function displayQuestion() {
    // CREATE A VARIABLE REFRENCE TO THE CURRENT QUESTION OBJECT FROM THE QUESTIONS ARRAY
    var question = questions[currentQuestionIndex];

    questionDisplay.classList.remove('hide');

    questionDisplay.innerText = question.question;
    // QUESTION DISPLAY IS NOW SET TO THE FIRST QUESTION (QUESTION.QUESTION)
    // QUESTION IS THE NEW VARIABLE WHICH HAS A VALUE OF THE CURRENT QUESTION INDEX OF 
    // THE QUESTIONS VARIABLE WITH THE QUESTIONS & ANSWERS

    answerDisplay.classList.add('hide');
    nextBtn.classList.add('hide');
    startTimer();
}



// HIDE THE START BUTTON AND CALL THE DISPLAY CARD FUNCTION ABOVE
function startQuestions() {
    startBtn.classList.add('hide');
    displayQuestion();
    startTimer();
}

// WHEN USER CLICKS START BUTTON, SHOW THE FIRST QUESTION
startBtn.addEventListener('click', startQuestions);
nextBtn.addEventListener('click', displayQuestion);
// WHEN TIMER RUNS OUT, SHOW THE ANSWER
// SHOW A NEXT BUTTON TO ALLOW THE USER TO MOVE ONTO NEXT QUESTION


// WHEN THE END OF THE QUESTIONS ARRAY HAS BEEN REACHED, SHOW THE USER A CONFIRMATION
// ASKING IF THEY WOULD LIKE TO RESTART FROM THE BEGINNING
// IF THEY CONFIRM YES, RESET QUESTION INDEX TO 0 AND SHOW FIRST QUESTION
// IF THEY CONFIRM NO, SHOW A GOODBYE MESSAGE
