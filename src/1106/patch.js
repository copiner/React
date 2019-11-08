import { createElement } from './create';

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

// 更新属性
let patchProps = (element, props) =>{
    if (!props) {
        return;
    }

    props.forEach( patchObj => {
        // 删除属性
        if (patchObj.type === propPatchTypes.REMOVE) {
            element.removeAttribute(patchObj.key);
        }
        // 更新或新建属性
        else if (patchObj.type === propPatchTypes.UPDATE) {
            element.setAttribute(patchObj.key, patchObj.value);
        }
    })
}

// 给 DOM 打个补丁
//function patch(parent, patchObj, index=0){}

export function patch(parent, patchObj, index=0) {
    if (!patchObj) {
        return;
    }

    // 新建元素
    if (patchObj.type === nodePatchTypes.CREATE) {
        return parent.appendChild(createElement(patchObj.vdom));
    }

    const element = parent.childNodes[index];

    // 删除元素
    if (patchObj.type === nodePatchTypes.REMOVE) {
        return parent.removeChild(element);
    }

    // 替换元素
    if (patchObj.type === nodePatchTypes.REPLACE) {
        return parent.replaceChild(createElement(patchObj.vdom), element);
    }

    // 更新元素
    if (patchObj.type === nodePatchTypes.UPDATE) {
        const {props, children} = patchObj;

        // 更新属性
        patchProps(element, props);

        // 更新子元素
        children.forEach( (patchObj, i) => {
            // 更新子元素时，需要将子元素的序号传入
            patch(element, patchObj, i)
        });
    }
}
