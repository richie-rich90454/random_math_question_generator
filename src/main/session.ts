import * as dom from "./dom";
import * as state from "./state";
import * as settings from "./settings";
import * as ui from "./ui";
import * as topicsModule from "./topics";
import {topics as topicList, SESSION_STORAGE_KEY} from "./constants";
import {generateQuestion as callGenerator} from "./questionGenerator";
import {generateChoicesForCurrentQuestion} from "./mcq";
import {evaluate, simplify, parse} from "mathjs";

// ----- Core answer comparison logic (adapted from answer.ts) -----
function convertLatex(s: string): string{
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
function compareExpressions(exprA: string, exprB: string, useFullPipeline: boolean=true): boolean{
	if (exprA===exprB) return true;
	exprA=convertLatex(exprA);
	exprB=convertLatex(exprB);
	const sanitize=(s: string): string=>{
		s=s.toLowerCase().replace(/\s+/g,'');
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
	};
	let sanA=sanitize(exprA);
	let sanB=sanitize(exprB);
	if (sanA===sanB) return true;
	const removeConstants=(s: string): string=>{
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
	};
	let funcA=removeConstants(sanA);
	let funcB=removeConstants(sanB);
	if (funcA===funcB) return true;
	const toDecimal=(s: string): string=>{
		return s.replace(/(^|[+\-*/\^\(])(\d+)\/(\d+)([+\-*/\^\)]|$)/g,(_,pre,num,den,post)=>{
			let val=Number(num)/Number(den);
			return pre+val+post;
		});
	};
	let decA=toDecimal(funcA);
	let decB=toDecimal(funcB);
	if (decA===decB) return true;
	const toTerms=(s: string): string[]=>{
		let withPlus=s.replace(/-/g,'+-');
		let terms=withPlus.split('+').map(t=>t.trim()).filter(t=>t!=='');
		terms.sort();
		return terms;
	};
	let termsA=toTerms(funcA);
	let termsB=toTerms(funcB);
	if (termsA.join('+')===termsB.join('+')) return true;
	const tryEvaluate=(expr: string): any=>{
		let normalized=expr.replace(/<([^>]*)>/g,'[$1]');
		normalized=normalized.replace(/−/g,'-');
		try{
			return evaluate(normalized);
		}catch{
			return null;
		}
	};
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
function isAnswerCorrect(userAnswer: string, correctAnswer: string, alternateAnswer?: string): boolean{
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
		const sanitize=(s: string): string=>{
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
		};
		let sanUser=sanitize(convertedUser);
		let sanCorrect=sanitize(convertedCorrect);
		let sanAlternate=alternate?sanitize(convertedAlternate):'';
		const removeConstants=(s: string): string=>{
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
		};
		let funcUser=removeConstants(sanUser);
		let funcCorrect=removeConstants(sanCorrect);
		let funcAlternate=alternate?removeConstants(sanAlternate):'';
		if (funcUser===funcCorrect||funcUser===funcAlternate) return true;
		if (sanUser===sanCorrect||sanUser===sanAlternate) return true;
		const toDecimal=(s: string): string=>{
			return s.replace(/(^|[+\-*/\^\(])(\d+)\/(\d+)([+\-*/\^\)]|$)/g,(_,pre,num,den,post)=>{
				let val=Number(num)/Number(den);
				return pre+val+post;
			});
		};
		let decUser=toDecimal(funcUser);
		let decCorrect=toDecimal(funcCorrect);
		if (decUser===decCorrect) return true;
		const toTerms=(s: string): string[]=>{
			let withPlus=s.replace(/-/g,'+-');
			let terms=withPlus.split('+').map(t=>t.trim()).filter(t=>t!=='');
			terms.sort();
			return terms;
		};
		let termsUser=toTerms(funcUser);
		let termsCorrect=toTerms(funcCorrect);
		if (termsUser.join('+')===termsCorrect.join('+')) return true;
		const tryEvaluate=(expr: string): any=>{
			let normalized=expr.replace(/<([^>]*)>/g,'[$1]');
			normalized=normalized.replace(/−/g,'-');
			try{
				return evaluate(normalized);
			}catch{
				return null;
			}
		};
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
		return settings.isAnswerCorrect(answer, sanCorrect, alternate);
	}
}
// ----- End of answer comparison logic -----

export function saveSessionSnapshot(): void{
	if (!state.sessionActive) return;
	const snapshot={
		sessionScore:state.sessionScore,
		timeLeft:state.timeLeft,
		maxQuestions:state.maxQuestions,
		currentDifficulty:state.currentDifficulty,
		mentalShuffle:state.mentalShuffle,
		mentalScope:state.mentalScope,
		selectedTopic:state.selectedTopic,
		timestamp:Date.now()
	};
	localStorage.setItem(SESSION_STORAGE_KEY,JSON.stringify(snapshot));
}
export function restoreSessionSnapshot(): void{
	const saved=localStorage.getItem(SESSION_STORAGE_KEY);
	if (!saved) return;
	try{
		const snap=JSON.parse(saved);
		if (Date.now()-snap.timestamp>60*60*1000){
			localStorage.removeItem(SESSION_STORAGE_KEY);
			return;
		}
		state.setSessionActive(true);
		state.setSessionPaused(false);
		state.setSessionScore(snap.sessionScore);
		state.setTimeLeft(snap.timeLeft);
		state.setMaxQuestions(snap.maxQuestions);
		state.setCurrentDifficulty(snap.currentDifficulty);
		state.setMentalShuffle(snap.mentalShuffle);
		state.setMentalScope(snap.mentalScope);
		state.setSelectedTopic(snap.selectedTopic);
		if (dom.modeMentalBtn) dom.modeMentalBtn.click();
		if (state.selectedTopic) topicsModule.selectTopic(state.selectedTopic);
		ui.updateScoreDisplay();
		ui.updateTimerDisplay();
		ui.updateProgressBar();
		startTimer();
		ui.disableTopicSelection(true);
		ui.disableModeButtons(true);
		ui.disableDifficulty(true);
		ui.setSessionButton(true);
		generateNextMentalQuestion();
		localStorage.removeItem(SESSION_STORAGE_KEY);
	} catch (e){
		console.warn("Failed to restore session",e);
	}
}
export function startTimer(): void{
	if (state.unlimitedMode) return;
	if (state.sessionTimer) clearInterval(state.sessionTimer);
	state.setSessionTimer(setInterval(()=>{
		if (!state.sessionActive||state.sessionPaused) return;
		state.setTimeLeft(state.timeLeft-1);
		ui.updateTimerDisplay();
		saveSessionSnapshot();
		if (state.timeLeft<=0){
			state.setSessionScore({correct:state.sessionScore.correct,total:state.sessionScore.total+1});
			ui.updateScoreDisplay();
			ui.updateProgressBar();
			ui.showNotification("Time is up!","warning");
			if (dom.mentalProgressBar){
				let percent=(state.sessionScore.total/state.maxQuestions)*100;
				dom.mentalProgressBar.style.width=percent+"%";
			}
			if (state.sessionScore.total>=state.maxQuestions && !state.unlimitedMode){
				endMentalSession();
				return;
			}
			state.setTimeLeft(settings.settings.timer);
			ui.updateTimerDisplay();
			saveSessionSnapshot();
			if (state.mentalNextQuestionTimeout){
				clearTimeout(state.mentalNextQuestionTimeout);
				state.setMentalNextQuestionTimeout(null);
			}
			state.setMentalNextQuestionTimeout(setTimeout(()=>{
				if (state.sessionActive&&!state.sessionPaused){
					generateNextMentalQuestion();
				}
				state.setMentalNextQuestionTimeout(null);
			},settings.settings.autoCheckDelay));
		}
	},1000));
}
export function generateNextMentalQuestion(): void{
	if (!state.sessionActive||state.sessionPaused) return;
	if (state.mentalShuffle){
		const randomTopic=topicsModule.pickRandomTopic();
		if (randomTopic){
			state.setSelectedTopic(randomTopic);
			document.querySelectorAll(".topic-pill").forEach(item=>{
				item.classList.remove("active");
			});
			let selectedElement=document.querySelector(`[data-topic-id="${state.selectedTopic}"]`);
			if (selectedElement) selectedElement.classList.add("active");
			let topic=topicList.find(t=>t.id===state.selectedTopic);
			if (dom.currentTopicDisplay){
				dom.currentTopicDisplay.textContent=topic?topic.name:"Topic";
			}
		}
		else{
			endMentalSession();
			ui.showNotification("No topics available","warning");
			return;
		}
	}
	if (!state.selectedTopic){
		endMentalSession();
		return;
	}
	if (!dom.questionArea||!dom.userAnswer||!dom.checkAnswerButton) return;
	if (dom.answerResults){
		dom.answerResults.innerHTML=`<div class="empty-state">...</div>`;
	}
	if (dom.copyAnswerBtn) dom.copyAnswerBtn.style.display="none";
	dom.questionArea.innerHTML=`
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Generating...</p>
    </div>
  `;
	try {
		callGenerator(state.selectedTopic,state.currentDifficulty);
		window.hasQuestion=true;
		ui.updateUIState();
		state.setCurrentQuestionStartTime(Date.now());
		if (state.mcqMode){
			generateChoicesForCurrentQuestion();
			if (dom.userAnswer) dom.userAnswer.style.display="none";
			if (dom.mathToolbar) dom.mathToolbar.style.display="none";
			if (dom.mcqChoicesContainer) dom.mcqChoicesContainer.style.display="flex";
		}
		else{
			if (dom.userAnswer) dom.userAnswer.style.display="block";
			if (dom.mathToolbar) dom.mathToolbar.style.display="flex";
			if (dom.mcqChoicesContainer) dom.mcqChoicesContainer.style.display="none";
		}
	} catch (error) {
		console.error("Mental question generation failed:", error);
		dom.questionArea.innerHTML=`<div class="empty-state">Generation failed</div>`;
		window.hasQuestion=false;
		endMentalSession();
		return;
	}
	if (dom.expectedFormatDiv&&window.expectedFormat){
		dom.expectedFormatDiv.textContent="Expected format: "+window.expectedFormat;
	}
	dom.userAnswer.disabled=false;
	dom.userAnswer.removeAttribute("aria-disabled");
	dom.userAnswer.focus();
	ui.updatePreview();
	if (window.MathJax&&window.MathJax.typesetPromise){
		window.MathJax.typesetPromise([dom.questionArea]).catch((err: any)=>console.log("MathJax typeset error:",err));
	}
}
export async function handleMentalAnswer(answer?: string): Promise<void>{
	if (!state.sessionActive||state.sessionPaused) return;
	if (!dom.userAnswer||!dom.answerResults) return;
	if (state.mentalNextQuestionTimeout){
		clearTimeout(state.mentalNextQuestionTimeout);
		state.setMentalNextQuestionTimeout(null);
	}
	let userInput=answer;
	if (userInput===undefined){
		userInput=dom.userAnswer.value.trim();
		if (!userInput){
			ui.showNotification("Please enter an answer","warning");
			return;
		}
	}
	let correct=window.correctAnswer.correct;
	let alternate=window.correctAnswer.alternate;
	let isCorrect=isAnswerCorrect(userInput,correct,alternate);
	if (!state.sessionActive) return;
	if (settings.settings.sound){
		const audioCtx=new (window.AudioContext||(window as any).webkitAudioContext)();
		const oscillator=audioCtx.createOscillator();
		const gainNode=audioCtx.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);
		oscillator.frequency.value=isCorrect?880:440;
		gainNode.gain.setValueAtTime(0.1,audioCtx.currentTime);
		oscillator.start();
		oscillator.stop(audioCtx.currentTime+0.1);
	}
	if (settings.settings.vibration&&navigator.vibrate){
		navigator.vibrate(isCorrect?50:100);
	}
	if (state.currentQuestionStartTime){
		const elapsed=Date.now()-state.currentQuestionStartTime;
		state.setTotalTimeSpent(state.totalTimeSpent+elapsed);
		state.setAnsweredQuestionsCount(state.answeredQuestionsCount+1);
		ui.updateStatistics();
		state.setCurrentQuestionStartTime(null);
	}
	let newCorrect=state.sessionScore.correct+(isCorrect?1:0);
	let newTotal=state.sessionScore.total+1;
	state.setSessionScore({correct:newCorrect,total:newTotal});
	ui.updateScoreDisplay();
	ui.updateProgressBar();
	if (dom.mentalProgressBar){
		let percent=(newTotal/state.maxQuestions)*100;
		dom.mentalProgressBar.style.width=percent+"%";
	}
	let answerHtml='';
	if (window.katex){
		try{
			answerHtml=window.katex.renderToString(window.correctAnswer.correct,{throwOnError:false,displayMode:false});
		}catch(e){
			console.warn('KaTeX rendering failed, falling back to plain text',e);
			answerHtml=window.correctAnswer.correct;
		}
	}else{
		answerHtml=window.correctAnswer.correct;
	}
	if (dom.answerResults){
		dom.answerResults.innerHTML=isCorrect
			?`<div class="result-success">Correct! <span class="katex-answer">${answerHtml}</span></div>`
			:`<div class="result-error">Incorrect. The answer was <span class="katex-answer">${answerHtml}</span></div>`;
		dom.answerResults.className=isCorrect?"results-display correct":"results-display incorrect";
		dom.answerResults.classList.add(isCorrect?"correct-flash":"incorrect-flash");
		setTimeout(()=>dom.answerResults?.classList.remove(isCorrect?"correct-flash":"incorrect-flash"),300);
	}
	if (dom.copyAnswerBtn) dom.copyAnswerBtn.style.display="inline-flex";
	if (dom.userAnswer) dom.userAnswer.value="";
	ui.updatePreview();
	saveSessionSnapshot();
	if (newTotal>=state.maxQuestions && !state.unlimitedMode){
		endMentalSession();
		return;
	}
	state.setMentalNextQuestionTimeout(setTimeout(()=>{
		if (state.sessionActive&&!state.sessionPaused){
			state.setTimeLeft(settings.settings.timer);
			ui.updateTimerDisplay();
			generateNextMentalQuestion();
		}
		state.setMentalNextQuestionTimeout(null);
	},settings.settings.autoCheckDelay));
}
export function handleMcqChoice(choice: string): void{
	handleMentalAnswer(choice);
}
export function startMentalSession(): void{
	if (!state.selectedTopic&&!state.mentalShuffle){
		ui.showNotification("Please select a topic or enable shuffle","warning");
		return;
	}
	if (state.mentalShuffle&&!topicsModule.pickRandomTopic()){
		ui.showNotification("No topics available in current scope","warning");
		return;
	}
	if (state.mentalNextQuestionTimeout){
		clearTimeout(state.mentalNextQuestionTimeout);
		state.setMentalNextQuestionTimeout(null);
	}
	state.setUnlimitedMode(dom.unlimitedToggle?.checked??false);
	if (dom.statisticsPanel) dom.statisticsPanel.style.display="flex";
	state.setTotalTimeSpent(0);
	state.setAnsweredQuestionsCount(0);
	state.setCurrentQuestionStartTime(null);
	ui.updateStatistics();
	state.setSessionActive(true);
	state.setSessionPaused(false);
	state.setSessionScore({correct:0,total:0});
	state.setTimeLeft(settings.settings.timer);
	state.setMaxQuestions(settings.settings.maxQuestions);
	ui.updateScoreDisplay();
	ui.updateTimerDisplay();
	if (dom.mentalProgressBar) dom.mentalProgressBar.style.width="0%";
	ui.updateProgressBar();
	if (state.unlimitedMode){
		if (dom.mentalProgressBar) dom.mentalProgressBar.style.display="none";
		if (dom.timerDisplay) dom.timerDisplay.style.display="none";
	}
	else{
		if (dom.mentalProgressBar) dom.mentalProgressBar.style.display="block";
		if (dom.timerDisplay) dom.timerDisplay.style.display="inline-flex";
	}
	startTimer();
	ui.disableTopicSelection(true);
	ui.disableModeButtons(true);
	ui.disableDifficulty(true);
	ui.setSessionButton(true);
	generateNextMentalQuestion();
}
export function pauseMentalSession(): void{
	if (!state.sessionActive) return;
	state.setSessionPaused(!state.sessionPaused);
	if (dom.pauseSessionBtn){
		dom.pauseSessionBtn.innerHTML=state.sessionPaused
			?'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
			:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
		dom.pauseSessionBtn.setAttribute("aria-label",state.sessionPaused?"Resume":"Pause");
	}
	if (dom.userAnswer) dom.userAnswer.disabled=state.sessionPaused;
}
export function skipMentalQuestion(): void{
	if (!state.sessionActive||state.sessionPaused) return;
	if (state.mentalNextQuestionTimeout){
		clearTimeout(state.mentalNextQuestionTimeout);
		state.setMentalNextQuestionTimeout(null);
	}
	if (dom.answerResults){
		dom.answerResults.innerHTML=`<div class="result-info">Skipped</div>`;
		dom.answerResults.className="results-display";
	}
	state.setCurrentQuestionStartTime(null);
	let newTotal=state.sessionScore.total+1;
	state.setSessionScore({correct:state.sessionScore.correct,total:newTotal});
	ui.updateScoreDisplay();
	ui.updateProgressBar();
	if (dom.mentalProgressBar){
		let percent=(newTotal/state.maxQuestions)*100;
		dom.mentalProgressBar.style.width=percent+"%";
	}
	if (newTotal>=state.maxQuestions && !state.unlimitedMode){
		endMentalSession();
		return;
	}
	state.setTimeLeft(settings.settings.timer);
	ui.updateTimerDisplay();
	saveSessionSnapshot();
	state.setMentalNextQuestionTimeout(setTimeout(()=>{
		if (state.sessionActive&&!state.sessionPaused){
			generateNextMentalQuestion();
		}
		state.setMentalNextQuestionTimeout(null);
	},settings.settings.autoCheckDelay));
}
export function stopMentalSession(): void{
	endMentalSession();
}
export async function endMentalSession(): Promise<void>{
	ui.clearAllTimeouts();
	state.setSessionActive(false);
	state.setSessionPaused(false);
	localStorage.removeItem(SESSION_STORAGE_KEY);
	if (dom.mentalProgressBar) dom.mentalProgressBar.style.width="0%";
	ui.updateProgressBar();
	if (dom.statisticsPanel) dom.statisticsPanel.style.display="none";
	ui.disableTopicSelection(false);
	ui.disableModeButtons(false);
	ui.disableDifficulty(false);
	ui.setSessionButton(false);
	if (dom.userAnswer){
		dom.userAnswer.disabled=true;
		dom.userAnswer.value="";
		dom.userAnswer.setAttribute("aria-disabled","true");
	}
	if (dom.checkAnswerButton){
		dom.checkAnswerButton.disabled=true;
		dom.checkAnswerButton.setAttribute("aria-disabled","true");
	}
	if (dom.answerResults){
		dom.answerResults.innerHTML=`<div class="empty-state">...</div>`;
		dom.answerResults.className="results-display";
	}
	if (dom.copyAnswerBtn) dom.copyAnswerBtn.style.display="none";
	if (dom.expectedFormatDiv) dom.expectedFormatDiv.textContent="";
	ui.showNotification(`Session finished! Score: ${state.sessionScore.correct}/${state.sessionScore.total}`,"info");
}