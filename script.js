let quotesArray=[];
let authorsArray=[];
let questionArea=document.getElementById("question-area");
let questionType=document.getElementById("gen-type")
let generateQuestionButton=document.getElementById("genQ");
let userAnswer=document.getElementById("answer-box");
let answerResults=document.getElementById("answer-results");
let checkAnswerButton=document.getElementById("check-answer");
let answerInstructions=document.getElementById("answer-instructions");
let correctAnswer=0;
function generateQuestion(){
    let question=questionType.value;
    switch(question){
        case "add":
            generateAddition();
            checkAnswerButton.disabled=false;
            break;
        case "subtrt":
            generateSubtraction();
            checkAnswerButton.disabled=false;
            break;
        case "mult":
            generateMultiplication();
            checkAnswerButton.disabled=false;
            break;
        case "divid":
            generateDivision();
            checkAnswerButton.disabled=false;
            break;
        case "root":
            generateRoot();
            checkAnswerButton.disabled=false;
            break;
        case "deri":
            generateDerivative();
            checkAnswerButton.disabled=false;
            break;
        case "inte":
            generateIntegral();
            checkAnswerButton.disabled=false;
            break;
        case "mtrx":
            generateMatrix();
            checkAnswerButton.disabled=false;
            break;
        case "vctr":
            generateVector();
            checkAnswerButton.disabled=false;
            break;
        case "sin":
            generateSin();
            checkAnswerButton.disabled=false;
            break;
        case "cos":
            generateCosine();
            checkAnswerButton.disabled=false;
            break;
        case "tan":
            generateTangent();
            checkAnswerButton.disabled=false;
            break;
        case "cosec":
            generateCosecant();
            checkAnswerButton.disabled=false;
            break;
        case "sec":
            generateSecant();
            checkAnswerButton.disabled=false;
            break;
        case "cot":
            generateCotangent();
            checkAnswerButton.disabled=false;
            break;
        case "log":
            generateLogarithm();
            checkAnswerButton.disabled=false;
            break;
        case "exp":
            generateExponent();
            checkAnswerButton.disabled=false;
            break;
        case "fact":
            generateFactorial();
            checkAnswerButton.disabled=false;
            break;
        case "perm":
            generatePermutation();
            checkAnswerButton.disabled=false;
            break;
        case "comb":
            generateCombination();
            checkAnswerButton.disabled=false;
            break;
        default:
            questionArea.innerHTML=`Please select a type of question to generate before hitting the "Generate Question" button`
    }
    MathJax.typeset();
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
function generateRoot(){
    
}
function generateDerivative(){
    answerInstructions.style.display="block";
    questionArea.innerHTML="";
    let numTerms=Math.floor(Math.random()*4)+2;
    let exponents=new Set();
    while (exponents.size<numTerms){
        let exponent=Math.floor(Math.random()*11);
        exponents.add(exponent);
    }
    exponents=Array.from(exponents).sort((a, b)=>b-a);
    let coefficients=[];
    for (let exponent of exponents){
        let coeff;
        if (exponent==0){
            coeff=Math.floor(Math.random()*100)+1;
        }
        else if (exponent==1){
            coeff=Math.floor(Math.random()*20)+1;
        }
        else{
            coeff=Math.floor(Math.random()*30)+1;
        }
        coefficients.push(coeff);
    }
    let terms=[];
    for (let i=0;i<exponents.length;i++){
        let exponent=exponents[i];
        let coeff=coefficients[i];
        let term;
        if (exponent==0){
            term=coeff.toString();
        }
        else if (exponent==1){
            term=`${coeff}x`;
        }
        else{
            term=`${coeff}x^{${exponent}}`;
        }
        terms.push(term);
    }
    let polynomial=`(${terms.join('+')})`;
    let derivativeTerms=[];
    for (let i=0;i<exponents.length;i++){
        let exponent=exponents[i];
        let coeff=coefficients[i];
        if (exponent==0) continue;
        let newCoeff=coeff*exponent;
        let newExponent=exponent-1;
        derivativeTerms.push({coeff: newCoeff, exponent: newExponent});
    }
    derivativeTerms.sort((a, b)=>b.exponent-a.exponent);
    let derivativeParts=[];
    let alternateParts=[];
    for (let term of derivativeTerms){
        let part, altPart;
        if (term.exponent==0){
            part=term.coeff.toString();
            altPart=part;
        }
        else if (term.exponent==1){
            part=`${term.coeff}x`;
            altPart=`${term.coeff}x^1`;
        }
        else{
            part=`${term.coeff}x^{${term.exponent}}`;
            altPart=`${term.coeff}x^${term.exponent}`;
        }
        derivativeParts.push(part);
        alternateParts.push(altPart);
    }
    let correctDerivative=derivativeParts.join("+");
    let alternateDerivative=alternateParts.join("+");
    let mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
    correctAnswer={
        correct: correctDerivative.replace(/{|}/g, ""),
        alternate: alternateDerivative.replace(/{|}/g, "")
    };
}
function generateIntegral(){
    answerInstructions.style.display="block";
    questionArea.innerHTML="";
    let numTerms=Math.floor(Math.random() * 4)+2;
    let exponents=new Set();
    while (exponents.size<numTerms){
        let exponent=Math.floor(Math.random() * 11);
        exponents.add(exponent);
    }
    exponents=Array.from(exponents).sort((a, b) => b-a);
    let coefficients=[];
    for (let exponent of exponents){
        let coeff;
        if (exponent==0){
            coeff=Math.floor(Math.random() * 100)+1;
        }
        else if (exponent==1){
            coeff=Math.floor(Math.random() * 20)+1;
        }
        else{
            coeff=Math.floor(Math.random() * 30)+1;
        }
        coefficients.push(coeff);
    }
    let terms=[];
    for (let i=0;i<exponents.length;i++){
        let exponent=exponents[i];
        let coeff=coefficients[i];
        let term;
        if (exponent==0){
            term=coeff.toString();
        }
        else if (exponent==1){
            term=`${coeff}x`;
        }
        else{
            term=`${coeff}x^{${exponent}}`;
        }
        terms.push(term);
    }
    let polynomial=`(${terms.join("+")})`;
    let integralTerms=[];
    let alternateTerms=[];
    for (let i=0;i<exponents.length;i++){
        let exponent=exponents[i];
        let coeff=coefficients[i];
        let newExponent=exponent+1;
        let newCoeff=(coeff/newExponent).toFixed(2);
        let integralTerm=`${newCoeff}x^{${newExponent}}`;
        let alternateTerm=`${newCoeff}x^${newExponent}`;
        integralTerms.push(integralTerm);
        alternateTerms.push(alternateTerm);
    }
    integralTerms.push("C");
    alternateTerms.push("C");
    let correctIntegral=integralTerms.join("+");
    let alternateIntegral=alternateTerms.join("+");
    let mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
    correctAnswer={
        correct: correctIntegral.replace(/{|}/g, ""),
        alternate: alternateIntegral.replace(/{|}/g, "")
    };
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
                if (parts.length<2){
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