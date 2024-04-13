type effectFn = {
  (): any;
  options?: options;
  deps?: Set<effectFn>[] | [];
};

type options = {
  scheduler?: (fn: effectFn) => any;
};

function effect(fn: Function, options: options): any {
  const effectFn: effectFn = () => {
    // ...
  };
  effectFn.options = options;
  effectFn.deps = [];
  effectFn();
}

function trigger() {
  // ...
  new Set(effectFns).forEach((effectFn) => {
    // avoid maximum call stack size exceeded
    if (effectFn !== activeEffect) {
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
      } else effectFn();
    }
  });
}
