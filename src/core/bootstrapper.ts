import platform from "ferrugemjs/platform";

declare let require:Function;

let app_html_s = document.querySelectorAll('[app]');
let app_html:HTMLElement;

if(app_html_s.length === 0){
	app_html = document.getElementsByTagName('body')[0];
}else{
	app_html = <HTMLElement>app_html_s[0];
};
app_html_s = null;

let app_url:string = app_html.getAttribute("app")||"app";

require([app_url+".html"],(_mod_init_app:any)=>{
	platform
		.bootstrap(_mod_init_app)
		.at(app_html);
});