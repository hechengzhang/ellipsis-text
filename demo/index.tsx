import React from 'react';
import ReactDOM from 'react-dom';
import './styles.less'

import EllipsisText from '../src/index.tsx';
// import EllipsisText from '../dist/index.js';

const arr = [
  {
    text: '这是一个简短的字符串。',
    lines: 2,
  },
  {
    text: '这是一个有点长的字符串，它是被设计用来测试文本溢出和折行效果的。如果一切正常，你应该能看到文本被折断或者溢出。',
    lines: 2,
  },
  {
    text: '这是一段有些冗长和有些繁琐但并无太多实质性含量的字符串，主要是为了测试字符串在特定条件或特定环境下的显示与布局.',
    lines: 2,
  },
  {
    text: '这是一段有些冗长和有些繁琐但并无太多实质性含量的字符串，主要是为了测试字符串在特定条件或特定环境下的显示与布局.主要是为了测试字符串在特定条件或特定环境下的显示与布局.主要是为了测试字符串在特定条件或特定环境下的显示与布局.',
    lines: 3,
  },
  {
    text: '这是一段有些冗长和有些繁琐但并无太多实质性含量的字符串，主要是为了测试字符串在特定条件或特定环境下的显示与布局.',
    lines: 3,
  },
  {
    text: '这是一段有些冗长和有些繁琐但并无太多实质性含量的字符串，主要是为了测试字符串在特定条件或特定环境下的显示与布局.主要是为了测试字符串在特定条件或特定环境下的显示与布局.主要是为了测试字符串在特定条件或特定环境下的显示与布局.',
    lines: 4,
  },
]

const App = () => {
  return (
    <div className="container">
      {arr.map((item, index) => {
        return (
          <div key={item.text + index} className="text-item">{EllipsisText({ text: item.text, lines: item.lines, lineHeight: 20 })}</div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));