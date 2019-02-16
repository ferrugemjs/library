export interface IInstWatched {
  inst?: {
    attached?: Function;
    detached?: Function;
    shouldUpdate?: (prop: {}) => boolean;
  };
  $loaded?: boolean;
}
