import * as settings from "./settings";

export async function initializeTheme(): Promise<void>{
	if (settings.settings.theme==="system"){
		let prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
		settings.applyTheme(prefersDark?"dark":"light");
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e)=>{
			if (settings.settings.theme==="system"){
				settings.applyTheme(e.matches?"dark":"light");
			}
		});
	}
	else{
		settings.applyTheme(settings.settings.theme as "light"|"dark");
	}
}