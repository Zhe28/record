type options = {
  scheduler?: (fn: effectFn) => any;
  lazy?: boolean;
};

function computed(getter: () => any) {
  /**
   * @type {any} 缓存的数值
   */
  let value: any;
  /**
   * @type {boolean} 脏值
   */
  let dirty: boolean = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      // 副作用函数重新执行后dirty值变脏
      dirty = true;
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        // 重新获取值，dirty取消脏值
        dirty = false;
        value = effectFn();
      }

      return value;
    },
  };

  return obj;
}
