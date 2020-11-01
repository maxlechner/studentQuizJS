var buttonStart = document.getElementById("start-game");
var timeLeft = document.getElementById("time-left");
var introBlock = document.getElementById("intro-block");
var questionSection = document.getElementById("questionModal");
var answers = document.getElementById("answers");
var questionEl = document.getElementById("question");
var correctOrWrongEl = document.getElementById("correctOrWrongAnswer");

var scoreInfo = document.getElementById("scoreInfo");
var submitBtn = document.getElementById("intials-button");
var intialsEl = document.getElementById("intials");
var totalScore = document.getElementById("score");

var backButtonEl = document.getElementById("go-back");
var clearButton = document.getElementById("clear");
var listHighscores = document.getElementById("player-list");

var interval;
var score;
var totalSeconds = 120;
var currentQuestion = 0;

var questions = [
    questionOne = {
        q : "Whats the most common way to create a variable?",
        a: ["var","int","float","string"],
        rightAnswer : 0
    },
    questionTwo = {
        q : "What key word is used to define a function?",
        a: ["module","var","float","function"],
        rightAnswer : 3
    },
    questionThree = {
        q : "How do you start a conditional statement?",
        a: ["else","else if","if","else if"],
        rightAnswer : 2
    },
    questionFour = {
        q : "what special character do you use to declare an array",
        a: ["{}","[]","<>","$$"],
        rightAnswer : 1
    },
    questionFive = {
        q : "how do you set the value of a variable?",
        a: ["==","===","=","!="],
        rightAnswer : 2
    },
    questionSix = {
        q : "What tag we use to link a JavaScript file to html",
        a: ["js","javascript","link","script"],
        rightAnswer : 3
    },
    questionSeven = {
        q : "whats the correct syntax for a for loop?",
        a: ["for i = 0, i < 5, i++",
            "(for i = 0; i < 5; i++)",
            "for i < 5",
            "for i to 5"],
        rightAnswer : 1
    },
    questionEight = {
        q : "What keyword do you use to return value from a function",
        a: ["return","break","float","string"],
        rightAnswer : 0
    },
    questionNine = {
        q : "What event is use to listed when the user, uses enter to input value ",
        a: ["click","hover","dblclick","submit"],
        rightAnswer : 3
    },
    questionTen = {
        q : "How do you target an elemnt by ID",
        a: ["document.getElementByClass()","document.getElementById()","document.querySelector()","document.getElementsByTagName"],
        rightAnswer : 1
    }
]

function startGame(event){
    score = 0;

    event.preventDefault();
    clearInterval(interval);

    interval = setInterval(Timer, 1000);
    introBlock.style.display = "none";
    questionSection.style.display = "block"; 
    
    displayQuestion(); 
}

//sets time and calls display time to display time
function timeHandler(){ 
    
    //check every time to see if time has ran out
    if (totalSeconds <= 0){
        finalScore();
    }
    totalSeconds--;
    var totalMinutes = Math.floor(totalSeconds/ 60);
    minutesLeft = totalMinutes;
    //console.log(totalMinutes);
    var secondsPerMinute = totalSeconds % 60;
    displayTime(totalMinutes, secondsPerMinute);
   // console.log(totalMinutes);
}

//formats time as displays time
function displayTime(totalMinutes, secondsPerMinute){
   // console.log(totalMinutes, secondPerMinute);
    if(totalMinutes == 2){
        totalMinutes = 1;
    }

    if(secondsPerMinute < 10){
        timeLeft.textContent = totalMinutes + ":" + "0" + secondsPerMinute;
    }
    else{
        timeLeft.textContent = totalMinutes + ":" + secondsPerMinute;
    }
    secondsLeft = secondsPerMinute; 
}

//creates four children for each answer in every question and display the questions
function displayQuestion(){
    
    questionEl.textContent = questions[currentQuestion].q;
    for(i =0; i < questions[currentQuestion].a.length; i++){
        var li = document.createElement("li")
        li.innerHTML = "<button>" + questions[currentQuestion].a[i] +"</button>";
        li.dataIndex = i;
        console.log(li.dataIndex );
        answers.append(li);
    }
     
}

//when you click each button is going to call check answer function to check answers
function answersButtons(event){
    if(event.target.matches("button")){
        event.preventDefault(); 
        //everytime a button is clicked check if they reached the end of questions
        if (currentQuestion === questions.length-1){
            finalScore();
        }
        //console.log(e.target.parentElement.dataIndex);
        var index = parseInt(event.target.parentElement.dataIndex)
        // console.log(index);
        checkAnswer(index);
        removeChildren(answers);
        currentQuestion++;
        displayQuestion();
        
    }
}

//check answer to check right answer al;so displayus if correct
function checkAnswer(index){
    if(index === questions[currentQuestion].rightAnswer){
        correctOrWrongEl.style.opacity = 1;
        correctOrWrongAnswer.textContent = "Corret";
        correctSound.play();
        score++; 
    }
    else{
        correctOrWrongEl.style.opacity = 1;
        correctOrWrongAnswer.textContent = "Wrong";
        wrongSound.play(); 

        totalSeconds = totalSeconds - 20;
        //console.log(totalSeconds);
        if (totalSeconds <= 0){
            finalScore();
        }
    } 
    //console.log(score);
  
    window.setTimeout("correctOrWrongEl.style.opacity = 0;", 500);
}

//removes children from parent element 
function removeChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//clears interval and send to all done block
function finalScore(){
    playAgainClearTime();
    totalScore.textContent = "Your Score: " + score;
    questionSection.style.display = "none";
    scoreInfo.style.display = "block";
}

///clears interval and sets everything to starting mode
function playAgainClearTime(){
    currentQuestion = 0;
    totalSeconds = 120;
    clearInterval(interval);
}

//click and submit event, will change to highscore Html
//get and sets player info so it can be used as highscores list
function submitScore(event){
    event.preventDefault();
    scoreInfo.style.display = "none";
    var intials = intialsEl.value;
    var playerList = [];
    //console.log(JSON.parse(localStorage.getItem("array")));
    if(JSON.parse(localStorage.getItem("array")) === undefined){
        playerList =[{name : intials, score: score, time: timeLeft.textContent }];
    }
    else{
        playerList = JSON.parse(localStorage.getItem("array"));
    }

    playerList.push({name : intials, score: score, time: timeLeft.textContent});
    localStorage.setItem("array", JSON.stringify(playerList));
    //console.log(playerList);
    window.location.href = "highscores.html";
}

function createScoreListitem(){
    var storedArray = JSON.parse(localStorage.getItem("array"));
    //console.log(storedArray);
    //removeChildren(highscoresList);
    for(i = 0; i < storedArray.length; i++){
        var li = document.createElement("li");
        li.innerHTML =  "<span>Initials:</span> "+ storedArray[i].name + "  <span>Score:</span>" + storedArray[i].score + " <span>Time:</span>" + storedArray[i].time;
        listHighscores.append(li);
    }
}

function clearFunction(event){
    event.preventDefault();
    localStorage.setItem("array", "[]");
    //console.log(playerList = JSON.parse(localStorage.getItem("array", "[]")));
    removeChildren(listHighscores);
}

function goBack(event){
    event.preventDefault();
   playAgainClearTime();
   location.href = "index.html";
}


clearButton.addEventListener("click", clearFunction);
backButtonEl.addEventListener("click", goBack);

createScoreListitem();

buttonStart.addEventListener("click",startGame);
answers.addEventListener("click", answersButtons);
submitBtn.addEventListener("click", submitScore);
intialsEl.addEventListener("submit",submitScore);
