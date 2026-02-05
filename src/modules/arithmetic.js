import {questionArea} from "../script.js";
export function generateAddition(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}+${num2}=\$`;
    correctAnswer={
        correct: (num1+num2).toFixed(3)
    };
    MathJax&&MathJax.typeset();
}
export function generateSubtraction(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}-${num2}=\$`;
    correctAnswer={
        correct: (num1-num2).toFixed(3)
    };
    MathJax&&MathJax.typeset();
}
export function generateMultiplication(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\times ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer=num1*num2;
    correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
    MathJax&&MathJax.typeset();
}
export function generateDivision(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\div ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer=num1/num2;
    correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
    MathJax&&MathJax.typeset();
}