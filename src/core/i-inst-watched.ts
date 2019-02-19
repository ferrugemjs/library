export interface IInstWatched {
  inst?: {
    attached?: Function;
    detached?: Function;
    shouldUpdate?: (prop: {}) => boolean;
    $content?: Function;
    $render?: Function;
  };
  $loaded?: boolean;
}
