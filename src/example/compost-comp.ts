export class CompostComp {
  private especialname: string;
  private calculado: number;
  private onEventMsg1: { a: string } = { a: 'sei nao cabra' };
  private myfnext: Function;
  private onEventMsg: { a: Function };
  private id: number;
  private refresh: Function;
  private msg: string;
  private composeHidden: boolean;
  constructor() {
    this.especialname = 'humm-default';
    this.onEventMsg = {
      a: (fnext: Function) => {
        //fnext();
        this.myfnext = fnext;
      }
    };
    this.id = 2010;
    this.msg = 'ainda nao alterado';
    this.composeHidden = false;
  }
  private setEspecialname2(n: string): void {
    //console.log(n);
  }
  private attached(): void {
    //console.log(this.onEventMsg);
    //console.log(this);
  }
  private hideCompose() {
    this.composeHidden = !this.composeHidden;
    this.refresh();
  }
  private detached(): void {
    //console.log('compost-comp out of dom!');
    this.myfnext = null;
  }
  private triggerFn(): void {
    if (this.myfnext) {
      this.especialname += `-${new Date().getTime()}`;
      this.myfnext();
      this.refresh();
    }
  }
  private getNewId(): void {
    let nid = new Date().getSeconds();
    //console.log(this.id, nid, this['id33']);
    this.id = nid;
    this.refresh({ version: this.id++ });
  }
}
