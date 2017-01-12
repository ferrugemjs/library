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

#####install
jspm install npm:ferrugemjs

#####how to start:
clone
[skeleton-typescript](https://github.com/ferrugemjs/skeleton-typescript)

####initialization

index.html file

```
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
```
<div app="other_path/init_app_file"></div>
```
####modules,custom tag
To create a module witch will be a custom tag do you need two files, ex: "module-a.ts" and "module-a.html".
By convention FerrugemJS know that "module-a.ts" is a controller file and "module-a.html" is the view of it and you can easily import it into your main app html file or into other module and use as a component with a custom tag.

ex: 
"app.ts" file.
```
export class MyBasicApp{
    private title:string;
    constructor(){
      this.title = "ferrugemjs";
    }
}
```
Yes, its a simple class using only "typescript" or "javascript 2015", without any interference from the library.

"app.html" file.
```
<template>
    <h1>My First APP with ${this.title}</h1>
</template>
```

###module lifecycle

*attached:
By implementing the method your module will be prompted for it once the html is in "DOM".

*detached:
By implementing the method your module will be prompted for it once your object is detached from "DOM".

*set+attribute name:
By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute

###one-way data binding

When you set the "value.bind" in a input component it will change the "name" attribute in controller when the user change its value.

```
<template>
  <h2>Hello World, ${this.name}</h2>
  <input value.bind="this.name"/>
</template>
```

###manual reactivity
```
export class HelloWorld{
  private name:string;	
  constructor(){
    this.name = "";
  }
  anyMethod():void{	
	//a reactive update after 'anyMethod' is calling
	this.refresh();
  }
}
```


###template stuffs

if,elseif,else

```
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

```
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

```
<template>
    <require from="./example/hello-world"></require>
    <h1>My First APP with ${this.title}</h1>
    <hello-world name="C-3PO"></hello-world>   
</template>
```
give an alias in module import statement. 

```
<template>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <h1>My First APP with ${this.title}</h1>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>

```

import a css file. 

```
<template>
    <require from="./hello-world.css!"></require>
    <require from="./example/hello-world as sea-bienvenido"></require>
    <h1>My First APP with ${this.title}</h1>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>

```
embed a style tag. 

```
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

change the the css className 

```
<template class="my-custom-classname">
    <style>
    .my-custom-classname{
      background-color:red;
    }
    </style>
    <h3>My element with a custom className</h3>
</template>

```

how to access a controller method.

```
<template>
  <button click.trigger="showName">show my name!</button>
</template>
```
