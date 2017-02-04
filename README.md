#FerrugemJS
![Ferrugem Logo](/assets/img/ferrugemjs.png) 
###A simple library, reactive, conventional and non-intrusive!
**FerrugemJS** is inspired by [Aurelia](http://aurelia.io/) and [React](https://facebook.github.io/react/) using [Incremental DOM](http://google.github.io/incremental-dom/) with a html template engine.

####No jquery required, only 2kB!

[![NPM](https://nodei.co/npm/ferrugemjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ferrugemjs/)

####Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 6.1+ ✔ | Latest ✔ |

####examples
https://ferrugemjs.github.io/examples/index.html

####how to start:
clone
[skeleton-typescript](https://github.com/ferrugemjs/skeleton-typescript)

####individual install
npm install ferrugemjs

jspm install npm:ferrugemjs


####initialization

eg. index.html file

``` html
  <body>    
    <div app></div>
    <script>
      System.import("ferrugemjs");
    </script>
  </body>
```
FerrugemJS will look for the first page element with the attribute "app" to start the application and if not found it, will use the tag "body".
Just create app.ts files and app.html in the same directory of the index.html page.
If you want to modify the path of the init file just add this information to the app attribute as below:
``` html
<div app="other_path/init_app_file"></div>
```
####modules & custom tags
To create a module witch will be a custom tag do you need two files with same name(eg. "module-a.ts" and "module-a.html").
By convention FerrugemJS know that "module-a.ts" is a controller file and "module-a.html" is the view of it and you can easily import it into your main app html file or into other module and use as a component with a custom tag.

eg. 
"module-a.ts" file.
``` typescript
export class ModuleA{
    private title:string;
    constructor(){
      this.title = "test!";
    }
}
```
eg. "module-a.html" file.
``` html
<template>
    <h1>My First APP with ${this.title}</h1>
</template>
```
now, we can importe into other template
``` xml
<template>
    <require from="./module-a"></require>
    <module-a title="new title!"></module-a>
</template>
```

###module lifecycle

*attached:
By implementing the method your module will be prompted for it once the html is in "DOM".
``` typescript
attached(){
 console.log('im in DOM');
}
```


*detached:
By implementing the method your module will be prompted for it once your object is detached from "DOM".
``` typescript
detached(){
 console.log('im out');
}
```

*set+attribute name:
By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute
``` typescript
setName(name:string){
 this.name = name;
}
```

###one-way data binding

When you set the 'value=${name}' in a input component it will set "value" attribute in element after a controller refresh.

``` html
<template>
  <h2>Hello World, ${this.name}</h2>
  <input value="${this.name}"/>
</template>
```

###event binding

When you set the "keyup.bind" in a input component it will change the "name" attribute in controller after a keyup event.

``` html
<template>
  <h2>Hello World, ${this.name}</h2>
  <input keyup.bind="this.name"/>
</template>
```

###manual event reactivity

``` html
<template>
  <h2>Hello World, ${this.name}</h2>
  <input change.trigger="this.manualChangeMethod"/>
</template>
```

``` typescript
export class HelloWorld{
  private name:string;
  private refresh:Function;//necessary if you want avoid typescript warnings
  constructor(){
    this.name = "";
  }
  manualChangeMethod(event):void{	
	//a reactive update after 'anyMethod' is calling
	this.name = event.target.value;
	this.refresh();
  }
}
```

###template stuffs

if,elseif,else
``` html
<template>
  <if condition="this.name==='test'">
    <span>name is test</span>
  </if>

  <if condition="this.name==='test'">
    <span>name is test</span>
  <else>
    <span>I dont know you!</span>
  </if>

  <if condition="this.name==='test'">
    <span>name is test</span>
  <elseif condition="this.name==='test2'">
    <span>ok, you are test2</span>
  </if>

  <if condition="this.name==='test'">
    <span>name is test</span>
  <elseif condition="this.name==='test2'">
    <span>ok, you are test2</span>
  <else>
    <span>I dont know you!</span>  
  </if>

</template>
```

for each
``` html
<template>
 <ul>
  <for each="item in this.itens">
   <li>${item.name}</li>
  </for>
  <for each="item,$index in this.itens">
   <li>${$index} - ${item.name}</li>
  </for>
 </ul>
</template>
```

import other module
``` html
<template>
    <require from="./example/hello-world"></require>
    <h1>My First APP with ${this.title}</h1>
    <hello-world name="C-3PO"></hello-world>   
</template>
```

give an alias in module import statement. 
``` html
<template>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <h1>My First APP with ${this.title}</h1>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>
```

import a css file. 
``` html
<template>
    <require from="./hello-world.css!"></require>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <h1>My First APP with ${this.title}</h1>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>
```
embed a style tag. 
``` html
<template>
    <style>
    .especial-tag{
    	background-color:red;
    }
    </style>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <h1 class="especial-tag">My First APP with ${this.title}</h1>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>
```

change the css className 
``` html
<template class="my-custom-classname">
    <style>
    .my-custom-classname{
      background-color:red;
    }
    </style>
    <h3>My element with a custom className</h3>
</template>
```

set where the content of element must be. 
eg. (hello-world.html)
``` xml
<template>    
 <h1>
  <content></content>
 </h1>
</template>
```
other template.
``` xml
<template>    
    <require from="./example/hello-world"></require>
    <hello-world>
          Good night!
    </hello-world>   
</template>
```


import other library/script.
``` html
<template>
  <require from="moment" type="script"></require>
  <span>${moment().format('DD/MM/YYYY')}</span>
</template>
```

import other ui library as a namespace.
``` xml
<template>
  <require from="ui-vendor as ui" type="namespace"></require>	
  <span>using a ui library</span>
  <ui:progress-bar></ui:progress-bar>
</template>
```

preserve a element instance.
``` xml
<template>
  <require from="./test-comp"></require>
  <test-comp key:id="key_unique"></test-comp>
</template>
```

associete a controller method to DOM event.
``` xml
<template>
  <button click.trigger="this.showName">show my name!</button>
</template>
```

associete a controller method to DOM event with extra paramaters.
``` xml
<template>
  <button click.trigger="this.showName('test')">show my name!</button>
</template>
```

to access a camelCase method or attribute from template (use slashes '-').
``` xml
<template>
  <require from="./test-comp"></require>
  <test-comp full-name="test"></test-comp>
</template>
```

associete a controller method to a custom element event.
``` xml
<template>
  <require from="./test-comp"></require>
  <test-comp on-change-name.subscribe="this.showName"></test-comp>
</template>
```

composition.
``` xml
<template>
  <compose view="path_to_dinamic_module/module_to_loader"></compose>
</template>
```

multiples views to a view-model.
eg.
view-one.html
``` xml
<template view-model="./universal-view-model">
  <h1>VIEW one of universal-view-model</h1>
</template>
```

view-two.html
``` xml
<template view-model="./universal-view-model">
  <h1>VIEW two of universal-view-model</h1>
</template>
```
