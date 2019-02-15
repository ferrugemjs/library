export class SimpleComp {
  constructor(props:any){
    console.log('props',props);
  }
  private text: string = 'text default';
  private refresh: Function;
  private attached(): void {
    //console.log(`on attached: my texto is: ${this.text} `);
  }
  private setText(text: string): void {
    this.text = text;
    this.refresh();
  }
  private detached() {
    //console.log('out of dom!!!')
  }
}