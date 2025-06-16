//use "terser script.js -o script.min.js --compress --mangle --mangle-props" to package it as a min file
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
    switch (question){
        case "add":
            generateAddition();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "subtrt":
            generateSubtraction();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "mult":
            generateMultiplication();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "divid":
            generateDivision();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "root":
            generateRoot();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "deri":
            generateDerivative();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "inte":
            generateIntegral();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "mtrx":
            generateMatrix();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "vctr":
            generateVector();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "sin":
            generateSin();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cos":
            generateCosine();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "tan":
            generateTangent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cosec":
            generateCosecant();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "sec":
            generateSecant();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "cot":
            generateCotangent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "log":
            generateLogarithm();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "exp":
            generateExponent();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "fact":
            generateFactorial();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "perm":
            generatePermutation();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "comb":
            generateCombination();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "prob":
            generateProbability();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "ser":
            generateSeries();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "lim":
            generateLimit();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        case "relRates":
            generateRelatedRates();
            checkAnswerButton.disabled=false;
            userAnswer.disabled=false;
            break;
        default:
            questionArea.innerHTML=`Please select a type of question to generate before hitting the "Generate Question" button`;
    }
    MathJax.typeset();
}
function generateAddition(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}+${num2}=\$`;
    correctAnswer={ correct: (num1+num2).toFixed(3) };
}
function generateSubtraction(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}-${num2}=\$`;
    correctAnswer={ correct: (num1-num2).toFixed(3) };
}
function generateMultiplication(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\times ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer=num1*num2;
    correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
}
function generateDivision(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\div ${num2}=\$<br>Round your answer to two decimal places`;
    let actualAnswer=num1/num2;
    correctAnswer={
        correct: (Math.round(actualAnswer*100)/100).toFixed(2),
        alternate: actualAnswer.toFixed(5)
    };
}
function generateRoot(){
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
function generateDerivative(){
    questionArea.innerHTML="";
    let trigFunctions=[{ func: "\\sin(x)", deriv: "\\cos(x)", plainDeriv: "cos(x)" },{ func: "\\cos(x)", deriv: "-\\sin(x)", plainDeriv: "-sin(x)" },{ func: "\\tan(x)", deriv: "\\sec^{2}(x)", plainDeriv: "sec^2(x)" },{ func: "\\csc(x)", deriv: "-\\csc(x)\\cot(x)", plainDeriv: "-csc(x)cot(x)" },{ func: "\\sec(x)", deriv: "\\sec(x)\\tan(x)", plainDeriv: "sec(x)tan(x)" },{ func: "\\cot(x)", deriv: "-\\csc^{2}(x)", plainDeriv: "-csc^2(x)" }];
    let expFunctions=[{ func: "e^{x}", deriv: "e^{x}", plainDeriv: "e^x" },{ func: "2^{x}", deriv: "2^{x}\\ln(2)", plainDeriv: "2^x*ln(2)" }];
    let logFunctions=[{ func: "\\ln(x)", deriv: "\\frac{1}{x}", plainDeriv: "1/x" },{ func: "\\log_{2}(x)", deriv: "\\frac{1}{x\\ln(2)}", plainDeriv: "1/(x*ln(2))" }];
    let questionTypes=["polynomial", "trigonometric", "exponential", "logarithmic", "product", "quotient", "chain", "implicit", "higherOrder", "motion"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let polynomial, correctDerivative, plainCorrectDerivative, mathExpression;
    let latexToPlain=(str)=>str.replace(/\\/g, "").replace(/{/g, "").replace(/}/g, "").replace(/cdot/g, "*").replace(/frac\(([^)]+)\)\(([^)]+)\)/g, "($1)/($2)").replace(/frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    switch (questionType){
        case "polynomial":{
            let numTerms=Math.floor(Math.random()*4)+2;
            let exponents=new Set();
            while (exponents.size<numTerms){
                exponents.add(Math.floor(Math.random()*11));
            }
            exponents=Array.from(exponents).sort((a, b)=>b-a);
            let coefficients=[];
            for (let exponent of exponents){
                let coeff=(exponent==0)?Math.floor(Math.random()*100)+1:(exponent==1)?Math.floor(Math.random()*20)+1:Math.floor(Math.random()*30)+1;
                coefficients.push(coeff);
            }
            let terms=[], plainTerms=[];
            for (let i=0; i<exponents.length; i++){
                let term=(exponents[i]==0)?`${coefficients[i]}`:(exponents[i]==1)?`${coefficients[i]}x`:`${coefficients[i]}x^{${exponents[i]}}`;
                let plainTerm=(exponents[i]==0)?`${coefficients[i]}`:(exponents[i]==1)?`${coefficients[i]}x`:`${coefficients[i]}x^${exponents[i]}`;
                terms.push(term);
                plainTerms.push(plainTerm);
            }
            polynomial=`(${terms.join("+")})`;
            let derivativeTerms=[], plainDerivativeTerms=[];
            for (let i=0; i<exponents.length; i++){
                if (exponents[i]==0) continue;
                let newCoeff=coefficients[i]*exponents[i];
                let newExponent=exponents[i]-1;
                let term=(newExponent==0)?`${newCoeff}`:(newExponent==1)?`${newCoeff}x`:`${newCoeff}x^{${newExponent}}`;
                let plainTerm=(newExponent==0)?`${newCoeff}`:(newExponent==1)?`${newCoeff}x`:`${newCoeff}x^${newExponent}`;
                derivativeTerms.push(term);
                plainDerivativeTerms.push(plainTerm);
            }
            correctDerivative=derivativeTerms.join("+")||"0";
            plainCorrectDerivative=plainDerivativeTerms.join("+")||"0";
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "trigonometric":{
            let trig=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff} ${trig.func}`;
            correctDerivative=`${coeff} \\cdot ${trig.deriv}`;
            plainCorrectDerivative=`${coeff}*${trig.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "exponential":{
            let exp=expFunctions[Math.floor(Math.random()*expFunctions.length)];
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff} ${exp.func}`;
            correctDerivative=`${coeff} \\cdot ${exp.deriv}`;
            plainCorrectDerivative=`${coeff}*${exp.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "logarithmic":{
            let log=logFunctions[Math.floor(Math.random()*logFunctions.length)];
            polynomial=log.func;
            correctDerivative=log.deriv;
            plainCorrectDerivative=log.plainDeriv;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "product":{
            let a=Math.floor(Math.random()*5)+1;
            let linear=`${a}x`;
            let trigProd=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            polynomial=`(${linear}) \\cdot (${trigProd.func})`;
            correctDerivative=`${a} \\cdot ${trigProd.func}+(${linear}) \\cdot (${trigProd.deriv})`;
            plainCorrectDerivative=`${a}*${latexToPlain(trigProd.func)}+(${linear})*${trigProd.plainDeriv}`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "quotient":{
            let b=Math.floor(Math.random()*5)+1;
            let c=Math.floor(Math.random()*6);
            let trigQuot=trigFunctions[Math.floor(Math.random()*trigFunctions.length)];
            let num=`${b}x+${c}`;
            polynomial=`\\frac{${num}}{${trigQuot.func}}`;
            correctDerivative=`\\frac{${b} \\cdot ${trigQuot.func}-(${num}) \\cdot ${trigQuot.deriv}}{(${trigQuot.func})^{2}}`;
            plainCorrectDerivative=`(${b}*${latexToPlain(trigQuot.func)}-(${num})*${trigQuot.plainDeriv})/(${latexToPlain(trigQuot.func)})^2`;
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "chain":{
            let chainType=Math.floor(Math.random()*3);
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*3);
            let inner=`${a}x+${b}`;
            let plainInner=`${a}x+${b}`;
            if (chainType==0){
                let trigFunc=trigFunctions[Math.floor(Math.random()*2)];
                polynomial=`${trigFunc.func.replace("x", inner)}`;
                correctDerivative=`${trigFunc.deriv.replace("x", inner)} \\cdot ${a}`;
                plainCorrectDerivative=`${trigFunc.plainDeriv.replace("x", plainInner)}*${a}`;
            }
            else if (chainType==1){
                polynomial=`e^{${inner}}`;
                correctDerivative=`e^{${inner}} \\cdot ${a}`;
                plainCorrectDerivative=`e^(${plainInner})*${a}`;
            }
            else{
                let k=Math.floor(Math.random()*3)+2;
                polynomial=`(${inner})^{${k}}`;
                correctDerivative=`${k} (${inner})^{${k-1}} \\cdot ${a}`;
                plainCorrectDerivative=`${k}*(${plainInner})^${k-1}*${a}`;
            }
            mathExpression=`\\[ \\frac{d}{dx} ${polynomial}=? \\]`;
            break;
        }
        case "implicit":{
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*3)+1;
            polynomial=`${a}x^{2}+${b}y^{2}=1`;
            correctDerivative=`-\\frac{${a}x}{${b}y}`;
            plainCorrectDerivative=`-(${a}x)/(${b}y)`;
            mathExpression=`\\[ \\text{Find } \\frac{dy}{dx} \\text{ given } ${polynomial} \\]`;
            break;
        }
        case "higherOrder":{
            let coeff=Math.floor(Math.random()*10)+1;
            let exp=Math.floor(Math.random()*4)+2;
            polynomial=`${coeff}x^{${exp}}`;
            let order=Math.floor(Math.random()*2)+2;
            let deriv=coeff;
            let currExp=exp;
            for (let i=0; i<order; i++){
                deriv*=currExp;
                currExp--;
            }
            correctDerivative=(currExp<0)?"0":(currExp==0)?`${deriv}`:(currExp==1)?`${deriv}x`:`${deriv}x^{${currExp}}`;
            plainCorrectDerivative=(currExp<0)?"0":(currExp==0)?`${deriv}`:(currExp==1)?`${deriv}x`:`${deriv}x^${currExp}`;
            mathExpression=`\\[ \\frac{d^{${order}}}{dx^{${order}}} ${polynomial}=? \\]`;
            break;
        }
        case "motion":{
            let a=Math.floor(Math.random()*5)+1;
            let b=Math.floor(Math.random()*5)+1;
            polynomial=`${a}t^{2}+${b}t`;
            correctDerivative=`${2*a}t+${b}`;
            plainCorrectDerivative=`${2*a}t+${b}`;
            mathExpression=`\\[ \\text{If position } s(t)=${polynomial}, \\text{ find velocity } v(t)=? \\]`;
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
    correctAnswer={
        correct: plainCorrectDerivative.replace(/\s+/g, "").toLowerCase()
    };
}
function getOrdinal(n){
    let s=["th", "st", "nd", "rd"];
    let v=n % 100;
    return s[(v-20) % 10]||s[v]||s[0];
}
function generateIntegral(){
    questionArea.innerHTML="";
    let questionTypes=["polynomial", "trigonometric", "exponential", "logarithmic", "substitution", "definite", "initialValue", "area", "motion"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let polynomial, correctIntegral, plainCorrectIntegral, mathExpression;
    let latexToPlain=(str)=>str.replace(/\\/g, "").replace(/{/g, "").replace(/}/g, "").replace(/cdot/g, "*").replace(/frac\(([^)]+)\)\(([^)]+)\)/g, "($1)/($2)").replace(/frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    switch (questionType){
        case "polynomial":{
            let numTerms=Math.floor(Math.random()*4)+2;
            let exponents=new Set();
            while (exponents.size<numTerms){
                exponents.add(Math.floor(Math.random()*11));
            }
            exponents=Array.from(exponents).sort((a, b)=>b-a);
            let coefficients=[];
            for (let exponent of exponents){
                coefficients.push((exponent==0)?Math.floor(Math.random()*100)+1 :
                    (exponent==1)?Math.floor(Math.random()*20)+1:Math.floor(Math.random()*30)+1);
            }
            let terms=[], plainTerms=[];
            for (let i=0; i<exponents.length; i++){
                let term=(exponents[i]==0)?`${coefficients[i]}`:(exponents[i]==1)?`${coefficients[i]}x`:`${coefficients[i]}x^{${exponents[i]}}`;
                let plainTerm=term.replace(/[{}]/g, "");
                terms.push(term);
                plainTerms.push(plainTerm);
            }
            polynomial=`(${terms.join("+")})`;
            let integralTerms=[], plainIntegralTerms=[];
            for (let i=0; i<exponents.length; i++){
                let newExponent=exponents[i]+1;
                let newCoeff=coefficients[i]/newExponent;
                let term=`${newCoeff.toFixed(2)}x^{${newExponent}}`;
                let plainTerm=`${newCoeff.toFixed(2)}x^${newExponent}`;
                integralTerms.push(term);
                plainIntegralTerms.push(plainTerm);
            }
            integralTerms.push("C");
            plainIntegralTerms.push("C");
            correctIntegral=integralTerms.join("+");
            plainCorrectIntegral=plainIntegralTerms.join("+");
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "trigonometric":{
            let trigIntegrals=[{ func: "\\sin(ax)", integral: "-\\frac{1}{a}\\cos(ax)", plain: "-1/a cos(ax)" },{ func: "\\cos(ax)", integral: "\\frac{1}{a}\\sin(ax)", plain: "1/a sin(ax)" },{ func: "\\sec^{2}(ax)", integral: "\\frac{1}{a}\\tan(ax)", plain: "1/a tan(ax)" }];
            let chosen=trigIntegrals[Math.floor(Math.random()*trigIntegrals.length)];
            let a=Math.floor(Math.random()*3)+1;
            let coeff=Math.floor(Math.random()*4)+1;
            polynomial=`${coeff}${chosen.func.replace("a", a)}`;
            correctIntegral=`${coeff}${chosen.integral.replace(/a/g, a)}+C`;
            plainCorrectIntegral=`${(coeff/a).toFixed(2)}${chosen.plain.replace("a", a).replace("1/a", "1/"+a)}+C`.replace(/(\.00|0+)$/, "");
            break;
        }
        case "exponential":{
            let base=Math.random()<0.5?"e":Math.floor(Math.random()*3)+2;
            let a=Math.floor(Math.random()*3)+1;
            let coeff=Math.floor(Math.random()*4)+1;
            if (base=="e"){
                polynomial=`${coeff}e^{${a}x}`;
                plainCorrectIntegral=`${(coeff/a).toFixed(2)}e^(${a}x)+C`;
            }
            else{
                polynomial=`${coeff}${base}^{x}`;
                plainCorrectIntegral=`${(coeff/Math.log(base)).toFixed(2)}${base}^x+C`;
            }
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "logarithmic":{
            let coeff=Math.floor(Math.random()*5)+1;
            polynomial=`${coeff}/x`;
            plainCorrectIntegral=`${coeff}ln|x|+C`;
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "substitution":{
            let a=Math.floor(Math.random()*3)+1;
            let b=Math.floor(Math.random()*5);
            let power=Math.floor(Math.random()*3)+2;
            let coeff=Math.floor(Math.random()*4)+1;
            polynomial=`${coeff}(${a}x+${b})^{${power}}`;
            let newPower=power+1;
            plainCorrectIntegral=`${(coeff/(a*newPower)).toFixed(2)}(${a}x+${b})^${newPower}+C`.replace(/\.00/g, "");
            mathExpression=`\\[ \\int ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "definite":{
            let exponents=Array.from({ length: 3 }, ()=>Math.floor(Math.random()*4));
            let coefficients=exponents.map(()=>Math.floor(Math.random()*5)+1);
            let [lower, upper]=[1, Math.floor(Math.random()*5)+2];
            polynomial=coefficients.map((c, i)=>`${c}x^${exponents[i]}`).join("+");
            let integral=coefficients.map((c, i)=>c/(exponents[i]+1)).reduce((a, b)=>a+b, 0);
            let result=(upper ** (exponents[0]+1)-lower ** (exponents[0]+1))*integral;
            plainCorrectIntegral=result.toFixed(2);
            mathExpression=`\\[ \\int_{${lower}}^{${upper}} ${polynomial} \\,dx=? \\]`;
            break;
        }
        case "initialValue":{
            let coeff=Math.floor(Math.random()*5)+1;
            let exponent=Math.floor(Math.random()*3)+1;
            let xVal=Math.floor(Math.random()*3)+1;
            let yVal=Math.floor(Math.random()*20)+5;
            polynomial=`${coeff}x^${exponent}`;
            let c=yVal-(coeff/(exponent+1))*xVal ** (exponent+1);
            plainCorrectIntegral=`${(coeff/(exponent+1)).toFixed(2)}x^${exponent+1}+${c.toFixed(2)}`;
            mathExpression=`\\[ \\text{Find } f(x) \\text{ where } f'(${xVal})=${yVal} \\text{ and } f'(x)=${polynomial} \\]`;
            break;
        }
        case "area":{
            let funcs=["x^2", "sin(x)", "sqrt(x)", "2^x"];
            let func=funcs[Math.floor(Math.random()*funcs.length)];
            let [a, b]=[0, Math.floor(Math.random()*4)+1];
            plainCorrectIntegral=`∫${a}^${b} ${func} dx`;
            mathExpression=`\\[ \\text{Set up the integral for the area under } ${func} \\text{ from } ${a} \\text{ to } ${b} \\]`;
            break;
        }
        case "motion":{
            let coeff=Math.floor(Math.random()*4)+1;
            let type=Math.random()<0.5?"velocity":"acceleration";
            if (type=="velocity"){
                polynomial=`${coeff}t^2`;
                plainCorrectIntegral=`${(coeff/3).toFixed(2)}t^3+C`;
            }
            else{
                polynomial=`${coeff}t`;
                plainCorrectIntegral=`${(coeff/2).toFixed(2)}t^2+C`;
            }
            mathExpression=`\\[ \\text{Find position function from } ${type} \\ a(t)=${polynomial} \\]`;
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression||`\\[ \\int ${polynomial} \\,dx=? \\]`;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
    correctAnswer={
        correct: plainCorrectIntegral.replace(/\s+/g, "").replace(/\^{/g, "^").replace(/}/g, "").replace(/{/g, "").toLowerCase()
    };
}
function generateVector(){
    questionArea.innerHTML="";
    let types=["magnitude", "direction", "unit", "dot", "angle", "projection", "parametric", "polar_convert", "cartesian_convert", "polar_graph", "motion", "de_moivre", "add", "subtract", "parametric_to_cartesian"];
    let type=types[Math.floor(Math.random()*types.length)];
    let generateNonZeroVector=()=>{
        let x, y;
        do{
            x=Math.random()*10-5;
            y=Math.random()*10-5;
        } while (Math.abs(x)<0.1&&Math.abs(y)<0.1);
        return{ x, y };
    };
    let generateNonZeroXVector=()=>{
        let vec;
        do{
            vec=generateNonZeroVector();
        } while (Math.abs(vec.x)<0.1);
        return vec;
    };
    switch (type){
        case "magnitude":{
            let{ x, y }=generateNonZeroVector();
            let mag=Math.sqrt(x ** 2+y ** 2).toFixed(2);
            questionArea.innerHTML=`Find the magnitude of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: mag,
                alternate: mag,
            };
            break;
        }
        case "direction":{
            let{ x, y }=generateNonZeroVector();
            let angle=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the direction angle (in degrees) of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case "unit":{
            let{ x, y }=generateNonZeroVector();
            let mag=Math.sqrt(x ** 2+y ** 2);
            let ux=(x/mag).toFixed(2);
            let uy=(y/mag).toFixed(2);
            questionArea.innerHTML=`Find the unit vector in the direction of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${ux}, ${uy}>`,
                alternate: `\\langle ${ux}, ${uy} \\rangle`,
            };
            break;
        }
        case "dot":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let product=(v1.x*v2.x+v1.y*v2.y).toFixed(2);
            questionArea.innerHTML=`Calculate \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle \\cdot \\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: product,
                alternate: product,
            };
            break;
        }
        case "angle":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let mag1=Math.sqrt(v1.x ** 2+v1.y ** 2);
            let mag2=Math.sqrt(v2.x ** 2+v2.y ** 2);
            let angle=(Math.acos(dot/(mag1*mag2))*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the angle (in degrees) between \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) and \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case "projection":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let magV2Sq=v2.x ** 2+v2.y ** 2;
            let projX=(dot/magV2Sq*v2.x).toFixed(2);
            let projY=(dot/magV2Sq*v2.y).toFixed(2);
            questionArea.innerHTML=`Find the projection of \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) onto \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${projX}, ${projY}>`,
                alternate: `\\langle ${projX}, ${projY} \\rangle`,
            };
            break;
        }
        case "parametric":{
            let pointX=(Math.random()*10-5).toFixed(1);
            let pointY=(Math.random()*10-5).toFixed(1);
            let dir=generateNonZeroVector();
            questionArea.innerHTML=`Write the parametric equations for the line that passes through \\((${pointX}, ${pointY})\\) and has direction vector \\(\\langle ${dir.x.toFixed(1)}, ${dir.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `x=${pointX}+${dir.x.toFixed(1)}t, y=${pointY}+${dir.y.toFixed(1)}t`,
                alternate: `x=${pointX}+${dir.x.toFixed(1)}t, y=${pointY}+${dir.y.toFixed(1)}t`,
            };
            break;
        }
        case "polar_convert":{
            let r=(Math.random()*10).toFixed(1);
            let theta=(Math.random()*360-180).toFixed(0);
            let x=(parseFloat(r)*Math.cos(parseFloat(theta)*Math.PI/180).toFixed(2));
            let y=(parseFloat(r)*Math.sin(parseFloat(theta)*Math.PI/180).toFixed(2));
            questionArea.innerHTML=`Convert the polar coordinate \\((${r}, ${theta}^{\\circ})\\) to Cartesian coordinates.`;
            correctAnswer={
                correct: `(${x}, ${y})`,
                alternate: `(${x}, ${y})`,
            };
            break;
        }
        case "cartesian_convert":{
            let{ x, y }=generateNonZeroVector();
            let r=Math.sqrt(x ** 2+y ** 2).toFixed(2);
            let theta=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Convert the Cartesian coordinate \\((${x.toFixed(1)}, ${y.toFixed(1)})\\) to polar coordinates. Answer with (r, degrees), no need to add deg.`;
            correctAnswer={
                correct: `(${r}, ${theta})`,
                alternate: `(${r}, ${theta}^{\\circ})`,
            };
            break;
        }
        case "polar_graph":{
            let a=(Math.random()*4+1).toFixed(1);
            let useSin=Math.random()<0.5;
            if (useSin){
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\sin\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius) \" Use two decimal places.`;
                let center=(a/2).toFixed(2);
                correctAnswer={
                    correct: `A circle with center at (0, ${center}) and radius ${center}`,
                    alternate: `Circle: center (0, ${center}), radius ${center}`,
                };
            }

            else{
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\cos\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius) \"  Use two decimal places.`;
                let center=(a/2).toFixed(2);
                correctAnswer={
                    correct: `A circle with center at (${center}, 0) and radius ${center}`,
                    alternate: `Circle: center (${center}, 0), radius ${center}`,
                };
            }
            break;
        }
        case "motion":{
            let posX=(Math.random()*10-5).toFixed(1);
            let posY=(Math.random()*10-5).toFixed(1);
            let v=generateNonZeroVector();
            questionArea.innerHTML=`A particle starts at \\((${posX}, ${posY})\\) and moves with letant velocity \\(\\langle ${v.x.toFixed(1)}, ${v.y.toFixed(1)} \\rangle\\). Write the position vector as a function of time \\(t\\).`;
            correctAnswer={
                correct: `<${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t>`,
                alternate: `\\langle ${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t \\rangle`,
            };
            break;
        }
        case "de_moivre":{
            let r=(Math.random()*5+1).toFixed(1);
            let theta=Math.floor(Math.random()*360);
            let n=Math.floor(Math.random()*3+2);
            let newR=(r ** n).toFixed(2);
            let newTheta=(theta*n) % 360;
            questionArea.innerHTML=`Compute \\((${r}(\\cos ${theta}^{\\circ}+i\\sin ${theta}^{\\circ}))^{${n}}\\) using De Moivre"s Theorem. Answer with degrees (no need to add deg).`;
            correctAnswer={
                correct: `${newR} cis ${newTheta}`,
                alternate: `${newR}(\\cos ${newTheta}^{\\circ}+i\\sin ${newTheta}^{\\circ})`,
            };
            break;
        }
        case "add":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let sumX=(v1.x+v2.x).toFixed(2);
            let sumY=(v1.y+v2.y).toFixed(2);
            questionArea.innerHTML=`Find the sum of the vectors \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) and \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${sumX}, ${sumY}>`,
                alternate: `\\langle ${sumX}, ${sumY} \\rangle`,
            };
            break;
        }
        case "subtract":{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let diffX=(v1.x-v2.x).toFixed(2);
            let diffY=(v1.y-v2.y).toFixed(2);
            questionArea.innerHTML=`Subtract \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\) from \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${diffX}, ${diffY}>`,
                alternate: `\\langle ${diffX}, ${diffY} \\rangle`,
            };
            break;
        }
        case "parametric_to_cartesian":{
            let x0=(Math.random()*10-5).toFixed(1);
            let y0=(Math.random()*10-5).toFixed(1);
            let dir=generateNonZeroXVector();
            let slope=(dir.y/dir.x).toFixed(2);
            questionArea.innerHTML=`The line is given by the parametric equations \\(x=${x0}+${dir.x.toFixed(1)}t\\) and \\(y=${y0}+${dir.y.toFixed(1)}t\\). Convert these into a single Cartesian equation.`;
            let yIntercept=(y0-slope*x0).toFixed(2);
            correctAnswer={
                correct: `y=${slope}x+${yIntercept}`,
                alternate: `y=${slope}(x-${x0})+${y0}`,
            };
            break;
        }
        default:
            questionArea.innerHTML="Unknown question type.";
    }
    MathJax.typeset();
}
function generateLogarithm(){
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
function generateExponent(){
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
function generateFactorial(){
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
function factorial(n){
    if (n<0) return NaN;
    let res=1;
    for (let i=2; i<=n; i++) res*=i;
    return res;
}
function nPr(n, r){
    return r>n?0:factorial(n)/factorial(n-r);
}
function nCr(n, r){
    return r>n?0:factorial(n)/(factorial(r)*factorial(n-r));
}
function generatePermutation(){
    questionArea.innerHTML="";
    let types=["basic", "equation", "word", "circular", "identical", "withReplacement"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*8)+5;
    let r=Math.floor(Math.random()*(n-1))+1;
    switch (type){
        case "basic":
            questionArea.innerHTML=`\\( P(${n}, ${r}) \\)`;
            correctAnswer={
                correct: nPr(n, r),
                alternate: `nPr(${n},${r})`
            };
            break;
        case "equation":
            let val=nPr(n, r);
            questionArea.innerHTML=`Find \\( n \\) if \\( P(n, ${r})=${val} \\)`;
            correctAnswer={
                correct: n,
                alternate: `${n}`
            };
            break;
        case "word":
            let objs=["books", "cars", "students", "colors"];
            let obj=objs[Math.floor(Math.random()*objs.length)];
            questionArea.innerHTML=`In how many ways can you arrange \\( ${r} \\) ${obj} chosen from \\( ${n} \\)?`;
            correctAnswer={
                correct: nPr(n, r),
                alternate: `P(${n},${r})`
            };
            break;
        case "circular":
            questionArea.innerHTML=`How many circular arrangements of \\( ${n} \\) distinct objects?`;
            correctAnswer={
                correct: factorial(n-1),
                alternate: `(${n}-1)!`
            };
            break;
        case "identical":
            let k=Math.floor(Math.random()*(n-1))+1;
            questionArea.innerHTML=`Permutations of \\( ${n} \\) items when \\( ${k} \\) are identical`;
            correctAnswer={
                correct: factorial(n)/factorial(k),
                alternate: `${n}!/${k}!`
            };
            break;
        case "withReplacement":
            questionArea.innerHTML=`How many ordered selections of \\( ${r} \\) items from \\( ${n} \\) types if repetition is allowed?`;
            correctAnswer={
                correct: Math.pow(n, r),
                alternate: `${n}^${r}`
            };
            break;
    }
    MathJax&&MathJax.typeset();
}
function generateCombination(){
    questionArea.innerHTML="";
    let types=["basic", "equation", "word", "complement", "paths", "multiset"];
    let type=types[Math.floor(Math.random()*types.length)];
    let n=Math.floor(Math.random()*8)+5;
    let r=Math.floor(Math.random()*(n-1))+1;
    switch (type){
        case "basic":
            questionArea.innerHTML=`\\( C(${n}, ${r}) \\)`;
            correctAnswer={
                correct: nCr(n, r),
                alternate: `nCr(${n},${r})`
            };
            break;
        case "equation":
            let val=nCr(n, r);
            questionArea.innerHTML=`Find \\( n \\) if \\( C(n, ${r})=${val} \\)`;
            correctAnswer={
                correct: n,
                alternate: `${n}`
            };
            break;
        case "word":
            let items=["fruits", "committee members", "pizzas"];
            let item=items[Math.floor(Math.random()*items.length)];
            questionArea.innerHTML=`How many ways to choose \\( ${r} \\) ${item} from \\( ${n} \\)?`;
            correctAnswer={
                correct: nCr(n, r),
                alternate: `C(${n},${r})`
            };
            break;
        case "complement":
            questionArea.innerHTML=`Show that \\( C(${n}, ${n-r})=C(${n}, ${r}) \\). What is its value?`;
            correctAnswer={
                correct: nCr(n, r),
                alternate: `C(${n},${r})`
            };
            break;
        case "paths":
            let g=Math.floor(Math.random()*4)+3;
            questionArea.innerHTML=`Number of shortest paths in a \\( ${g} \\times ${g} \\) grid (right & up moves)?`;
            correctAnswer={
                correct: nCr(2*g, g),
                alternate: `C(${2*g},${g})`
            };
            break;
        case "multiset":
            questionArea.innerHTML=`Ways to choose \\( ${r} \\) items from \\( ${n} \\) types if repeats allowed?`;
            correctAnswer={
                correct: nCr(n+r-1, r),
                alternate: `C(${n+r-1},${r})`
            };
            break;
    }
    MathJax&&MathJax.typeset();
}
function generateMatrix(){
    questionArea.innerHTML="";
    let types=["add", "subtract", "multiply", "inverse", "system", "transpose", "scalar_mult", "power", "row_echelon"];
    let type=types[Math.floor(Math.random()*types.length)];
    let generate2x2=()=>({ a: +(Math.random()*10-5).toFixed(2), b: +(Math.random()*10-5).toFixed(2), c: +(Math.random()*10-5).toFixed(2), d: +(Math.random()*10-5).toFixed(2) });
    let matrixToString=(m, style="bmatrix")=>`\\begin{${style}} ${m.a} & ${m.b} \\\\ ${m.c} & ${m.d} \\end{${style}}`;
    switch (type){
        case "add":{
            let A=generate2x2();
            let B=generate2x2();
            let result={
                a: +(A.a+B.a).toFixed(2),
                b: +(A.b+B.b).toFixed(2),
                c: +(A.c+B.c).toFixed(2),
                d: +(A.d+B.d).toFixed(2)
            };
            questionArea.innerHTML=`Add: \$${matrixToString(A)}+${matrixToString(B)}\$`;
            correctAnswer={
                correct: `[${result.a},${result.b},${result.c},${result.d}]`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "subtract":{
            let A=generate2x2();
            let B=generate2x2();
            let result={
                a: +(A.a-B.a).toFixed(2),
                b: +(A.b-B.b).toFixed(2),
                c: +(A.c-B.c).toFixed(2),
                d: +(A.d-B.d).toFixed(2)
            };
            questionArea.innerHTML=`Subtract: \$${matrixToString(A)}-${matrixToString(B)}\$`;
            correctAnswer={
                correct: `(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "multiply":{
            let A=generate2x2();
            let B=generate2x2();
            let result={
                a: +(A.a*B.a+A.b*B.c).toFixed(2),
                b: +(A.a*B.b+A.b*B.d).toFixed(2),
                c: +(A.c*B.a+A.d*B.c).toFixed(2),
                d: +(A.c*B.b+A.d*B.d).toFixed(2)
            };
            questionArea.innerHTML=`Multiply: \$${matrixToString(A)} \\times ${matrixToString(B)}\$`;
            correctAnswer={
                correct: `[${result.a},${result.b},${result.c},${result.d}]`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "inverse":{
            let A, det;
            do{
                A=generate2x2();
                det=A.a*A.d-A.b*A.c;
            } while (Math.abs(det)<0.1);
            let invDet=1/det;
            let inv={
                a: +(A.d*invDet).toFixed(2),
                b: +(-A.b*invDet).toFixed(2),
                c: +(-A.c*invDet).toFixed(2),
                d: +(A.a*invDet).toFixed(2)
            };
            questionArea.innerHTML=`Find inverse of \$${matrixToString(A)}\$`;
            correctAnswer={
                correct: `inv(${inv.a},${inv.b},${inv.c},${inv.d})`,
                alternate: matrixToString(inv),
            };
            break;
        }
        case "system":{
            let A=generate2x2();
            let x=+(Math.random()*5+1).toFixed(2);
            let y=+(Math.random()*5+1).toFixed(2);
            let B={
                a: +(A.a*x+A.b*y).toFixed(2),
                b: +(A.c*x+A.d*y).toFixed(2)
            };
            questionArea.innerHTML=`Solve:<br>
                \$${A.a}x+${A.b}y=${B.a}\$<br>
                \$${A.c}x+${A.d}y=${B.b}\$`;
            correctAnswer={
                correct: `x=${x}, y=${y}`,
                alternate: `(${x},${y})`,
            };
            break;
        }
        case "transpose":{
            let A=generate2x2();
            let result={ a: A.a, b: A.c, c: A.b, d: A.d };
            questionArea.innerHTML=`Find transpose of \$${matrixToString(A)}\$`;
            correctAnswer={
                correct: `tr(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "scalar_mult":{
            let A=generate2x2();
            let k=+(Math.random()*10-5).toFixed(1);
            let result={
                a: +(k*A.a).toFixed(2),
                b: +(k*A.b).toFixed(2),
                c: +(k*A.c).toFixed(2),
                d: +(k*A.d).toFixed(2)
            };
            questionArea.innerHTML=`Multiply \$${matrixToString(A)}\$ by ${k}`;
            correctAnswer={
                correct: `scl(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "power":{
            let A=generate2x2();
            let result={
                a: +(A.a*A.a+A.b*A.c).toFixed(2),
                b: +(A.a*A.b+A.b*A.d).toFixed(2),
                c: +(A.c*A.a+A.d*A.c).toFixed(2),
                d: +(A.c*A.b+A.d*A.d).toFixed(2)
            };
            questionArea.innerHTML=`Compute \$${matrixToString(A)}^2\$`;
            correctAnswer={
                correct: `pow(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case "row_echelon":{
            let A;
            do{ A=generate2x2(); } while (Math.abs(A.a)<0.1);
            let factor=+(A.c/A.a).toFixed(2);
            let result={
                a: A.a,
                b: A.b,
                c: 0,
                d: +(A.d-factor*A.b).toFixed(2)
            };
            questionArea.innerHTML=`Find row-echelon form of \$${matrixToString(A)}\$`;
            correctAnswer={
                correct: `ref(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
    }
    MathJax.typeset();
}
function generateSin(){
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "amplitude", "period", "phase_shift", "law_sines", "unit_circle", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let commonAngles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
                let angle=commonAngles[Math.floor(Math.random()*commonAngles.length)];
                let value=Math.sin(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${angle}^\\circ)\$`;
                correctAnswer={ correct: value, alternate: value };
            }
            else{
                let radianAngles=[{ value: 0, label: "0" },{ value: Math.PI/6, label: "\\frac{\\pi}{6}" },{ value: Math.PI/4, label: "\\frac{\\pi}{4}" },{ value: Math.PI/3, label: "\\frac{\\pi}{3}" },{ value: Math.PI/2, label: "\\frac{\\pi}{2}" },{ value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}" },{ value: 3*Math.PI/4, label: "\\frac{3\\pi}{4}" },{ value: 5*Math.PI/6, label: "\\frac{5\\pi}{6}" },{ value: Math.PI, label: "\\pi" },{ value: 7*Math.PI/6, label: "\\frac{7\\pi}{6}" },{ value: 5*Math.PI/4, label: "\\frac{5\\pi}{4}" },{ value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}" },{ value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}" },{ value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}" },{ value: 7*Math.PI/4, label: "\\frac{7\\pi}{4}" },{ value: 11*Math.PI/6, label: "\\frac{11\\pi}{6}" }];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.sin(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${obj.label})\$`;
                correctAnswer={ correct: value, alternate: value };
            }
            break;
        }
        case "solve":{
            let k=(Math.random()*2-1).toFixed(2);
            let isDegree=Math.random()<0.5;
            let solutions=[];
            let principal=Math.asin(k);
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                let sol1=principalDeg;
                let sol2=180-principalDeg;
                [sol1, sol2].forEach(sol=>{
                    if (sol>=0&&sol<360) solutions.push(`${sol.toFixed(0)}deg`);
                });
                questionArea.innerHTML=`Solve \$\\sin\\theta=${k}\$ (in degrees)`;
            }
            else{
                let sol1=principal;
                let sol2=Math.PI-principal;
                [sol1, sol2].forEach(sol=>{
                    if (sol>=0&&sol<2*Math.PI) solutions.push(sol.toFixed(2));
                });
                questionArea.innerHTML=`Solve \$\\sin\\theta=${k}\$ (in radians)`;
            }
            correctAnswer={ correct: solutions.join(", "), alternate: solutions.join(", ") };
            break;
        }
        case "amplitude":{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\sin(3x+\\pi/4)\$`;
            correctAnswer={ correct: A, alternate: A };
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\sin(${B}x)\$?`;
            correctAnswer={
                correct: (2*Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case "phase_shift":{
            let C=(Math.random()*Math.PI).toFixed(2);
            let shiftDirection=(parseFloat(C)>0)?"left":"right";
            let shiftText=(parseFloat(C)==0)?"0":`${C} units ${shiftDirection}`;
            questionArea.innerHTML=`Identify the phase shift of \$y=\\sin(x+${C})\$`;
            correctAnswer={
                correct: shiftText,
                alternate: (parseFloat(C)==0)?"0":`-${C}`
            };
            break;
        }
        case "law_sines":{
            let angleA=Math.floor(Math.random()*50+30);
            let angleB=Math.floor(Math.random()*50+30);
            let sideA=Math.floor(Math.random()*10+5);
            let sideB=(sideA*Math.sin(angleB*Math.PI/180)/Math.sin(angleA*Math.PI/180)).toFixed(1);

            questionArea.innerHTML=`Using the Law of Sines:<br>
                In triangle ABC, ∠A=${angleA}deg, ∠B=${angleB}deg, and side a=${sideA}.<br>
                Find side b.`;
            correctAnswer={ correct: sideB, alternate: sideB };
            break;
        }
        case "unit_circle":{
            let angles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let cosVal=Math.cos(angle*Math.PI/180).toFixed(2);
            let sinVal=Math.sin(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Find the coordinates on the unit circle for an angle of ${angle}deg (format: (cos, sin))`;
            correctAnswer={ correct: `(${cosVal}, ${sinVal})`, alternate: `(${cosVal}, ${sinVal})` };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\sin^2\\theta+\\cos^2\\theta=\\; ?\$`;
            correctAnswer={ correct: "1", alternate: "one" };
            break;
        }
        default:
            questionArea.innerHTML="Unknown sine question type";
    }
    MathJax.typeset();
}
function generateCosine(){
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "amplitude", "period", "phase_shift", "law_cosines", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let angles=[0, 60, 90, 120, 180, 240, 270, 300];
                let angle=angles[Math.floor(Math.random()*angles.length)];
                let value=Math.cos(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${angle}^\\circ)\$`;
                correctAnswer={ correct: value, alternate: value };
            }
            else{
                let radianAngles=[{ value: 0, label: "0" },{ value: Math.PI/3, label: "\\frac{\\pi}{3}" },{ value: Math.PI/2, label: "\\frac{\\pi}{2}" },{ value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}" },{ value: Math.PI, label: "\\pi" },{ value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}" },{ value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}" },{ value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}" }];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.cos(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${obj.label})\$`;
                correctAnswer={ correct: value, alternate: value };
            }
            break;
        }
        case "solve":{
            let k=(Math.random()*2-1).toFixed(2);
            let isDegree=Math.random()<0.5;
            let solutions=[];
            let principal=Math.acos(k);
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                let sol1=principalDeg;
                let sol2=360-principalDeg;
                [sol1, sol2].forEach(sol=>{
                    if (sol>=0&&sol<360) solutions.push(`${sol.toFixed(0)}deg`);
                });
                questionArea.innerHTML=`Solve \$\\cos\\theta=${k}\$ (in degrees)`;
            }
            else{
                let sol1=principal;
                let sol2=2*Math.PI-principal;
                [sol1, sol2].forEach(sol=>{
                    if (sol>=0&&sol<2*Math.PI) solutions.push(sol.toFixed(2));
                });
                questionArea.innerHTML=`Solve \$\\cos\\theta=${k}\$ (in radians)`;
            }
            correctAnswer={ correct: solutions.join(", "), alternate: solutions.join(", ") };
            break;
        }
        case "amplitude":{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\cos(2x-\\pi/3)\$`;
            correctAnswer={ correct: A, alternate: A };
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\cos(${B}x)\$?`;
            correctAnswer={
                correct: (2*Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case "phase_shift":{
            let C=(Math.random()*Math.PI).toFixed(2);
            let shiftDirection=(parseFloat(C)>0)?"left":"right";
            let shiftText=(parseFloat(C)==0)?"0":`${C} units ${shiftDirection}`;
            questionArea.innerHTML=`Identify the phase shift of \$y=\\cos(x+${C})\$`;
            correctAnswer={
                correct: shiftText,
                alternate: (parseFloat(C)==0)?"0":`-${C}`
            };
            break;
        }
        case "law_cosines":{
            let a=Math.floor(Math.random()*10+5);
            let b=Math.floor(Math.random()*10+5);
            let angleC=Math.floor(Math.random()*50+30);
            let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(angleC*Math.PI/180)).toFixed(1);

            questionArea.innerHTML=`Using the Law of Cosines:<br>
                In triangle ABC, sides a=${a}, b=${b}, and ∠C=${angleC}deg.<br>
                Find side c.`;
            correctAnswer={ correct: c, alternate: c };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\cos^2\\theta+\\sin^2\\theta=\\; ?\$`;
            correctAnswer={ correct: "1", alternate: "one" };
            break;
        }
        default:
            questionArea.innerHTML="Unknown cosine question type";
    }
    MathJax.typeset();
}
function generateTangent(){
    questionArea.innerHTML="";
    let types=["evaluate", "solve", "period", "asymptote", "identity"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let angles=[0, 45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=Math.tan(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\tan(${angle}^\\circ)\$`;
            correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "solve":{
            let k=(Math.random()*10-5).toFixed(2);
            let isDegree=Math.random()<0.5;
            let principal=Math.atan(k);
            if (isDegree){
                let principalDeg=principal*180/Math.PI;
                questionArea.innerHTML=`Solve \$\\tan\\theta=${k}\$ (in degrees, give the principal solution)`;
                correctAnswer={ correct: `${principalDeg.toFixed(0)}deg+180degn`, alternate: `${principalDeg.toFixed(0)}deg+180degn` };
            }
            else{
                questionArea.innerHTML=`Solve \$\\tan\\theta=${k}\$ (in radians, give the principal solution)`;
                correctAnswer={ correct: `${principal.toFixed(2)}+\\pi n`, alternate: `${principal.toFixed(2)}+\\pi n` };
            }
            break;
        }
        case "period":{
            let B=Math.floor(Math.random()*3+1);
            questionArea.innerHTML=`What is the period of \$y=\\tan(${B}x)\$?`;
            correctAnswer={
                correct: (Math.PI/B).toFixed(2)+" radians",
                alternate: `\\frac{\\pi}{${B}}`
            };
            break;
        }
        case "asymptote":{
            let B=Math.floor(Math.random()*2+1);
            let asymptotes=[];
            for (let k=-1; k<=0; k++){
                asymptotes.push(`x=\\frac{(2*${k}+1)\\pi}{2\\cdot${B}}`);
            }
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\tan(${B}x)\$`;
            correctAnswer={
                correct: asymptotes.join(", "),
                alternate: `x=\\frac{\\pi}{2\\cdot${B}}+\\frac{\\pi k}{${B}}`
            };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$1+\\tan^2\\theta=\\; ?\$`;
            correctAnswer={ correct: "sec^2theta", alternate: "\\sec^2\\theta" };
            break;
        }
        default:
            questionArea.innerHTML="Unknown tangent question type";
    }
    MathJax.typeset();
}
function generateCosecant(){
    questionArea.innerHTML="";
    let types=["evaluate", "relationship", "asymptote"];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case "evaluate":{
            let angles=[30, 150, 210, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.sin(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\csc(${angle}^\\circ)\$`;
            correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "relationship":{
            let angle=Math.floor(Math.random()*360);
            questionArea.innerHTML=`Express \$\\csc(${angle}^\\circ)\$ in terms of sine.`;
            correctAnswer={
                correct: `\\frac{1}{\\sin(${angle}^\\circ)}`,
                alternate: "1/sin("+angle+"deg)"
            };
            break;
        }
        case "asymptote":{
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\csc(x)\$ (in radians).`;
            correctAnswer={ correct: "x=n\\pi", alternate: "nπ" };
            break;
        }
        default:
            questionArea.innerHTML="Unknown cosecant question type";
    }
    MathJax.typeset();
}
function generateSecant(){
    questionArea.innerHTML="";
    let type=Math.random()<0.5?"evaluate":"identity";
    switch (type){
        case "evaluate":{
            let angles=[0, 60, 180, 300];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.cos(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\sec(${angle}^\\circ)\$`;
            correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "identity":{
            questionArea.innerHTML=`Complete the identity: \$\\sec^2\\theta-\\tan^2\\theta=?\$`;
            correctAnswer={ correct: "1", alternate: "one" };
            break;
        }
        default:
            questionArea.innerHTML="Unknown secant question type";
    }
    MathJax.typeset();
}
function generateCotangent(){
    questionArea.innerHTML="";
    let type=Math.random()<0.5?"evaluate":"relationship";
    switch (type){
        case "evaluate":{
            let angles=[45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.tan(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\cot(${angle}^\\circ)\$`;
            correctAnswer={ correct: value, alternate: value };
            break;
        }
        case "relationship":{
            questionArea.innerHTML=`Express \$\\cot\\theta\$ in terms of tangent.`;
            correctAnswer={
                correct: `\\frac{1}{\\tan\\theta}`,
                alternate: "1/tantheta"
            };
            break;
        }
        default:
            questionArea.innerHTML="Unknown cotangent question type";
    }
    MathJax.typeset();
}
function generateProbability(){
    questionArea.innerHTML="";
    let questionTypes=["basic", "conditional", "independent", "mutually_exclusive", "bayes", "binomial", "expected_value", "complement", "permutation_combination", "geometric"];
    let questionType=questionTypes[Math.floor(Math.random()*questionTypes.length)];
    let plainCorrectAnswer, content=[];
    switch (questionType){
        case "basic":{
            let total=Math.floor(Math.random()*50)+10;
            let favorable=Math.floor(Math.random()*(total-1))+1;
            let prob=(favorable/total).toFixed(2);
            content.push(`A bag contains <span class="math">\\(${total}\\)</span> marbles, <span class="math">\\(${favorable}\\)</span> of which are red. What is the probability of drawing a red marble?`);
            plainCorrectAnswer=prob;
            correctAnswer={ correct: prob, alternate: `${favorable}/${total}` };
            break;
        }
        case "conditional":{
            let total=Math.floor(Math.random()*100)+50;
            let eventA=Math.floor(Math.random()*(total-10))+10;
            let eventB=Math.floor(Math.random()*(eventA-5))+5;
            let probB=(eventB/eventA).toFixed(2);
            content.push(`Given <span class="math">\\(${total}\\)</span> items, <span class="math">\\(${eventA}\\)</span> are type A, and <span class="math">\\(${eventB}\\)</span> of those are also type B. Find the probability of type B given type A.`);
            plainCorrectAnswer=probB;
            correctAnswer={ correct: probB, alternate: `${eventB}/${eventA}` };
            break;
        }
        case "independent":{
            let probA=(Math.random()*0.8+0.1).toFixed(2);
            let probB=(Math.random()*0.8+0.1).toFixed(2);
            let probBoth=(probA*probB).toFixed(2);
            content.push(`The probability of event A is <span class="math">\\(${probA}\\)</span>, and event B is <span class="math">\\(${probB}\\)</span>. If A and B are independent, find the probability of both occurring.`);
            plainCorrectAnswer=probBoth;
            correctAnswer={ correct: probBoth, alternate: `${probA} \\times ${probB}` };
            break;
        }
        case "mutually_exclusive":{
            let probA=(Math.random()*0.5+0.2).toFixed(2);
            let probB=(Math.random()*(0.9-probA)+0.1).toFixed(2);
            let probEither=(parseFloat(probA)+parseFloat(probB)).toFixed(2);
            content.push(`Events A and B are mutually exclusive with <span class="math">\\(P(A)=${probA}\\)</span> and <span class="math">\\(P(B)=${probB}\\)</span>. Find the probability of A or B occurring.`);
            plainCorrectAnswer=probEither;
            correctAnswer={ correct: probEither, alternate: `${probA}+${probB}` };
            break;
        }
        case "bayes":{
            let probA=(Math.random()*0.5+0.2).toFixed(2);
            let probB=(Math.random()*0.5+0.2).toFixed(2);
            let probBgivenA=(Math.random()*0.8+0.1).toFixed(2);
            let probAgivenB=(probBgivenA*probA/probB).toFixed(2);
            content.push(`Given <span class="math">\\(P(A)=${probA}\\)</span>, <span class="math">\\(P(B)=${probB}\\)</span>, and <span class="math">\\(P(B|A)=${probBgivenA}\\)</span>, find <span class="math">\\(P(A|B)\\)</span>.`);
            plainCorrectAnswer=probAgivenB;
            correctAnswer={ correct: probAgivenB, alternate: `\\frac{${probBgivenA} \\cdot ${probA}}{${probB}}` };
            break;
        }
        case "binomial":{
            let n=Math.floor(Math.random()*5)+5;
            let k=Math.floor(Math.random()*(n-1))+1;
            let p=(Math.random()*0.7+0.1).toFixed(2);
            let q=(1-p).toFixed(2);
            let prob=(nCr(n, k)*Math.pow(p, k)*Math.pow(q, n-k)).toFixed(2);
            content.push(`A trial has a success probability of <span class="math">\\(${p}\\)</span>. In <span class="math">\\(${n}\\)</span> trials, find the probability of exactly <span class="math">\\(${k}\\)</span> successes.`);
            plainCorrectAnswer=prob;
            correctAnswer={ correct: prob, alternate: `C(${n},${k}) \\cdot ${p}^{${k}} \\cdot ${q}^{${n-k}}` };
            break;
        }
        case "expected_value":{
            let values=Array.from({ length: 3 }, ()=>Math.floor(Math.random()*10)+1);
            let probs=Array.from({ length: 3 }, ()=>(Math.random()*0.3+0.1).toFixed(2));
            let sumProbs=parseFloat(probs[0])+parseFloat(probs[1])+parseFloat(probs[2]);
            probs=probs.map(p=>(parseFloat(p)/sumProbs).toFixed(2));
            let expected=(values[0]*probs[0]+values[1]*probs[1]+values[2]*probs[2]).toFixed(2);
            content.push(`A random variable takes values <span class="math">\\(${values.join(", ")}\\)</span> with probabilities <span class="math">\\(${probs.join(", ")}\\)</span>. Find the expected value.`);
            plainCorrectAnswer=expected;
            correctAnswer={ correct: expected, alternate: expected };
            break;
        }
        case "complement":{
            let probA=(Math.random()*0.8+0.1).toFixed(2);
            let probNotA=(1-probA).toFixed(2);
            content.push(`If <span class="math">\\(P(A)=${probA}\\)</span>, find <span class="math">\\(P(\\text{not } A)\\)</span>.`);
            plainCorrectAnswer=probNotA;
            correctAnswer={ correct: probNotA, alternate: `1-${probA}` };
            break;
        }
        case "permutation_combination":{
            let n=Math.floor(Math.random()*8)+5;
            let r=Math.floor(Math.random()*(n-1))+1;
            let isPerm=Math.random()<0.5;
            let answer=isPerm?nPr(n, r):nCr(n, r);
            let symbol=isPerm?"P":"C";
            content.push(`Calculate <div class="math display">\\[${symbol}(${n}, ${r})\\]</div>`);
            plainCorrectAnswer=answer.toString();
            correctAnswer={ correct: answer, alternate: `${symbol}(${n},${r})` };
            break;
        }
        case "geometric":{
            let p=(Math.random()*0.7+0.2).toFixed(2);
            let k=Math.floor(Math.random()*5)+1;
            let prob=(Math.pow(1-p, k-1)*p).toFixed(2);
            content.push(`A trial has success probability <span class="math">\\(${p}\\)</span>. Find the probability of the first success on the <span class="math">\\(${k}${getOrdinal(k)}\\)</span> trial.`);
            plainCorrectAnswer=prob;
            correctAnswer={ correct: prob, alternate: `${p} \\cdot ${(1-p)}^{${k-1}}` };
            break;
        }
    }
    let container=document.createElement("div");
    container.innerHTML=content.join("<br>");
    questionArea.appendChild(container);
    MathJax.typesetPromise([container]).then(()=>{
        correctAnswer.correct=plainCorrectAnswer.replace(/\s+/g, "").toLowerCase();
    });
}
function checkAnswer(){
    let userInput=userAnswer.value.trim().toLowerCase();
    let isCorrect=false;
    let format=(str)=>str.replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1").trim().toLowerCase();
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
function generateSeries(){
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
function generateLimit(){
    questionArea.innerHTML="";
    let types=["polynomial", "rational", "infinity", "trig"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression, plainCorrectAnswer;
    switch (type){
        case "polynomial":{
            let a=Math.floor(Math.random()*5)+1;
            let c=Math.floor(Math.random()*10)-5;
            let x0=Math.floor(Math.random()*5);
            let limit=a*x0*x0+c;
            mathExpression=`\\[ \\lim_{x \\to ${x0}} (${a}x^2+${c}) \\]`;
            plainCorrectAnswer=limit.toString();
            correctAnswer={ correct: plainCorrectAnswer };
            break;
        }
        case "rational":{
            let a=Math.floor(Math.random()*5)+1;
            let b=Math.floor(Math.random()*5)+1;
            let x0=Math.floor(Math.random()*5)+1;
            let limit=(a*x0+1)/(b*x0-1);
            mathExpression=`\\[ \\lim_{x \\to ${x0}} \\frac{${a}x+1}{${b}x-1} \\]`;
            plainCorrectAnswer=limit.toFixed(2);
            correctAnswer={ correct: plainCorrectAnswer, alternate: `\\frac{${a*x0+1}}{${b*x0-1}}` };
            break;
        }
        case "infinity":{
            let a=Math.floor(Math.random()*3)+1;
            let limit=a;
            mathExpression=`\\[ \\lim_{x \\to \\infty} \\frac{${a}x^2+x}{x^2-1} \\]`;
            plainCorrectAnswer=a.toString();
            correctAnswer={ correct: plainCorrectAnswer };
            break;
        }
        case "trig":{
            let limit=1;
            mathExpression=`\\[ \\lim_{x \\to 0} \\frac{\\sin(x)}{x} \\]`;
            plainCorrectAnswer="1";
            correctAnswer={ correct: plainCorrectAnswer };
            break;
        }
    }
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
}
function generateRelatedRates(){
    questionArea.innerHTML="";
    let types=["ladder", "cone"];
    let type=types[Math.floor(Math.random()*types.length)];
    let mathExpression, plainCorrectAnswer;
    let problemText="";
    switch (type){
        case "ladder":{
            let ladder=10;
            let x=6;
            let dx_dt=2;
            let y=Math.sqrt(ladder*ladder-x*x);
            let dy_dt=-(x/y)*dx_dt;
            problemText=`A ${ladder}-ft ladder leans against a wall. The bottom is ${x} ft from the wall, moving away at ${dx_dt} ft/s. Find the rate at which the top is sliding down.`;
            mathExpression=`\\[ \\frac{dy}{dt}=? \\]`;
            plainCorrectAnswer=dy_dt.toFixed(2);
            correctAnswer={ correct: plainCorrectAnswer };
            break;
        }
        case "cone":{
            let r=3;
            let h=9;
            let dr_dt=0.5;
            let V=(1/3)*Math.PI*r*r*h;
            let dV_dt=Math.PI*r*h*dr_dt;
            problemText=`A conical tank has radius ${r} ft and height ${h} ft. The radius increases at ${dr_dt} ft/s. Find the rate of change of volume.`;
            mathExpression=`\\[ \\frac{dV}{dt}=? \\]`;
            plainCorrectAnswer=dV_dt.toFixed(2);
            correctAnswer={ correct: plainCorrectAnswer };
            break;
        }
    }
    let textContainer=document.createElement("div");
    textContainer.textContent=problemText;
    textContainer.classList.add("problem-text");
    questionArea.appendChild(textContainer);
    let mathContainer=document.createElement("div");
    mathContainer.innerHTML=mathExpression;
    questionArea.appendChild(mathContainer);
    MathJax.typesetPromise([mathContainer]);
}
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("/quotes_of_the_day.txt")
        .then(response=>{
            if (!response.ok) throw new Error("Network error");
            return response.text();
        })
        .then(data=>{
            let lines=data.split("\n").map(line=>line.trim()).filter(line=>line.length>0);
            lines.forEach((line)=>{
                let parts=line.split("-");
                if (parts.length<2){
                    return;
                };
                let quote=parts.slice(0, -1).join("-").trim();
                let author=parts.slice(-1)[0].trim();
                quotesArray.push(quote);
                authorsArray.push(author);
            });
            let randomIndex=Math.floor(Math.random()*quotesArray.length);
            document.getElementById("new-quote").textContent=quotesArray[randomIndex];
            document.getElementById("author").textContent=`- ${authorsArray[randomIndex]}`;
        })
        .catch(error=>console.error("Error:", error));
});
userAnswer.addEventListener("keyup", function (e){
    if (e.shiftKey&&e.key=="Enter"){
        checkAnswer();
        userAnswer.value="";
        userAnswer.focus();
    }
});
generateQuestionButton.addEventListener("click", generateQuestion);
checkAnswerButton.addEventListener("click", checkAnswer);