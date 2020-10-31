// select all elements
var startEl = document.getElementById("start");
var  quizEl = document.getElementById("quiz");
var  questionEl = document.getElementById("question");
var  ansAEl = document.getElementById("A");
var  ansBEl = document.getElementById("B");
var  ansCEl = document.getElementById("C");
var indexQuestion = 0;

// create our questions
var questionList = [
    {
        question : "What does HTML stand for?",
        ansA : "HyperText Markup Language",
        ansB : "Hotty Totty Moom A Lotty",
        ansC : "Hover Task Markup Literal",
        correct : "A"
    },
    {
        question : "What does CSS stand for?",
        ansA : "Wrong",
        ansB : "Correct",
        ansC : "Wrong",
        correct : "B"
    },
    {
        question : "What does JS stand for?",
        ansA : "Wrong",
        ansB : "Wrong",
        ansC : "Correct",
        correct : "C"
    }
];

// function to render questions

function renderQuestion(){
    
    var questionShow = questionList[indexQuestion];

    questionEl.innerHTML = "<p>"+ questionShow.question +"</p>";
    ansAEl.innerHTML = questionShow.ansA;
    ansBEl.innerHTML = questionShow.ansB;
    ansCEl.innerHTML = questionShow.ansC;
}

startEl.addEventListener("click", renderQuestion);

// start quiz

function startQuiz(){
    renderQuestion();
    
}

// function to determine if the question is correct

function checkAns(answer){
    if( answer == questionList[indexQuestion].correct){
        score++;
    } else
    count = 0;
    if(indexQuestion < lastQuestion){
        indexQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
