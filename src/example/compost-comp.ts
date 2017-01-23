export class CompostComp{
	private especialname:string;
	private calculado:number;
	private onEventMsg1:{a:string}={a:'sei nao cabra'};
	private myfnext:Function;
	private onEventMsg:{a:Function};
	private id:number;
	constructor(){
		this.especialname = "humm-default";
		this.onEventMsg={a:(fnext:Function)=>{
			//fnext();
			this.myfnext=fnext;
		}};
		this.id = 2010;
	}
	setEspecialname2(n:string):void{
		console.log(n);
	}
	private attached():void{
		console.log(this.onEventMsg);
	}
	private triggerFn():void{
		if(this.myfnext){
			this.especialname += "-"+new Date().getTime();
			this.myfnext();
			this.refresh();
		}
	}
}
