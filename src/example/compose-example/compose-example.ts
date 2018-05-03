export class ComposeExample {
  private toogleShow: boolean;
  private refresh: Function;
  private toogle() {
    this.toogleShow = !this.toogleShow;
    this.refresh();
  }
}