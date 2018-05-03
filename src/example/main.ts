export class Main {

  private id: number = new Date().getTime();
  private title: string = 'default!';
  private foolArray: string[] = ['ops', 'humm', 'interesting'];
  private count: number;
  private childValues: {};
  constructor() {
    this.count = 0;
    this.foolArray = ['ops', 'humm', 'interesting'];
    this.childValues = {
      msg: 'modificado via parente'
      , idMsg: 458
    };
  }
  private showId(): void {
    this.foolArray.forEach((txt: string, inxd: number) => {
      this.foolArray[inxd] = `${txt} ${new Date().getSeconds()} `;
    });
    alert(`NOW with ${this.id} and ${this.title}`);
    this.childValues = {
      msg: 'modificado via parente2'
    };
    (<any>this).refresh();
  }
  private attached(): void {
    //console.log('main attached!');	
    //console.log(`IM attached with ${this.id} and ${this.title} `);
  }
  private showAlert(): void {
    alert('show cara!!!!');
  }

}
/*
 <require from='dist/example/simple-comp as simple-comp-plus'></require>
 <simple-comp-plus each='fool in $this.foolArray' texto='{fool}'>{fool}</simple-comp-plus>
 <simple-comp-plus texto='opa my friend humm'></simple-comp-plus>
 */