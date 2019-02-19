export interface IInstWatched {
  inst?: {
    attached?: Function;
    detached?: Function;
    afterDetached?: Function;
    shouldUpdate?: (prop: {}) => boolean;
    $content?: Function;
    $render?: Function;
    _$unsubs$_: {unsubscribeAll:Function}[];
  };
  $loaded?: boolean;
  $is?: string;
  $propsAfterAttached: {};
}
