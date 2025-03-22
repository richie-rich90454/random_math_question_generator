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
    correctAnswer={correct: (num1+num2).toFixed(3)};
}
function generateSubtraction(){
    let num1=parseFloat(((Math.random()*1500)-1000).toFixed(3));
    let num2=parseFloat((Math.random()*1500).toFixed(3));
    questionArea.innerHTML=`\$${num1}-${num2}=\$`;
    correctAnswer={correct: (num1-num2).toFixed(3)};
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
    correctAnswer={correct: fact.toString()};
}
function generateVector(){
    questionArea.innerHTML="";
    let types=['magnitude', 'direction', 'unit', 'dot', 'angle', 'projection', 'parametric', 'polar_convert', 'cartesian_convert', 'polar_graph', 'motion', 'de_moivre', 'add', 'subtract', 'parametric_to_cartesian'];
    let type=types[Math.floor(Math.random()*types.length)];
    let generateNonZeroVector=()=>{
        let x, y;
        do{
            x=Math.random()*10-5;
            y=Math.random()*10-5;
        }while (Math.abs(x)<0.1&&Math.abs(y)<0.1);
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
            questionArea.innerHTML=`Convert the Cartesian coordinate \\((${x.toFixed(1)}, ${y.toFixed(1)})\\) to polar coordinates. Answer with (r, degrees), no need to add deg.`;
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
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\sin\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius) \" Use two decimal places.`;
                let center=(a/2).toFixed(2);
                correctAnswer={
                    correct: `A circle with center at (0, ${center}) and radius ${center}`,
                    alternate: `Circle: center (0, ${center}), radius ${center}`,
                };
            } else{
                questionArea.innerHTML=`Describe the graph of the polar equation \\(r=${a}\\cos\\theta\\). Use the format \" A circle with center at (x, y) and radius (radius) \"  Use two decimal places.`;
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
            questionArea.innerHTML=`A particle starts at \\((${posX}, ${posY})\\) and moves with letant velocity \\(\\langle ${v.x.toFixed(1)}, ${v.y.toFixed(1)} \\rangle\\). Write the position vector as a function of time \\(t\\).`;
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
            questionArea.innerHTML=`Compute \\((${r}(\\cos ${theta}^{\\circ}+i\\sin ${theta}^{\\circ}))^{${n}}\\) using De Moivre's Theorem. Answer with degrees (no need to add deg).`;
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
function generateMatrix(){
    questionArea.innerHTML="";
    let types=['add', 'subtract', 'multiply', 'inverse', 'system', 'transpose', 'scalar_mult', 'power', 'row_echelon'];
    let type=types[Math.floor(Math.random()*types.length)];
    let generate2x2=()=>({a: +(Math.random()*10-5).toFixed(2),b: +(Math.random()*10-5).toFixed(2),c: +(Math.random()*10-5).toFixed(2),d: +(Math.random()*10-5).toFixed(2)});
    let matrixToString=(m, style='bmatrix')=>`\\begin{${style}} ${m.a} & ${m.b} \\\\ ${m.c} & ${m.d} \\end{${style}}`;
    switch(type){
        case 'add':{
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
        case 'subtract':{
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
                correct: `(${result.a},${result.b}|${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case 'multiply':{
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
        case 'inverse':{
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
        case 'system':{
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
        case 'transpose':{
            let A=generate2x2();
            let result={a: A.a, b: A.c, c: A.b, d: A.d};
            questionArea.innerHTML=`Find transpose of \$${matrixToString(A)}\$`;
            correctAnswer={
                correct: `tr(${result.a},${result.b},${result.c},${result.d})`,
                alternate: matrixToString(result),
            };
            break;
        }
        case 'scalar_mult':{
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
        case 'power':{
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
        case 'row_echelon':{
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
    let types=['evaluate', 'solve', 'amplitude', 'period', 'phase_shift', 'law_sines', 'unit_circle', 'identity'];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case 'evaluate':{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let commonAngles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
                let angle=commonAngles[Math.floor(Math.random()*commonAngles.length)];
                let value=Math.sin(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${angle}^\\circ)\$`;
                correctAnswer={correct: value, alternate: value};
            }
            else{
                let radianAngles=[
                  { value: 0, label: "0" },
                  { value: Math.PI/6, label: "\\frac{\\pi}{6}" },
                  { value: Math.PI/4, label: "\\frac{\\pi}{4}" },
                  { value: Math.PI/3, label: "\\frac{\\pi}{3}" },
                  { value: Math.PI/2, label: "\\frac{\\pi}{2}" },
                  { value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}" },
                  { value: 3*Math.PI/4, label: "\\frac{3\\pi}{4}" },
                  { value: 5*Math.PI/6, label: "\\frac{5\\pi}{6}" },
                  { value: Math.PI, label: "\\pi" },
                  { value: 7*Math.PI/6, label: "\\frac{7\\pi}{6}" },
                  { value: 5*Math.PI/4, label: "\\frac{5\\pi}{4}" },
                  { value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}" },
                  { value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}" },
                  { value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}" },
                  { value: 7*Math.PI/4, label: "\\frac{7\\pi}{4}" },
                  { value: 11*Math.PI/6, label: "\\frac{11\\pi}{6}" }
                ];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.sin(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\sin(${obj.label})\$`;
                correctAnswer={correct: value, alternate: value};
            }
            break;
        }
        case 'solve':{
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
        case 'amplitude':{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\sin(3x+\\pi/4)\$`;
            correctAnswer={ correct: A, alternate: A };
            break;
        }
        case 'period':{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\sin(${B}x)\$?`;
            correctAnswer={ 
                correct: (2*Math.PI/B).toFixed(2)+" radians", 
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case 'phase_shift':{
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
        case 'law_sines':{
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
        case 'unit_circle':{
            let angles=[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let cosVal=Math.cos(angle*Math.PI/180).toFixed(2);
            let sinVal=Math.sin(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Find the coordinates on the unit circle for an angle of ${angle}deg (format: (cos, sin))`;
            correctAnswer={ correct: `(${cosVal}, ${sinVal})`, alternate: `(${cosVal}, ${sinVal})` };
            break;
        }
        case 'identity':{
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
    let types=['evaluate', 'solve', 'amplitude', 'period', 'phase_shift', 'law_cosines', 'identity'];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case 'evaluate':{
            let isDegree=Math.random()<0.5;
            if (isDegree){
                let angles=[0, 60, 90, 120, 180, 240, 270, 300];
                let angle=angles[Math.floor(Math.random()*angles.length)];
                let value=Math.cos(angle*Math.PI/180).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${angle}^\\circ)\$`;
                correctAnswer={correct: value, alternate: value};
            }
            else{
                let radianAngles=[
                  { value: 0, label: "0" },
                  { value: Math.PI/3, label: "\\frac{\\pi}{3}" },
                  { value: Math.PI/2, label: "\\frac{\\pi}{2}" },
                  { value: 2*Math.PI/3, label: "\\frac{2\\pi}{3}" },
                  { value: Math.PI, label: "\\pi" },
                  { value: 4*Math.PI/3, label: "\\frac{4\\pi}{3}" },
                  { value: 3*Math.PI/2, label: "\\frac{3\\pi}{2}" },
                  { value: 5*Math.PI/3, label: "\\frac{5\\pi}{3}" }
                ];
                let obj=radianAngles[Math.floor(Math.random()*radianAngles.length)];
                let value=Math.cos(obj.value).toFixed(2);
                questionArea.innerHTML=`Evaluate \$\\cos(${obj.label})\$`;
                correctAnswer={correct: value, alternate: value};
            }
            break;
        }
        case 'solve':{
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
        case 'amplitude':{
            let A=(Math.random()*4+1).toFixed(1);
            questionArea.innerHTML=`Find the amplitude of \$y=${A}\\cos(2x-\\pi/3)\$`;
            correctAnswer={ correct: A, alternate: A };
            break;
        }
        case 'period':{
            let B=Math.floor(Math.random()*4+1);
            questionArea.innerHTML=`What is the period of \$y=\\cos(${B}x)\$?`;
            correctAnswer={ 
                correct: (2*Math.PI/B).toFixed(2)+" radians", 
                alternate: `\\frac{2\\pi}{${B}}`
            };
            break;
        }
        case 'phase_shift':{
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
        case 'law_cosines':{
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
        case 'identity':{
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
    let types=['evaluate', 'solve', 'period', 'asymptote', 'identity'];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case 'evaluate':{
            let angles=[0, 45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=Math.tan(angle*Math.PI/180).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\tan(${angle}^\\circ)\$`;
            correctAnswer={correct: value, alternate: value};
            break;
        }
        case 'solve':{
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
        case 'period':{
            let B=Math.floor(Math.random()*3+1);
            questionArea.innerHTML=`What is the period of \$y=\\tan(${B}x)\$?`;
            correctAnswer={ 
                correct: (Math.PI/B).toFixed(2)+" radians", 
                alternate: `\\frac{\\pi}{${B}}`
            };
            break;
        }
        case 'asymptote':{
            let B=Math.floor(Math.random()*2+1);
            let asymptotes=[];
            for (let k=-1;k<=0;k++){
                asymptotes.push(`x=\\frac{(2*${k}+1)\\pi}{2\\cdot${B}}`);
            }
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\tan(${B}x)\$`;
            correctAnswer={ 
                correct: asymptotes.join(", "), 
                alternate: `x=\\frac{\\pi}{2\\cdot${B}}+\\frac{\\pi k}{${B}}`
            };
            break;
        }
        case 'identity':{
            questionArea.innerHTML=`Complete the identity: \$1+\\tan^2\\theta=\\; ?\$`;
            correctAnswer={correct: "sec^2theta", alternate: "\\sec^2\\theta"};
            break;
        }
        default: 
            questionArea.innerHTML="Unknown tangent question type";
    }
    MathJax.typeset();
}
function generateCosecant(){
    questionArea.innerHTML="";
    let types=['evaluate', 'relationship', 'asymptote'];
    let type=types[Math.floor(Math.random()*types.length)];
    switch (type){
        case 'evaluate':{
            let angles=[30, 150, 210, 330];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.sin(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\csc(${angle}^\\circ)\$`;
            correctAnswer={correct: value, alternate: value};
            break;
        }
        case 'relationship':{
            let angle=Math.floor(Math.random()*360);
            questionArea.innerHTML=`Express \$\\csc(${angle}^\\circ)\$ in terms of sine.`;
            correctAnswer={ 
                correct: `\\frac{1}{\\sin(${angle}^\\circ)}`, 
                alternate: "1/sin("+angle+"deg)" 
            };
            break;
        }
        case 'asymptote':{
            questionArea.innerHTML=`Find the vertical asymptotes of \$y=\\csc(x)\$ (in radians).`;
            correctAnswer={correct: "x=n\\pi", alternate: "nπ"};
            break;
        }
        default: 
            questionArea.innerHTML="Unknown cosecant question type";
    }
    MathJax.typeset();
}
function generateSecant(){
    questionArea.innerHTML="";
    let type=Math.random()<0.5?'evaluate':'identity';
    switch (type){
        case 'evaluate':{
            let angles=[0, 60, 180, 300];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.cos(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\sec(${angle}^\\circ)\$`;
            correctAnswer={correct: value, alternate: value};
            break;
        }
        case 'identity':{
            questionArea.innerHTML=`Complete the identity: \$\\sec^2\\theta-\\tan^2\\theta=?\$`;
            correctAnswer={correct: "1", alternate: "one"};
            break;
        }
        default: 
            questionArea.innerHTML="Unknown secant question type";
    }
    MathJax.typeset();
}
function generateCotangent(){
    questionArea.innerHTML="";
    let type=Math.random()<0.5?'evaluate':'relationship';
    switch (type){
        case 'evaluate':{
            let angles=[45, 135, 225, 315];
            let angle=angles[Math.floor(Math.random()*angles.length)];
            let value=(1/Math.tan(angle*Math.PI/180)).toFixed(2);
            questionArea.innerHTML=`Evaluate \$\\cot(${angle}^\\circ)\$`;
            correctAnswer={correct: value, alternate: value};
            break;
        }
        case 'relationship':{
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
// function checkAnswer(){
//     let userInput=userAnswer.value.trim().toLowerCase();
//     let isCorrect=false;
//     let format=(str) =>{
//         return str.replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1").trim().toLowerCase(); 
//     };
//     if (questionType.value=="deri"||questionType.value=="mtrx"||questionType.value=="vctr"||questionType.value=="root"||questionType.value=="inte"){
//         isCorrect=[correctAnswer.correct, correctAnswer.alternate].map(format).includes(format(userInput));
//         answerResults.innerHTML=isCorrect 
//             ? `Correct! The answer is ${correctAnswer.correct}.` 
//             : `Incorrect. The correct answer should be ${correctAnswer.correct}.`;
//     } 
//     else{
//         let userValue=parseFloat(userInput);
//         let correctValue=parseFloat(correctAnswer.correct); 
//         isCorrect=!isNaN(userValue) && userValue==correctValue;
//         answerResults.innerHTML=isCorrect 
//             ? `Correct! The answer is ${correctAnswer.correct}.` 
//             : `Incorrect. The correct answer should be ${correctAnswer.correct}.`;
//     }
// }
function checkAnswer() {
    let userInput=userAnswer.value.trim().toLowerCase();
    let isCorrect=false;
    const format=(str)=>str.replace(/\s+/g, "").replace(/\^1/g, "").replace(/x(?!\d)/g, "x1").replace(/(\D)1+/g, "$1").trim().toLowerCase();
    const formattedTypes=["deri", "mtrx", "vctr", "root", "inte"];
    if (formattedTypes.includes(questionType.value)) {
        isCorrect=[correctAnswer.correct, correctAnswer.alternate]
            .map(format)
            .includes(format(userInput));
    }
    else {
        let userValue=parseFloat(userInput);
        let correctValue=parseFloat(correctAnswer.correct);
        isCorrect=!isNaN(userValue) && userValue==correctValue;
    }
    answerResults.innerHTML=isCorrect?`Correct! The answer is <strong>${correctAnswer.correct}</strong>.`: `Incorrect. The correct answer is <strong>${correctAnswer.correct}</strong>.`;
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetch("/quotes_of_the_day.txt")
        .then(response=>{
            if (!response.ok) throw new Error('Network error');
            return response.text();
        })
        .then(data=>{
            let lines=data.split('\n').map(line=>line.trim()).filter(line=>line.length>0);
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