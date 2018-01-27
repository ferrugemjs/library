export class SimpleComp{
	private text:string="text default";
	private refresh:Function;
	private connectedCallback():void{
		//console.log(`on attached: my texto is: ${this.text} `);
	}
	private setText(text:string):void{
		this.text = text;
		this.refresh();
	}
	private disconnectedCallback(){
		//console.log('out of dom!!!')
	} 
}