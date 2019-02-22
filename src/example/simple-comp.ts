export class SimpleComp {
  private text = 'text default';
  private id = '';
  private cound = 1;
  constructor({id}:any){
    console.log('c-props:',id);
    this.id = `my provide id ${id}`;
    this.cound++;
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