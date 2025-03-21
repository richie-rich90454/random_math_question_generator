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
    answerInstructions.style.display="none";
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
    questionArea.innerHTML=`\$${num1}+${num2}=\$`;
    correctAnswer=num1+num2;
}
function generateSubtraction(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}-${num2}=\$`;
    correctAnswer=num1-num2;
}
function generateMultiplication(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\times ${num2}=\$<br>Round your answer to two decimal places`;
    correctAnswer=Math.round((num1*num2)*100)/100;
}
function generateDivision(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(2));
    let num2=parseFloat((Math.random()*1500).toFixed(2));
    questionArea.innerHTML=`\$${num1} \\div ${num2}=\$<br>Round your answer to two decimal places`;
    correctAnswer=Math.round((num1/num2)*100)/100;
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
    questionArea.innerHTML=`\\(${num}!=\\)`;
    correctAnswer=1;
    for (let i=2;i<=num;i++){
        correctAnswer*=i;
    }
}
function generateVector(){
    answerInstructions.style.display="block";
    questionArea.innerHTML="";
    let types=['magnitude', 'direction', 'unit', 'dot', 'angle', 'projection', 'parametric', 'polar_convert', 'cartesian_convert', 'polar_graph', 'motion', 'de_moivre', 'add', 'subtract', 'parametric_to_cartesian'];
    let type=types[Math.floor(Math.random()*types.length)];
    let generateNonZeroVector=()=>{
        let x, y;
        do{
            x=Math.random()*10-5;
            y=Math.random()*10-5;
        }while (Math.abs(x)<0.1 && Math.abs(y)<0.1);
        return{x,y};
    };
    let generateNonZeroXVector=()=>{
        let vec;
        do{
            vec=generateNonZeroVector();
        } while (Math.abs(vec.x)<0.1);
        return vec;
    };
    switch (type){
        case 'magnitude':{
            let{x,y}=generateNonZeroVector();
            let mag=Math.sqrt(x**2+y**2).toFixed(2);
            questionArea.innerHTML=`Find the magnitude of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: mag,
                alternate: mag,
            };
            break;
        }
        case 'direction':{
            let{x,y}=generateNonZeroVector();
            let angle=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the direction angle (in degrees) of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case 'unit':{
            let{x,y}=generateNonZeroVector();
            let mag=Math.sqrt(x**2+y**2);
            let ux=(x/mag).toFixed(2);
            let uy=(y/mag).toFixed(2);
            questionArea.innerHTML=`Find the unit vector in the direction of \\(\\langle ${x.toFixed(1)}, ${y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${ux}, ${uy}>`,
                alternate: `\\langle ${ux}, ${uy} \\rangle`,
            };
            break;
        }
        case 'dot':{
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
        case 'angle':{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let mag1=Math.sqrt(v1.x**2+v1.y**2);
            let mag2=Math.sqrt(v2.x**2+v2.y**2);
            let angle=(Math.acos(dot/(mag1*mag2))*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Find the angle (in degrees) between \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) and \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: angle,
                alternate: angle,
            };
            break;
        }
        case 'projection':{
            let v1=generateNonZeroVector();
            let v2=generateNonZeroVector();
            let dot=v1.x*v2.x+v1.y*v2.y;
            let magV2Sq=v2.x**2+v2.y**2;
            let projX=(dot/magV2Sq*v2.x).toFixed(2);
            let projY=(dot/magV2Sq*v2.y).toFixed(2);
            questionArea.innerHTML=`Find the projection of \\(\\langle ${v1.x.toFixed(1)}, ${v1.y.toFixed(1)} \\rangle\\) onto \\(\\langle ${v2.x.toFixed(1)}, ${v2.y.toFixed(1)} \\rangle\\).`;
            correctAnswer={
                correct: `<${projX}, ${projY}>`,
                alternate: `\\langle ${projX}, ${projY} \\rangle`,
            };
            break;
        }
        case 'parametric':{
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
        case 'polar_convert':{
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
        case 'cartesian_convert':{
            let{x,y}=generateNonZeroVector();
            let r=Math.sqrt(x**2+y**2).toFixed(2);
            let theta=(Math.atan2(y, x)*180/Math.PI).toFixed(1);
            questionArea.innerHTML=`Convert the Cartesian coordinate \\((${x.toFixed(1)}, ${y.toFixed(1)})\\) to polar coordinates. Answer with (r, degrees), no need to add °.`;
            correctAnswer={
                correct: `(${r}, ${theta})`,
                alternate: `(${r}, ${theta}^{\\circ})`,
            };
            break;
        }
        case 'polar_graph':{
            let a=(Math.random()*4+1).toFixed(1);
            let useSin=Math.random()<0.5;
            if (useSin){
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\sin\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius). \"`;
                let center=(a/2).toFixed(2);
                correctAnswer={
                    correct: `A circle with center at (0, ${center}) and radius ${center}`,
                    alternate: `Circle: center (0, ${center}), radius ${center}`,
                };
            } else{
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\cos\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius).`;
                let center=(a/2).toFixed(2);
                correctAnswer={
                    correct: `A circle with center at (${center}, 0) and radius ${center}`,
                    alternate: `Circle: center (${center}, 0), radius ${center}`,
                };
            }
            break;
        }
        case 'motion':{
            let posX=(Math.random()*10-5).toFixed(1);
            let posY=(Math.random()*10-5).toFixed(1);
            let v=generateNonZeroVector();
            questionArea.innerHTML=`A particle starts at \\((${posX}, ${posY})\\) and moves with constant velocity \\(\\langle ${v.x.toFixed(1)}, ${v.y.toFixed(1)} \\rangle\\). Write the position vector as a function of time \\(t\\).`;
            correctAnswer={
                correct: `<${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t>`,
                alternate: `\\langle ${posX}+${v.x.toFixed(1)}t, ${posY}+${v.y.toFixed(1)}t \\rangle`,
            };
            break;
        }
        case 'de_moivre':{
            let r=(Math.random()*5+1).toFixed(1);
            let theta=Math.floor(Math.random()*360);
            let n=Math.floor(Math.random()*3+2);
            let newR=(r**n).toFixed(2);
            let newTheta=(theta*n) % 360;
            questionArea.innerHTML=`Compute \\((${r}(\\cos ${theta}^{\\circ}+i\\sin ${theta}^{\\circ}))^{${n}}\\) using De Moivre's Theorem. Answer with degrees (no need to add °).`;
            correctAnswer={
                correct: `${newR} cis ${newTheta}`,
                alternate: `${newR}(\\cos ${newTheta}^{\\circ}+i\\sin ${newTheta}^{\\circ})`,
            };
            break;
        }
        case 'add':{
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
        case 'subtract':{
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
        case 'parametric_to_cartesian':{
            let x0=(Math.random()*10-5).toFixed(1);
            let y0=(Math.random()*10-5).toFixed(1);
            let dir=generateNonZeroXVector();
            let slope=(dir.y/dir.x).toFixed(2);
            questionArea.innerHTML=`The line is given by the parametric equations \\(x=${x0}+${dir.x.toFixed(1)}t\\) and \\(y=${y0}+${dir.y.toFixed(1)}t\\). Convert these into a single Cartesian equation.`;
            let yIntercept=(y0-slope*x0).toFixed(2);
            correctAnswer={
                correct: `y=${slope}(x-${x0})+${y0}`,
                alternate: `y=${slope}x+${yIntercept}`,
            };
            break;
        }
        default:
            questionArea.innerHTML="Unknown question type.";
    }
    MathJax.typeset();
}
function generateMatrix(){
    answerInstructions.style.display="block";
    questionArea.innerHTML="";
    let types=['add', 'subtract', 'multiply', 'determinant', 'inverse', 'system'];
    let type=types[Math.floor(Math.random()*types.length)];
    let generate2x2=()=>({
        a: Math.random()*10-5,
        b: Math.random()*10-5,
        c: Math.random()*10-5,
        d: Math.random()*10-5
    });
    let matrixToString=(m, style='bmatrix')=>{
        return `\\begin{${style}} ${m.a.toFixed(1)} & ${m.b.toFixed(1)} \\\\ ${m.c.toFixed(1)} & ${m.d.toFixed(1)} \\end{${style}}`;
    };
    switch(type){
        case 'add':{
            let A=generate2x2();
            let B=generate2x2();
            let result={a: A.a+B.a,b: A.b+B.b,c: A.c+B.c,d: A.d+B.d};
            questionArea.innerHTML=`Add: \$${matrixToString(A)}+${matrixToString(B)}\$`;
            correctAnswer={correct: matrixToString(result),alternate: matrixToString(result, 'pmatrix')};
            break;
        }
        case 'multiply':{
            let A=generate2x2();
            let B=generate2x2();
            let result={
                a: (A.a*B.a+A.b*B.c).toFixed(2),
                b: (A.a*B.b+A.b*B.d).toFixed(2),
                c: (A.c*B.a+A.d*B.c).toFixed(2),
                d: (A.c*B.b+A.d*B.d).toFixed(2)
            };
            questionArea.innerHTML=`Multiply: \$${matrixToString(A)} \\times ${matrixToString(B)}\$`;
            correctAnswer={correct: `\\begin{bmatrix} ${result.a} & ${result.b} \\\\ ${result.c} & ${result.d} \\end{bmatrix}`,alternate: `(${result.a},${result.b};${result.c},${result.d})`};
            break;
        }
        case 'inverse':{
            let A, det;
            do{
                A=generate2x2();
                det=A.a*A.d-A.b*A.c;
            } while (Math.abs(det)<0.1);
            let invDet=1/det;
            let inv={a: (A.d*invDet).toFixed(2),b: (-A.b*invDet).toFixed(2),c: (-A.c*invDet).toFixed(2),d: (A.a*invDet).toFixed(2)};
            questionArea.innerHTML=`Find inverse of \$${matrixToString(A)}\$`;
            correctAnswer={
                correct: `\\begin{bmatrix} ${inv.a} & ${inv.b} \\\\ ${inv.c} & ${inv.d} \\end{bmatrix}`,
                alternate: `(${inv.a},${inv.b};${inv.c},${inv.d})`
            };
            break;
        }
        case 'system':{
            let A=generate2x2();
            let x=(Math.random()*5+1).toFixed(1);
            let y=(Math.random()*5+1).toFixed(1);
            let B={
                a: (A.a*x+A.b*y).toFixed(2),
                b: (A.c*x+A.d*y).toFixed(2)
            };
            questionArea.innerHTML=`Solve:<br>
                \$${A.a.toFixed(1)}x+${A.b.toFixed(1)}y=${B.a}\$<br>
                \$${A.c.toFixed(1)}x+${A.d.toFixed(1)}y=${B.b}\$`;
            correctAnswer={
                correct: `x=${x}, y=${y}`,
                alternate: `(${x},${y})`
            };
            break;
        }
    }
    MathJax.typeset();
}
function checkAnswer(){
    let userInput=userAnswer.value.trim().toLowerCase();
    let isCorrect=false;
    let format=(str)=>{
        return str.replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1"); 
    };
    if (questionType.value=="deri"||questionType.value=="mtrx"||questionType.value=="vctr"||questionType.value=="root"){
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
                    return;
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