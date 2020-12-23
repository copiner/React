/*
我们推荐 在 context 中向下传递 dispatch 而非在 props 中使用独立的回调。
下面的方法仅仅出于文档完整性考虑，以及作为一条出路在此提及
*/
function Form() {
  const [text, updateText] = useState('');
  // 即便 `text` 变了也会被记住:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <input type="submit" value="SUBMIT" />
    </form>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

export default Form


/*
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // 把它写入 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 读取它
    alert(currentText);
  }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <input type="submit" value="SUBMIT" />
    </form>
  );
}
*/
