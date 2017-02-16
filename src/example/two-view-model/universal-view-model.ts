export class UniversalViewModel{
	private name:string;
	private refresh:Function;
	private inc:number;
	constructor(){
		this.name = "hummmmm";
		this.inc = 0;
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
	private attached():void{
		console.log('universal view criado!',this.inc,this.name);
	}
}