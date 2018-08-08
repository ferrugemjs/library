export class ComposeExample {
  private toogleShow: boolean;
  private refresh: Function;
  private example2:{init:(fn:Function) => void};
  constructor(){
    this.example2 = {init: fn => {
      console.log(typeof fn);
    }};
  }
  private toogle() {
    this.toogleShow = !this.toogleShow;
    this.refresh();
  }

}