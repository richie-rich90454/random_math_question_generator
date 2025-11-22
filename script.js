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
    let userInput=userAnswer.value.trim().toLowerCase();
    let isCorrect=false;
    let format=(str)=>String(str).replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1").trim().toLowerCase();
    let removeTrailingZeros=(num)=>parseFloat(num).toString();
    let safeEval=(input)=>{
        try{
            return removeTrailingZeros(Function("\"use strict\"; return (" + input.replace(/(sin|cos|tan|log)\(/g, "Math.$1(") + ")")());
        }
        catch (e){
            return format(input);
        }
    };
    let formattedTypes=["deri", "mtrx", "vctr", "root", "inte", "sin", "cos", "tan", "cosec", "sec", "cot", "log"];
    let seriesTypes=["arithmetic_sum", "geometric_sum", "convergence", "nth_term"];
    let currentType=questionType.value;
    if (seriesTypes.includes(currentType)){
        switch (currentType){
            case "convergence":
                let cleanUserInput=userInput.replace(/[^a-z]/g, "");
                let cleanCorrectAnswer=correctAnswer.correct.toLowerCase().replace(/[^a-z]/g, "");
                if (cleanCorrectAnswer=="converges"){
                    isCorrect=cleanUserInput=="converge"||cleanUserInput=="converges";
                }
                else if (cleanCorrectAnswer=="diverges"){
                    isCorrect=cleanUserInput=="diverge"||cleanUserInput=="diverges";
                }
                else{
                    isCorrect=cleanUserInput==cleanCorrectAnswer;
                }
                break;
            case "geometric_sum":
                let userValue=parseFloat(userInput);
                let correctValue=parseFloat(correctAnswer.correct);
                if (!isNaN(userValue)){
                    isCorrect=Math.abs(userValue-correctValue)<0.01;
                }
                else{
                    let userEvaluated=safeEval(userInput);
                    isCorrect=[correctAnswer.correct, correctAnswer.alternate].filter(ans=>ans!==undefined).some(ans=>{let ansEval=safeEval(ans);return ansEval==userEvaluated||format(ans)==userEvaluated;});
                }
                break;
            default:
                let userNum=parseFloat(userInput);
                let correctNum=parseFloat(correctAnswer.correct);
                isCorrect=!isNaN(userNum)&&userNum==correctNum;
        }
    }
    else if (formattedTypes.includes(currentType)){
        let userEvaluated=safeEval(userInput);
        isCorrect=[correctAnswer.correct, correctAnswer.alternate].filter(ans=>ans!==undefined).some(ans=>{let ansEval=safeEval(ans);return ansEval==userEvaluated||format(ans)==userEvaluated;});
    }
    else{
        let userValue=parseFloat(userInput);
        let correctValue=parseFloat(correctAnswer.correct);
        isCorrect=!isNaN(userValue)&&userValue==correctValue;
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