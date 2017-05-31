export class SimpleComp{
	private text:string="text default";
	private attached():void{
		console.log(`on attached: my texto is: ${this.id} `);
	}
	private setText(text:string):void{
		this.text = text;
		(<any>this).refresh();
	}
	private detached(){
		console.log('remove from dom!!!')
	}
}