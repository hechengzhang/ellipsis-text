# ellipsis-text

用于处理多行文本溢出显示省略号的场景，浏览器支持 `-webkit-box` 的话会优先使用 `css` 处理，不支持时再采用 `js` 方案。

## 使用方式
```tsx
import EllipsisText from 'ellipsis-text';

export default () => {
  const text = '这是一个有点长的字符串，它是被设计用来测试文本溢出和折行效果的。如果一切正常，你应该能看到文本被折断或者溢出。'

  return (
    <div style={{ height: '50px', overflow: 'hidden' }}>
      { EllipsisText({ text, lines: 2 }) }
    </div>
  )
}
```
如果未固定父级的高度并添加 `overflow: hidden` ，在计算时 `dom` 会有一个收起的过程，因为需要先渲染才能计算高度。

如果不想固定父级高度，只想设置 `lines`，那么推荐配置 `lineHeight`，也能解决 `dom` 高度变化的问题。
```jsx
import EllipsisText from 'ellipsis-text';

export default () => {
  const text = '这是一个有点长的字符串，它是被设计用来测试文本溢出和折行效果的。如果一切正常，你应该能看到文本被折断或者溢出。'

  return (
    <div>
      { EllipsisText({ text, lines: 2, lineHeight: 20 }) }
    </div>
  )
}
```
这样无需先渲染再计算 `dom` 高度，通过限制的行数与文本的行高即可得出高度。
