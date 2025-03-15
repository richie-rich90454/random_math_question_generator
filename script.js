let quotesArray=[];
let authorsArray=[];
let questionArea=document.getElementById("question-area");
let questionType=document.getElementById("gen-type")
let generateQuestionButton=document.getElementById("genQ");
let userAnswer=document.getElementById("answer-box");
let answerResults=document.getElementById("answer-results");
let checkAnswerButton=document.getElementById("check-answer");
let correctAnswer=0;
function generateQuestion(){
    let question=questionType.value;
    switch(question){
        case "add":
            generateAddition();
            break;
        case "subtrt":
            generateSubtraction();
            break;
        case "mult":
            generateMultiplication();
            break;
        case "divid":
            generateDivision();
            break;
        case "root":
            generateRoot();
            break;
        case "deri":
            generateDerivative();
            break;
        case "inte":
            generateIntegral();
            break;
        case "mtrx":
            generateMatrix();
            break;
        case "vctr":
            generateVector();
            break;
        case "sin":
            generateSin();
            break;
        case "cos":
            generateCosine();
            break;
        case "tan":
            generateTangent();
            break;
        case "cosec":
            generateCosecant();
            break;
        case "sec":
            generateSecant();
            break;
        case "cot":
            generateCotangent();
            break;
        case "log":
            generateLogarithm();
            break;
        case "exp":
            generateExponent();
            break;
        case "fact":
            generateFactorial();
            break;
        case "perm":
            generatePermutation();
            break;
        case "comb":
            generateCombination();
            break;
        default:
            questionArea.innerHTML=`Please select a type of question to generate before hitting the "Generate Question" button`
    }
}
function generateAddition(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`${num1}+${num2}=`;
    correctAnswer=num1+num2;
}
function generateSubtraction(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`${num1}-${num2}=`;
    correctAnswer=num1-num2;
}
function checkAnswer(){
    if (parseFloat(userAnswer.value.trim())==correctAnswer){
        answerResults.innerHTML=`Correct! The answer is indeed ${correctAnswer}!`;
    }
    else{
        answerResults.innerHTML=`Incorrect, please rethink your process!`;
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    fetch("/quotes_of_the_day.txt")
        .then(response=>{
            if (!response.ok) throw new Error('Network error');
            return response.text();
        })
        .then(data=>{
            const lines=data.split('\n').map(line=>line.trim()).filter(line=>line.length > 0);
            lines.forEach((line)=>{
                const parts=line.split('-');
                if (parts.length < 2){
                    return
                };
                const quote=parts.slice(0, -1).join('-').trim();
                const author=parts.slice(-1)[0].trim();
                quotesArray.push(quote);
                authorsArray.push(author);
            });
            const randomIndex=Math.floor(Math.random()*quotesArray.length);
            document.getElementById('new-quote').textContent=quotesArray[randomIndex];
            document.getElementById('author').textContent=`- ${authorsArray[randomIndex]}`;
        })
        .catch(error=>console.error('Error:', error));
});
generateQuestionButton.addEventListener("click", generateQuestion);
checkAnswerButton.addEventListener("click", checkAnswer);