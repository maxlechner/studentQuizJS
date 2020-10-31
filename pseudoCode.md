Tasks otes

set interval to do the tied functionality

clearInterval to stop the timeout

VAR currentscore/timeleft

VAR questions - Array

VAR pointer/index - current position in the question array

VAR startButton

var questions = [
    {
        // question text
        // list of question answers
        // correct answer
    }
]

when i click the 'start button'

'start button'.addEvetnListener("click", startGame);

THEN a time strts and I am presented with a question

// SET starting score = 60

// Start the interval to begin the score countdown

presetn the question = create new HTML elements for question content
    set the #question div's innerHTML  = "";
    append a h2 for the question test
    append a new button for each choice
    var button = document.createElement("button");
    button.textContent = questionText
    button.setAttribute("data-answer", questionText);

WHEN the users clicks one of my answer buttons 

THEN I am presented with a new question
    Increase the pointer by 1 
    Clear out previous question

When I answer a question incorrectly

    event.target.matches("button");
    
    var clickButtonContent = event.target.textContent
    var clickButtonContent = event.target.getAttribute("data-answer", questionText);

    the question is correct clickButtonValue == questions[pointer].answer


Then time is subtracted from the clock
WHEN all questions are answered or the time reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score