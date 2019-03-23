export interface IInstWatched {
  inst?: {
    attached?: Function;
    detached?: Function;
    afterDetached?: Function;
    propsChanged?: (props: {}) => void;
    $content?: Function;
    $render?: Function;
    _$unsubs$_: {unsubscribeAll:Function}[];
  };
  $loaded?: boolean;
  $is?: string;
  $propsAfterAttached: {};
}
