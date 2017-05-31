export interface IInstWatched{	
	inst?:{shouldUpdate?:(prop:{}) => boolean,detached?:Function,attached:Function,_$key$_:string,render:Function}
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