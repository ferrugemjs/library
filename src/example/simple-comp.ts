export class SimpleComp{
	private texto:string="poxa veio";
	constructor(){
		//console.log('IM live');
		//this.texto = "";
	}
	private attached():void{
		console.log(`my texto is: ${this.texto} `);
		//(<any>this).refresh();
	}
	private setTexto(texto:string):void{
		//console.log(` from  '${this.texto}' to '${texto}' `);
		this.texto = texto;		
		//console.log(this);
		(<any>this).refresh();
	}
	private onTextoChanged():void{
		console.log(`my texto change to: ${this.texto} `);
		(<any>this).refresh();
	}
}