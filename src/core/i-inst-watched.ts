export interface IInstWatched {
  inst?: {
    beforeAttached?: Function;
    attached: Function;
    afterDetached?: Function;
    detached?: Function;
    shouldUpdate?: (prop: {}) => boolean;
    attributeChanged?: (attrName: string, oldVal: any, newVal: string) => void;
    _$key$_: string;
    _$unsubs$_?: {unsubscribeAll: Function}[];
    render: Function;
    _capture$KeyId?: () => string;
  };
  tag: string;
  alias: string;
  target?: string;
  hostVars?: {};
  staticVars?: {};
  extStaticVars?: string[];
  extHostVars?: string;
  loaded?: boolean;
  content?: Function;
}
