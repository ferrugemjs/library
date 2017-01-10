export class SubComp{
	private name:string;
	private nameComp:string;
	private options:string[];
	constructor(){
		this.name = "my name";
		this.nameComp = "my father name";
		this.options = ["vade","sitt","x9"];
	}
	private onNameChanged(_new:string,_old:string):void{
		console.log(`${this.nameComp} , ${this.name} --> ${_new} to ${_old}`);
	}
	private onNameCompChanged(_new:string,_old:string):void{
		console.log(`${this.nameComp} , ${this.name} --> ${_new} to ${_old}`);
	}
	private attached():void{
		console.log(`${this.nameComp} - ${this.name}`);
	}
}