declare module "ferrugemjs/i-inst-config"{
	export {IInstConfig} from "core/i-inst-config";
}
declare module "ferrugemjs/i-inst-watched"{
	export {IInstWatched} from "core/i-inst-watched";
}
declare module "ferrugemjs/component-factory"{
	import _fjs_ from "core/component-factory";
	export default _fjs_;
}
declare module "ferrugemjs/nodes-watched"{
	import inst_watched from "core/nodes-watched";
	export default inst_watched;
}
declare module "ferrugemjs/nodes-action"{
	export {attacheNode,detacheNode} from "core/nodes-action";
}

declare module "ferrugemjs/platform"{
	import platform from "core/platform";
	export default platform;
}