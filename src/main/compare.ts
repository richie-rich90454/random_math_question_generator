import {evaluate, simplify, parse} from "mathjs";
export function convertLatex(s: string): string{
    s=s.replace(/−/g,'-');
    s=s.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g,'($1)/($2)');
    s=s.replace(/\\sqrt\{([^}]*)\}/g,'sqrt($1)');
    s=s.replace(/\\sqrt\[([^\]]*)\]\{([^}]*)\}/g,'($2)^(1/($1))');
    s=s.replace(/\\langle\s*(.*?)\s*\\rangle/g,'[$1]');
    s=s.replace(/<([^>]*)>/g,'[$1]');
    s=s.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g,(_,content)=>{
        let rows=content.split('\\\\').map((row:string)=>row.trim());
        let matrixRows=rows.map((row:string)=>{
            let cells=row.split('&').map((cell:string)=>cell.trim());
            return '['+cells.join(',')+']';
        });
        return '['+matrixRows.join(',')+']';
    });
    s=s.replace(/\\([a-zA-Z]+)/g,'$1');
    return s;
}
export function sanitize(s: string): string{
    s=s.toLowerCase().replace(/\s+/g,'');
    s=s.replace(/−/g,'-');
    s=s.replace(/\^{/g,'^').replace(/[{}]/g,'');
    s=s.replace(/\*\*/g,'^');
    s=s.replace(/√/g,'sqrt').replace(/π/g,'pi').replace(/∞/g,'inf');
    s=s.replace(/(\d)([a-z])/g,'$1*$2');
    s=s.replace(/([a-z])(\d)/g,'$1*$2');
    s=s.replace(/\)(?=\()/g,')*');
    s=s.replace(/1\*([a-z\(])/g,'$1');
    s=s.replace(/\\?(sin|cos|tan|cot|sec|csc|log|ln|exp|sqrt|arcsin|arccos|arctan|sinh|cosh|tanh)/g,'$1');
    s=s.replace(/\bln\b/g,'log');
    s=s.replace(/\barcsin\b/g,'asin');
    s=s.replace(/\barccos\b/g,'acos');
    s=s.replace(/\barctan\b/g,'atan');
    s=s.replace(/(sin|cos|tan|cot|sec|csc|log|exp|sqrt|asin|acos|atan|sinh|cosh|tanh)\s+([a-z\(])/g,'$1($2)');
    return s;
}
export function removeConstants(s: string): string{
    let withPlus=s.replace(/-/g,'+-');
    let terms=withPlus.split('+').filter(t=>t!=='');
    const isConstant=(term: string): boolean=>{
        term=term.replace(/^[+-]/,'');
        if (term==='') return false;
        return /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(term)||
               term==='pi'||term==='e';
    };
    let nonConstantTerms=terms.filter(t=>!isConstant(t));
    nonConstantTerms=nonConstantTerms.filter(t=>!/^[+-]?[ck]$/.test(t.replace(/[+-]/,'')));
    let result=nonConstantTerms.join('+');
    return result || s;
}
export function toDecimal(s: string): string{
    return s.replace(/(^|[+\-*/\^\(])(\d+)\/(\d+)([+\-*/\^\)]|$)/g,(_,pre,num,den,post)=>{
        let val=Number(num)/Number(den);
        return pre+val+post;
    });
}
export function toTerms(s: string): string[]{
    let withPlus=s.replace(/-/g,'+-');
    let terms=withPlus.split('+').map(t=>t.trim()).filter(t=>t!=='');
    terms.sort();
    return terms;
}
export function tryEvaluate(expr: string): any{
    let normalized=expr.replace(/<([^>]*)>/g,'[$1]');
    normalized=normalized.replace(/−/g,'-');
    try{
        return evaluate(normalized);
    }catch{
        return null;
    }
}
export function compareExpressions(exprA: string, exprB: string, useFullPipeline: boolean=true): boolean{
    if (exprA===exprB) return true;
    exprA=convertLatex(exprA);
    exprB=convertLatex(exprB);
    let sanA=sanitize(exprA);
    let sanB=sanitize(exprB);
    if (sanA===sanB) return true;
    let funcA=removeConstants(sanA);
    let funcB=removeConstants(sanB);
    if (funcA===funcB) return true;
    let decA=toDecimal(funcA);
    let decB=toDecimal(funcB);
    if (decA===decB) return true;
    let termsA=toTerms(funcA);
    let termsB=toTerms(funcB);
    if (termsA.join('+')===termsB.join('+')) return true;
    let valA=tryEvaluate(exprA);
    let valB=tryEvaluate(exprB);
    if (valA!==null && valB!==null){
        if (Array.isArray(valA) && Array.isArray(valB)){
            if (valA.length===valB.length){
                let allMatch=true;
                for (let i=0;i<valA.length;i++){
                    if (Math.abs(valA[i]-valB[i])>=1e-8){
                        allMatch=false;
                        break;
                    }
                }
                if (allMatch) return true;
            }
        }
        else if (typeof valA==='number' && typeof valB==='number'){
            if (Math.abs(valA-valB)<1e-8) return true;
        }
    }
    if (useFullPipeline){
        try{
            let simpA=simplify(funcA).toString().replace(/\s+/g,'');
            let simpB=simplify(funcB).toString().replace(/\s+/g,'');
            if (simpA===simpB) return true;
            let vars=parse(funcA).filter((node:any)=>node.isSymbolNode).map((node:any)=>node.name);
            if (vars.length===1){
                let varName=vars[0];
                let points=[0.5,1,2,3,Math.PI/4,Math.E];
                let valuesA:number[]=[];
                let valuesB:number[]=[];
                let success=true;
                for (let x of points){
                    try{
                        let scope={[varName]:x};
                        let valA=evaluate(funcA,scope);
                        let valB=evaluate(funcB,scope);
                        valuesA.push(valA);
                        valuesB.push(valB);
                    }catch(e){
                        success=false;
                        break;
                    }
                }
                if (success){
                    let diffs=valuesA.map((v,i)=>v-valuesB[i]);
                    let firstDiff=diffs[0];
                    let constantDiff=diffs.every(d=>Math.abs(d-firstDiff)<1e-8);
                    if (constantDiff) return true;
                    let numericMatch=valuesA.every((v,i)=>Math.abs(v-valuesB[i])<1e-8);
                    if (numericMatch) return true;
                }
            }
            else if (vars.length===0){
                try{
                    let numA=evaluate(funcA);
                    let numB=evaluate(funcB);
                    if (Math.abs(numA-numB)<1e-8) return true;
                }catch(e){}
            }
        }catch(e){
            console.warn("Math.js evaluation failed in side comparison",e);
        }
    }
    return false;
}
export function isAnswerCorrect(userAnswer: string, correctAnswer: string, alternateAnswer?: string): boolean{
    if (!userAnswer) return false;
    let answer=userAnswer.trim();
    let correct=correctAnswer;
    let alternate=alternateAnswer||'';
    if (answer.includes('=') && correct.includes('=')){
        let [userLeft, userRight] = answer.split('=').map(s=>s.trim());
        let [correctLeft, correctRight] = correct.split('=').map(s=>s.trim());
        let leftOk=compareExpressions(userLeft, correctLeft, true);
        if (!leftOk) return false;
        let rightOk=false;
        try{
            let varsRightUser=parse(userRight).filter((node:any)=>node.isSymbolNode).length;
            let varsRightCorrect=parse(correctRight).filter((node:any)=>node.isSymbolNode).length;
            if (varsRightUser===0 && varsRightCorrect===0){
                let valUser=evaluate(userRight);
                let valCorrect=evaluate(correctRight);
                if (Math.abs(valUser-valCorrect)<1e-8) rightOk=true;
            }
        }catch(e){}
        if (!rightOk) rightOk=compareExpressions(userRight, correctRight, true);
        return leftOk && rightOk;
    }
    else if (answer.includes('=') || correct.includes('=')){
        return false;
    }
    else{
        let convertedUser=convertLatex(answer);
        let convertedCorrect=convertLatex(correct);
        let convertedAlternate=alternate?convertLatex(alternate):'';
        let sanUser=sanitize(convertedUser);
        let sanCorrect=sanitize(convertedCorrect);
        let sanAlternate=alternate?sanitize(convertedAlternate):'';
        let funcUser=removeConstants(sanUser);
        let funcCorrect=removeConstants(sanCorrect);
        let funcAlternate=alternate?removeConstants(sanAlternate):'';
        if (funcUser===funcCorrect||funcUser===funcAlternate) return true;
        if (sanUser===sanCorrect||sanUser===sanAlternate) return true;
        let decUser=toDecimal(funcUser);
        let decCorrect=toDecimal(funcCorrect);
        if (decUser===decCorrect) return true;
        let termsUser=toTerms(funcUser);
        let termsCorrect=toTerms(funcCorrect);
        if (termsUser.join('+')===termsCorrect.join('+')) return true;
        let valUser=tryEvaluate(convertedUser);
        let valCorrect=tryEvaluate(convertedCorrect);
        if (valUser!==null && valCorrect!==null){
            if (Array.isArray(valUser) && Array.isArray(valCorrect)){
                if (valUser.length===valCorrect.length){
                    let allMatch=true;
                    for (let i=0;i<valUser.length;i++){
                        if (Math.abs(valUser[i]-valCorrect[i])>=1e-8){
                            allMatch=false;
                            break;
                        }
                    }
                    if (allMatch) return true;
                }
            }
            else if (typeof valUser==='number' && typeof valCorrect==='number'){
                if (Math.abs(valUser-valCorrect)<1e-8) return true;
            }
        }
        try{
            let simpUser=simplify(funcUser).toString().replace(/\s+/g,'');
            let simpCorrect=simplify(funcCorrect).toString().replace(/\s+/g,'');
            if (simpUser===simpCorrect) return true;
            let vars=parse(funcCorrect).filter((node:any)=>node.isSymbolNode).map((node:any)=>node.name);
            if (vars.length===1){
                let varName=vars[0];
                let points=[0.5,1,2,3,Math.PI/4,Math.E];
                let valuesUser:number[]=[];
                let valuesCorrect:number[]=[];
                let success=true;
                for (let x of points){
                    try{
                        let scope={[varName]:x};
                        let valUser=evaluate(funcUser,scope);
                        let valCorrect=evaluate(funcCorrect,scope);
                        valuesUser.push(valUser);
                        valuesCorrect.push(valCorrect);
                    }catch(e){
                        success=false;
                        break;
                    }
                }
                if (success){
                    let diffs=valuesUser.map((v,i)=>v-valuesCorrect[i]);
                    let firstDiff=diffs[0];
                    let constantDiff=diffs.every(d=>Math.abs(d-firstDiff)<1e-8);
                    if (constantDiff) return true;
                    let numericMatch=valuesUser.every((v,i)=>Math.abs(v-valuesCorrect[i])<1e-8);
                    if (numericMatch) return true;
                }
            }
            else if (vars.length===0){
                try{
                    let numUser=evaluate(funcUser);
                    let numCorrect=evaluate(funcCorrect);
                    if (Math.abs(numUser-numCorrect)<1e-8) return true;
                }catch(e){}
            }
        }catch(e){
            console.warn("Math.js evaluation failed, falling back",e);
        }
        return false;
    }
}
