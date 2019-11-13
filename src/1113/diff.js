import { createElement } from './create';
const ATTR_KEY = '__preprops_';
//最外层的 type 对应的是 DOM 元素的变化类型，有 4 种：新建、删除、替换和更新。
//props 变化的 type 只有2种：更新和删除
const nodePatchTypes = {
    CREATE: 'create node',
    REMOVE: 'remove node',
    REPLACE: 'replace node',
    UPDATE: 'update node'
}

const propPatchTypes = {
    REMOVE: 'remove prop',
    UPDATE: 'update prop'
}

// 比较元素类型是否相同
let isSameType = (element, newVDom) => {

    if (typeof newVDom.tag == 'function') {
       return element._componentConstructor == newVDom.tag;
   }

    const elmType = element.nodeType;
    const vdomType = typeof newVDom;

    // 当dom元素是文本节点的情况
    if (elmType === Node.TEXT_NODE &&
        (vdomType === 'string' || vdomType === 'number') &&
        element.nodeValue == newVDom
    ) {
       return true;
    }

    // 当dom元素是普通节点的情况
    if (elmType === Node.ELEMENT_NODE && element.tagName.toLowerCase() == newVDom.tag) {
        return true;
    }

    return false;
}

// 比较props的变化
// 比较props的变化
let diffProps = (newVDom, element)=> {
    let newProps = {...element[ATTR_KEY]};
    const allProps = {...newProps, ...newVDom.props};

    // 获取新旧所有属性名后，再逐一判断新旧属性值
    Object.keys(allProps).forEach((key) => {
        const oldValue = newProps[key];
        const newValue = newVDom.props[key];

        // on开头的属性当作事件处理
        if (key.substring(0, 2) == 'on') {
            const evtName = key.substring(2).toLowerCase();
            if (newValue) {
                element.addEventListener(evtName, evtProxy);
            } else {
                element.removeEventListener(evtName, evtProxy);
            }
            (element._evtListeners || (element._evtListeners = {}))[evtName] = newValue;
        } else {
            // 删除属性
            if (newValue == undefined) {
                element.removeAttribute(key);
                delete newProps[key];
            }
            // 更新属性
            else if (oldValue == undefined || oldValue !== newValue) {
                element.setAttribute(key, newValue);
                newProps[key] = newValue;
            }
        }
    }
)

    // 属性重新赋值
    element[ATTR_KEY] = newProps;
}

let diffChildren = (newVDom, parent)=>{
    // 有key的子元素
    const nodesWithKey = {};
    let nodesWithKeyCount = 0;

    // 没key的子元素
    const nodesWithoutKey = [];
    let nodesWithoutKeyCount = 0;

    const childNodes = parent.childNodes,
          nodeLength = childNodes.length;

    const vChildren = newVDom.children,
          vLength = vChildren.length;

    // 用于优化没key子元素的数组遍历
    let min = 0;

    // 将子元素分成有key和没key两组
    for (let i = 0; i < nodeLength; i++) {
        const child = childNodes[i],
              props = child[ATTR_KEY];

        if (props !== undefined && props.key !== undefined) {
            nodesWithKey[props.key] = child;
            nodesWithKeyCount++;
        } else {
            nodesWithoutKey[nodesWithoutKeyCount++] = child;
        }
    }

    // 遍历vdom的所有子元素
    for (let i = 0; i < vLength; i++) {
        const vChild = vChildren[i],
              vProps = vChild.props;
        let dom;

        vKey = vProps!== undefined ? vProps.key : undefined;
        // 根据key来查找对应元素
        if (vKey !== undefined) {
            if (nodesWithKeyCount && nodesWithKey[vKey] !== undefined) {
                dom = nodesWithKey[vKey];
                nodesWithKey[vKey] = undefined;
                nodesWithKeyCount--;
            }
        }
        // 如果没有key字段，则找一个类型相同的元素出来做比较
        else if (min < nodesWithoutKeyCount) {
            for (let j = 0; j < nodesWithoutKeyCount; j++) {
                const node = nodesWithoutKey[j];
                if (node !== undefined && isSameType(node, vChild)) {
                    dom = node;
                    nodesWithoutKey[j] = undefined;
                    if (j === min) min++;
                    if (j === nodesWithoutKeyCount - 1) nodesWithoutKeyCount--;
                    break;
                }
            }
        }

        // diff返回是否更新元素
        const isUpdate = diff(dom, vChild, parent);

        // 如果是更新元素，且不是同一个dom元素，则移动到原先的dom元素之前
        if (isUpdate) {
            const originChild = childNodes[i];
            if (originChild !== dom) {
                parent.insertBefore(dom, originChild);
            }
        }
    }

    // 清理剩下的未使用的dom元素
    if (nodesWithKeyCount) {
       for (key in nodesWithKey) {
           const node = nodesWithKey[key];
           if (node !== undefined) {
               node.parentNode.removeChild(node);
           }
       }
    }
    // 清理剩下的未使用的dom元素
    while (min <= nodesWithoutKeyCount) {
        const node = nodesWithoutKey[nodesWithoutKeyCount--];
        if ( node !== undefined) {
            node.parentNode.removeChild(node);
        }
    }
}

let buildComponentFromVDom = (dom, vdom, parent) => {
    const cpnt = vdom.tag;
    if (!typeof cpnt === 'function') {
        throw new Error('vdom is not a component type');
    }

    const props = getVDomProps(vdom);
    let componentInst = dom && dom._component;

    // 创建组件
    if (componentInst == undefined) {
        try {
            componentInst = new cpnt(props);
            setTimeout(() => {componentInst.setState({name: 'Dickens'})}, 5000);
        } catch (error) {
            throw new Error(`component creation error: ${cpnt.name}`);
        }
    }
    // 组件更新
    else {
        componentInst.props = props;
    }

    const componentVDom = componentInst.render();

    diff(dom, componentVDom, parent, componentInst);
}

let getVDomProps = (vdom) => {
    const props = vdom.props;
    props.children = vdom.children;

    return props;
}

function diff(dom, newVDom, parent, componentInst) {

    if (typeof newVDom == 'object' && typeof newVDom.tag == 'function') {
      console.log('buildComponentFromVDom');
       buildComponentFromVDom(dom, newVDom, parent);
       return false;
   }

   // 新建node
   if (dom == undefined) {
       const dom = createElement(newVDom);

       // 自定义组件
       if (componentInst) {
           dom._component = componentInst;
           dom._componentConstructor = componentInst.constructor;
           componentInst.dom = dom;
       }

       parent.appendChild(dom);
       return false;
   }

    // 删除node
    if (newVDom == undefined) {
        console.log('removeChild')
        parent.removeChild(dom);
        return false;
    }

    // 替换node
    if (!isSameType(dom, newVDom)) {
        console.log('replaceChild')
        parent.replaceChild(createElement(newVDom), dom);
        return false;
    }

    // 更新node
    if (dom.nodeType === Node.ELEMENT_NODE) {
        console.log('diff')
        // 比较props的变化
        diffProps(newVDom, dom);

        // 比较children的变化
        diffChildren(newVDom, dom);
    }

    return true;
}



export {diff as default};

//差异对象的数据结构是下面这个样子，与每一个 VDOM 元素一一对应
/*
{
    type,
    vdom,
    props: [{
               type,
               key,
               value
            }]
    children
}
*/
