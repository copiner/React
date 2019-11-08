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
let diffProps = (newVDom, element) =>{
    let newProps = {...element[ATTR_KEY]};
    const allProps = {...newProps, ...newVDom.props};

    // 获取新旧所有属性名后，再逐一判断新旧属性值
    Object.keys(allProps).forEach((key) => {
            const oldValue = newProps[key];
            const newValue = newVDom.props[key];

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
    )

    // 属性重新赋值
    element[ATTR_KEY] = newProps;
}

function diffChildren(newVDom, parent) {
    // 获取子元素最大长度
    const childLength = Math.max(parent.childNodes.length, newVDom.children.length);

    // 遍历并diff子元素
    for (let i = 0; i < childLength; i++) {
        diff(newVDom.children[i], parent, i);
    }
}

function diff(newVDom, parent, index=0) {

    const element = parent.childNodes[index];

    // 新建node
    if (element == undefined) {
        parent.appendChild(createElement(newVDom));
        return;
    }

    // 删除node
    if (newVDom == undefined) {
        parent.removeChild(element);
        return;
    }

    // 替换node
    if (!isSameType(element, newVDom)) {
        parent.replaceChild(createElement(newVDom), element);
        return;
    }

    // 更新node
    if (element.nodeType === Node.ELEMENT_NODE) {
        // 比较props的变化
        diffProps(newVDom, element);

        // 比较children的变化
        diffChildren(newVDom, element);
    }
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

/*
function diff(oldVDom, newVDom, parent, index=0) {
    // 新建node
    if (oldVDom == undefined) {
        parent.appendChild(createElement(newVDom));
    }

    const element = parent.childNodes[index];

    // 删除node
    if (newVDom == undefined) {
        parent.removeChild(element);
    }

    // 替换node
    if (
        typeof oldVDom !== typeof newVDom ||
        ((typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom) ||
        oldVDom.tag !== newVDom.tag
    ) {
        parent.replaceChild(createElement(newVDom), element);
    }

    // 更新node
    if (oldVDom.tag) {
        // 比较props的变化
        diffProps(oldVDom, newVDom, element);

        // 比较children的变化
        diffChildren(oldVDom, newVDom, element);
    }
}

function diffProps(oldVDom, newVDom) {
    const allProps = {...oldVDom.props, ...newVDom.props};

    // 获取新旧所有属性名后，再逐一判断新旧属性值
    Object.keys(allProps).forEach((key) => {
            const oldValue = oldVDom.props[key];
            const newValue = newVDom.props[key];

            // 删除属性
            if (newValue == undefined) {
                element.removeAttribute(key);
            }
            // 更新属性
            else if (oldValue == undefined || oldValue !== newValue) {
                element.setAttribute(key, newValue);
            }
        }
    )
}

function diffChildren(oldVDom, newVDom, parent) {
    // 获取子元素最大长度
    const childLength = Math.max(oldVDom.children.length, newVDom.children.length);

    // 遍历并diff子元素
    for (let i = 0; i < childLength; i++) {
        diff(oldVDom.children[i], newVDom.children[i], parent, i);
    }
}

*/
