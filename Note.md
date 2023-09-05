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
