import React from 'react';
import { useRef } from 'react';

function TextFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}

export default TextFocusButton;
