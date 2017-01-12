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


####Do it yourself and see why FerrugemJS is a simple, reactive, conventional and non-intrusive library.

in your index.html file

```
  <body>    
    <div app></div>
    <script>
      System.import("ferrugemjs");
    </script>
  </body>
```

###conventional
FerrugemJS will look for the first page element with the attribute "app" to start the application and if not found it, will use the tag "body".
Just create app.js files and app.html in the same directory of the index.html page.
If you want to modify the path of the file app.js just add this information to the app attribute as below:
```
<div app="other_path/init_app_file"></div>
```

###non-intrusive
your app.ts file.
```
export class MyBasicApp{
    private title:string;
    constructor(){
      this.title = "ferrugemjs";
    }
}
```
Yes, its simple class using only "typescript" or "javascript 2015", without any interference from the library.

###simple
your app.html file.
```
<template>
    <h1>My First APP with ${this.title}</h1>
</template>
```

###reactive
```
export class HelloWorld{
  private name:string;	
  constructor(){
    this.name = "";
  }
  attached():void{
	this.name = "changed after attached event";
	//a reactive update after attached event
	//using the "refresh" method, the only injectable method by the library.
	this.refresh();
  }
}
```

###module lifecycle

*attached:
By implementing the method your module will be prompted for it once the html is in "DOM".

*detached:
By implementing the method your module will be prompted for it once your object is detached from "DOM".

*set+attribute name:
By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute

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
  <h2>Hello World, ${this.name}</h2>
  <button click.trigger="showName">show my name!</button>
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
