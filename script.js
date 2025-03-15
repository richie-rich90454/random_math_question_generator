let quotesArray=[];
let authorsArray=[];
let questionArea=document.getElementById("question-area");
let questionType=document.getElementById("gen-type")
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