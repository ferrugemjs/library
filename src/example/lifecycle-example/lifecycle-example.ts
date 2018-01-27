export class LifecycleExample{
	private name:number;
	private stageValue:string = "default";
	private logs:{stage:string,value:string}[] = [];
	constructor(){
		this.logs.push({
			stage:'constructor',
			value:this.stageValue
		});
		this.name = 132;
	}
	private shouldUpdateCallback(objCopy:LifecycleExample){
		if(objCopy.stageValue === 'attr change with refresh'){
			this.logs.push({
				stage:'shouldUpdateCallback:false',
				value:this.stageValue
			});
		}
		this.logs.push({
			stage:'shouldUpdateCallback:true',
			value:this.stageValue
		});
		return true;
	}
	private attributeChangedCallback(attr:string,newvl:string,oldvl:string){
		if(attr === 'stageValue'){
			this.logs.push({
				stage:'attrChangedCallback',
				value:this.stageValue
			});
		}
	}
	private connectedCallback(){
		this.logs.push({
			stage:'connectedCallback',
			value:this.stageValue
		});
	}
	private set stageValueAlias(value:string){
		this.logs.push({
			stage:'set attr',
			value:this.stageValue
		});
	}
}