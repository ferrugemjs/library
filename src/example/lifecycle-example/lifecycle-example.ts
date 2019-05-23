export class LifecycleExample {
  private logs: { stage: string, value: string }[] = [];

  constructor(props:{}) {
    console.log('constructor:lifecycle-example', props);
    this.logs.push({
      stage: 'constructor',
      value: '--pre init--'
    });

  }

  private attached(element:HTMLDivElement) {
    element.style.backgroundColor = "#222";
    console.log('attached:lifecycle-example',element);
    this.logs.push({
      stage: 'attached',
      value: '--attached--'
    });
  }
  private detached(){
    console.warn('detached:lifecycle-example,i die!!!!');
  }
}