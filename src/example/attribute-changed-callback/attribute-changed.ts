export class AttributeChanged{
	private name:number;
	constructor(){
		this.name = 132;
	}
	private attributeChangedCallback(attr:string,newvl:string,oldvl:string){
		console.log(newvl,typeof newvl);
		console.log(oldvl,typeof oldvl);
		console.log(`attr. ${attr} changed with value ${newvl} and ${oldvl}`)
	}
}