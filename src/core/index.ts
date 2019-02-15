/*
import componentFactory from './component-factory';
import platform from './platform';
import bootstrapper from './bootstrapper';

export { componentFactory };
export { platform };
export { bootstrapper };
*/
import {patch,elementOpen,elementClose,text} from 'incremental-dom';


class Test{
    public b:number;
    public render:Function;

    constructor({b}:any){
        this.b = b;
    }
    public attached(){
        //setTimeout(() => {
            this.b = 123;
        //},2000);
    }
}


export default (anotation_props:{}, inst_props:{}) => {
    // console.log('init');
    const props = {a:123, b:321};

    const app_html_ref = document.getElementsByTagName('body')[0];
    

    Test.prototype.render = function({id,key_id}:any){
        elementOpen('div',key_id,['id',id]);
            text(this.b);
        elementClose('div');
    }

    const inst = new Test(props);

    let $redraw = () => {};

    const proxy_inst = new Proxy(inst,{
        set: function(target, prop, value){
            // console.log(`'${String(prop)}' change from '${target[prop]}' to '${value}'`);
            target[prop] = value;
            setTimeout($redraw.bind(target),0);
            return true;
        }
    });

    $redraw = () => patch(app_html_ref, proxy_inst.render.bind(proxy_inst,anotation_props), proxy_inst);
    // first draw
    $redraw();
    if(proxy_inst.attached){
        proxy_inst.attached();
    }
}