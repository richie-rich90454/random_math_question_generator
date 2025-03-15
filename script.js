const fs=require('fs');
let quotesArray=[];
let authorsArray=[];
try{
    const data=fs.readFileSync('quotes_of_the_day.txt', 'utf-8');
    const lines=data.split('\n').map(line=>line.trim()).filter(line=>line.length>0);
    lines.forEach((line)=>{
        const parts=line.split(' - ');
        if (parts.length<2){
            console.log(`Invalid line format: ${line}`);
            return;
        }
        const quote=parts.slice(0,-1).join("-").trim();
        const author=parts.slice(-1)[0].trim();
        quotesArray.push(quote);
        authorsArray.push(author);
    });
}
catch(error){
    console.log('Error reading file', error);
}
console.log(quotesArray);
console.log(authorsArray);