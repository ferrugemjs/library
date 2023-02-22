const update = () => {
	console.log('update???');
}

define(["exports", "incremental-dom", "@ferrugemjs/library", "./main-app", "./test-mod.html"], function (exports, _idom, _libfjs_factory, _main_app, test_mod) {
	var __main_app_tmp = Object.keys(_main_app)[0];

	exports.default = (function (super_clazz) {
		function _clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp(props) {
			if (super_clazz.call) {
				super_clazz.call(this, props);
			}
		};
		_clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp.prototype = Object.create(super_clazz.prototype || super_clazz);
		_clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp.prototype.constructor = _clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp;
		_clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp.prototype.$render = function (config_props) {
			if (!config_props.loaded) {
				_idom.elementOpen("div", "" + (config_props.key_id) + "", [""], "is", (config_props.is), "id", (config_props.key_id));


			};
			_idom.elementOpen("h1");

			_idom.text("Ola");

			_idom.elementClose("h1");

			_idom.elementOpen("span");

			_idom.text("" + (this.msg) + "");

			_idom.elementClose("span");
			var custom_comp_keyid_f_4e03096d_f0fb_4842_8651_6e453ff0cf93 = _libfjs_factory.componentFactory(test_mod.default, Object.assign({}, {}, { "prop1": "ops1", "key:id": "custom_comp_keyid_f_4e03096d_f0fb_4842_8651_6e453ff0cf93", "is": "test-mod" }), { is: "test-mod", key_id: "custom_comp_keyid_f_4e03096d_f0fb_4842_8651_6e453ff0cf93" }).content(function () { }.bind(this)); custom_comp_keyid_f_4e03096d_f0fb_4842_8651_6e453ff0cf93.$render({ is: "test-mod", key_id: "custom_comp_keyid_f_4e03096d_f0fb_4842_8651_6e453ff0cf93" }); if (!config_props.loaded) { _idom.elementClose("div"); };
		};
		return _clazz_sub_f_3c8cb028_951f_491e_9ad1_b79db9769867_tmp;
	})(_main_app[__main_app_tmp] || _main_app);
});