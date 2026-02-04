//use "terser script.js -o script.min.js --compress --mangle --module" to package it as a min file
import * as Algebra from "./modules/algebra.js"
import * as Arithmetic from "./modules/arithmetic.js";
import * as Calculus from "./modules/calculus.js";
import * as DiscreteMathematics from "./modules/discreteMathematics.js";
import * as LinearAlgebra from "./modules/linearAlgebra.js";
import * as Trigonometry from "./modules/trigonometry.js";
export let questionArea=document.getElementById("question-area");
let questionType=document.getElementById("gen-type")
let generateQuestionButton=document.getElementById("genQ");
let userAnswer=document.getElementById("answer-box");
let answerResults=document.getElementById("answer-results");
let checkAnswerButton=document.getElementById("check-answer");
window.correctAnswer={};
function generateQuestion(){
    let question=questionType.value;
    switch (question){
        case "add":
            Arithmetic.generateAddition();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "subtrt":
            Arithmetic.generateSubtraction();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "mult":
            Arithmetic.generateMultiplication();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "divid":
            Arithmetic.generateDivision();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "root":
            Algebra.generateRoot();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "deri":
            Calculus.generateDerivative();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "inte":
            Calculus.generateIntegral();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "mtrx":
            LinearAlgebra.generateMatrix();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "vctr":
            LinearAlgebra.generateVector();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "sin":
            Trigonometry.generateSin();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cos":
            Trigonometry.generateCosine();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "tan":
            Trigonometry.generateTangent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cosec":
            Trigonometry.generateCosecant();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "sec":
            Trigonometry.generateSecant();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cot":
            Trigonometry.generateCotangent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "log":
            Algebra.generateLogarithm();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "exp":
            Algebra.generateExponent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "fact":
            Algebra.generateFactorial();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "perm":
            DiscreteMathematics.generatePermutation();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "comb":
            DiscreteMathematics.generateCombination();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "prob":
            DiscreteMathematics.generateProbability();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "ser":
            Algebra.generateSeries();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "lim":
            Calculus.generateLimit();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "relRates":
            Calculus.generateRelatedRates();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        default:
            questionArea.innerHTML=`Please select a type of question to generate before hitting the "Generate Question" button`;
    }
}
function checkAnswer(){
    let userInput=userAnswer.value.trim();
    let currentType=questionType.value;
    let isCorrect=false;
    let normalizeAnswer=(input)=>{
        try{
            let simplified=math.simplify(input);
            if (simplified.isConstantNode&&simplified.value!==null){
                return parseFloat(simplified.value);
            }
            return simplified.toString();
        }
        catch (e){
            return input.replace(/\s+/g, "").toLowerCase();
        }
    };
    let numericEquals=(a, b, tol=1e-8)=>Math.abs(a-b)<tol;
    if (currentType=="ser"){
        let cleanCorrect=correctAnswer.correct.replace(/[^a-z]/gi, "").toLowerCase();
        if (cleanCorrect=="converges"||cleanCorrect=="diverges"){
            let cleanUserInput=userInput.replace(/[^a-z]/gi, "").toLowerCase();
            if (cleanCorrect=="converges"){
                isCorrect=cleanUserInput=="converge"||cleanUserInput=="converges";
            }
            else{
                isCorrect=cleanUserInput=="diverge"||cleanUserInput=="diverges";
            }
        }
        else{
            let userNum=parseFloat(userInput);
            let correctNum=parseFloat(correctAnswer.correct);
            if (!isNaN(userNum)&&!isNaN(correctNum)){
                isCorrect=numericEquals(userNum, correctNum);
            }
            else{
                let userNorm=normalizeAnswer(userInput);
                isCorrect=[correctAnswer.correct, correctAnswer.alternate].filter(ans=>ans!=undefined).some(ans=>normalizeAnswer(ans)==userNorm);
            }
        }
    }
    else{
        let formattedTypes=["deri", "mtrx", "vctr", "root", "inte", "sin", "cos", "tan", "cosec", "sec", "cot", "log"];
        if (formattedTypes.includes(currentType)){
            let userNorm=normalizeAnswer(userInput);
            isCorrect=[correctAnswer.correct, correctAnswer.alternate].filter(ans=>ans!=undefined).some(ans=>normalizeAnswer(ans)==userNorm);
        }
        else{
            let userNum=parseFloat(userInput);
            let correctNum=parseFloat(correctAnswer.correct);
            isCorrect=!isNaN(userNum)&&!isNaN(correctNum)&&numericEquals(userNum, correctNum);
        }
    }
    answerResults.innerHTML=isCorrect?`Correct! The answer is <span class="answer">${correctAnswer.correct}</span>.`:`Incorrect. The correct answer is <span class="answer">${correctAnswer.correct}</span>.`;
}
userAnswer.addEventListener("keyup", function (e){
    if (e.shiftKey&&e.key=="Enter"){
        checkAnswer();
        userAnswer.value="";
        userAnswer.focus();
    }
});
generateQuestionButton.addEventListener("click", generateQuestion);
checkAnswerButton.addEventListener("click", checkAnswer);