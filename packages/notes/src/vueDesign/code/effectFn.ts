type effectFn = {
  (): any;
  deps: Set<effectFn>[];
};
