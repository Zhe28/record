# `CSS` 中的 `BFC`

> reference: https://www.bilibili.com/video/BV1aZ4y1M7gW

> reference: https://juejin.cn/post/6844903496970420237

## 定义

`BFC`( `Block formatting context` )直译为"块级格式化上下文"。它是一个独立的渲染区域，只有 `Block-level box` 参与，它规定了内部的 ` Block-level Box` 如何布局，并且与这个区域外部毫不相干。

## CSS 三种布局方式

1. 普通流布局

   此布局就普通的布局, 内联盒子随着文档横向排列, 到最后的时候继续下一行开头排列, 重复这种排列. 块级盒子单独占用一行, 往下进行排列.

2. 浮动布局

   由浮动方式决定了盒子是怎么样排列

3. 绝对定位

   元素回整体脱离普通流 , 不会对其他兄弟造成影响

BFC盒子就属于是 `普通流`

## `BFC` 介绍

`BFC` 盒子可以看作是一个独立的元素, 里面的元素不会被外面的元素影响.

## 触发 `BFC`

1. 根元素 (<htm\/>)
2. 浮动元素 (元素的 float 不是 none)
3. 绝对定位元素 (元素的 position 为 absolute 或 fixed)
4. display 为 inline-block、table-cell、table-caption、table、table-row、table-row-group.table-header-group、table-footer-group、inline-table、flow-rootflex 或 inline-flex、grid 或 inline-grid
5. overflow 值不为 visible 的块元素
6. contain 值为 layout、content 或 paint 的元素
7. 多列容器 (元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1)

## `BFC` 功能

### 1. 避免外边距重叠

这是初始的形状

<div>
  <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:lightblue;"> </div>
  <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:lightcoral;"> </div>
</div>

这是之后的形状

<div>
<div style="overflow: hidden"> 
    <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:lightblue;"> </div>
</div>

<div style="overflow: hidden">
    <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:lightcoral;"> </div>
</div>
</div>

```html-vue
代码如下
<div>
  <div style="overflow: hidden">//[!code ++]
    <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:blue;"></div>
  </div>//[!code ++]
  <div style="overflow: hidden">  //[!code ++]
    <div class="test" style="height: 20px;width: 40px;margin: 20px;background-color:lightcoral;"></div>
  </div>//[!code ++]
</div>
```

可以很明显看到, 两者之间的外边距折叠被打开了

### 2. 清除浮动

<div style="border: 1px black solid"> 
    <div style="height: 20px;width: 40px;margin: 20px;background-color:lightblue;float: left"> </div>
</div>

TIP: 此时浮动, 父元素高度被抵消了. 因为浮动已经脱离了文档流. 所以父元素不指定高度此刻就已经没高度了. 只有设定的 `border` 高度

<div style="border: 1px black solid; overflow: hidden"> 
    <div style="height: 20px;width: 40px;margin: 20px;background-color:lightblue;float: left"> </div>
</div>

此时父元素设定了 `overflow: hidden` 达到了 `BFC` 条件 . 所以, 浮动元素的高度也参与了计算

```html-vue
<div style="border: 1px black solid"> //[!code --]
<div style="border: 1px black solid; overflow: hidden"> //[!code ++]
      <div style="height: 20px;width: 40px;margin: 20px;background-color:lightblue;float: left"></div>
</div>
```

### 3. 防止上层元素覆盖

有这样的显示效果

<div > 
   <div style="width: 40px; height: 40px; background-color:lightblue; float: left"> </div>
   <div style="width: 80px; height: 80px; background-color:lightcoral;"> </div>
</div>

在效果图下可以很清楚看到, 蓝色的盒子已经脱离了文档流, 浮动到了左上方.

<div > 
   <div style="width: 40px; height: 40px; background-color:lightblue; float: left"> </div>
   <div style="width: 80px; height: 80px; background-color:lightcoral;overflow: hidden"> </div>
</div>

```html-vue
<div >
   <div style="width: 40px; height: 40px; background-color:lightblue; float: left"> </div>
   <div style="width: 80px; height: 80px; background-color:lightcoral;"> </div> //[!code --]
   <div style="width: 80px; height: 80px; background-color:lightcoral;overflow: hidden"> </div> // [!code ++]
</div>
```

在添加 `overflow:hidden` 之后, 已经浮动的盒子已经脱离了元素的左上方, 开始排列在红色盒子左边.所以说 `BFC` 的区域不会与 `float box` 重叠
