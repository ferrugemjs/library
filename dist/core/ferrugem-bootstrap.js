define(["require","exports","incremental-dom","./generic-component"],function(e,t,a,l){"use strict";var n,r=document.querySelectorAll("[app]");n=0===r.length?document.getElementsByTagName("body")[0]:r[0],r=null;var u=n.getAttribute("app")||"app",i=n.getAttribute("id");i||(i="uid_"+(new Date).getTime(),n.setAttribute("id",i)),e([u+".html"],function(e){var t=(n.className?n.className+" ":"",l["default"].build({classFactory:e["default"],staticVars:{},hostVars:{},tagName:"init-app-tag"}));a.patch(document.getElementById(i),l["default"].reDraw.bind(t),t)}),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l["default"]});