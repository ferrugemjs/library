define(["require","exports","./generic-component"],function(e,t,n){"use strict";var i,r=document.querySelectorAll("[app]");i=0===r.length?document.getElementsByTagName("body")[0]:r[0],r=null;var o=i.getAttribute("app")||"app",u=i.getAttribute("id");u||(u="uid_"+(new Date).getTime(),i.setAttribute("id",u)),System["import"](o+".html").then(function(e){var t=Object.keys(e)[0],n=new e[t];n.configComponent("init-app-tag",u,[],null),n.refresh()}),t.GenericComponent=n.GenericComponent,t.AuxClass=n.AuxClass});