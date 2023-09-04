Ref: 掘金- CSS 技术揭秘与实战通关 Note


### 社区好用的 clip-path 工具:

- https://bennettfeely.com/clippy/

- https://codepen.io/stoumann/pen/abZxoOM

### clip-path局限性：

使用 clip-path 生成图形的非常大一个问题在于，它无法作用完整的边框



### 利用阴影实现任意图片的转换

使用阴影 `box-shadow` 可以实现自我复制
`box-shadow` 具有多重性，也就是不论层数有多少都可以。
因此，理论上任何一张图片的每个像素点都可以用一个 1px*1px 的 box-shadow 来表示

我们可以借助 `Canvas` 提供的 `CanvasRenderingContext2D.getImageData `方法，
它可以获取图片的每个像素点的 RGBA 值。
因此，将一张图片转换为完全由 `box-shadow` 表示的图片是完全可行的

- demo: http://chokcoco.github.io/demo/img2div/html/