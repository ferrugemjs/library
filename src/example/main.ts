export class Main {

  private id: number = new Date().getTime();
  private title: string = 'default!';
  private foolArray: string[] = ['ops', 'humm', 'interesting'];
  private count: number;
  private childValues: {};
  private a = 'a test';
  private z = 369;
  constructor({z}:any) {
    this.z = z;
    this.count = 0;
    this.foolArray = ['ops', 'humm', 'interesting'];
    this.childValues = {
      msg: 'modificado via parente'
      , idMsg: 458
    };
    console.log('main:props', z);
  }
  private showId(idp:string) {
    this.a = `${new Date().getTime()} ${idp}`;
    this.foolArray.forEach((txt: string, inxd: number) => {
      this.foolArray[inxd] = `${txt} ${new Date().getSeconds()} `;
    });
    //alert(`NOW with ${this.id} and ${this.title}`);
    this.childValues = {
      msg: 'modificado via parente2'
    };
    this.count++;
  }
  private attached() {
    //console.log('main attached!');	
    //console.log(`IM attached with ${this.id} and ${this.title} `);
  }
  private showAlert() {
    alert('show cara!!!!');
  }

}