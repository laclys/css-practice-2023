Ref: 掘金- CSS 技术揭秘与实战通关 Note

### 社区好用的 clip-path 工具:

- https://bennettfeely.com/clippy/

- https://codepen.io/stoumann/pen/abZxoOM

### clip-path 局限性：

使用 clip-path 生成图形的非常大一个问题在于，它无法作用完整的边框

### 利用阴影实现任意图片的转换

使用阴影 `box-shadow` 可以实现自我复制
`box-shadow` 具有多重性，也就是不论层数有多少都可以。
因此，理论上任何一张图片的每个像素点都可以用一个 1px\*1px 的 box-shadow 来表示

我们可以借助 `Canvas` 提供的 `CanvasRenderingContext2D.getImageData `方法，
它可以获取图片的每个像素点的 RGBA 值。
因此，将一张图片转换为完全由 `box-shadow` 表示的图片是完全可行的

- demo: http://chokcoco.github.io/demo/img2div/html/

### 滤镜 filter

- 通过 CSS 的 filter 属性，使用滤镜；
- 通过 CSS 的 backdrop-filter 属性，使用滤镜；
- 通过 CSS filter 属性中的 url() 值，引入由 SVG 实现的特殊滤镜效果。

```css
 {
  // 模糊滤镜
  filter: blur(5px);
  // 明亮度滤镜
  filter: brightness(0.4);
  // 对比度滤镜
  filter: contrast(200%);
  // 阴影滤镜
  filter: drop-shadow(16px 16px 20px blue);
  // 灰度滤镜
  filter: grayscale(50%);
  // 色相旋转滤镜
  filter: hue-rotate(90deg);
  // 反转滤镜
  filter: invert(75%);
  // 不透明度滤镜
  filter: opacity(25%);
  // 饱和度滤镜
  filter: saturate(30%);
  // 褐色滤镜
  filter: sepia(60%);

  /* 滤镜可以叠加 */
  filter: contrast(175%) brightness(3%);
}
```

### filter 与 backdrop-filter 的异同

- filter：模糊滤镜的作用是将模糊或颜色偏移等图形效果作用于元素之上。
- backdrop-filter：该属性可以在元素后方区域，添加上模糊或颜色偏移等图形效果。
- backdrop-filter 的生效范围是元素背后的所有内容，因此，为了能够看到效果，元素或其背景至少要保持部分透明(这个区域是可以移动的)。

!的作用元素上的差异!

### filter 与 backdrop-filter 问题

- 作用了 filter 和 backdrop-filter 的元素会导致 3D 效果失效
- 用了 filter 和 backdrop-filter 的元素会使内部的 fixed 定位失效

### drop-shadow 与 box-shadow 的异同

- box-shadow 属性在元素的整个框后面创建一个矩形阴影；
- drop-shadow() 滤镜用于创建一个符合元素（图像）本身形状（alpha 通道）的阴影
- box-shadow 有内阴影，内阴影使用关键字 inset 进行描述，而 drop-shadow 是没有内阴影的；
- box-shadow 多一个阴影扩散半径参数，drop-shadow 是没有阴影扩散半径参数的。

- 设置了 drop-shadow() 的元素，它不单单是针对自身元素，还会向下寻找所有子元素的形状（alpha 通道），对其设置阴影
- box-shadow 只作用于自身

### inset

`inset`属性用作定位元素的 top、right、bottom、left 这些属性的简写。类似于 margin 和 padding 属性，依照“上右下左”的顺序

```css
inset: 0;
/* 等同于 `top: 0; right: 0; bottom: 0; left: 0;` */
inset: 1px 2px;
/* 等同于 `top: 1px; right: 2px; bottom: 1px; left: 2px;` */
inset: 1px 2px 3px;
/* 等同于 `top: 1px; right: 2px; bottom: 3px; left: 2px;` */
inset: 1px 2px 3px 4px;
/* 等同于 `top: 1px; right: 2px; bottom: 3px; left: 4px;` */
```

inset 属性只作用于定位元素。Internet Explorer 浏览器上不支持该属性！！！

### filter: opacity 与 opacity

用法一致

```css
div {
  filter: opacity(35%);
}
// OR
div {
  opacity: 0.35;
}
```

- filter 滤镜会导致 3D 失效和 position: fixed 定位失效，这个属于所有滤镜的特性。opacity 则不会
- 使用 filter: opacity 能够更好地获得浏览器提供的硬件加速支持，也就是获得更好的性能。
  从层叠上下文和包含块的角度而言，filter: opacity 和 opacity 都会生成一个新的层叠上下文，
  但是只有 filter: opacity 会生成包含块（Containing Block）。当然，对于现代浏览器，
  这两者的性能差异，几乎可以忽略。

### 混合模式

- mix-blend-mode
- background-blend-mode

混合模式用于创建两个或多个元素之间互相混合的效果。可以将混合模式应用于元素、背景图片和边框等任何元素。

什么时候使用混合模式: 元素/图片，在色彩方面遇到了一些问题（与色彩打交道），
譬如透明遮罩、颜色翻转、反相、变暗、重叠展示等场景，就应该想到，可能可以利用混合模式来解决问题！

- 混合模式也会导致 3D 效果失效!!!

混合模式的核心就是：描述当元素重叠时，颜色应当如何呈现。

### 没有伪元素的元素

诸如 `<img>` 、 `<input>`、 `<iframe>`，这几个标签是不支持类似 input::before 这种使用方式的

当 img 元素的 src 地址能够正常指向一个图片资源的时候， `<img>` 的 ::before 和 ::after 确实是不会生效的。
但是，如果 src 指向的是一个错误的地址，也就是图片无法正常被解析替换，在这种特殊的情况下，
大部分现代浏览器是支持这种状态下的元素能够有自己的伪元素 ::before 和 ::after 的

### CSS 过渡

- 可以通过关键字 all 给所有属性设置过渡；
- transition 支持多个属性的精细化控制；
- 过渡效果支持延迟加载；（https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties）
  transition-duration 0 与非 0 切换的效果可以变相实现画板，刮刮乐效果 `background 99999999s`）
  (当我们的鼠标想去到菜单界面的时候，由于我们的鼠标离开了按钮区域，导致出现了的菜单又消失不见,可以加加入 transition-duration)
- 并非所有元素都是支持过渡动画的。

### animation

- 必须项：animation-name、animation-duration 和 @keyframes 规则。
- 非必须项：animation-delay、animation-direction、animation-iteration-count、animation-play-state、animation-timing-function、animation-fill-mode、animation-composition，当然不是说它们不重要，只是不设置时，它们都有默认值。

- animation-delay 的值可以为负值

```
animation-timing-function: ease; // 动画以低速开始，然后加快，在结束前变慢
animation-timing-function: ease-in; // 动画以低速开始
animation-timing-function: ease-out; // 动画以低速结束
animation-timing-function: ease-in-out; // 动画以低速开始和结束
animation-timing-function: linear; // 匀速，动画从头到尾的速度是相同的
```

### CSS 自定义属性的传值方式

- 通过 CSS 代码进行 CSS 变量值的传递；
- 通过元素的 style 属性进行 CSS 变量值的传递；
- 通过 JavaScript 改写 style 属性进行 CSS 变量值的传递

!!!calc 的没有字符串拼接的能力!!!!

### CSS @property

- syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型。
- inherits：是否允许继承。
- initial-value：初始值。

@property 规则中的 `syntax` 和 `inherits` 描述符是必需的

syntax 支持字段：

```
length
number
percentage
length-percentage
color
image
url
integer
angle
time
resolution
transform-list
transform-function
custom-ident (a custom identifier string)

```

### CSS 自定义属性的作用及意义

- 代码更加符合 DRY（Don‘t repeat yourself）原则，精简代码，减少冗余
- CSS @property 解决了大量过往无法实现动画/过渡的交互场景。
- 方便地从 JS 中读/写，统一修改，增强了 JavaScript 与 CSS 的联系。
