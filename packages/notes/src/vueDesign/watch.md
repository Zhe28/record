---
title: 4.9 watch 的实现原理
---

# 4.9 watch 的实现原理

```typescript
type watch = (getter: () => any, proxyobj: Proxy) => void;
```

watch 就是监听一个响应式的对象，对象变动时执行相对应的函数。

## 内部实现

对于普通响应式对象以及属性，内部遍历节点包装成 getter 。 如果传进来的是 getter 就不必处理了。

然后将 getter 塞入 effect 函数进行包装，打上 `lazy : true , scheduler () { }` 属性。

当属性发生变动时，通过 trigger 然后进入到 scheduler ,执行回调函数内容。

### 代码实现

```typescript
import { effect } from "@vue/reactivity";

export function watch(source: any, cb: any, options?: any): Function {
  // 包装成 getter
  let getter: any;
  getter = () => source;

  const effectFn = effect(getter, {
    lazy: true,
    scheduler(effectFn) {
      cb(newValue, oldValue);
    }
  });
}
```

遍历的函数

```typescript
function traverse(value: any, seen = new Set<any>()) {
  if (!isObject(value) || seen.has(value)) {
    return;
  }
  seen.add(value);
  for (const k in value) {
    traverse(value[k], seen);
  }
  return value;
}
```

## 处理新旧的数值

因为 getter 是被 effect 封装的成 effectFn，打上了 lazy :true 属性。故此，在首次执行前，获得包装好的函数，然后执行，获得旧值。

在数据变动时，重新执行 effectFn 取得新的数值。执行回调函数，最后将新值赋值成旧值。

```typescript
import { effect } from "@vue/reactivity";

export function watch(source: any, cb: any, options?: any): Function {
  // 包装成 getter
  let getter: any;
  getter = () => source;
  let newValue, oldValue;

  const effectFn = effect(getter, {
    lazy: true,
    scheduler(effectFn) {
      newValue = effectFn(); // [!code ++]
      cb(newValue, oldValue);
      oldValue = newValue; // [!code ++]
    }
  });
  // 创建时产生旧的数值    // [!code ++]
  oldValue = effectFn(); // [!code ++]
}
```
