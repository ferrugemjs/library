export class Main{
	
    private id:number=new Date().getTime();
    private title:string="default!";
    private foolArray:string[] = ['ops','humm','interesting'];
    private count:number;
    constructor(){
        this.count=0;
        this.foolArray = ['ops','humm','interesting'];
    }
    private showId():void{        
        this.foolArray.forEach((txt:string,inxd:number)=>{
            this.foolArray[inxd] = txt+" "+ new Date().getSeconds()+ " ";
        });
        alert(`NOW with ${this.id} and ${this.title}`);
    	(<any>this).refresh();
    }
    private attached():void{    
        console.log('main attached!');	
    	//console.log(`IM attached with ${this.id} and ${this.title} `);
    }
    private showAlert():void{
        alert('show cara!!!!');        
    }

}
/*
 <require from="dist/example/simple-comp as simple-comp-plus"></require>
 <simple-comp-plus each="fool in $this.foolArray" texto="{fool}">{fool}</simple-comp-plus>
 <simple-comp-plus texto="opa my friend humm"></simple-comp-plus>
 */