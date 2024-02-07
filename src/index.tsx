import * as React from "react"

const { useEffect, useRef, useState } = React

interface EllipsisProps {
  text: string;
  lines: number;
  lineHeight?: number;
}

/**
 * 判断浏览器是否支持 -webkit-box
 * @returns Boolean
 */
const isSupportWebkitBox = () => {
  // 创建一个元素
  const testElement = document.createElement('div');

  // 尝试设置其 display 为 -webkit-box
  testElement.style.display = '-webkit-box';

  // 判断浏览器是否保持这个值
  const isSupport = testElement.style.display === '-webkit-box';
  
  testElement.parentNode?.removeChild(testElement);

  return false
  // return isSupport
}

/**
 * 判断数字是否为正整数，同时不为无穷大
 * @param value 判断目标
 * @returns Boolean
 */
function isPositiveFiniteInteger(value: number) {
  return Number.isInteger(value) && value > 0 && value < Infinity;
}

const EllipsisText: React.FC<EllipsisProps> = ({ text, lines, lineHeight }) => {
  const ref = useRef(null)
  const textRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  useEffect(() => {
    if (ref.current && textRef.current) {
      const dom = ref.current as HTMLElement
      const textDom = textRef.current as HTMLElement
      let elementHeight = dom.clientHeight; 
      
      if (lineHeight) {
        setContentHeight(lineHeight * (lines - 1))
        setShowPlaceholder(elementHeight < textDom.clientHeight)
        return
      }
      
      const style = window.getComputedStyle(dom);
      let fontHeight: string | number = style.lineHeight; // 获取元素的 line-height
      // 如果 line-height 是 normal，则需要转化为数字
      if (fontHeight === "normal") {
        const fontSize = parseFloat(style.fontSize); // 获取元素的 font-size
        fontHeight = fontSize * 1.2; // 这里我们假设 normal 为 1.2 times of font-size
      } else {
        fontHeight = parseFloat(fontHeight);
      }

      const height = elementHeight - fontHeight;

      dom.style.height = `${fontHeight * lines}px`

      setContentHeight(height)
      
      setShowPlaceholder(elementHeight < textDom.clientHeight)
    }
  }, [ref.current, textRef.current])

  if (!isPositiveFiniteInteger(lines)) {
    throw Error('lines 必须为非无穷大的正整数')
  }
  
  // 判断浏览器是否支持 -webkit-box
  const isSupport = isSupportWebkitBox()

  if (isSupport) {
    const styles: any = {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical'
    };

    return <span style={styles}>{text}</span>;
  }

  return (
    <div ref={ref} style={{ height: lineHeight? lineHeight * lines : '100%', overflow: "hidden" }}>
      { showPlaceholder && (
        <>
          <div style={{ height: contentHeight }}></div>
          <span style={{ float: "right", marginRight: '10px', userSelect: "none" }}>...</span>
        </>
      )}
      <div ref={textRef} style={{ marginTop: showPlaceholder? `-${contentHeight}px` : undefined }}>{text}</div>
    </div>
  )
};

export default EllipsisText;