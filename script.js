const questions = [
    {
        question : "What is the full form of DBMS?",
        answers : [
            {text: "Data of Binary Mnagement System" , correct: false },
            {text: "Database Management System" , correct: true },
            {text: "Database Management Service" , correct: false },
            {text: "Data of Binary System" , correct: false },
        ]
    },
    {
        question : "Who created the first DBMS?",
        answers : [
            {text: "Edger Frank God" , correct: false },
            {text: "Charles Babage" , correct: false },
            {text: "Charles Bachman" , correct: true },
            {text: "Sharon B.codd" , correct: false },
        ]
    },
    {
        question : "In which of the Following formats data is stored in the database management system?",
        answers : [
            {text: "Flower" , correct: false },
            {text: "Chair" , correct: false},
            {text: "Table" , correct: true },
            {text: "Fellow" , correct: false },
        ]
    },
    {
        question : "Which of the Following is not a function of the database?",
        answers : [
            {text: "Managing stored data", correct: false },
            {text: "Manipulating data" , correct: false },
            {text: "Security for Stored Data", correct: false },
            {text: "Analysing code" , correct: true },
        ]
    }
];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer_buttons");
const nextButton= document.getElementById("next-btn");

let CurrentquestionIndex = 0;
let score = 0;

function StartQuiz(){
    CurrentquestionIndex= 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let Currentquestion = questions[CurrentquestionIndex];
    let questionNo = CurrentquestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + Currentquestion.question;

    Currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click" , selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display= "block";
}

function handleNextButton(){
    CurrentquestionIndex++;
    if(CurrentquestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(CurrentquestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})

StartQuiz();
 
