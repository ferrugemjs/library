define(["exports","incremental-dom","@ferrugemjs/library/dist/core/component-factory","./main-app"], function (exports,_idom,_libfjs_factory,_main_app){
	var __main_app_tmp = Object.keys(_main_app)[0];
	exports.default = (function(super_clazz){
		function _clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp(props){
			if(super_clazz.call){
				super_clazz.call(this, props);
			}
		};
		_clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp.prototype = Object.create(super_clazz.prototype || super_clazz);
		_clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp.prototype.constructor = _clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp;
		_clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp.prototype.$render = function(config_props){if(!config_props.loaded){ _idom.elementOpen("div",""+(config_props.key_id)+"",[""],"is",(config_props.is),"id",(config_props.key_id));

	
};				
	_idom.elementOpen("h1");
		
_idom.text("Ola");	

	_idom.elementClose("h1");
				
	_idom.elementOpen("span");
		
_idom.text(""+(this.msg)+"");	

	_idom.elementClose("span");
		if(!config_props.loaded){_idom.elementClose("div");};	};
		return _clazz_sub_f_d60b5d62_2c5c_4e78_9889_f75a30aa5f89_tmp;
	})(_main_app[__main_app_tmp] || _main_app);
});