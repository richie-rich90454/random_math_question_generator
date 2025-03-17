let quotesArray=[];
let authorsArray=[];
let questionArea=document.getElementById("question-area");
let questionType=document.getElementById("gen-type")
let generateQuestionButton=document.getElementById("genQ");
let userAnswer=document.getElementById("answer-box");
let answerResults=document.getElementById("answer-results");
let checkAnswerButton=document.getElementById("check-answer");
let answerInstructions=document.getElementById("answer-instructions");
let CANVAS_WIDTH=400;
let CANVAS_HEIGHT=80;
let FONT_SIZE=24;
let SUBSCRIPT_FONT_SIZE=16;
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
function generateMultiplication(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`${num1}*${num2}=<br>Round your answer to two decimal places`;
    correctAnswer=Math.round((num1*num2)*100)/100;
}
function generateDivision(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`${num1}/${num2}=<br>Round your answer to two decimal places`;
    correctAnswer=Math.round((num1/num2)*100)/100;
}
function generateDerivative() {
    questionArea.innerHTML='';
    let canvas=document.createElement('canvas');
    canvas.width=500;
    canvas.height=100;
    let ctx=canvas.getContext('2d');
    let a=Math.floor(Math.random()*30)+1;
    let b=Math.floor(Math.random()*20)+1;
    let c=Math.floor(Math.random()*100)+1;
    let verifySimpleDerivative=()=>{
        return (2*a)%1==0&&b%1==0;
    }
    if (!verifySimpleDerivative()){
        return generateDerivative();
    }
    ctx.font="24px 'STIX Two Math'";
    ctx.fillStyle="#000";
    let startX=20;
    let startY=50;
    ctx.save();
    ctx.font="20px 'STIX Two Math'";
    ctx.fillText("d", startX, startY-10);
    let fractionLineY=startY;
    ctx.beginPath();
    ctx.moveTo(startX, fractionLineY);
    ctx.lineTo(startX+30, fractionLineY);
    ctx.stroke();
    ctx.fillText("dx", startX-5, startY+20);
    ctx.restore();
    ctx.fillText(`(${a}x²+${b}x+${c})`, startX+40, startY);
    let funcWidth=ctx.measureText(`(${a}x²+${b}x+${c})`).width;
    ctx.fillText("= ?", startX+40+funcWidth+10, startY);
    correctAnswer={
        correct: `${2*a}x+${b}`,
        alternate: `${2*a}x^1+${b}`
    }
    questionArea.appendChild(canvas);
}
function generateFactorial(){
    let num=Math.floor((Math.random()*8)+2);
    questionArea.innerHTML=`${num}!=`;
    correctAnswer=1;
    for (let i=2;i<=num;i++){
        correctAnswer*=i;
    }
}
function checkAnswer(){
    let userInput=userAnswer.value.trim().toLowerCase();
    let isCorrect=false;
    const format=(str)=>{
        return str.replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1"); 
    };
    if (questionType.value=="deri"||questionType.value=="mtrx"||questionType.value=="vctr"){
        isCorrect=[correctAnswer.correct, correctAnswer.alternate].map(format).includes(format(userInput));
        answerResults.innerHTML=isCorrect? `Correct! The answer is ${correctAnswer.correct}.`: `Incorrect. The correct answer should be ${correctAnswer.correct}.`;
    }
    else if (questionType.value=="inte"){
        let userValue=parseFloat(userInput);
        isCorrect=!isNaN(userValue)&&Math.abs(userValue-correctAnswer)<0.01;
        answerResults.innerHTML=isCorrect? `Correct! The answer is ${correctAnswer.correct}.`: `Incorrect. The correct answer should be ${correctAnswer.correct}.`;
    }
    else{
        isCorrect=parseFloat(userInput)==correctAnswer;
        answerResults.innerHTML=isCorrect? `Correct! The answer is ${correctAnswer}.`: `Incorrect. The correct answer should be ${correctAnswer}.`;
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    fetch("/quotes_of_the_day.txt")
        .then(response=>{
            if (!response.ok) throw new Error('Network error');
            return response.text();
        })
        .then(data=>{
            let lines=data.split('\n').map(line=>line.trim()).filter(line=>line.length > 0);
            lines.forEach((line)=>{
                let parts=line.split('-');
                if (parts.length < 2){
                    return
                };
                let quote=parts.slice(0, -1).join('-').trim();
                let author=parts.slice(-1)[0].trim();
                quotesArray.push(quote);
                authorsArray.push(author);
            });
            let randomIndex=Math.floor(Math.random()*quotesArray.length);
            document.getElementById('new-quote').textContent=quotesArray[randomIndex];
            document.getElementById('author').textContent=`- ${authorsArray[randomIndex]}`;
        })
        .catch(error=>console.error('Error:', error));
});
generateQuestionButton.addEventListener("click", generateQuestion);
checkAnswerButton.addEventListener("click", checkAnswer);