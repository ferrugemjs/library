export default {
  'desc': 'default desc'
  , teste() {
    //this.desc = 'changed desc';
    this.refresh();
  }
  , attached() {
    this.desc = 'changed by connected!';
    //console.log('evt:connected!');
  }
};