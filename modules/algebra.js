//use "terser ./modules/algebra.full.js -o ./modules/algebra.js --compress --mangle --module" to package it as a min file
import {questionArea} from "../script.js";
export function generateLogarithm(){
    questionArea.innerHTML="";
    let types=["basic", "change_base", "equation", "properties", "exponential_form"];
    let type=types[Math.floor(Math.random()*types.length)];
    let base=Math.floor(Math.random()*4)+2;
    let arg=Math.pow(base, Math.floor(Math.random()*4)+1);
    let newBase=Math.floor(Math.random()*3)+2;
    switch (type){
        case "basic":{
            let answer=(Math.log(arg)/Math.log(base)).toFixed(2);
            questionArea.innerHTML=`Evaluate: \\( \\log_{${base}} ${arg} \\)`;
            correctAnswer={
                correct: answer,
                alternate: `\\log_{${base}} ${arg}=${answer}`
            };
            break;
        }
        case "change_base":{
            let numerator=Math.log(arg)/Math.log(newBase);
            let denominator=Math.log(base)/Math.log(newBase);
            let numericAnswer=(numerator/denominator).toFixed(2);
            questionArea.innerHTML=`Express \\( \\log_{${base}} ${arg} \\) in base \\( ${newBase} \\)`;
            correctAnswer={
                correct: numericAnswer,
                alternate: `\\frac{\\log_{${newBase}} ${arg}}{\\log_{${newBase}} ${base}}=${numericAnswer}`
            };
            break;
        }
        case "equation":{
            let exponent=Math.floor(Math.random()*3)+2;
            questionArea.innerHTML=`Solve for \\( x \\): \\( ${base}^{x}=${Math.pow(base, exponent)} \\)`;
            correctAnswer={
                correct: exponent,
                alternate: `x=${exponent}`
            };
            break;
        }
        case "properties":{
            let a=Math.floor(Math.random()*8)+2;
            let b=Math.floor(Math.random()*8)+2;
            let logSum=(Math.log(a*b)/Math.log(base)).toFixed(2);
            let logA=(Math.log(a)/Math.log(base)).toFixed(2);
            let logB=(Math.log(b)/Math.log(base)).toFixed(2);
            questionArea.innerHTML=`Evaluate: \\( \\log_{${base}} (${a} \\times ${b}) \\)`;
            correctAnswer={
                correct: logSum,
                alternate: `\\log_{${base}} ${a}+\\log_{${base}} ${b}=${logA}+${logB}=${logSum}`
            };
            break;
        }
        case "exponential_form":{
            let exponent=Math.floor(Math.random()*3)+2;
            let result=Math.pow(base, exponent);
            questionArea.innerHTML=`If \\( \\log_{${base}} x=${exponent} \\), find \\( x \\)`;
            correctAnswer={
                correct: result,
                alternate: `${base}^{${exponent}}=${result}`
            };
            break;
        }
    }
    MathJax&&MathJax.typeset();
}
export function generateExponent(){
    questionArea.innerHTML="";
    let types=["basic", "solve", "laws", "growth", "compare"];
    let type=types[Math.floor(Math.random()*types.length)];
    let base=Math.floor(Math.random()*4)+2;
    let exponent=Math.floor(Math.random()*5)+2;
    switch (type){
        case "basic":
            questionArea.innerHTML=`Evaluate: \\( ${base}^{${exponent}} \\)`;
            correctAnswer={
                correct: Math.pow(base, exponent),
                alternate: Math.pow(base, exponent)
            };
            break;
        case "solve":
            let power=Math.pow(base, exponent);
            questionArea.innerHTML=`Solve for \\( x \\): \\( ${base}^{x}=${power} \\)`;
            correctAnswer={
                correct: exponent,
                alternate: exponent
            };
            break;
        case "laws":
            let a=Math.floor(Math.random()*3)+2;
            let b=Math.floor(Math.random()*3)+2;
            questionArea.innerHTML=`Simplify: \\( (${base}^{${a}}) \\times (${base}^{${b}}) \\)`;
            correctAnswer={
                correct: `${base}<sup>${a+b}</sup>`,
                alternate: Math.pow(base, a+b)
            };
            break;
        case "growth":
            let rate=(Math.random()*20+5).toFixed(1);
            questionArea.innerHTML=`A population grows at \\( ${rate}\\% \\) annually. What is the growth factor?`;
            let factor=(1+rate/100).toFixed(3);
            correctAnswer={
                correct: factor,
                alternate: `1+${rate/100}`
            };
            break;
        case "compare":
            let b1=Math.floor(Math.random()*3)+2;
            let b2=Math.floor(Math.random()*3)+2;
            let e1=Math.floor(Math.random()*4)+2;
            let e2=Math.floor(Math.random()*4)+2;
            questionArea.innerHTML=`Which is larger: \\( ${b1}^{${e1}} \\) or \\( ${b2}^{${e2}} \\)?`;
            let vals=[Math.pow(b1, e1), Math.pow(b2, e2)];
            correctAnswer={
                correct: vals[0]>vals[1]?`${b1}^${e1}`:`${b2}^${e2}`,
                alternate: Math.max(...vals)
            };
            break;
    }
    MathJax&&MathJax.typeset();
}
export function generateFactorial(){
    questionArea.innerHTML="";
    let types=["basic", "division", "equation", "approximation", "prime"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*7)+5;
    let k=Math.floor(Math.random()*(n-2))+2;
    switch (type){
        case "basic":
            questionArea.innerHTML=`Calculate \\( ${n}! \\)`;
            correctAnswer={
                correct: Array.from({ length: n }, (_, i)=>i+1).reduce((a, b)=>a*b, 1),
                alternate: Array.from({ length: n }, (_, i)=>i+1).reduce((a, b)=>a*b, 1)
            };
            break;
        case "division":
            questionArea.innerHTML=`Simplify: \\( \\frac{${n}!}{${k}!} \\)`;
            correctAnswer={
                correct: Array.from({ length: n-k }, (_, i)=>n-i).reduce((a, b)=>a*b, 1),
                alternate: Array.from({ length: n }, (_, i)=>i+1).reduce((a, b)=>a*b, 1)/Array.from({ length: k }, (_, i)=>i+1).reduce((a, b)=>a*b, 1)
            };
            break;
        case "equation":
            let factVal=Array.from({ length: n }, (_, i)=>i+1).reduce((a, b)=>a*b, 1);
            questionArea.innerHTML=`Solve for \\( n \\): \\( n!=${factVal} \\)`;
            correctAnswer={
                correct: n,
                alternate: n
            };
            break;
        case "approximation":
            questionArea.innerHTML=`Estimate \\( ${n}! \\) using Stirling's approximation`;
            let stirling=Math.sqrt(2*Math.PI*n)*Math.pow(n/Math.E, n);
            correctAnswer={
                correct: stirling.toFixed(0),
                alternate: Math.round(stirling)
            };
            break;
        case "prime":
            let prime=[2, 3, 5, 7, 11][Math.floor(Math.random()*5)];
            questionArea.innerHTML=`Find the exponent of \\( ${prime} \\) in \\( ${n}! \\) (prime factorization)`;
            let count=0, temp=n;
            while (temp > 0){
                temp=Math.floor(temp/prime);
                count+=temp;
            }
            correctAnswer={
                correct: count,
                alternate: count
            };
            break;
    }
    MathJax&&MathJax.typeset();
}
export function generateSeries(){
    questionArea.innerHTML="";
    let types=["arithmetic_sum", "geometric_sum", "convergence", "nth_term"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression, plainCorrectAnswer;
    switch (type){
        case "arithmetic_sum":{
            let a1=Math.floor(Math.random()*10)+1;
            let d=Math.floor(Math.random()*5)+1;
            let n=Math.floor(Math.random()*10)+5;
            let sum=(n/2)*(2*a1+(n-1)*d);
            mathExpression=`Find the sum of the first ${n} terms of the arithmetic sequence: \\[ S_n=\\frac{n}{2} [2a_1+(n-1)d] \\] where \\( a_1=${a1} \\) and \\( d=${d} \\).`;
            plainCorrectAnswer=sum.toString();
            correctAnswer={correct: plainCorrectAnswer};
            break;
        }
        case "geometric_sum":{
            let a1=Math.floor(Math.random()*5)+1;
            let rValue=(Math.random()<0.5?-1:1)*(Math.random()*0.9+0.1);
            let r=rValue.toFixed(2);
            let n=Math.floor(Math.random()*8)+3;
            let sum=a1*(1-Math.pow(rValue, n))/(1-rValue);
            mathExpression=`Find the sum of the first ${n} terms of the geometric sequence: \\[ S_n=a_1 \\frac{1-r^n}{1-r} \\] where \\( a_1=${a1} \\) and \\( r=${r} \\).`;
            plainCorrectAnswer=sum.toFixed(2);
            correctAnswer={correct: plainCorrectAnswer, alternate: `\\frac{${a1}(1-${r}^{${n}})}{1-${r}}`};
            break;
        }
        case "convergence":{
            let seriesTypes=[
            {expr: "\\frac{1}{n^2}", conv: "converges"},
            {expr: "\\frac{1}{\\sqrt{n}}", conv: "diverges"},
            {expr: "(-1)^n \\frac{1}{n}", conv: "converges"}
            ];
            let chosen=seriesTypes[Math.floor(Math.random()*seriesTypes.length)];
            mathExpression=`Determine if the series converges or diverges: \\[ \\sum_{n=1}^{\\infty} ${chosen.expr} \\]`;
            plainCorrectAnswer=chosen.conv;
            correctAnswer={correct: plainCorrectAnswer, alternate: plainCorrectAnswer};
            break;
        }
        case "nth_term":{
            let a1=Math.floor(Math.random()*10)+1;
            let d=Math.floor(Math.random()*5)+1;
            let n=Math.floor(Math.random()*10)+5;
            let an=a1+(n-1)*d;
            mathExpression=`Find the ${n}${getOrdinal(n)} term of the arithmetic sequence: \\[ a_n=a_1+(n-1)d \\] where \\( a_1=${a1} \\) and \\( d=${d} \\).`;
            plainCorrectAnswer=an.toString();
            correctAnswer={correct: plainCorrectAnswer};
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
}
export function generateRoot(){
    questionArea.innerHTML="";
    let root=Math.floor((Math.random()*4))+2;
    let base=Math.floor((Math.random()*10))+1;
    let radicand=Math.pow(base, root);
    let rootExpression="";
    if (root==2){
        rootExpression=`\\[ \\sqrt{${radicand}}=? \\]`;
    }
    else{
        rootExpression=`\\[ \\sqrt[${root}]{${radicand}}=? \\]`;
    }
    let correctRoot=base.toString();
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=rootExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
    correctAnswer={
        correct: correctRoot,
        alternate: correctRoot
    };
}
export function getOrdinal(n){
    let s=["th", "st", "nd", "rd"];
    let v=n % 100;
    return s[(v-20) % 10]||s[v]||s[0];
}