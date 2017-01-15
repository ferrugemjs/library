export class SubComp{
	private name:string;
	private nameComp:string;
	private options:string[];
	constructor(){
		this.name = "my name";
		this.nameComp = "my father name";
		this.options = ["vade","sitt","x9"];
	}
	private setName2(_new:string):void{
		console.log(`${this.name} , ${this.name} --> ${_new}`);
	}
	private attached():void{
		console.log(`${this.nameComp} - ${this.name}`);
	}
}