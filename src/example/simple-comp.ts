export class SimpleComp{
	private text:string="text default";
	private attached():void{
		console.log(`on attached: my texto is: ${this.text} `);
	}
	private setText(text:string):void{
		this.text = text;
		(<any>this).refresh();
	}
}