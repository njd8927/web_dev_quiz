// CREATE VARIABLES TO TARGET HTML ID'S AND CLASSES
var mainHeader = document.querySelector('.main-header');
var startPage = document.querySelector('.start-page');
var startBtn = document.querySelector('#start-button');
var questionDisplay = document.querySelector('.question-display');
var quest = document.querySelector('#quest');
var timerDisplay = document.querySelector('#timer-display');
var answerDisplay = document.querySelector('#answer-display');
var nextBtn = document.querySelector('#next-button');
var choice1 = document.querySelector('#choice-1-btn');
var choice2 = document.querySelector('#choice-2-btn');
var choice3 = document.querySelector('#choice-3-btn');
var choice4 = document.querySelector('#choice-4-btn');
var scorecard = document.querySelector('#score');
var submitBtn = document.querySelector('#submit-button');


//  VARIABLE TO TRACK CURRENT QUESTION INDEX    
var currentQuestionIndex = 0;                                                                                          

// VARIABLE THAT WILL HOLD THE CURRENT QUESTION OBJECT (QUESTIONS & ANSWERS ARE THE OBJECTS)
var currentQuestion;
var timer;                                                                                                                 

// VAR TO SET THE QUIZ TIMER TO 45 SECONDS TO START
var count = 45;              

//FUNCTION THAT IS CALLED WHEN THE END OF THE QUESTIONS ARRAY IS REACHED THAT PROMPTS USER TO RESTART
function promptUserToRestart() {
    scorecard.classList.remove('hide');
    var userChoice = confirm('Would you like to restart?');

    if (userChoice) {
        displayQuestion();
    } else {
        startBtn.classList.remove('hide');
        questionDisplay.textContent = 'Have a great day!';
        answerDisplay.classList.add('hide');
        nextBtn.classList.add('hide');
    }
};

//FUNCTION TO HIDE THE TIMER AND SHOW THE ANSWER AND NEXT BUTTON
function showAnswer(event) {
    if (!event) {
        answerDisplay.textContent = 'timeout';
    } else {
        console.log(event.target.textContent);
        var i = currentQuestion.choices.indexOf(event.target.textContent);
        console.log(i);
        if (i == currentQuestion.correctIndex) {
            answerDisplay.textContent = 'Correct! ' + currentQuestion.choices[currentQuestion.correctIndex];
        } else {
            answerDisplay.textContent = 'Incorrect! ' + currentQuestion.choices[currentQuestion.correctIndex];
            count-=5;
        };
    }
 


    timerDisplay.classList.add('hide');
    nextBtn.classList.remove('hide');
    answerDisplay.classList.remove('hide');


    // IF THE CURRENTQUESTIONINDEX IS EQUAL TO THE QUESTIONS ARRAY LENGTH, 
    // THEN WE STOP QUESTIONS AND CONFIRM IF THE USER WOULD LIKE TO RESTART

    if (currentQuestionIndex === questions.length) {
        currentQuestionIndex = 0;
        nextBtn.classList.add('hide');
        promptUserToRestart();
    }
};


// FUNCTION TO GENERATE TIMER
function startTimer() {
    timerDisplay.classList.remove('hide');
    timerDisplay.textContent = 'Count: ' + count;

// SETINTERVAL AND STORE IT TO A VARIABLE THAT TRIGGERS EVERY SECOND
    timer = setInterval(function () {
      
        // DECREASE COUNT BY ONE
        count--;
        // SET TIMER DISPLAY TO THE COUNT VARIABLE
        timerDisplay.textContent = 'Count: ' + count;
        // IF COUNT IS EQUAL TO ZERO, STOP TIMER AND SHOW ANSWER/NEXT BUTTON
        if (count <= 0) {
            // !COUNT = NOT QUAL
            clearInterval(timer);
            count = 45;
            showAnswer();
        }
    }, 1000);
};

// FUNCTION THAT GRABS THE CURRENT QUESTION OBJECT 
// AND DISPLAYS THE QUESTION TO THE WINDOW

function displayQuestion() {
    clearInterval(timer);
    // CREATE A VARIABLE REFRENCE TO THE CURRENT QUESTION OBJECT FROM THE QUESTIONS ARRAY
    currentQuestion = questions[currentQuestionIndex];

    questionDisplay.classList.remove('hide');
    console.log(currentQuestion);
    quest.innerText = currentQuestion.text
    choice1.textContent = currentQuestion.choices[0];
    choice2.textContent = currentQuestion.choices[1];
    choice3.textContent = currentQuestion.choices[2];
    choice4.textContent = currentQuestion.choices[3];




    // QUESTION DISPLAY IS NOW SET TO THE FIRST QUESTION (QUESTION.TEXT)
    // QUESTION IS THE NEW VARIABLE WHICH HAS A VALUE OF THE CURRENT QUESTION INDEX OF 
    // THE QUESTIONS VARIABLE WITH THE QUESTIONS & ANSWERS

    answerDisplay.classList.add('hide');
    nextBtn.classList.remove('hide');
    currentQuestionIndex++;
    startTimer();

};



// HIDE THE START BUTTON AND CALL THE DISPLAY QUESTION FUNCTION ABOVE

function startQuestions() {
    startBtn.classList.add('hide');
    displayQuestion();
};



// WHEN USER CLICKS START BUTTON, SHOW THE FIRST QUESTION

startBtn.addEventListener('click', startQuestions);
nextBtn.addEventListener('click', displayQuestion);
choice1.addEventListener('click', showAnswer);
choice2.addEventListener('click', showAnswer);
choice3.addEventListener('click', showAnswer);
choice4.addEventListener('click', showAnswer);
submitBtn.addEventListener('click', saveScore);



// FUNCTION TO LOG USER INITIALS AND SCORES IN LOCAL STORAGE
var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
function saveScore () {
    var userInitials = document.querySelector('#user-initials').value;
    var data = {
        initials: userInitials,
        score: count
    }; 
    highScores.push(data);
    localStorage.setItem("highscores", JSON.stringify(highScores));
    getScore();
};


// FUNCTION FOR USER TO SEE THEIR SCORE HISTORY IN LOCAL STORAGE AND BROWSER
function getScore () {
    var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    var ul = document.createElement('ul');
    for (var i=0; i < highScores.length; i++){
        var li = document.createElement('li');
        li.textContent = `${highScores[i].initials} : ${highScores[i].score}`
        ul.appendChild(li)
    }
    scorecard.appendChild(ul);
};

