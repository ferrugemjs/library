define(["exports","incremental-dom","@ferrugemjs/library/component-factory","./main-app"], function (exports,_idom,_libfjs_factory,_main_app){
	var __main_app_tmp = Object.keys(_main_app)[0];
	exports.default = (function(super_clazz){
		function _clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp(props){
			if(super_clazz.call){
				super_clazz.call(this, props);
			}
		};
		_clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp.prototype = Object.create(super_clazz.prototype || super_clazz);
		_clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp.prototype.constructor = _clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp;
		_clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp.prototype.$render = function(config_props){if(!config_props.loaded){ _idom.elementOpen("div",""+(config_props.key_id)+"",[""],"is",(config_props.is),"id",(config_props.key_id));

	
};				
	_idom.elementOpen("h1");
		
_idom.text("Ola");	

	_idom.elementClose("h1");
				
	_idom.elementOpen("span");
		
_idom.text(""+(this.msg)+"");	

	_idom.elementClose("span");
		if(!config_props.loaded){_idom.elementClose("div");};	};
		return _clazz_sub_f_dbba3609_9183_49ed_90e4_119da197baa4_tmp;
	})(_main_app[__main_app_tmp] || _main_app);
});