export interface IInstWatched{	
	inst?:{
		connectedCallback:Function
		,disconnectedCallback?:Function
		,shouldUpdateCallback?:(prop:{}) => boolean
		,attributeChangedCallback?:(attrName:string, oldVal:any, newVal:string) => void
		,_$key$_:string
		,render:Function
		,_capture$KeyId?:() => string
	}
	,tag:string
	,alias:string
	,target?:string
	,hostVars?:{}
	,staticVars?:{}
	,extStaticVars?:string[]
	,extHostVars?:string
	,loaded?:boolean
	,content?:Function;
};
