#FerrugemJS

![Ferrugem Logo](/assets/img/ferrugemjs_new_120x120.png) 



**A simple library, reactive, conventional and non-intrusive!**
***FerrugemJS*** is inspired by [Aurelia](http://aurelia.io/) and [React](https://facebook.github.io/react/) using [Incremental DOM](http://google.github.io/incremental-dom/) with a html template engine.

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
    <div>
      <module-a title="new title!"></module-a>
    </div>
</template>
```


###module lifecycle

***attached:***

By implementing the method your module will be prompted for it once the html is in "DOM".

eg.
``` typescript
attached(){
 console.log('im in DOM');
}
```



***detached:***

By implementing the method your module will be prompted for it once your object is detached from "DOM".

eg.
``` typescript
detached(){
 console.log('im out');
}
```



***set+attribute name:***

By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute.

eg.
``` typescript
setName(name:string){
 this.name = name;
}
```



***one-way data binding***

When you set the 'value=${name}' in a input component it will set "value" attribute in element after a controller refresh.

eg.
``` html
<template>
  <div>
    <h2>Hello World, ${this.name}</h2>
    <input value="${this.name}"/>
  </div>
</template>
```



***event binding***

When you set the "keyup.bind" in a input component it will change the "name" attribute in controller after a keyup event.

eg.
``` html
<template>
  <div>
    <h2>Hello World, ${this.name}</h2>
    <input keyup.bind="this.name"/>
  </div>  
</template>
```



***manual event reactivity***

eg.
``` html
<template>
  <div>
    <h2>Hello World, ${this.name}</h2>
    <input change.trigger="this.manualChangeMethod"/>
  <div>
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

***template stuffs***



***if***

Conditional render with if.

eg.
``` xml
<template>
  <div>
    <span if="this.name==='test'">name is test</span>
  </div>
</template>
```



***tag if***

conditional flow with tag if condition.

eg.
``` xml
<template>
    <if condition="this.name==='test'">
      <span>name is test</span>
    </if>
</template>
```


***Tags if,else***

eg.
``` xml
<template>
  <div>
    <if condition="this.name==='test'">
      <span>name is test</span>
    <else>
      <span>I dont know you!</span>
    </if>
  </div>
</template>
```



***Tags if,elseif***

eg.
``` xml
<template>
  <div>
    <if condition="this.name==='test'">
      <span>name is test</span>
    <elseif condition="this.name==='test2'">
      <span>ok, you are test2</span>
    </if>
  </div>
</template>
```



***Tags if,elseif,else***

eg.
``` xml
<template>
  <div>
    <if condition="this.name==='test'">
      <span>name is test</span>
    <elseif condition="this.name==='test2'">
      <span>ok, you are test2</span>
    <else>
      <span>I dont know you!</span>  
    </if>
  </div>
</template>
```



***Loop render with each***

eg.
``` xml
<template>
 <ul>
  <li each="item in this.itens">${item.name}</li>
 </ul>
</template>
```



***Loop render with each with a custom index***

eg.
``` xml
<template>
 <ul>
  <li each="item,$index in this.itens">${$index} - ${item.name}</li>
 </ul>
</template>
```



***Tag for each***

eg.
``` xml
<template>
 <ul>
  <for each="item in this.itens">
   <li>${item.name}</li>
  </for>
 </ul>
</template>
```



***Tag for each with index***

eg.
``` xml
<template>
 <ul>
  <for each="item,$index in this.itens">
   <li>${$index} - ${item.name}</li>
  </for>
 </ul>
</template>
```



***import other module***

eg.
``` html
<template>
    <require from="./example/hello-world"></require>
    <div>
      <h1>My First APP with ${this.title}</h1>
      <hello-world name="C-3PO"></hello-world>   
    </div>
</template>
```



***give an alias in module import statement*** 

eg.
``` html
<template>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <div>
      <h1>My First APP with ${this.title}</h1>
      <sea-bienvenido name="C-3PO"></sea-bienvenido> 
    </div>  
</template>
```



***import a css file*** 

eg.
``` html
<template>
    <require from="./hello-world.css!"></require>
    <h1>My First APP with ${this.title}</h1>   
</template>
```



***embed a style tag***

eg.
``` html
<template>
    <style>
    .especial-tag{
    	background-color:red;
    }
    </style>
    <h1 class="especial-tag">My First APP with ${this.title}</h1>   
</template>
```



***change the css className*** 

eg.
``` html
<template>
    <style>
    .my-custom-classname{
      background-color:red;
    }
    </style>
    <h3 class="my-custom-classname">My element with a custom className</h3>
</template>
```



***change the css className with expression***

eg.
``` html
<template>
    <style>
    .style1{
      background-color:red;
    }
    .style2{
      background-color:blue;
    }
    .style3{
      background-color:green;
    }
    </style>
    <h3 class="${'my-custom-classname '+this.customStyle}">My element with a custom className by expression</h3>
</template>
```



***set where the content of element must be placed***

eg.
``` xml
<!--hello-world.html-->
<template>    
 <h1>
  <content></content>
 </h1>
</template>
```
Bellow is as "hello-world.html" will be used.

eg.
``` xml
<template>    
    <require from="./example/hello-world"></require>
    <div>
      <hello-world>
            Good night!
      </hello-world> 
    </div>  
</template>
```



***import other library/script***

eg.
``` html
<template>
  <require from="moment" type="script"></require>
  <span>${moment().format('DD/MM/YYYY')}</span>
</template>
```



***import other ui library as a namespace***

eg.
``` xml
<template>
  <require from="ui-vendor as ui" type="namespace"></require>	
  <div>
    <span>using a ui library</span>
    <ui:progress-bar></ui:progress-bar>
  </div>
</template>
```



***preserve a element instance***

eg.
``` xml
<template>
  <require from="./test-comp"></require>
  <div>
    <test-comp key:id="key_unique"></test-comp>
  </div>
</template>
```



***associete a controller method to DOM event***

eg.
``` xml
<template>
  <button click.trigger="this.showName">show my name!</button>
</template>
```



***associete a controller method to DOM event with extra paramaters.

eg.
``` xml
<template>
  <button click.trigger="this.showName('test')">show my name!</button>
</template>
```



***to access a camelCase method or attribute from template (use slashes '-')***

eg.
``` xml
<template>
  <require from="./test-comp"></require>
  <div>
    <test-comp full-name="test"></test-comp>
  </div>
</template>
```



***associete a controller method to a custom element event***

eg.
``` xml
<template>
  <require from="./test-comp"></require>
  <div>
    <test-comp on-change-name.subscribe="this.showName"></test-comp>
  </div>
</template>
```



***composition***

eg.
``` xml
<template>
  <div>
    <compose view:from="path_to_dinamic_module/module_to_loader"></compose>
  </div>
</template>
```



***multiples views to a view-model***

eg.
``` xml
<!--view-one.html-->
<template view-model="./universal-view-model">
  <div>
    <h1>VIEW ONE</h1>
    <span>bla,bla,bla....</span>
  </div>  
</template>
```
``` xml
<!--view-two.html-->
<template view-model="./universal-view-model">
  <div>
    <h3>VIEW TWO</h3>
    <p>lol lol lol</p>
    <img src="logo.png">
  </div>  
</template>
```



***template viewmodel-less***

eg.
``` xml
<template no-view-model="true">
  <h1>NO viewmodel</h1>
</template>
```
