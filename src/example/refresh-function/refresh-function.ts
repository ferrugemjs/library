interface IRefFunction{
	inc:number;
}

export class RefreshFunction implements IRefFunction{
	private refresh:( fn?: (ref:IRefFunction) => IRefFunction ) => Promise<any>;
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
	private incrementeWithPromise(){
		let prom1 = new Promise(success => {
			setTimeout( _ => {
				console.log('finished!!');
				success({inc:this.inc + 1000})
			},4000);
		});
		console.log(typeof prom1);
		this
			.refresh(<any>prom1)
			.then( _ => console.log(_));
	}
}