export class UniversalViewModel{
	private name:string;
	private refresh:Function;
	constructor(){
		this.name = "hummmmm";
	}
	private outer(nome?:string){
		if(nome){
			this.name = nome;
		}
		console.warn(this.name);
		this.refresh();
	}
	private getOuter(){
		this.outer();
	}

	private get pid(){
		return this.name;
	}
}