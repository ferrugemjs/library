export class Main{
	
    private id:number=new Date().getTime();
    private title:string="default!";

    private foolArray:string[] = ['ops','humm','interesting'];
    constructor(){
        this.foolArray = ['ops','humm','interesting'];
    }
    private showId():void{
        /*
        this.foolArray.forEach((txt:string,inxd:number)=>{
            this.foolArray[inxd] = txt+" "+ new Date().getSeconds()+ " ";
        });
    	alert(`NOW with ${this.id} and ${this.title}`);
        */
        alert(`NOW with ${this.id} and ${this.title}`);
    	(<any>this).refresh();
    }
    private attached():void{
    	
    	//console.log(`IM attached with ${this.id} and ${this.title} `);
    }

}