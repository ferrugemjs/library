import 'webcomponents.js/webcomponents.min' ;
import IncrementalDOM = require("incremental-dom");

  interface ISpec{
     render:()=>void;
     tag:string;     
     controller:any;
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
      var prototypeX = Object.create(HTMLElement.prototype,
      {
        createdCallback: {
          value: function() {


            //let tmpContent = this.innerHTML;
            //this.innerHTML = "";
            
            this.el = this.appendChild(
              document.createElement('div')
            );
			
            //this.el = this.createShadowRoot();
            
            //this.el = this;            
            this.controller = {}; 

            //console.log(this.el.content);

            //let controller:any = {};



            if(spec.controller){
              if(!spec.controller.prototype.refresh){
                spec.controller.prototype._$render_from_powerup = spec.render;
                spec.controller.prototype.refresh =function(){
                    //let tmpContent2 = this._$el$domref.getElementsByTagName("content")[0];
                    //this._$el$domref.innerHTML = "";
                    IncrementalDOM.patch(this._$el$domref,this._$render_from_powerup, this);
                    /*
                    if (tmpContent2 && this._$el$domref.getElementsByTagName("content").length > 0) {
                      this._$el$domref.getElementsByTagName("content")[0] = tmpContent2;
                    }
                    */
                    
                }
              }
              this.controller = new spec.controller();
              this.controller._$el$domref = this.el;

            }
            //IncrementalDOM.patch(this.el, spec.render, this.controller);
            /*
            if (tmpContent && this.el.getElementsByTagName("content").length > 0) {
              this.el.getElementsByTagName("content")[0].innerHTML = tmpContent;
            }
            */
            
          }
        },
        shouldComponentUpdate:{value:function() {
    		return true;
  		}},
        attachedCallback: {value: function() {
          //console.log(`${spec.tag} attached!`)
          //console.log(this.attributes);
          let el = this;
          let i:number = el.attributes.length;
          while (i--){
              let attr:{name:string,value:string} = el.attributes[i];
              //console.log(attr.name + '="' + attr.value + '"');
              changeAttributeComponentTag.apply(this,[attr.name,attr.value,attr.value]);
          }          
          
          this.controller.refresh();
          if(this.controller.attached){
            this.controller.attached();
          }          
          //console.log('attached!');
        }},
        attributeChangedCallback: {value:changeAttributeComponentTag}
      }); 
      (<any>document).registerElement(spec.tag, {
        prototype: prototypeX
      });      
  };

 export = defineComponent;