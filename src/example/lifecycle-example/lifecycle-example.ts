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
	private shouldUpdate(objCopy:LifecycleExample){
		if(objCopy.stageValue === 'attr change with refresh'){
			this.logs.push({
				stage:'shouldUpdate:false',
				value:this.stageValue
			});
		}
		this.logs.push({
			stage:'shouldUpdate:true',
			value:this.stageValue
		});
		return true;
	}
	private attributeChanged(attr:string,newvl:string,oldvl:string){
		if(attr === 'stageValue'){
			this.logs.push({
				stage:'attrChangedCallback',
				value:this.stageValue
			});
		}
	}
	private attached(){
		this.logs.push({
			stage:'attached',
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