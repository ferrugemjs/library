define(["require", "exports", "incremental-dom", 'webcomponents.js/webcomponents.min'], function (require, exports, IncrementalDOM) {
    "use strict";
    function changeAttributeComponentTag(prop, previousValue, newValue) {
        var _onChangedFunction = "on" + prop.replace(/(^\D)/g, function (g0, g1) {
            return g0.toUpperCase();
        }) + "Changed";
        this.controller[prop] = newValue;
        if (this.controller[_onChangedFunction]) {
            this.controller[_onChangedFunction](newValue, previousValue);
        }
    }
    var defineComponent = function (spec) {
        var prototypeX = Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: function () {
                    this.el = this.appendChild(document.createElement('div'));
                    this.controller = {};
                    if (spec.controller) {
                        if (!spec.controller.prototype.refresh) {
                            spec.controller.prototype._$render_from_powerup = spec.render;
                            spec.controller.prototype.refresh = function () {
                                IncrementalDOM.patch(this._$el$domref, this._$render_from_powerup, this);
                            };
                        }
                        this.controller = new spec.controller();
                        this.controller._$el$domref = this.el;
                    }
                }
            },
            shouldComponentUpdate: { value: function () {
                    return true;
                } },
            attachedCallback: { value: function () {
                    var el = this;
                    var i = el.attributes.length;
                    while (i--) {
                        var attr = el.attributes[i];
                        changeAttributeComponentTag.apply(this, [attr.name, attr.value, attr.value]);
                    }
                    this.controller.refresh();
                    if (this.controller.attached) {
                        this.controller.attached();
                    }
                } },
            attributeChangedCallback: { value: changeAttributeComponentTag }
        });
        document.registerElement(spec.tag, {
            prototype: prototypeX
        });
    };
    return defineComponent;
});
