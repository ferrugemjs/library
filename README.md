#FerrugemJS
![Ferrugem Logo](/assets/img/ferrugemjs.png) 
###A simple library, reactive, conventional and non-intrusive!
**FerrugemJS** is inspired by the [Aurelia](http://aurelia.io/) and [React](https://facebook.github.io/react/) using [Incremental DOM](http://google.github.io/incremental-dom/) with [superviewjs](https://github.com/davidjamesstone/superviews.js) as template language.

[![NPM](https://nodei.co/npm/ferrugemjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ferrugemjs/)


![Browsers Support](/assets/img/browsers.png)

Chrome 40+, Firefox 47+, Safari, Opera , IE9+

#####install
jspm install npm:ferrugemjs

####search for a starter project ?
clone
[skeleton-typescript](https://github.com/ferrugemjs/skeleton-typescript)
or
[skeleton-es2015](https://github.com/ferrugemjs/skeleton-es2015)

#####how start
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
<div app="other_path/other_init_app_file"></div>
```

###non-intrusive
your app.js file.
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
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
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

###importing other modules
create your second module in file "hello-world.js"

```
export class HelloWorld{
  private name:string;	
  constructor(){
    this.name = "";
  }
  //by convention as the "name" attribute is modified the method "set" + "attribute name" is called.
  setName(new_name:string):void{
    this.name = new_name;
    this.refresh();
  }
  showName():void{
    alert(`my name is ${this.name}`);
  }
  attached():void{
	this.name = "changed after attached event";
	//a reactive update after attached event
	//using the "refresh" method, the only injectable method by the library.
	this.refresh();
  }
}
```

create your second html module in file "hello-world.html"

```
<template args="$controller">
  <h2>Hello World, {$controller.name}</h2>
</template>
```

import the hello-word modulo into your app.html

```
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
    <require from="base_app/example/hello-world"></require>
    <hello-world name="C-3PO"></hello-world>   
</template>
```
you can also give an alias for your module. 

```
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
    <require from="base_app/example/hello-world as sea-bienvenido"></require>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>

```

###accessing a controller method.

```
<template args="$controller">
  <h2>Hello World, {$controller.name}</h2>
  <button click.trigger="$controller.showName()">show my name!</button>
</template>
```

###module lifecycle

#####constructor:
The natural way in which the object is created in javascript.
#####attached:
By implementing the method your module will be prompted for it once the html is in "DOM".
#####set+attribute name:
By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute





