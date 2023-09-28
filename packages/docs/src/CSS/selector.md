---
title: CSS选择器
---

## 伪类

## 伪元素(Pseudo-elements)

伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。

::: tip 备注

一个选择器中只能使用一个伪元素。伪元素必须紧跟在语句中的简单选择器/基础选择器之后。

**注意:** 按照规范，应该使用双冒号 ( :: ) 而不是单个冒号 ( : ) ，以便区分伪类和伪元素。

但是，由于旧版本的 W3C 规范并未对此进行特别区分，因此目前绝大多数的浏览器都同时支持使用这两种方式来表示伪元素。:::

::: normal-demo Before 伪元素效果

```html
<div class="container"></div>
<br />点击" ctrl+shift+c "按键查看元素占位大小<br />
如果显示不是相应的结果，请检查屏幕缩放设置。此项会影响CSS效果。
```

```css
.container {
  width: 100px;
  height: 100px;
  background: #ccc;
}
.container::before {
  content: "";
  width: 100px;
  height: 100px;
  /* background:#ccc; */
  border: 1px solid red;
}
```

:::

Before 内容 **宽为 2px，高为 23px**

解释： **before 伪元素默认是行内元素。** 所以 width 以及 height 的属性不会生效。同时 border 的大小为 1px，所以伪元素的宽为 2px，按理说高也为 2px，但是浏览器默认字体大小为 16px，虽然字体大小为 16px，但是字体实际所占的位置的高为 21px，所以伪元素的高为 2+21=23px；行内元素是有默认行高的，就是字体所占的高度。
