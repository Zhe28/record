---
title: 4.10 立即执行的 watch 函数和回调时机
---

# 立即执行的 watch 函数和回调时机

```typescript
type watch = (getter: () => any, proxyobj: Proxy, options: { "flush" }) => void
```
在 watch 的基础上添加的一些功能，在建立 watch 时，立即执行一次回调函数。 

立即调用和变动之后调用都是一样的，其实也就是在把 scheduler 部分提前调用达到效果。

需要添加一个参数 options 来区分是否是普通的 watch 

```typescript
function watch(source, cb, options) {
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") { // [!code ++]
        Promise.resolve().then(job); // [!code ++]
      } else {// [!code ++]
        job();
      }// [!code ++]
    }
  });
}

```