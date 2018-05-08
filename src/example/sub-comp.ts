export interface ISubComp {
  name?: string;
  born?: Date;
}
export class SubComp implements ISubComp {
  public name: string;
  private nameComp: string;
  private options: string[];
  //private visible:boolean;
  public born: Date;
  private refresh: Function;
  constructor() {
    this.name = 'my name';
    this.nameComp = 'my father name';
    this.options = ['vade', 'sitt', 'x9'];
    //this.visible = false;
    this.born = new Date();
  }
  private setName2(_new: string): void {
    //console.log(`${this.name} , ${this.name} --> ${_new}`);
  }
  private setVisible(on: boolean) {
    //this.visible = !on;
    this.refresh({ 'hummmm': 123465 });
  }
  private detached(): void {
    //console.log('compose out of dom!');
  }
  private attached(): void {
    //console.log('compose can be attached');
  }
  private shouldUpdate(new_props: ISubComp = {}): boolean {
    return this.name !== new_props.name;
  }
}