// start screen
const startBtnEl = document.getElementById('startBtn');
const startScreenEl = document.getElementById('startScreen');
const viewHighscoresEl = document.getElementById('viewHighscores')

// questions
const questionEl = document.getElementById('question');
const questionContainerEl = document.getElementById('questionContainer');
const answers = Array.from(document.querySelectorAll('.answerBtn'));
const correctEl = document.getElementById('correctSign');
const wrongEl = document.getElementById('wrongSign');
const correctWrongSectionEl = document.getElementById('correctAndWrong');

let randomQuestion;
let questionIndex;
let currentQuestion;

// game end
const gameOverEl = document.getElementById('gameOverScreen');
const submitBtnEl = document.getElementById('submitBtn');
const retakeBtnEl = document.getElementById('retakeBtn');
const userIdEL = document.getElementById('#userInitials');

// high score
const highscoreEl = document.querySelector('#highscores');
const usernamesEl = document.querySelector('#usernames');
const scoresEl = document.querySelector('#scores');

// Timer/Score Variables
let timeLeft = 60;
const timerDisplayEL = document.getElementById('timer');
let interval;

// button actions

// start quiz
startBtnEl.addEventListener('click', startQuiz)

// restart quiz
retakeBtnEl.addEventListener('click', reloadTest)

// Submit score button
submitBtnEl.addEventListener('click', submitScore)
viewHighscoresEl.addEventListener('click', () => {
    startScreenEl.classList.add('hide');
    questionContainerEl.classList.add('hide');
    gameOverEl.classList.add('hide');
    highscoreEl.classList.remove('hide');
})


// Functions
function timeHandler() {
    interval = setInterval(function() {

        // validate that there is still time left for playing
        if (timeLeft <= 0){
            clearInterval(timeLeft = 0);
            // Alert user to the end of the game
            startScreenEl.classList.add('hide');
            questionContainerEl.classList.add('hide')
            gameOverEl.classList.remove('hide')
        };

        // Render time for display
        timerDisplayEL.innerHTML = ('Timer/Score: ' + timeLeft)

        timeLeft -= 1
    }, 1000)     
};

function startQuiz() {

    startScreenEl.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    gameOverEl.classList.add('hide');
    timeHandler();
    questionIndex = 0;
    randomQuestion = questions.sort(() => Math.random() - .5);
    showNewQuestion(randomQuestion, questionIndex);
};

function showNewQuestion(randomQuestion, questionIndex) {
    if (questionIndex >= randomQuestion.length) {
        clearInterval(interval)
        questionContainerEl.classList.add('hide');
        gameOverEl.classList.remove('hide')
        return;
    }
    let currentQuestion = randomQuestion[questionIndex];
    questionEl.innerText = currentQuestion.question

    answers.forEach(answer => {
        const number = answer.dataset['number'];
        answer.innerText = number + '. ' + currentQuestion['answer' + number];
    })
};

// FOR EACH answer button 
answers.forEach(answer => {
    // If the user CLICKS on a button we want certain actions to happen.
    answer.addEventListener('click', event => {
        event.preventDefault();
        const selectedAnswer = event.target.dataset.number

    // IF the button they click on is the right answer
    if (selectedAnswer == questions[questionIndex].correctAnswer) {

        questionIndex++;
        showNewQuestion(randomQuestion, questionIndex);
    }

    // wrong answer function
    else if (selectedAnswer != questions[questionIndex].correctAnswer) {
        timeLeft-=10;
        questionIndex++;
        showNewQuestion(randomQuestion, questionIndex);
    }
    })
    
})

function submitScore() {
    let score = timeLeft;
    let userScore = {
        User: userIdEL, 
        Score: score
    };
    let userScoreString = JSON.stringify(userScore);
    localStorage.setItem("userScore", userScoreString);
    console.log(localStorage);
    highscoreEl.classList.remove('hide');
    gameOverEl.classList.add('hide');
};

function reloadTest() {
    location.reload();
    return;
}


