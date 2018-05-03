export function ConstView () {
  this.desc = 'default desc';
  this.changeDesc = () => {
    this.desc = 'changed desc';
    this.refresh();
  };
}