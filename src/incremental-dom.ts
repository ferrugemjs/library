declare module 'incremental-dom'{

	export var patch: any;
	export var elementClose: any;	
	export var currentElement:any;
	export var text: any;
	export var elementOpen: any;
	export var elementVoid:any;
	export var attr: any;
	export var port: any;
	export var notifications:{nodesDeleted:Function,nodesCreated:Function}
	export var attributes:any;
}
