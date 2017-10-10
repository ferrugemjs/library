interface IRefFunction{
	inc:number;
}

export class RefreshFunction implements IRefFunction{
	private refresh:( fn?: (ref:IRefFunction) => IRefFunction ) => void;
	//private refresh:Function;
	public inc:number;
	constructor(){
		this.inc = 0;
	}
	private incrementWithFn(){
		this.refresh( state => ({
			inc:state.inc + 2
		}));
	}
	private incrementeWithObject(){
		this.refresh(<any>{
			inc: this.inc + 2
		});
	}
}