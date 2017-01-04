export class CompostComp{
	private especialname:string;
	private calculado:number;
	private onEventMsg:{a:string}={a:'sei nao cabra'};
	constructor(){
		this.especialname = "humm-default";
	}
	setEspecialname2(n:string):void{
		console.log(n);
	}
	private attached():void{
		console.log(this.onEventMsg);
	}
}