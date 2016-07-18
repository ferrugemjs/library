export class Main{
	
    private id:number=new Date().getTime();
    private title:string="default!";

    private foolArray:string[] = ['ops','humm','interesting'];
    constructor(){

    }
    private showId():void{
    	alert(`NOW with ${this.id} and ${this.title}`);
    	(<any>this).refresh();
    }
    private attached():void{
    	
    	//console.log(`IM attached with ${this.id} and ${this.title} `);
    }

}