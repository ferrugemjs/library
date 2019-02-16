export class SimpleComp {
  private text = 'text default';
  private id = '';
  private cound = 1;
  constructor({id}:any){
    console.log('c-props:',id);
    this.id = `my provide id ${id}`;
    this.cound++;
  }
  private attached(): void {
    //console.log(`on attached: my texto is: ${this.text} `);
  }
  private setText(text: string): void {
    //console.log('ops',this);
    this.text = text;
    this.cound++;
  }
  private detached() {
    //console.log('out of dom!!!')
  }
}