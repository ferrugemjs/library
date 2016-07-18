import 'document-register-element' ;
import IncrementalDOM = require("incremental-dom");

  interface ISpec{
     render:()=>void;
     tag:string;     
     controller?:any;
  }

  function changeAttributeComponentTag(prop:string,previousValue:any,newValue:any){
      //console.log('same one call me');
      //if(previousValue!==newValue){
        let _onChangedFunction:string = "on"+prop.replace(/(^\D)/g,function(g0,g1){
          return g0.toUpperCase();
        })+"Changed";
        this.controller[prop] = newValue;
        if(this.controller[_onChangedFunction]){
          this.controller[_onChangedFunction](newValue,previousValue);
        }
      //}
  }

  var defineComponent = function(spec:ISpec){
      //console.log(spec.tag);
      var prototype = Object.create(HTMLElement.prototype,
      {
        createdCallback: {
          value: function() {
            let tmpContent = this.innerHTML;
            this.innerHTML = "";
            /*
            this.el = this.appendChild(
              document.createElement('div')
            );
            */
            this.el = this;            
            this.controller = {}; 

            //console.log(this.el.content);

            //let controller:any = {};
            if(spec.controller){
              if(!spec.controller.prototype.refresh){
                spec.controller.prototype._$render_from_powerup = spec.render;
                spec.controller.prototype.refresh =function(){
                   IncrementalDOM.patch(this._$el$domref,this._$render_from_powerup, this);
                }
              }
              this.controller = new spec.controller();
              this.controller._$el$domref = this.el;

            }
            IncrementalDOM.patch(this.el, spec.render, this.controller);
            
            if (tmpContent && this.el.getElementsByTagName("content").length > 0) {
              this.el.getElementsByTagName("content")[0].innerHTML = tmpContent;
            }
            
            
          }
        },
        attachedCallback: {value: function() {          
          let i:number = this.el.attributes.length;
          while (i--){
              let attr:{name:string,value:string} = this.el.attributes[i];
              //console.log(attr.name + '="' + attr.value + '"');
              changeAttributeComponentTag.apply(this,[attr.name,attr.value,attr.value]);
          }          
          if(this.controller.attached){
            this.controller.attached();
          }
          //console.log('attached!');
        }},
        attributeChangedCallback: {value:changeAttributeComponentTag}
      }); 
      /*     
      for(var name in spec) {
        prototype[name] = spec[name];
      }
      */
      (<any>document).registerElement(spec.tag, {
        prototype: prototype
      });
      
  };

 export = defineComponent;