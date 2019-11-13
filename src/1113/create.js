const ATTR_KEY = '__preprops_';
// 创建dom元素
export function createElement(vdom) {
    // 如果vdom是字符串或者数字类型，则创建文本节点，比如“Hello World”
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    console.log(vdom)
    const {tag, props, children} = vdom;

    // 1. 创建元素
    const element = document.createElement(tag);

    // 2. 属性赋值
    setProps(element, props);

    // 3. 创建子元素
    children.map(createElement)
            .forEach(element.appendChild.bind(element));

    return element;
}

// 属性赋值
function setProps(element, props) {
     // 属性赋值
    element[ATTR_KEY] = props;

    for (let key in props) {
        // on开头的属性当作事件处理
        if (key.substring(0, 2) == 'on') {
            const evtName = key.substring(2).toLowerCase();
            element.addEventListener(evtName, evtProxy);
            (element._evtListeners || (element._evtListeners = {}))[evtName] = props[key];
        } else {
            element.setAttribute(key, props[key]);
        }
    }
}

function evtProxy(evt) {
    this._evtListeners[evt.type](evt);
}
