#FerrugemJS
![Ferrugem Logo](/assets/img/ferrugemjs.png) 
###A simple library, reactive, conventional and non-intrusive!
**FerrugemJS** is inspired by the [Aurelia](http://aurelia.io/) and [React](https://facebook.github.io/react/) using [Incremental DOM](http://google.github.io/incremental-dom/) with [superviewjs](https://github.com/davidjamesstone/superviews.js) as template engine.

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
class MyBasicApp{
    constructor(){
      this.title = "ferrugemjs";
    }
}
export default MyBasicApp;
```
Yes, its simple class using only "javascript 2015", without any interference from the library.

###simple
your app.html file.
```
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
</template>
```

###reactive
```
class MyBasicApp{
    constructor(){
      this.title = "ferrugemjs";
    }
    attached(){
      setTimeout(()=>{
        this.title = "change by a settimeout";
        //a reactive update after a time
        this.refresh();//using the "refresh" method, the only injectable method by the library.
      },4000);
    }
}
export default MyBasicApp;
```

###importing other modules
create your second module in file "hello-world.js"

```
class HelloWorld{
  constructor(){
    this.name = "";
  }
  //by convention as the "name" attribute is modified the method to "on" + "attribute name" + "Changed" is called.
  onNameChanged(new_name,old_name){
    this.refresh();
  }
  showMyName(){
    alert(`my name is ${this.name}`);
  }
}
export default HelloWorld;
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
    <require from="hello-world"></require>
    <hello-world name="C-3PO"></hello-world>   
</template>
```
you can also give an alias for your module. 

```
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
    <require from="hello-world as sea-bienvenido"></require>
    <sea-bienvenido name="C-3PO"></sea-bienvenido>   
</template>
```

###accessing a controller method.

```
<template args="$controller">
    <h1>My First APP with {$controller.title}</h1>
    <require from="hello-world"></require>
    <hello-world name="C-3PO"></hello-world>
    <button click.trigger="$controller.showName()">show my name!</button>
</template>
```

###module lifecycle

#####constructor:
The natural way in which the object is created in javascript.
#####attached:
By implementing the method your module will be prompted for it once the html is in "DOM".
#####on+attribute name+Changed:
By implementing the method with the module attribute in CamelCase format your module will be notified when there is any change to the way template attribute





